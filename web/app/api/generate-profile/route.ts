import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const labels = ['Style vibes', 'Color palette', 'Shops for', 'Layering', 'Fabrics', 'Fit & body needs', 'Budget']

export async function POST(req: NextRequest) {
  const { answers } = await req.json()

  const answerText = answers
    .map((ans: string[], i: number) => `${labels[i]}: ${ans.join(', ')}`)
    .join('\n')

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a warm personal style assistant. Based on this quiz:\n\n${answerText}\n\nOutput ONLY valid JSON with two keys:\n- "summary": a 2-3 sentence style profile (warm, personal, specific to their answers)\n- "memory": a compact memory block string starting with "Fashion profile:" covering vibes, colors, shops for, fit/body needs, fabrics, comfort notes, budget, and 4-6 suggested brands matched to their needs and budget. Under 200 words. No markdown.\n\nReturn only the raw JSON object, no backticks, no extra text.`,
      },
    ],
  })

  const text = message.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('')

  const parsed = JSON.parse(text)
  return NextResponse.json(parsed)
}
