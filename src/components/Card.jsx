import React, { useState, useRef } from 'react';
import { FaEdit, FaTrash, FaPlay, FaPause } from 'react-icons/fa';
import '../App.css';

function Card(props) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [name, setName] = useState(props.name);
  const [link, setLink] = useState(props.link);
  const [category, setCategory] = useState(props.category);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  function handleEditSubmit(event) {
    event.preventDefault();
    const updatedCard = { name, link, category };
    props.onUpdate(props.index, updatedCard);
    setShowEditForm(false);
  }

  function handleDeleteClick() {
    props.onDelete(props.index);
  }

  function handlePlayClick() {
    videoRef.current.play();
    setIsPlaying(true);
  }

  function handlePauseClick() {
    videoRef.current.pause();
    setIsPlaying(false);
  }

  function handleVideoClick() {
    if (isPlaying) {
      handlePauseClick();
    } else {
      handlePlayClick();
    }
  }

  return (
    <div className="card">
      <div className="video-container">
        {link && (
          <video
            ref={videoRef}
            className="video"
            src={link}
            controls
            onClick={handleVideoClick}
          />
        )}
        {!link && <div className="placeholder-video" />}
        <div className="play-pause-button-container">
          {isPlaying ? (
            <button className="pause-button" onClick={handlePauseClick}>
              <FaPause />
            </button>
          ) : (
            <button className="play-button" onClick={handlePlayClick}>
              <FaPlay />
            </button>
          )}
        </div>
      </div>
      <div className="card-info">
        <h2>{name}</h2>
        <p>{category}</p>
        <div className="card-buttons">
          <button className="edit-button" onClick={() => setShowEditForm(true)}>
            <FaEdit />
          </button>
          <button className="delete-button" onClick={handleDeleteClick}>
            <FaTrash />
          </button>
        </div>
        {showEditForm && (
          <form onSubmit={handleEditSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label>
              Link:
              <input type="text" value={link} onChange={(event) => setLink(event.target.value)} />
            </label>
            <label>
              Category:
              <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} required />
            </label>

            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Card;
