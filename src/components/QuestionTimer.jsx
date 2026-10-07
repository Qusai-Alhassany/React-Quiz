import { useEffect, useState, useRef } from "react";

const UPDATE_INTERVAL = 100;

export default function QuestionTimer({
  timeOut,
  onTimeOut,
  // timeRef,
  timeOutRef,
}) {
  const [remainingTime, setRemainingTime] = useState(timeOut);
  useEffect(() => {
    if (timeOutRef.current === null) {
      const timeoutId = setTimeout(onTimeOut, timeOut);
      console.log("TIMEOUT");
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timeOut, onTimeOut]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((previousTime) =>
        Math.max(previousTime - UPDATE_INTERVAL, 0),
      );
      console.log("INTERVAL");
    }, UPDATE_INTERVAL);

    // timeRef.current = intervalId;
    console.log(remainingTime);

    return () => {
      clearInterval(intervalId);
      // timeRef.current = null;
    };
  }, []);

  const progressPercentage = Math.max(
    0,
    Math.min((remainingTime / timeOut) * 100, 100),
  );
  // console.log(progressPercentage);

  const remainingSeconds = Math.ceil(remainingTime / 1000);
  const isRunningOut = progressPercentage <= 30;
  // if (remainingSeconds === 1) {
  //   clearInterval(timeRef.current);
  //   console.log(remainingSeconds);

  //   onTimeOut();
  // }

  // console.log(remainingSeconds);

  return (
    <div className="w-full" aria-label="Question timer">
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Time remaining
        </span>

        <span
          className={`min-w-12 text-right font-mono text-sm font-bold tabular-nums transition-colors ${
            isRunningOut ? "text-rose-300" : "text-cyan-300"
          }`}
        >
          {remainingSeconds}s
        </span>
      </div>

      <div
        className="h-3 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10"
        role="progressbar"
        aria-label="Time remaining"
        aria-valuemin={0}
        aria-valuemax={timeOut}
        aria-valuenow={remainingTime}
        aria-valuetext={`${remainingSeconds} seconds remaining`}
      >
        <div
          className={`h-full rounded-full transition-[width,background-color] duration-100 ease-linear ${
            isRunningOut
              ? "bg-gradient-to-r from-orange-400 to-rose-500"
              : "bg-gradient-to-r from-cyan-400 to-purple-500"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
