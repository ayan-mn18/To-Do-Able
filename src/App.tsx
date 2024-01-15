import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KanbanBoard from './Components/KanbanBoard'
import SignupPage from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Modal from './Components/Modal';
import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  console.log("IsloggedIn: ", isLoggedIn)
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
          <Route path="/kanban" element={<KanbanBoard setIsLoggedIn={setIsLoggedIn} />} />
          <Route 
            path="/signup" 
            element={isLoggedIn ? <Navigate to="/kanban" /> :<SignupPage openModal={openModal} />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/kanban" /> :<LoginPage setIsLoggedIn={setIsLoggedIn} openModal={openModal}/>}
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
