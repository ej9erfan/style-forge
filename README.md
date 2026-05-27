# StyleForge

An AI-powered personal style quiz that generates a reusable fashion profile and memory update block — paste it into any AI assistant to get personalized style advice instantly.

## What it does

- Runs a 7-question style quiz via any AI chat interface
- Outputs a structured style profile summary
- Generates a portable memory update block you can save and reuse across AI tools

## Usage

1. Open `src/quiz-prompt.md`
2. Copy the full prompt
3. Paste it into any AI assistant (Claude, ChatGPT, etc.)
4. Answer the questions
5. Save your memory update block

## Structure

```
style-forge/
├── LICENSE
├── README.md
├── CHANGELOG.md
├── src/
│   └── quiz-prompt.md      ← the AI-runnable quiz script
└── docs/
    └── sample-output.md    ← example output from a real session
```

## Roadmap

- v0.0.2 — interactive web UI version of the quiz
- v0.0.3 — outfit mood board generator
- v0.0.4 — brand/budget matcher

## Author

github.com/ej9erfan
