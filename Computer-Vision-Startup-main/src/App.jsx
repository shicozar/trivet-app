import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Upload from './components/Upload';

import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthPage from './components/AuthPage';
import PhotosPage from './components/PhotosPage';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/photos" element={<PhotosPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
