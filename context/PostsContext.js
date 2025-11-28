import React, { createContext, useState, useEffect } from "react";
import { getPosts, savePosts } from "../utils/storage";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Load posts from storage on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const storedPosts = await getPosts();
        if (storedPosts && Array.isArray(storedPosts)) {
          // Sort newest first
          const sortedPosts = storedPosts.sort((a, b) => b.id - a.id);
          setPosts(sortedPosts);
        }
      } catch (error) {
        console.log("Error loading posts:", error);
      }
    };
    loadPosts();
  }, []);

  // Save posts to storage safely
  const saveUpdatedPosts = async (updatedPosts) => {
    try {
      await savePosts(updatedPosts);
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error saving posts:", error);
    }
  };

  // Add a post (newest first)
  const addPost = async (post) => {
    const updatedPosts = [post, ...posts];
    await saveUpdatedPosts(updatedPosts);
  };

  // Edit a post
  const editPost = async (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    await saveUpdatedPosts(updatedPosts);
  };

  // Delete a post
  const deletePost = async (postId) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    await saveUpdatedPosts(updatedPosts);
  };

  return (
    <PostsContext.Provider
      value={{ posts, addPost, editPost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
