import React, { useState } from "react";
import "../styles/garden.css";
const VocabularyGarden = () => {
  const [vocabulary, setVocabulary] = useState([
    { id: 1, word: "Apple", learned: false },
    { id: 2, word: "Banana", learned: false },
    { id: 3, word: "Cherry", learned: false },
    // ... more words
  ]);

  const [progress, setProgress] = useState(0); // Track progress (in percentage)

  const handleLearnWord = (id) => {
    setVocabulary((prevVocabulary) =>
      prevVocabulary.map((item) =>
        item.id === id ? { ...item, learned: true } : item
      )
    );
    updateProgress();
  };

  const updateProgress = () => {
    const totalWords = vocabulary.length;
    const learnedWords = vocabulary.filter((item) => item.learned).length;
    setProgress((learnedWords / totalWords) * 100);
  };

  return (
    <div className="vocabulary-garden-container">
      <h1 className="title">Vocabulary Garden</h1>
      <div className="garden">
        <div className="garden-bed">
          <h2>Your Garden</h2>
          <div className="plants">
            {vocabulary.map((item) => (
              <div
                key={item.id}
                className={`plant ${item.learned ? "learned" : ""}`}
                onClick={() => handleLearnWord(item.id)}
              >
                <span>{item.word}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="progress">
          <h3>Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span>{Math.round(progress)}% learned</span>
        </div>
      </div>
    </div>
  );
};

export default VocabularyGarden;
