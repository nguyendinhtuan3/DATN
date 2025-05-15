import React, { useState, useEffect } from "react";

const TestingPage = () => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for example
  const [isTesting, setIsTesting] = useState(true);

  useEffect(() => {
    if (isTesting && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsTesting(false);
    }
  }, [isTesting, timeLeft]);

  return (
    <div className="testing-page-container" style={{ padding: "20px" }}>
      <h1>Welcome to Testing Page</h1>

      {isTesting ? (
        <div>
          <h2>Time Left: {timeLeft} seconds</h2>
          <form>
            <div>
              <label htmlFor="question1">Question 1: What is 2 + 2?</label>
              <input type="text" id="question1" name="question1" />
            </div>
            <div>
              <label htmlFor="question2">
                Question 2: What is the capital of France?
              </label>
              <input type="text" id="question2" name="question2" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Test Over</h2>
          <p>Your time is up! Submit your answers to see the results.</p>
        </div>
      )}
    </div>
  );
};

export default TestingPage;
