import React, { createContext, useContext, useState } from 'react';
import { mockPosts } from '../data/mock-data';

/**
 * PostsContext - 게시물 목록을 앱 전체에서 공유하기 위한 Context
 *
 * usePosts()가 반환하는 값:
 *   - posts      : 현재 게시물 배열
 *   - addPost    : 새 게시물 추가
 *   - updatePost : 기존 게시물 수정
 *   - deletePost : 게시물 삭제
 *
 * Example usage:
 *   const { posts, addPost, updatePost, deletePost } = usePosts();
 */

const PostsContext = createContext(null);

/**
 * PostsProvider 컴포넌트
 * App.jsx에서 전체 앱을 감싸면 하위 어디서든 사용할 수 있습니다.
 *
 * @param {React.ReactNode} children - 하위 컴포넌트
 */
export function PostsProvider({ children }) {
  /** 게시물 목록 state - 초기값은 mock-data의 기존 게시물 */
  const [posts, setPosts] = useState(mockPosts);

  /**
   * 새 게시물 추가
   * @param {object} newPost - 새로 작성된 게시물 객체
   */
  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  /**
   * 기존 게시물 수정
   * id가 일치하는 게시물을 updatedPost로 교체합니다.
   * @param {object} updatedPost - 수정된 게시물 객체 (id 포함)
   */
  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  /**
   * 게시물 삭제
   * id가 일치하는 게시물을 목록에서 제거합니다.
   * @param {number} postId - 삭제할 게시물 id
   */
  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      { children }
    </PostsContext.Provider>
  );
}

/**
 * usePosts 커스텀 훅
 * @returns {{ posts: Array, addPost: Function, updatePost: Function, deletePost: Function }}
 */
export function usePosts() {
  return useContext(PostsContext);
}
