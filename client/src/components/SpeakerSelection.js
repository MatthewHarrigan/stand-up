import React from "react";

const SpeakerSelection = ({
  teamMembers,
  selectedSpeaker,
  onSpeakerChange,
}) => {
  return (
    <div>
      <select value={selectedSpeaker} onChange={onSpeakerChange}>
        <option value="">Select Speaker</option>
        {teamMembers.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
      {/* {!selectedSpeaker && <p className="error">Please select a speaker.</p>} */}
    </div>
  );
};

export default SpeakerSelection;
