import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DISCORD_WEBHOOK_URL = process.env.WEBDC
const STATUS_URL = `${process.env.TWARY}/api/status`

const monitorFilePath = path.resolve('./monitor.json')
const webhookBaseUrl = DISCORD_WEBHOOK_URL?.split('/messages')[0]

function msToTime(ms) {
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / (1000 * 60)) % 60)
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
}

function saveMessageId(id) {
  fs.writeFileSync(monitorFilePath, JSON.stringify({ messageId: id }, null, 2))
}

function loadMessageId() {
  try {
    const data = fs.readFileSync(monitorFilePath, 'utf-8')
    return JSON.parse(data).messageId
  } catch {
    return null
  }
}

async function sendDiscordEmbed(status, meta = {}) {
  const emojis = {
    ok: '✅',
    down: '❌',
    unreachable: '⚠️',
    slow: '🐢',
  }

  const embed = {
    title: `${emojis[status]} API ${status.toUpperCase()}`,
    color:
      status === 'ok'
        ? 0x2ecc71
        : status === 'down'
        ? 0xe74c3c
        : status === 'slow'
        ? 0xf1c40f
        : 0xf39c12,
    fields: [],
    timestamp: new Date().toISOString(),
    footer: { text: 'TwaryAPI Monitor' },
  }

  if (status === 'ok') {
    embed.fields.push(
      { name: 'Status', value: '`UP`', inline: true },
      { name: 'Latency', value: `\`${meta.latency} ms\``, inline: true },
      { name: 'Uptime', value: `\`${msToTime(meta.data?.uptime * 1000 || 0)}\``, inline: true },
      { name: 'Version', value: `\`${meta.data?.version || 'unknown'}\``, inline: true }
    )
  } else if (status === 'slow') {
    embed.description = `API masih hidup, tapi lambat: \`${meta.latency} ms\``
    embed.fields.push(
      { name: 'Status', value: '`SLOW`', inline: true },
      { name: 'Version', value: `\`${meta.data?.version || 'unknown'}\``, inline: true }
    )
  } else if (status === 'down') {
    embed.description = `Status bukan \`ok\`, respons:\n\`\`\`json\n${JSON.stringify(meta.data, null, 2)}\n\`\`\``
  } else if (status === 'unreachable') {
    embed.description = `Tidak bisa menjangkau API:\n\`\`\`${meta.error}\`\`\``
  }

  const messageId = loadMessageId()

  if (messageId) {
    const editUrl = `${webhookBaseUrl}/messages/${messageId}`
    const editRes = await fetch(editUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    })

    if (editRes.ok) return
  }

  // If edit fails or messageId doesn't exist, send new message
  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
  })

  const json = await res.json()
  if (json.id) saveMessageId(json.id)
}

export async function GET() {
  const start = Date.now()

  try {
    const res = await fetch(STATUS_URL)
    const latency = Date.now() - start
    const data = await res.json()

    if (data.status !== 'ok') {
      await sendDiscordEmbed('down', { data })
    } else if (latency > 500) {
      await sendDiscordEmbed('slow', { latency, data })
    } else {
      await sendDiscordEmbed('ok', { latency, data })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    await sendDiscordEmbed('unreachable', { error: e.message || e.toString() })
    return NextResponse.json({ error: 'API unreachable' }, { status: 500 })
  }
}