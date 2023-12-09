const API_BASE_URL = "http://localhost:3000";

export const addTeamMember = async (name) => {
  const response = await fetch(`${API_BASE_URL}/team-members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const removeTeamMember = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/team-members/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error removing team member:", error);
    return false;
  }
};

export const fetchTeamMembers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/team-members`); // Adjust the port and endpoint as necessary
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const teamMembers = await response.json();
    return teamMembers.map((member) => ({
      id: member.id,
      name: member.name,
    }));
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const addNote = async (date, speakerId, content) => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, speakerId, content })
  });
  return response.json();
};

export const getNotesForDate = async (date) => {
  const response = await fetch(`${API_BASE_URL}/notes/${date}`);
  return response.json();
};

export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
      method: 'DELETE',
      // Add headers if needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    return false;
  }
};

export const updateNote = async (noteId, updatedContent) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: 'PUT', // or 'PATCH' if your API supports partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: updatedContent })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Return the updated note or a success message as per your API response
  } catch (error) {
    console.error('Error updating note:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};
