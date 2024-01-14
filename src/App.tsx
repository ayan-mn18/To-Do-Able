import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KanbanBoard from './Components/KanbanBoard'
import SignupPage from './Components/SignUp';
import LoginPage from './Components/LoginPage';
import Modal from './Components/Modal';
import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
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
            element={<LoginPage openModal={openModal}/>}
          />
        </Routes>
      </Router>
      <Modal isOpen={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  )
}

export default App
