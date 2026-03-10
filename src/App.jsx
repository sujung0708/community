import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <BrowserRouter basename='/SJAIWEB'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<PostListPage />} />
        <Route path='/post/:id' element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
