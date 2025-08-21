
import { useContext } from "react";
import { SavePostContext } from "../context";
import SavedPostCard from "../SavedPostCard";

const SavedPostsPage = () => {
  const { savedPosts } = useContext(SavePostContext);

  return (
    <div>
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <SavedPostCard key={post.post_id} postDetails={post} />
        ))
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Saved Posts Will be Here</h1>
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage;
