'use client'

import { useState } from 'react'
import { questions } from '../data/questions'

type Answers = string[][]

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(questions.map(() => []))
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ summary: string; memory: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const q = questions[step]
  const allOpts = q.options.slice(0, -1)
  const hasAll = q.options[q.options.length - 1] === 'All of the above'

  function toggle(opt: string) {
    const next = new Set(selected)
    if (!q.multi) {
      next.clear()
      next.add(opt)
      setSelected(next)
      return
    }
    if (opt === 'All of the above') {
      if (next.has('All of the above')) {
        next.clear()
      } else {
        next.clear()
        allOpts.forEach((o) => next.add(o))
        next.add('All of the above')
      }
    } else {
      if (next.has(opt)) {
        next.delete(opt)
        next.delete('All of the above')
      } else {
        next.add(opt)
        if (allOpts.every((o) => next.has(o))) next.add('All of the above')
      }
    }
    setSelected(next)
  }

  function next() {
    const real = [...selected].filter((s) => s !== 'All of the above')
    const updated = answers.map((a, i) => (i === step ? real : a))
    setAnswers(updated)
    if (step < questions.length - 1) {
      setStep(step + 1)
      setSelected(new Set())
    } else {
      submit(updated)
    }
  }

  async function submit(finalAnswers: Answers) {
    setDone(true)
    setLoading(true)
    try {
      const res = await fetch('/api/generate-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function restart() {
    setStep(0)
    setAnswers(questions.map(() => []))
    setSelected(new Set())
    setDone(false)
    setLoading(false)
    setResult(null)
    setError('')
  }

  function copyMemory() {
    if (!result) return
    navigator.clipboard.writeText(result.memory).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const progress = Math.round(((step + 1) / questions.length) * 100)
  const selCount = [...selected].filter((s) => s !== 'All of the above').length

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="text-xl font-medium tracking-tight">✦ StyleForge</span>
        </div>
        {loading && (
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex gap-1">
              {[0,1,2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </span>
            Building your style profile...
          </div>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {result && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">Your style profile</p>
              <p className="text-sm leading-relaxed text-gray-800">{result.summary}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">Memory block</p>
              <pre className="text-xs bg-gray-50 rounded-lg p-4 whitespace-pre-wrap break-words font-mono text-gray-700 border border-gray-100 max-h-56 overflow-y-auto">
                {result.memory}
              </pre>
              <button
                onClick={copyMemory}
                className="mt-3 w-full text-left text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {copied ? '✓ Copied!' : '⧉ Copy memory block'}
              </button>
            </div>
            <button
              onClick={restart}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ↺ Retake quiz
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="mb-8">
        <span className="text-xl font-medium tracking-tight">✦ StyleForge</span>
        <p className="text-sm text-gray-400 mt-0.5">Your personal style profile — private, no account needed.</p>
      </div>

      <div className="w-full h-0.5 bg-gray-100 rounded-full mb-8">
        <div
          className="h-full rounded-full bg-pink-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 mb-1">Question {step + 1} of {questions.length}</p>
      <h2 className="text-lg font-medium text-gray-900 mb-1">{q.question}</h2>
      <p className="text-sm text-gray-400 mb-5">{q.hint}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {q.options.map((opt) => {
          const isSelected = selected.has(opt)
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              onTouchEnd={(e) => { e.preventDefault(); toggle(opt) }}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                isSelected
                  ? 'bg-pink-50 border-pink-400 text-pink-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={next}
          onTouchEnd={(e) => { e.preventDefault(); next() }}
          disabled={selCount === 0}
          className="px-6 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {step === questions.length - 1 ? 'See my profile →' : 'Next →'}
        </button>
        {selCount > 0 && (
          <span className="text-xs text-gray-400">{selCount} selected</span>
        )}
      </div>
    </div>
  )
}
