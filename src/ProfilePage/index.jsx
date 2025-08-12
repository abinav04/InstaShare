import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import "./index.css";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const url = "https://apis.ccbp.in/insta-share/my-profile";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      } else {
        console.log("Failed to fetch Profile");
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="insta-profile-wrapper">
        {profile ? (
          <>
            <div className="insta-profile-header">
              <img
                src={profile.profile_pic}
                alt="Profile"
                className="insta-profile-image"
              />
              <div className="insta-profile-details">
                <h1 className="insta-profile-username">{profile.user_name}</h1>
                <div className="insta-profile-stats">
                  <p>
                    <strong>{profile.posts_count}</strong> posts
                  </p>
                  <p>
                    <strong>{profile.followers_count}</strong> followers
                  </p>
                  <p>
                    <strong>{profile.following_count}</strong> following
                  </p>
                </div>
                <h3 className="insta-profile-realname">{profile.user_name}</h3>
                <p className="insta-profile-bio">{profile.user_bio}</p>
              </div>
            </div>

            <div className="insta-story-list">
              {profile.stories.map((story) => (
                <img key={story.id} src={story.image} alt="story" />
              ))}
            </div>

            <hr />

            <div className="insta-posts-heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path
                  fillRule="evenodd"
                  d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Posts</span>
            </div>

            <div className="insta-posts-grid">
              {profile.posts.map((post) => (
                <img key={post.id} src={post.image} alt="post" />
              ))}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default Profile;
