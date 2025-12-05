import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../utils/storage";
import { getPosts, savePosts } from "../utils/storage";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserPosts = async () => {
      const user = await getUser();
      if (!user?.idNumber) return;

      setUserId(user.idNumber);
      const storedPosts = await getPosts(user.idNumber);
      setPosts(storedPosts.sort((a, b) => b.id - a.id));
    };
    loadUserPosts();
  }, []);

  const saveUpdatedPosts = async (updatedPosts) => {
    if (!userId) return;
    setPosts(updatedPosts);
    await savePosts(userId, updatedPosts);
  };

  const addPost = async (post) => {
    const updatedPosts = [post, ...posts];
    await saveUpdatedPosts(updatedPosts);
  };

  const editPost = async (updatedPost) => {
    const updatedPosts = posts.map(p => (p.id === updatedPost.id ? updatedPost : p));
    await saveUpdatedPosts(updatedPosts);
  };

  const deletePost = async (postId) => {
    const updatedPosts = posts.filter(p => p.id !== postId);
    await saveUpdatedPosts(updatedPosts);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
