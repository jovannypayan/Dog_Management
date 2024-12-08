import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import AdoptionProcessPage from './pages/AdoptionProcessPage';
import DogList from './components/DogList';
import InsertDog from './components/InsertDog';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/medical-records" element={<MedicalRecordsPage />} />
        <Route path="/adoption-process" element={<AdoptionProcessPage />} />
        <Route path="/dogs" element={<DogList />} /> 
        <Route path="/insert-dog" element={<InsertDog />} />
      </Routes>
    </div>
  );
};

export default App;
