import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { SavePostContext } from "../context";
import "./index.css";

const SavedPostCard = ({ postDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(postDetails.likes_count);
  const [isSaved, setIsSaved] = useState(true); // assume already saved
  const { setterFunction, removeFunction } = useContext(SavePostContext);
  const navigate = useNavigate();

  const handleToggleLike = async () => {
    const newStatus = !isLiked;
    try {
      await fetch(
        `https://apis.ccbp.in/insta-share/posts/${postDetails.post_id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("JWTTOKEN")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ like_status: newStatus }),
        }
      );
      setIsLiked(newStatus);
      setLikesCount((prev) => prev + (newStatus ? 1 : -1));
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const triggerUserProfile = (user_id) => {
    navigate(`/profile/${user_id}`);
  };

  return (
    <div className="savedPostCard">
      {/* User Info */}
      <div
        onClick={() => triggerUserProfile(postDetails.user_id)}
        className="personInfo"
      >
        <img src={postDetails.profile_pic} alt="profile" />
        <p>{postDetails.user_name}</p>
      </div>

      {/* Post Image */}
      <div className="postImg">
        <img src={postDetails.post_details.image_url} alt="post" />
      </div>

      {/* Interactions */}
      <div className="userInterActions">
        {/* Like icon (same as before) */}
        {isLiked ? (
          <svg
            width="24"
            onClick={handleToggleLike}
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.8784 11.7377C22.6672 12.395 22.3575 13.0165 21.96 13.5809C21.5567 14.1643 21.0712 14.6863 20.5185 15.1308L12.3546 21.7321C12.1472 21.9058 11.8852 22.0006 11.6147 22C11.3481 21.9959 11.0903 21.904 10.8812 21.7385L2.71732 15.1372C1.6126 14.2589 0.791665 13.0741 0.357431 11.7313C-0.075868 10.3637 -0.116048 8.90182 0.241443 7.51245C0.598933 6.12309 1.33971 4.86217 2.37929 3.87353C3.33951 2.96612 4.54226 2.35664 5.84183 2.11891C7.14141 1.88118 8.48205 2.02541 9.70131 2.53413C10.4392 2.85316 11.0939 3.33762 11.6147 3.95006C12.1338 3.33575 12.7889 2.85094 13.5282 2.53413C14.7507 2.02002 16.0964 1.87291 17.4012 2.11075C18.7059 2.34859 19.9132 2.9611 20.8757 3.87353C21.9131 4.86483 22.651 6.1278 23.0051 7.51832C23.3592 8.90885 23.3153 10.3709 22.8784 11.7377Z"
              fill="#F05161"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            onClick={handleToggleLike}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3586 4.47078L11.7297 3.7358C9.19911 1.2052 5.16344 1.37765 2.63284 3.90825C0.102245 6.43885 0.589265 11.3313 3.11986 13.8619C4.14693 14.889 5.68502 16.311 7.73414 18.1281L9.45804 19.6447L11.3943 21.3254C11.9274 21.7855 12.7151 21.7925 13.2564 21.342L14.8249 20.0269C17.5717 17.7055 19.6101 15.877 20.9399 14.5415L21.2851 14.1895L21.5951 13.8619C23.9518 11.3204 24.5575 6.37999 22.0858 3.90825L21.9067 3.7358C19.3652 1.37902 15.5327 1.26405 13.061 3.7358L12.3586 4.47078ZM3.65075 4.92588C5.6518 2.92483 8.74753 2.83101 10.6739 4.71663L12.2992 6.61613L14.1017 4.73012C15.9505 2.8818 18.8971 2.90852 20.9272 4.79108L21.0865 4.94487C22.8332 6.69187 22.5361 10.7284 20.5388 12.8822L20.2388 13.1991L19.906 13.5384C18.8035 14.6448 17.1697 16.1272 15.0155 17.9732L13.8951 18.9265L12.3348 20.2346L10.4017 18.5566L9.01808 17.3412C7.0685 15.6182 5.56453 14.24 4.51151 13.2121L4.13777 12.8431C2.05309 10.7584 1.79235 6.78428 3.65075 4.92588Z"
              fill="#F05161"
            />
          </svg>
        )}

        {/* Comment icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21.5268 6.02002C20.5447 4.77899 19.2106 3.7986 17.5246 3.07914C15.8387 2.35969 13.9971 2 12 2C10.003 2 8.16143 2.35969 6.47544 3.07914C4.78944 3.7986 3.4554 4.77881 2.47323 6.02002C1.49102 7.26115 1 8.61373 1 10.0779C1 11.34 1.37023 12.5226 2.111 13.6249C2.85176 14.7272 3.86446 15.6529 5.14957 16.4018C5.05944 16.7383 4.95306 17.0579 4.83025 17.3611C4.70748 17.664 4.59701 17.9123 4.4988 18.1059C4.4005 18.2993 4.26763 18.514 4.09972 18.7494C3.93206 18.9851 3.80521 19.1514 3.71925 19.2482C3.63338 19.345 3.49221 19.5046 3.29565 19.7278C3.09936 19.9506 2.97242 20.096 2.91519 20.1634C2.90689 20.1677 2.87421 20.2053 2.81693 20.2772C2.7597 20.3486 2.73097 20.3841 2.73097 20.3841L2.65732 20.4977C2.61634 20.5605 2.59793 20.6006 2.60197 20.6172C2.6061 20.6342 2.59793 20.6762 2.57746 20.7434C2.55695 20.8108 2.55906 20.8614 2.58357 20.895V20.9077C2.61634 21.0506 2.68174 21.1664 2.77995 21.2548C2.87816 21.3428 2.98885 21.387 3.11148 21.387H3.17293C3.70506 21.3195 4.17153 21.2273 4.5725 21.1094C6.71693 20.5457 8.59943 19.5275 10.2199 18.0548C10.8337 18.1221 11.4271 18.1557 11.9999 18.1557C13.997 18.1557 15.8386 17.7961 17.5246 17.0764C19.2105 16.3569 20.5446 15.3768 21.5267 14.1358C22.5089 12.8947 23 11.542 23 10.0778C23 8.61391 22.509 7.26115 21.5268 6.02002ZM20.1456 13.2966C19.2901 14.2893 18.1361 15.0783 16.6833 15.663C15.2306 16.2476 13.6693 16.5402 11.9997 16.5402C11.5005 16.5402 10.9686 16.5066 10.4039 16.4392L9.70407 16.3637L9.17615 16.8434C8.1696 17.7523 7.04411 18.4716 5.80007 19.0018C6.1765 18.3203 6.46297 17.5966 6.65948 16.831L6.99092 15.6192L5.92288 14.9883C4.85888 14.3652 4.0344 13.627 3.44908 12.7728C2.86385 11.9189 2.57136 11.0204 2.57136 10.0781C2.57136 8.92523 2.999 7.85245 3.85423 6.85951C4.70972 5.86666 5.86359 5.07775 7.31639 4.49295C8.7692 3.90811 10.3302 3.61545 12 3.61545C13.6696 3.61545 15.2306 3.90798 16.6833 4.49278C18.136 5.07762 19.29 5.86649 20.1456 6.85933C21.0008 7.85227 21.4284 8.92509 21.4284 10.0778C21.4284 11.2306 21.0008 12.3036 20.1456 13.2966Z"
            fill="#475569"
          />
        </svg>

        {/* Share Icon */}
        <img
          src="https://res.cloudinary.com/dez8wfcvn/image/upload/v1751694862/share_mvq6sm.png"
          alt="share"
        />

        {/* Bookmark toggle */}
        {isSaved ? (
          <FaBookmark
            style={{ cursor: "pointer" }}
            onClick={() => {
              removeFunction(postDetails);
              setIsSaved(false);
            }}
          />
        ) : (
          <FaRegBookmark
            style={{ cursor: "pointer" }}
            onClick={() => {
              setterFunction(postDetails);
              setIsSaved(true);
            }}
          />
        )}
      </div>

      {/* Post Details */}
      <div className="postrelateddetails">
        <p>{likesCount} likes</p>
        <p>{postDetails.post_details.caption}</p>
      </div>

      {/* Comments */}
      <div className="comments">
        {postDetails.comments.map((e) => (
          <p key={e.user_id}>
            <b>{e.user_name}</b> {e.comment}
          </p>
        ))}
      </div>

      {/* Timestamp */}
      <div className="post-time">
        <p>{postDetails.created_at}</p>
      </div>
    </div>
  );
};

export default SavedPostCard;
