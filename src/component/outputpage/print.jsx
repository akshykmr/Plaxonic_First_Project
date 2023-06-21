import React, { useState, useEffect } from 'react';

const Print = ({ msg }) => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem('updates');
    if (storedList) {
      setUpdates(JSON.parse(storedList));
      console.log(storedList)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('updates', JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    if (msg) {
      setUpdates(prevUpdates => [...prevUpdates, msg]);
    }
    
  }, [msg]);

  return (
    <div>
      <p>Third component output:</p>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>{JSON.stringify(update)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Print;
