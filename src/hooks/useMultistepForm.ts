import { useState } from "react";

function delay(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

function useMultistepForm(steps: string[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  async function next() {
    setIsFetching(true);
    await delay(700);
    setIsFetching(false);
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function previous() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  return {
    steps,
    currentStepIndex,
    step: steps[currentStepIndex],
    next,
    previous,
    isFetching,
    isFirstPage: currentStepIndex === 0,
    isLastPage: currentStepIndex === steps.length - 1,
  };
}

export default useMultistepForm;
