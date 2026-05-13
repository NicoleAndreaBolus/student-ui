import React, { useState } from 'react';

function StudentList({ students, fetchStudents, API_URL, editingStudent, setEditingStudent, isLoading }) {
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const confirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      await fetchStudents();
      setStudentToDelete(null);
      
      if (editingStudent && editingStudent._id === id) {
        setEditingStudent(null);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getInitials = (first, last) => {
    return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="premium-card">
      <h2 className="section-title">Enrolled Students Database</h2>
      
      {isLoading ? (
        <div className="empty-state">
          <div className="spinner"></div>
          <p>Loading student records...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          {/* Professional Empty Database SVG Icon */}
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" style={{ marginBottom: '15px' }}>
            <path d="M22 12H2M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            <line x1="6" y1="16" x2="6.01" y2="16"></line>
            <line x1="10" y1="16" x2="14" y2="16"></line>
          </svg>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>No Records Found</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>There are currently no students registered in the system.</p>
        </div>
      ) : (
        <ul className="student-grid">
          {students.map((student) => (
            <li key={student._id} className="student-row">
              
              <div className="student-profile">
                <div className="avatar">
                  {getInitials(student.firstname, student.lastname)}
                </div>
                <div className="student-details">
                  <h3>{student.firstname} {student.lastname}</h3>
                  <span className="course-badge">{student.course}</span>
                </div>
              </div>
              
              <div className="action-buttons">
                {studentToDelete !== student._id ? (
                  <>
                    <button 
                      className="btn btn-warning"
                      onClick={() => {
                        setEditingStudent(student);
                        setStudentToDelete(null); 
                      }}>
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => setStudentToDelete(student._id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <div className="confirm-box">
                    <span className="confirm-text">Confirm Deletion?</span>
                    <button 
                      className="btn btn-danger"
                      disabled={isDeleting}
                      onClick={() => confirmDelete(student._id)}>
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <button 
                      className="btn btn-secondary"
                      disabled={isDeleting}
                      onClick={() => setStudentToDelete(null)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;