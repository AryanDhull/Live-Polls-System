import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const KickStudent = () => {
  const [studentId, setStudentId] = useState('');

  const handleKick = () => {
    if (studentId) {
      socket.emit('kickStudent', studentId);
      setStudentId('');
    }
  };

  return (
    <div>
      <h3>Kick a Student</h3>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Enter student ID"
      />
      <button onClick={handleKick}>Kick Student</button>
    </div>
  );
};

export default KickStudent;
