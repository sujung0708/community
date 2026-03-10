import React, { createContext, useContext, useState } from 'react';
import { mockPosts } from '../data/mock-data';

/**
 * PostsContext - 게시물 목록을 앱 전체에서 공유하기 위한 Context
 *
 * 사용 방법:
 *   1. App.jsx에서 <PostsProvider>로 감싸기
 *   2. 필요한 컴포넌트에서 usePosts() 훅으로 꺼내 쓰기
 *
 * usePosts()가 반환하는 값:
 *   - posts    : 현재 게시물 배열 (최신순 정렬됨)
 *   - addPost  : 새 게시물을 추가하는 함수
 *
 * Example usage:
 *   const { posts, addPost } = usePosts();
 */

/** Context 객체 생성 */
const PostsContext = createContext(null);

/**
 * PostsProvider 컴포넌트
 * App.jsx에서 전체 앱을 감싸면 하위 어디서든 posts, addPost를 사용할 수 있습니다.
 *
 * @param {React.ReactNode} children - 하위 컴포넌트
 */
export function PostsProvider({ children }) {
  /** 게시물 목록 state - 초기값은 mock-data의 기존 게시물 */
  const [posts, setPosts] = useState(mockPosts);

  /**
   * 새 게시물 추가 함수
   * PostWritePage에서 작성 완료 시 호출합니다.
   *
   * @param {object} newPost - 새로 작성된 게시물 객체
   */
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      { children }
    </PostsContext.Provider>
  );
}

/**
 * usePosts 커스텀 훅
 * PostsContext의 값(posts, addPost)을 꺼내는 단축 훅입니다.
 *
 * @returns {{ posts: Array, addPost: Function }}
 */
export function usePosts() {
  return useContext(PostsContext);
}
