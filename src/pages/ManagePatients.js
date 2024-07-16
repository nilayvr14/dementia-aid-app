import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext';

const ManagePatients = () => {
  const { patients, addPatient, addReminder, editReminder, deleteReminder } = usePatients();
  const [newPatientName, setNewPatientName] = useState('');
  const [newReminder, setNewReminder] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleAddPatient = () => {
    addPatient(newPatientName);
    setNewPatientName('');
  };

  const handleAddReminder = () => {
    if (selectedPatient) {
      addReminder(selectedPatient.id, { id: Date.now(), text: newReminder });
      setNewReminder('');
    }
  };

  const handleEditReminder = (patientId, reminderId) => {
    const newText = prompt('Enter new reminder text');
    if (newText) {
      editReminder(patientId, reminderId, { id: reminderId, text: newText });
    }
  };

  const handleDeleteReminder = (patientId, reminderId) => {
    deleteReminder(patientId, reminderId);
  };

  return (
    <div>
      <h1>Manage Patients</h1>
      <input
        type="text"
        value={newPatientName}
        onChange={(e) => setNewPatientName(e.target.value)}
        placeholder="New patient name"
      />
      <button onClick={handleAddPatient}>Add Patient</button>
      <div>
        {patients.map(patient => (
          <div key={patient.id}>
            <h2>{patient.name}</h2>
            <button onClick={() => setSelectedPatient(patient)}>Select</button>
            <ul>
              {patient.reminders.map(reminder => (
                <li key={reminder.id}>
                  {reminder.text}
                  <button onClick={() => handleEditReminder(patient.id, reminder.id)}>Edit</button>
                  <button onClick={() => handleDeleteReminder(patient.id, reminder.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {selectedPatient && (
        <div>
          <h3>Selected Patient: {selectedPatient.name}</h3>
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="New reminder"
          />
          <button onClick={handleAddReminder}>Add Reminder</button>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
