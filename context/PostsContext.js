import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../utils/storage";
import { getPosts, savePosts } from "../utils/storage";

// Create a global context so any component can access posts
export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  // Load user ID and posts when app starts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const user = await getUser();
        if (!user?.idNumber) return; // no user, exit
        setUserId(user.idNumber);

        const storedPosts = await getPosts(user.idNumber);
        if (storedPosts && Array.isArray(storedPosts)) {
          setPosts(storedPosts.sort((a, b) => b.id - a.id));
        }
      } catch (error) {
        console.log("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

  // Save updated posts to storage + state
  const saveUpdatedPosts = async (updatedPosts) => {
    try {
      if (!userId) return; // no user, cannot save
      await savePosts(userId, updatedPosts);
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error saving posts:", error);
    }
  };

  const addPost = async (post) => {
    const updatedPosts = [post, ...posts];
    await saveUpdatedPosts(updatedPosts);
  };

  const editPost = async (updatedPost) => {
    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    await saveUpdatedPosts(updatedPosts);
  };

  const deletePost = async (postId) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    await saveUpdatedPosts(updatedPosts);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
