import React, { useState } from "react";
import Markdown from "react-markdown";

import styled from "styled-components";
const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 1rem;
`;

const HistoryUL = styled.ul`
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;
`;

const HistoryLi = styled.li``;

const HistoryButtons = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const History = ({
  history,
  currentDate,
  updateNote,
  handleDeleteNote,
  moveEntry,
}) => {
  // State to track which entry is being edited
  const [editingIndex, setEditingIndex] = useState(null);

  // Function to toggle edit mode
  const toggleEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      const newContent = e.target.value;
      updateNote(currentDate, index, newContent); // Use the updateNote prop
      setEditingIndex(null); // Close the textarea
    }
  };

  const autoResizeTextArea = (event) => {
    const textArea = event.target;
    textArea.style.height = "auto"; // Reset the height
    textArea.style.height = textArea.scrollHeight + "px"; // Set to scroll height
  };

  return (
    <HistoryUL data-testid="notes-history">
      {history[currentDate]?.map((entry, index) => (
        <HistoryLi key={index}>
          <HistoryButtons>
            <strong>{entry.TeamMember.name} </strong>
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
          </HistoryButtons>
          {editingIndex === index ? (
            <StyledTextarea
              className="prose"
              autoFocus
              defaultValue={entry.content}
              onFocus={autoResizeTextArea}
              onChange={(e) => {
                updateNote(currentDate, index, e.target.value);
                autoResizeTextArea(e);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onBlur={(e) => {
                updateNote(currentDate, index, e.target.value);
                toggleEdit(index); // Close the textarea on blur
              }}
            />
          ) : (
            <span onClick={() => toggleEdit(index)}>
              <Markdown>{entry.content}</Markdown>
              {/* {entry.content} */}
            </span>
          )}
        </HistoryLi>
      ))}
    </HistoryUL>
  );
};

export default History;
