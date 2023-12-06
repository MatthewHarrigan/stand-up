import React from "react";

const History = ({ history, currentDate, updateNote, handleDeleteNote, moveEntry }) => {
  return (
    <ul data-testid="notes-history">
      {history[currentDate]?.map((entry, index) => (
        <li key={index}>
          <strong>{entry.TeamMember.name}</strong>: {entry.content}
          <textarea
            defaultValue={entry.content}
            onBlur={(e) => updateNote(currentDate, index, e.target.value)}
          />
          <button onClick={() => handleDeleteNote(entry.id)}>
            Delete Note
          </button>
          <button
            onClick={() => moveEntry(currentDate, index, "up")}
            disabled={history[currentDate].length <= 1}
          >
            Move Up
          </button>
          <button
            onClick={() => moveEntry(currentDate, index, "down")}
            disabled={history[currentDate].length <= 1}
          >
            Move Down
          </button>
        </li>
      ))}
    </ul>
  );
};

export default History;
