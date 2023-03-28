import React, { useState } from 'react';
import '../App.css';

function History() {
  const [history, setHistory] = useState([]);

  function handleVideoPlayed(name, link) {
    const timePlayed = new Date().toLocaleString();
    const playedVideo = { name, link, timePlayed };
    setHistory([...history, playedVideo]);
  }

  return (
    <div className="history-container">
      <h1 className="history-title">Recently played videos</h1>
      {history.length === 0 ? (
        <div className="history-empty">
          <p>No videos have been played yet.</p>
        </div>
      ) : (
        <ul className="history-list">
          {history.map((playedVideo, index) => (
            <li key={index} className="history-item">
              <div className="history-details">
                <div className="history-name">{playedVideo.name}</div>
                <div className="history-link">{playedVideo.link}</div>
                <div className="history-time">{playedVideo.timePlayed}</div>
              </div>
              <button className="history-delete" onClick={() => {
                const newHistory = history.filter((video, i) => i !== index);
                setHistory(newHistory);
              }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
