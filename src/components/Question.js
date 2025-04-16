import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        const updatedTime = prevTime - 1;
        if (updatedTime <= 0) {
          // When time hits 0
          setTimeRemaining(10); // Reset timeRemaining for the next question
          onAnswered(false); // Trigger onAnswered with false
          return 10; // Ensure timer resets for the next callback
        }
        return updatedTime;
      });
    }, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  const { id, prompt, answers, correctIndex } = question;

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer for the next question
    onAnswered(isCorrect); // Trigger onAnwered with the answer status
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;