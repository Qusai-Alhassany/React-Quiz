# ReactQuiz

A small interactive quiz application built with React and Vite. It presents multiple-choice questions about React, tracks the user's answers, shows a countdown timer for each question, and displays a complete score summary at the end.

## Features

- React-based quiz flow with multiple-choice questions
- Per-question countdown timer
- Randomized answer order for each question
- Instant feedback for correct and incorrect answers
- Skip handling when a question times out
- Final summary with score, correct/wrong/skipped counts, and answer review
- Restart option to replay the quiz
- Responsive, polished UI with a glassmorphism-inspired design

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Oxlint

## Project Structure

```text
vite_projct/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QuestionTimer.jsx
│   │   ├── Quiz.jsx
│   │   └── Summary.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── questions.js
├── .eslintrc
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

1. Open a terminal in the project root.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev
```
Runs the app in development mode.

```bash
npm run build
```
Creates a production build for deployment.

```bash
npm run preview
```
Serves the production build locally for preview.

```bash
npm run lint
```
Runs the project lint check.

## Gameplay

- The quiz displays one question at a time.
- Each question has a time limit.
- Users can select an answer before the timer expires.
- Once an answer is submitted, the app shows whether it was correct or incorrect.
- After all questions are answered or skipped, the app shows a summary screen with the final result and a review of each question.

