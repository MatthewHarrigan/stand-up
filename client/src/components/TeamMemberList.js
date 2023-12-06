import React from "react";

const TeamMemberList = ({ teamMembers, onRemoveTeamMember }) => {
  return (
    <ul>
      {teamMembers.map((member) => (
        <li key={member.id}>
          {member.name}
          <button onClick={() => onRemoveTeamMember(member.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default TeamMemberList;
