import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/components/Layout.jsx';
import ErrorPage from "./pages/ErrorPage.jsx"
const App = () => (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} errorElement={<ErrorPage />} />
      </Routes>
    </Router>
);

export default App;
