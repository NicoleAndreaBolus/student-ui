import React, { useState, useEffect } from 'react';

function StudentForm({ fetchStudents, API_URL, editingStudent, setEditingStudent }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [course, setCourse] = useState('');

  // If editingStudent changes, populate the form fields automatically!
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
    
    try {
      if (editingStudent) {
        // PART 6: Implement PUT Request (Update)
        await fetch(`${API_URL}/${editingStudent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstname, lastname, course })
        });
        setEditingStudent(null); // Clear editing state after update
      } else {
        // POST Request (Add new)
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstname, lastname, course })
        });
      }
      
      // Clear fields and refresh list
      setFirstname('');
      setLastname('');
      setCourse('');
      fetchStudents();

    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <div>
      <h2>{editingStudent ? 'Edit Student' : 'Add a New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstname} 
          onChange={(e) => setFirstname(e.target.value)} 
          required 
          style={{ marginRight: '5px', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastname} 
          onChange={(e) => setLastname(e.target.value)} 
          required 
          style={{ marginRight: '5px', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="Course" 
          value={course} 
          onChange={(e) => setCourse(e.target.value)} 
          required 
          style={{ marginRight: '5px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '6px 12px' }}>
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
        
        {/* Button to cancel editing */}
        {editingStudent && (
          <button 
            type="button" 
            onClick={() => setEditingStudent(null)} 
            style={{ marginLeft: '10px', padding: '6px 12px' }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default StudentForm;