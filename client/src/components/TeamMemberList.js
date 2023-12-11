import React from "react";

const TeamMemberList = ({ teamMembers, onRemoveTeamMember }) => {
  return (
    <ul data-testid="team-members">
      {teamMembers.map((member) => (
        <li key={member.id}>
          {member.name} 
          <button
            onClick={() => onRemoveTeamMember(member.id)}
            // data-testid={`remove-button-${member.id}`}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TeamMemberList;
