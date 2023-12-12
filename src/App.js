import React, { useState, useRef } from "react";
import "./DragAndDrop.css"; // Import your CSS file

const DragAndDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const rightDroppableRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData("text/plain");
    const droppedItem = document.getElementById(droppedItemId);

    if (e.target.classList.contains("draggable-place")) {
      e.target.appendChild(droppedItem);
      droppedItem.focus();
    }

    setDragging(false);
  };

  const handleRandomSelection = () => {
    const items = rightDroppableRef.current.querySelectorAll(".draggable-item");
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];
      setSelectedItem(randomItem.textContent);
      randomItem.focus();
    }
  };

  const users = [
    { id: 1, name: "Peteris", participating: true },
    { id: 2, name: "Vlad", participating: true },
    { id: 3, name: "Vladislavs", participating: true },
    { id: 4, name: "Reinis", participating: true },
    { id: 5, name: "Helvijs", participating: true },
    { id: 6, name: "Zane", participating: true },
    { id: 7, name: "Diana", participating: true },
    { id: 8, name: "Sabine", participating: true },
    { id: 9, name: "Karina", participating: true },
    { id: 10, name: "Agnese", participating: false },
  ];

  const participating = users.filter((user) => user.participating);
  const notParticipating = users.filter((user) => !user.participating);

  return (
    <>
      <div className="container">
        <div
          className="draggable-place"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Not Participating</p>
          {notParticipating.map((user) => (
            <div
              className="draggable-item"
              id={user.id}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              tabIndex="0"
            >
              {user.name}
            </div>
          ))}
        </div>
        <div
          ref={rightDroppableRef}
          className="draggable-place"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Participating</p>
          {participating.map((user) => (
            <div
              className="draggable-item"
              id={user.id}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              tabIndex="0"
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>
      <div className="chooseButtonContainer">
        <button onClick={handleRandomSelection}>Select Leader</button>
        <p>Selected Leader: {selectedItem || "TBA"}</p>
      </div>
      {/* <div className="version-info">Version: 0.01</div>
      <div className="github-link">
        <a href="https://github.com/your-github-repo">
          <img src="github-icon.png" alt="GitHub" />
        </a>
      </div> */}
    </>
  );
};

export default DragAndDrop;
