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
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TeamMemberList;
