import React, { useState, useEffect } from 'react';

function StudentForm({ fetchStudents, API_URL, editingStudent, setEditingStudent }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [course, setCourse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW: Track submission

  useEffect(() => {
    if (editingStudent) {
      setFirstname(editingStudent.firstname);
      setLastname(editingStudent.lastname);
      setCourse(editingStudent.course);
    } else {
      setFirstname('');
      setLastname('');
      setCourse('');
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable buttons
    try {
      if (editingStudent) {
        await fetch(`${API_URL}/${editingStudent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstname, lastname, course })
        });
        setEditingStudent(null);
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstname, lastname, course })
        });
      }
      setFirstname('');
      setLastname('');
      setCourse('');
      await fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      setIsSubmitting(false); // Re-enable buttons
    }
  };

  return (
    <div className="premium-card">
      <h2 className="section-title">
        {editingStudent ? 'Edit Student Details' : 'Register New Student'}
      </h2>
      
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="input-group">
          <input 
            type="text" 
            className="modern-input"
            placeholder="First Name" 
            value={firstname} 
            onChange={(e) => setFirstname(e.target.value)} 
            disabled={isSubmitting}
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            className="modern-input"
            placeholder="Last Name" 
            value={lastname} 
            onChange={(e) => setLastname(e.target.value)} 
            disabled={isSubmitting}
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            className="modern-input"
            placeholder="Course (e.g., BSCS)" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            disabled={isSubmitting}
            required 
          />
        </div>
        
        <div className="action-buttons">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : (editingStudent ? 'Save Changes' : 'Add Student')}
          </button>
          
          {editingStudent && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setEditingStudent(null)}
              disabled={isSubmitting}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;