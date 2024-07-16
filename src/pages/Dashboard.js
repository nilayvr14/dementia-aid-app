import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { usePatients } from '../context/PatientContext';
import VoiceRecognitionComponent from '../components/VoiceRecognition';

const Dashboard = () => {
  const { role } = useRole();
  const { patients, addReminder } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const personName = role === 'patient' ? (selectedPatient ? selectedPatient.name : 'buddy') : role;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {personName}!</p>
      {role === 'caretaker' && (
        <div>
          <p>Select a patient to manage their reminders.</p>
          {patients.map(patient => (
            <button key={patient.id} onClick={() => setSelectedPatient(patient)}>
              {patient.name}
            </button>
          ))}
          {selectedPatient && (
            <div>
              <h2>Reminders for {selectedPatient.name}</h2>
              <ul>
                {selectedPatient.reminders.map(reminder => (
                  <li key={reminder.id}>{reminder.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {role === 'patient' && selectedPatient && (
        <div>
          <VoiceRecognitionComponent 
            patient={selectedPatient}
            addReminder={(reminder) => addReminder(selectedPatient.id, reminder)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
