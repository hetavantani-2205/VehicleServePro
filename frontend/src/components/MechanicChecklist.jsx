import React, { useState } from 'react';

const MechanicChecklist = ({ serviceType, onJobComplete }) => {

  const defaultTasks = {
    "Oil Change": ["Drain Old Oil", "Replace Oil Filter", "Refill New Oil", "Check for Leaks"],
    "Brake Service": ["Remove Wheels", "Inspect Pads", "Clean Rotors", "Refill Brake Fluid"],
    "General Checkup": ["Check Battery", "Inspect Tyres", "Test Lights", "Scan Engine Codes"]
  };

  const tasks = defaultTasks[serviceType] || ["Inspect Vehicle", "Perform Repair", "Final Quality Test"];
  const [checkedItems, setCheckedItems] = useState({});

  const toggleTask = (task) => {
    setCheckedItems(prev => ({ ...prev, [task]: !prev[task] }));
  };

  const allDone = tasks.every(task => checkedItems[task]);

  return (
    <div style={styles.card}>
      <h3>📋 Job Card: {serviceType}</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>Complete all tasks to finish the job.</p>
      <hr />
      <div style={styles.taskList}>
        {tasks.map((task, index) => (
          <label key={index} style={styles.taskItem}>
            <input 
              type="checkbox" 
              checked={!!checkedItems[task]} 
              onChange={() => toggleTask(task)}
              style={styles.checkbox}
            />
            <span style={checkedItems[task] ? styles.strike : {}}>{task}</span>
          </label>
        ))}
      </div>
      {allDone && (
        <button onClick={onJobComplete} style={styles.completeBtn}>
          ✅ Mark Job as Finished
        </button>
      )}
    </div>
  );
};

const styles = {
  card: { background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginTop: "20px" },
  taskList: { display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" },
  taskItem: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "16px" },
  strike: { textDecoration: "line-through", color: "#888" },
  completeBtn: { width: "100%", padding: "12px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
  checkbox: { width: "18px", height: "18px" }
};

export default MechanicChecklist;