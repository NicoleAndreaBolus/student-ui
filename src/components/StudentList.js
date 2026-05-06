import React from 'react';

function StudentList({ students, fetchStudents, API_URL, setEditingStudent }) {
  
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {students.map((student) => (
            <li key={student._id} style={{ marginBottom: '10px' }}>
              <strong>{student.firstname} {student.lastname}</strong> - {student.course}
              
              {/* PART 5: Add Edit Button */}
              <button 
                onClick={() => setEditingStudent(student)} 
                style={{ marginLeft: '15px', padding: '4px 8px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}>
                Edit
              </button>

              <button 
                onClick={() => handleDelete(student._id)} 
                style={{ marginLeft: '10px', padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;