import React, { useState, useEffect } from "react";
import "../app.css";



function Trivia({ updateQuestionNumber }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://quizapi.io/api/v1/questions?apiKey=Zitx3PLvIqChejisA7s8cOHLNF9jtnhivbcbxCKo&limit=10")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);




//iss func to thoda smartly likhoo
function handleAnswerClick(answer) {
  const answerElement = document.querySelector(`.answer.${answer}`);
  if (answerElement) {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
      answerElement.classList.add("correct");

      // update the question number state in App.jsx if the answer is correct
      updateQuestionNumber((prevQuestionNumber) =>
        prevQuestionNumber + 1 > 15 ? 15 : prevQuestionNumber + 1
      );
    } else {
      answerElement.classList.add("wrong");
    }
    setTimeout(() => {
      answerElement.classList.remove("correct", "wrong");
      setCurrentQuestion(currentQuestion + 1);
    }, 3000);
  }
}



  function handleNextQuestionClick() {
    setCurrentQuestion(currentQuestion + 1);
  }

  if (!questions.length) {
    //loader ko animate karo / Write some CSS for it
    return <div>Loading...</div>;
  }

  if (currentQuestion >= questions.length) {
    return <div>You scored {score} out of {questions.length}</div>;
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="trivia">
      <div className="question">{currentQuestionData.question}</div>
      <div className="answers">

        {Object.entries(currentQuestionData.answers).map(([key, value], index) => (
          <div
            key={`answer-${index}`}
            className={`answer ${key}`}
            onClick={() => handleAnswerClick(key)}
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={handleNextQuestionClick}>Next Question</button>
    </div>
  );
}

export default Trivia;

