import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  
  //Add new React state for editing
  const [editingStudent, setEditingStudent] = useState(null);
  
  const API_URL = 'http://localhost:3000/api/students';

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Student Management System</h1>
      
      {/*Pass editingStudent and setEditingStudent to StudentForm */}
      <StudentForm 
        fetchStudents={fetchStudents} 
        API_URL={API_URL} 
        editingStudent={editingStudent} 
        setEditingStudent={setEditingStudent} 
      />
      
      <hr style={{ margin: '20px 0' }} />
      
      {/* PART 4: Pass setEditingStudent to StudentList */}
      <StudentList 
        students={students} 
        fetchStudents={fetchStudents} 
        API_URL={API_URL} 
        setEditingStudent={setEditingStudent} 
      />
    </div>
  );
}

export default App;