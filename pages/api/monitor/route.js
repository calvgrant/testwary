// app/api/monitor/route.js
import { NextResponse } from 'next/server'

const DISCORD_WEBHOOK_URL = process.env.DCWEB
const STATUS_URL = `${process.env.TWARY}/api/status`

function msToTime(ms) {
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / (1000 * 60)) % 60)
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}h ${minutes}m ${seconds}s`
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

  await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
  })
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