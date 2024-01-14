import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KanbanBoard from './Components/KanbanBoard'
import SignupPage from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Modal from './Components/Modal';
import React, { useState } from 'react';
import localStorageService from './Services/localStorageServices';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const userLoggedIn = localStorageService.isLoggedIn();
  console.log("IsloggedIn: ", userLoggedIn)
  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
  };
  return (
    <>
       <Router>
        <Routes>
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/login"
            element={userLoggedIn ? <Navigate to="/kanban" /> :<LoginPage openModal={openModal}/>}
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
      <Modal isOpen={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  )
}

export default App
