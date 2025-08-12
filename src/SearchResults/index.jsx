import React from "react";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router";
function SearchResults() {
  const search = localStorage.getItem("searchVal");
  const [searchPosts, setsearchPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        `https://apis.ccbp.in/insta-share/posts?search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt_token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setsearchPosts(data.posts);
      } else {
        console.log("Failed to fetch posts");
      }
    };
    getPosts();
  }, []);
  return (
    <div className="posts-container">
      <Navbar />
      {searchPosts.map((post) => (
        <div className="post-card" key={post.post_id}>
          <div className="post-header">
            <Link to={`/profile/${post.user_id}`} className="user-link">
              <img src={post.profile_pic} alt={post.user_name} />
              <span>{post.user_name}</span>
            </Link>
          </div>

          <div className="post-image">
            <img src={post.post_details.image_url} alt="post" />
          </div>

          <div className="post-actions">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={post.liked ? "red" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon like-icon"
              onClick={() => handleLike(post.post_id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 6.251a5.754 5.754 0 00-9.398-1.193l-.854.868-.854-.868a5.754 5.754 0 00-9.398 1.193 
                   5.824 5.824 0 001.293 6.362l8.115 8.428a.75.75 0 001.086 0l8.115-8.428a5.824 
                   5.824 0 001.293-6.362z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon comment-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 
                   3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 
                   1.641a4.483 4.483 0 01-.923 1.785A5.969 
                   5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 
                   1.668.337 2.555.337z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon share-icon"
            >
              <path
                fillRule="evenodd"
                d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 
                   4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 
                   3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 
                   1 0-4.132l8.421-4.679a3 3 0 0 
                   1-.096-.755z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="post-content">
            <p className="likes">{post.likes_count} likes</p>
            <p>{post.post_details.caption}</p>
            {post.comments.map((each) => (
              <p className="comment" key={each.user_id}>
                <strong>{each.user_name}</strong> {each.comment}
              </p>
            ))}
            <p className="timestamp">{post.created_at}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
