import QuizCompleteIcon from "../assets/quiz-complete.png";

export default function Summary({ userAnswers, questions, onRestart }) {
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].answers[0],
  ).length;

  const skippedAnswers = userAnswers.filter((answer) => answer === null).length;

  const wrongAnswers = userAnswers.length - correctAnswers - skippedAnswers;

  const scorePercentage = Math.round((correctAnswers / questions.length) * 100);

  return (
    <section
      id="summary"
      className="
        mx-auto
        w-full
        max-w-2xl
        rounded-3xl
        border
        border-white/15
        bg-slate-950/75
        p-6
        text-white
        shadow-2xl
        shadow-purple-950/40
        backdrop-blur-xl
        sm:p-10
      "
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div
          className="
            mb-6
            rounded-full
            bg-purple-500/20
            p-5
            ring-1
            ring-purple-400/30
          "
        >
          <img
            src={QuizCompleteIcon}
            alt="Quiz completed"
            className="
              h-28
              w-28
              object-contain
              drop-shadow-xl
            "
          />
        </div>

        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.3em]
            text-cyan-300
          "
        >
          Finished
        </p>

        <h1
          className="
            mt-3
            text-3xl
            font-bold
            sm:text-4xl
          "
        >
          Quiz Completed!
        </h1>

        <p className="mt-3 text-slate-300">Here is your final result.</p>
      </div>

      {/* Score */}
      <div
        className="
          mx-auto
          mt-8
          flex
          h-40
          w-40
          flex-col
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-cyan-400
          to-purple-600
          shadow-lg
          shadow-purple-900/50
        "
      >
        <span className="text-4xl font-black">{scorePercentage}%</span>

        <span className="text-sm text-white/80">Score</span>
      </div>

      {/* Statistics */}
      <div
        className="
          mt-10
          grid
          gap-4
          sm:grid-cols-3
        "
      >
        <ResultCard
          title="Correct"
          value={correctAnswers}
          color="text-emerald-300"
        />

        <ResultCard title="Wrong" value={wrongAnswers} color="text-rose-300" />

        <ResultCard
          title="Skipped"
          value={skippedAnswers}
          color="text-yellow-300"
        />
      </div>

      {/* Review */}
      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Review Answers</h2>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];

            const isCorrect = userAnswer === question.answers[0];

            return (
              <article
                key={question.text}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                "
              >
                <h3
                  className="
                    font-semibold
                    text-white
                  "
                >
                  {index + 1}. {question.text}
                </h3>

                <p className="mt-3 text-sm">
                  Your answer:
                  <span
                    className={`
                      ml-2
                      font-semibold
                      ${
                        userAnswer === null
                          ? "text-yellow-300"
                          : isCorrect
                            ? "text-emerald-300"
                            : "text-rose-300"
                      }
                    `}
                  >
                    {userAnswer ?? "Skipped"}
                  </span>
                </p>

                {!isCorrect && (
                  <p
                    className="
                      mt-2
                      text-sm
                      text-cyan-300
                    "
                  >
                    Correct answer:
                    <span className="ml-2 font-semibold">
                      {question.answers[0]}
                    </span>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="
          mt-10
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-cyan-400
          to-purple-600
          px-6
          py-4
          font-bold
          text-white
          shadow-lg
          shadow-purple-900/40
          transition
          hover:scale-[1.02]
          hover:shadow-xl
          active:scale-95
        "
      >
        Restart Quiz
      </button>
    </section>
  );
}

function ResultCard({ title, value, color }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-5
        text-center
      "
    >
      <p className="text-sm text-slate-400">{title}</p>

      <p
        className={`
          mt-2
          text-3xl
          font-black
          ${color}
        `}
      >
        {value}
      </p>
    </div>
  );
}
