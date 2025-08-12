import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import "./index.css";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const getUserProfile = async () => {
      const url = `https://apis.ccbp.in/insta-share/users/${userId}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.user_details);
      } else {
        console.log("Failed to fetch user profile");
      }
    };
    getUserProfile();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {userProfile ? (
          <>
            <div className="profile-header">
              <img
                src={userProfile.profile_pic}
                alt="Profile"
                className="profile-image"
              />
              <div className="profile-info">
                <h1 className="profile-username">{userProfile.user_name}</h1>
                <div className="profile-stats">
                  <p>
                    <strong>{userProfile.posts_count}</strong> posts
                  </p>
                  <p>
                    <strong>{userProfile.followers_count}</strong> followers
                  </p>
                  <p>
                    <strong>{userProfile.following_count}</strong> following
                  </p>
                </div>
                <h3 className="profile-realname">{userProfile.user_name}</h3>
                <p className="profile-bio">{userProfile.user_bio}</p>
              </div>
            </div>

            <div className="story-list">
              {userProfile.stories.map((story) => (
                <img
                  key={story.id}
                  src={story.image}
                  alt="story"
                  className="story-circle"
                />
              ))}
            </div>

            <hr className="divider" />

            <div className="posts-heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Posts</span>
            </div>

            <div className="posts-grid">
              {userProfile.posts.map((post) => (
                <img
                  key={post.id}
                  src={post.image}
                  alt="post"
                  className="post-image"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="loading-text">Loading...</div>
        )}
      </div>
    </>
  );
}

export default UserProfile;
