import React, { createContext, useState, useContext } from 'react';

const PatientContext = createContext();

export const usePatients = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const addPatient = (name) => {
    setPatients([...patients, { id: Date.now(), name, reminders: [] }]);
  };

  const addReminder = (patientId, reminder) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, reminders: [...patient.reminders, reminder] } : patient
    ));
  };

  const editReminder = (patientId, reminderId, newReminder) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? {
        ...patient, reminders: patient.reminders.map(r => r.id === reminderId ? newReminder : r)
      } : patient
    ));
  };

  const deleteReminder = (patientId, reminderId) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? {
        ...patient, reminders: patient.reminders.filter(r => r.id !== reminderId)
      } : patient
    ));
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, addReminder, editReminder, deleteReminder }}>
      {children}
    </PatientContext.Provider>
  );
};
