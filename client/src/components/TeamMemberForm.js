import React, { useState } from "react";

const TeamMemberForm = ({ onAddTeamMember }) => {
  const [newTeamMemberName, setNewTeamMemberName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTeamMember(newTeamMemberName);
    setNewTeamMemberName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTeamMemberName}
        onChange={(e) => setNewTeamMemberName(e.target.value)}
        placeholder="Enter new team member's name"
      />
      <button type="submit">Add Team Member</button>
    </form>
  );
};

export default TeamMemberForm;
