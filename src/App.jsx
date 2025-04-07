import { useState } from "react";
import "./App.css";
const logo = "/logo.png"; // No need to import

export default function App() {
  const tasks = [
    {
      question: "Hvor i Asker?",
      answer: "Føyka Stadion",
      options: ["Føyka Stadion", "Leikvollhallen", "Varner Arena"],
      video: "public/føyka.mp4",
    },
    {
      question: "Hvor i Asker?",
      answer: "Asker Kulturhus",
      options: ["Bleiker VGS", "Texas Barbeque Cafe", "Asker Kulturhus"],
      video: "public/askerkulturhus.mp4",
    },
    {
      question: "Hvor i Asker?",
      answer: "Venskaben",
      options: ["Venskaben", "Asker Kirke", "Asker Rådhus"],
      video: "public/venskaben.mp4",
    },
  ];

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [showGameContent, setShowGameContent] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answered, setAnswered] = useState(false); // Track if the question has been answered

  const checkAnswer = (selectedAnswer) => {
    const correctAnswer = tasks[currentTaskIndex].answer.toLowerCase();
    if (selectedAnswer.toLowerCase() === correctAnswer) {
      setMessage("✅ Riktig!");
      setScore(score + 1);
    } else {
      setMessage("❌ Feil!");
    }
    setAnswered(true); // Mark the question as answered
  };

  const skipTask = () => {
    goToNextTask();
  };

  const goToNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setMessage(""); // Clear the message
      setAnswered(false); // Reset the answered state
    } else {
      setQuizCompleted(true); // Mark the quiz as completed
    }
  };

  return (
    <div className="content">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      {!showGameContent ? (
        <div className="start">
          <div className="start_box">
            <h1 className="start_title">Velkommen til, Hvor er jeg?</h1>
            <button
              className="start_button"
              onClick={() => setShowGameContent(true)}
            >
              Start
            </button>
          </div>
        </div>
      ) : quizCompleted ? (
        <div className="game_content">
          <h2>🎉 Gratulerer! 🎉</h2>
          <p>Du fullførte quizen!</p>
          <p>
            Du fikk: {score} / {tasks.length}
          </p>
        </div>
      ) : (
        <div className="game_content">
          <h2>{tasks[currentTaskIndex].question}</h2>
          <div className="video">
            <video
              src={tasks[currentTaskIndex].video}
              controls
              autoPlay
              muted
              width="600"
              z
              height="400"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="options">
            {tasks[currentTaskIndex].options.map((option, index) => (
              <button
                key={index}
                className="option_button"
                onClick={() => checkAnswer(option)}
                disabled={answered} // Disable buttons after answering
              >
                {option}
              </button>
            ))}
          </div>
          {message && <p className="text-lg font-semibold">{message}</p>}
          <div className="navigation_buttons">
            <button className="skip_button" onClick={skipTask}>
              Skipp
            </button>
            {answered && (
              <button className="next_button" onClick={goToNextTask}>
                Neste
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
