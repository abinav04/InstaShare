import { createContext, useState } from 'react';

export const SavePostContext = createContext();

export function SavePostHelper({ children }) {
  const [savedPosts, setSavedPosts] = useState([]);

  const setterFunction = (post) => {
    const alreadySaved = savedPosts.some(
      (saved) => saved.post_id === post.post_id
    );
    if (!alreadySaved) {
      setSavedPosts([...savedPosts, post]);
    }
  };

  const removeFunction = (postToRemove) => {
    const filteredPosts = savedPosts.filter(
      (post) => post.post_id !== postToRemove.post_id
    );
    setSavedPosts(filteredPosts);
  };

  return (
    <SavePostContext.Provider
      value={{ savedPosts, setterFunction, removeFunction }}
    >
      {children}
    </SavePostContext.Provider>
  );
}
