import { useState, useCallback, useMemo, useRef } from "react";
import QUESTIONS from "../questions.js";
import QuizCompleteIcon from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary.jsx";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const timeOutRef = useRef(null);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  const selectedAnswer = userAnswers[userAnswers.length - 1];

  const shuffledAnswers = useMemo(() => {
    if (quizIsComplete) {
      return [];
    }

    return [...QUESTIONS[activeQuestionIndex].answers].sort(
      () => Math.random() - 0.5,
    );
  }, [activeQuestionIndex, quizIsComplete]);

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
      if (answerState !== "") {
        return;
      }

      setAnswerState("answered");
      setUserAnswers((previousAnswers) => [...previousAnswers, answer]);

      setTimeout(() => {
        const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0];

        if (answer === correctAnswer) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
        
      }, 1000);
    },
    [activeQuestionIndex, answerState],
  );
  const handleSkipAnswer = useCallback(() => {
    setUserAnswers((prevAnswers) => [...prevAnswers, null]);

    setAnswerState("");
  }, []);

  if (quizIsComplete) {
    return (
      <Summary
        userAnswers={userAnswers}
        questions={QUESTIONS}
        onRestart={() => {
          setUserAnswers([]);
          setAnswerState("");
        }}
      />
    );
  }

  const currentQuestion = QUESTIONS[activeQuestionIndex];
  const progress = ((activeQuestionIndex + 1) / QUESTIONS.length) * 100;
  const answersAreLocked = answerState !== "";

  return (
    <section
      id="quiz"
      className="mx-auto w-full max-w-2xl rounded-3xl border border-white/15 bg-slate-950/75 p-5 text-white shadow-2xl shadow-purple-950/40 backdrop-blur-xl sm:p-8 md:p-10"
    >
      <header className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold text-cyan-300 text-2xl">
            Question {activeQuestionIndex + 1}
          </span>
          <span className="text-slate-400">
            {activeQuestionIndex + 1} / {QUESTIONS.length}
          </span>
        </div>
      </header>

      <div className="mb-7" key={currentQuestion.text}>
        <QuestionTimer
          // key={currentQuestion.text}
          key={activeQuestionIndex}
          timeOut={10000}
          onTimeOut={handleSkipAnswer}
          // timeRef={timeRef}
          timeOutRef={timeOutRef}
          handleSetAnswerState={setAnswerState}
        />
        {console.log("sedd")}
      </div>

      <h2
        id="question"
        className="mb-8 text-center text-xl font-bold leading-relaxed tracking-tight text-white sm:text-2xl md:text-xl"
      >
        {currentQuestion.text}
      </h2>

      <ul id="answers" className="grid list-none gap-3 p-0 sm:gap-4">
        {shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;

          const baseClasses =
            "group relative w-full rounded-2xl border px-5 py-4 text-left font-semibold shadow-sm outline-none transition-all duration-200 focus-visible:ring-4 focus-visible:ring-cyan-400/40 disabled:cursor-not-allowed sm:px-6 sm:py-5";

          let stateClasses =
            "border-white/15 bg-white/5 text-slate-100 hover:-translate-y-0.5 hover:border-purple-400/70 hover:bg-purple-500/15 hover:shadow-lg hover:shadow-purple-950/30";

          if (answerState === "answered" && isSelected) {
            stateClasses =
              "scale-[1.01] border-cyan-300 bg-cyan-400/20 text-cyan-50 ring-2 ring-cyan-300/30";
          }

          if (answerState === "correct" && isSelected) {
            stateClasses =
              "scale-[1.01] border-emerald-300 bg-emerald-500/25 text-emerald-50 ring-2 ring-emerald-300/30";
          }

          if (answerState === "wrong" && isSelected) {
            stateClasses =
              "border-rose-300 bg-rose-500/25 text-rose-50 ring-2 ring-rose-300/30";
          }

          return (
            <li key={answer ?? `skipped-${index}`} className="w-full">
              <button
                type="button"
                onClick={() => handleSelectAnswer(answer)}
                disabled={answersAreLocked}
                className={`${baseClasses} ${stateClasses}`}
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-slate-200 transition-colors group-hover:border-purple-300/50 group-hover:bg-purple-400/20">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="flex-1">{answer}</span>

                  {answerState === "correct" && isSelected && (
                    <span aria-label="Correct answer" className="text-xl">
                      ✓
                    </span>
                  )}

                  {answerState === "wrong" && isSelected && (
                    <span aria-label="Wrong answer" className="text-xl">
                      ✕
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
