import React, { useState } from 'react';

function StudentList({ students, fetchStudents, API_URL, setEditingStudent }) {
  // 1. Add state to track which student is currently marked for deletion
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  const confirmDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
      setStudentToDelete(null); // Reset after deleting
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
              
              {/* Only show Edit/Delete if this specific student is NOT being deleted */}
              {studentToDelete !== student._id ? (
                <>
                  <button 
                    onClick={() => setEditingStudent(student)} 
                    style={{ marginLeft: '15px', padding: '4px 8px', backgroundColor: '#ffc107', border: 'none', cursor: 'pointer' }}>
                    Edit
                  </button>

                  {/* 2. Change onClick to mark the student for deletion instead of deleting immediately */}
                  <button 
                    onClick={() => setStudentToDelete(student._id)} 
                    style={{ marginLeft: '10px', padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Delete
                  </button>
                </>
              ) : (
                /* 3. The Confirmation UI showing the Cancel button */
                <span style={{ marginLeft: '15px' }}>
                  <span style={{ color: 'red', marginRight: '10px' }}>Are you sure?</span>
                  <button 
                    onClick={() => confirmDelete(student._id)} 
                    style={{ padding: '4px 8px', backgroundColor: 'darkred', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' }}>
                    Yes, Delete
                  </button>
                  <button 
                    onClick={() => setStudentToDelete(null)} 
                    style={{ padding: '4px 8px', backgroundColor: 'gray', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;