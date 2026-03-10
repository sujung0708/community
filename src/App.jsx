import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';
import SavedPostsPage from './pages/SavedPostsPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';

/**
 * 전체 화면 이동 흐름
 *
 * /login         → 로그인 페이지
 * /signup        → 회원가입 페이지
 * /             → 커뮤니티 메인 (게시물 목록) ← 중심 허브
 * /post/:id     → 게시물 상세
 * /write        → 게시물 작성
 * /saved        → 저장한 게시물 목록
 * /profile      → 프로필 정보
 * /profile/edit → 프로필 수정
 *
 * PostsProvider: 게시물 목록 state를 앱 전체에서 공유 (Context API)
 */
function App() {
  return (
    <BrowserRouter basename='/community'>
      {/* PostsProvider로 감싸면 하위 모든 페이지에서 posts, addPost 사용 가능 */}
      <PostsProvider>
        <Routes>
          {/* 인증 */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          {/* 메인 허브 */}
          <Route path='/' element={<PostListPage />} />

          {/* 게시물 */}
          <Route path='/post/:id' element={<PostDetailPage />} />
          <Route path='/write' element={<PostWritePage />} />

          {/* 저장한 게시물 */}
          <Route path='/saved' element={<SavedPostsPage />} />

          {/* 프로필 */}
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/edit' element={<ProfileEditPage />} />
        </Routes>
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;
