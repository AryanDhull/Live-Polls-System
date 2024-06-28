import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

function PastPolls() {
  const [pastPolls, setPastPolls] = useState([]);

  useEffect(() => {
    console.log('PastPolls: Mounted and requesting past polls');
    socket.emit('requestPastPolls');
    
    socket.on('pastPolls', (polls) => {
      console.log('PastPolls: Received past polls', polls);
      setPastPolls(polls);
    });

    return () => {
      console.log('PastPolls: Unmounting and cleaning up socket listeners');
      socket.off('pastPolls');
    };
  }, []);

  return (
    <div style={{ maxWidth: 'calc(100% - 2rem)', margin: 'auto', padding: '1rem', border: '1px solid black' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Past Polls</h1>
      {pastPolls.length === 0 ? (
        <p style={{ color: '#718096' }}>No past polls available</p>
      ) : (
        <ul style={{ borderTop: '1px solid black', borderBottom: '1px solid black', padding: '0.75rem 0' }}>
          {pastPolls.map((poll, index) => (
            <li key={index} style={{ borderBottom: '1px solid black', padding: '1rem 0' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{poll.question}</h2>
              <ul style={{ paddingLeft: '1rem' }}>
                {poll.options.map((option, optIndex) => (
                  <li key={optIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ marginRight: '0.5rem' }}>{option.text}</span>
                    <span style={{ color: '#718096' }}>
                      - {poll.results && poll.results[optIndex] !== undefined ? poll.results[optIndex] : 0} votes
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PastPolls;
