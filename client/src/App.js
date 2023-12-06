import React, { useState, useEffect } from "react";

import {
  addTeamMember,
  removeTeamMember,
  fetchTeamMembers,
  addNote,
  getNotesForDate,
  deleteNote
} from "./utils/api";

import TeamMemberForm from "./components/TeamMemberForm";
import TeamMemberList from "./components/TeamMemberList";
import SpeakerSelection from "./components/SpeakerSelection";

const App = () => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [history, setHistory] = useState({});

  const [currentDate, setCurrentDate] = useState(getTodayDate());

  const [selectedSpeaker, setSelectedSpeaker] = useState("");
  const [notes, setNotes] = useState("");
  const [nextSpeaker, setNextSpeaker] = useState("");

  const [teamMembers, setTeamMembers] = useState([]);

  const [newTeamMemberName, setNewTeamMemberName] = useState("");

  const handleAddTeamMember = async (newTeamMemberName) => {
    if (newTeamMemberName) {
      try {
        const addedTeamMember = await addTeamMember(newTeamMemberName);
        setTeamMembers((prevMembers) => [
          ...prevMembers,
          { id: addedTeamMember.id, name: addedTeamMember.name },
        ]);
      } catch (error) {
        console.error("Error adding team member:", error);
      }
    }
  };

  const handleRemoveTeamMember = async (userId) => {
    const success = await removeTeamMember(userId);
    if (success) {
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== userId)
      );
    } else {
      // Handle the error case (e.g., show a notification to the user)
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      try {
        const members = await fetchTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error("Error initializing team members:", error);
      }
    };

    initFetch();
  }, []);



  useEffect(() => {
    // Check if the history object is not empty
    if (Object.keys(history).length > 0) {
      localStorage.setItem("speakerHistory", JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotesForDate(currentDate);
        setHistory(prevHistory => ({
          ...prevHistory,
          [currentDate]: notesData
        }));
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [currentDate]); // Re-fetch notes whenever the date changes


  const changeDate = (newDate) => {
    setCurrentDate(newDate);
  };

  const addDaysToDate = (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => addDaysToDate(prevDate, -1));
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => addDaysToDate(prevDate, 1));
  };

  const handleSpeakerChange = (e) => {
    setSelectedSpeaker(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const submitSpeaker = async () => {
    try {
      // Add note to the database
      await addNote(currentDate, selectedSpeaker, notes);
      // Fetch and update the notes for the current date
      const updatedNotes = await getNotesForDate(currentDate);
      setHistory(prevHistory => ({
        ...prevHistory,
        [currentDate]: updatedNotes
      }));
      setSelectedSpeaker("");
      setNotes("");
    } catch (error) {
      console.error("Error submitting speaker:", error);
    }
  };

  const calculateNextSpeaker = (newHistory) => {
    // Add logic to calculate the next speaker based on newHistory
    // Set the result to setNextSpeaker
  };

  const deleteEntry = (date, index) => {
    const updatedEntries = history[date].filter((_, i) => i !== index);
    setHistory({ ...history, [date]: updatedEntries });
  };

  // In App.js

const handleDeleteNote = async (noteId) => {
  const success = await deleteNote(noteId);
  if (success) {
    // Update the local state to reflect the deletion
    // Assuming `history` state holds the notes, you need to filter out the deleted note
    setHistory(prevHistory => {
      const updatedHistory = { ...prevHistory };
      updatedHistory[currentDate] = updatedHistory[currentDate].filter(note => note.id !== noteId);
      return updatedHistory;
    });
  } else {
    // Handle unsuccessful deletion, like showing an error message
  }
};


  const moveEntry = (date, index, direction) => {
    const entries = [...history[date]];
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === entries.length - 1)
    ) {
      return; // Can't move outside of array bounds
    }
    const itemToMove = entries[index];
    entries.splice(index, 1); // Remove the item from its original position
    entries.splice(direction === "up" ? index - 1 : index + 1, 0, itemToMove); // Insert it at the new position
    setHistory({ ...history, [date]: entries });
  };

  const updateNote = (date, index, newNote) => {
    const updatedEntries = [...history[date]];
    updatedEntries[index].notes = newNote;
    setHistory({ ...history, [date]: updatedEntries });
  };

  return (
    <div>
      <div>
        <TeamMemberForm onAddTeamMember={handleAddTeamMember} />

        <TeamMemberList
          teamMembers={teamMembers}
          onRemoveTeamMember={handleRemoveTeamMember}
        />
      </div>

      <div>
        <SpeakerSelection
          teamMembers={teamMembers}
          selectedSpeaker={selectedSpeaker}
          onSpeakerChange={handleSpeakerChange}
        />

        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Enter notes"
        ></textarea>
        {!notes.trim() && <p className="error">Please enter a note.</p>}

        <button
          onClick={submitSpeaker}
          disabled={!selectedSpeaker || !notes.trim()}
        >
          Submit
        </button>
      </div>
      <div>Next Speaker: {nextSpeaker}</div>
      <div>
        <h3>History</h3>

        <div>
          <button onClick={handlePreviousDay}>Previous Day</button>
          <button onClick={() => setCurrentDate(getTodayDate())}>Today</button>
          <button onClick={handleNextDay}>Next Day</button>

          <h3>History for {currentDate}</h3>
          <ul data-testid="notes-history">
          {history[currentDate]?.map((entry, index) => (
            <li key={index}>
              <strong>{entry.TeamMember.name}</strong>: {entry.content}
              <textarea
                defaultValue={entry.content}
                onBlur={(e) => updateNote(currentDate, index, e.target.value)}
              />
<button onClick={() => handleDeleteNote(entry.id)}>Delete Note</button>
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
         
        </div>
      </div>
    </div>
  );
};

export default App;
