import React, { useState, useEffect } from 'react';
import './App.css'; 
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // NEW: Track page loading
  
  const API_URL = 'http://localhost:3000/api/students';

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderBottom: '1px solid var(--border)', 
        padding: '16px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: '8px' }}></div>
          <h1 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '700', letterSpacing: '-0.5px' }}>
            Student Management System
          </h1>
        </div>
        <div style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-muted)', 
          fontWeight: '600', 
          backgroundColor: '#f1f5f9', 
          padding: '6px 12px', 
          borderRadius: '20px',
          border: '1px solid #e2e8f0'
        }}>
          Administrator Portal
        </div>
      </header>

      <main className="app-container" style={{ marginTop: '40px', flex: 1, width: '100%' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-main)', fontWeight: '700' }}>
            Dashboard Overview
          </h2>
          <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage student enrollments, update academic records, and monitor system data.
          </p>
        </div>

        <StudentForm 
          fetchStudents={fetchStudents} 
          API_URL={API_URL} 
          editingStudent={editingStudent} 
          setEditingStudent={setEditingStudent} 
        />
        
        <StudentList 
          students={students} 
          fetchStudents={fetchStudents} 
          API_URL={API_URL} 
          editingStudent={editingStudent} 
          setEditingStudent={setEditingStudent} 
          isLoading={isLoading} // Passed down
        />
        
      </main>
    </div>
  );
}

export default App;