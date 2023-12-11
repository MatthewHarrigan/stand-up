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
      <label class="block">
        <span class="block text-sm font-medium text-slate-700">Username</span>
      <input
        type="text"
        value={newTeamMemberName}
        onChange={(e) => setNewTeamMemberName(e.target.value)}
        placeholder="Enter new team member's name"
        class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
      />
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Team Member</button>
      </label>
     
    </form>
  );
};

export default TeamMemberForm;
