import React, { createContext, useState, useEffect } from "react";
import { getPosts, savePosts } from "../utils/storage";

// Create a global context so any component can access posts
export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  // Global state that stores all posts in the app
  const [posts, setPosts] = useState([]);

  // ----------------------------------------------
  // LOAD POSTS FROM STORAGE WHEN APP STARTS
  // ----------------------------------------------
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Retrieve posts from persistent storage
        const storedPosts = await getPosts();

        // Ensure data exists and is an array
        if (storedPosts && Array.isArray(storedPosts)) {
          // Sort posts by newest first (higher ID assumed newer)
          const sortedPosts = storedPosts.sort((a, b) => b.id - a.id);

          // Set posts into global state
          setPosts(sortedPosts);
        }
      } catch (error) {
        console.log("Error loading posts:", error);
      }
    };

    // Run load function on mount
    loadPosts();
  }, []);

  // ----------------------------------------------
  // SAVE UPDATED POSTS TO STORAGE + STATE
  // (Reusable helper to avoid repeating logic)
  // ----------------------------------------------
  const saveUpdatedPosts = async (updatedPosts) => {
    try {
      // Save to persistent storage
      await savePosts(updatedPosts);

      // Update global state
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error saving posts:", error);
    }
  };

  // ----------------------------------------------
  // ADD A NEW POST (insert at top of list)
  // ----------------------------------------------
  const addPost = async (post) => {
    const updatedPosts = [post, ...posts];

    // Reuse helper to save + update state
    await saveUpdatedPosts(updatedPosts);
  };

  // ----------------------------------------------
  // EDIT EXISTING POST (replace item with same ID)
  // ----------------------------------------------
  const editPost = async (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );

    // Save changes
    await saveUpdatedPosts(updatedPosts);
  };

  // ----------------------------------------------
  // DELETE A POST BY ID
  // ----------------------------------------------
  const deletePost = async (postId) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);

    // Save after removal
    await saveUpdatedPosts(updatedPosts);
  };

  // ----------------------------------------------
  // PROVIDE POSTS + CRUD FUNCTIONS TO THE APP
  // ----------------------------------------------
  return (
    <PostsContext.Provider
      value={{ posts, addPost, editPost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
