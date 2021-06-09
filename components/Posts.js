import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";

const Posts = ({ posts }) => {
  const [realtimePost, loading, error] = useCollection(
    db.collection("fc_posts").orderBy("timestamp", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  {
    loading && <h1>loading</h1>;
  }
  {
    error && <h1>{error}</h1>;
  }
  return (
    <div>
      {realtimePost
        ? realtimePost?.docs.map((post) => (
            <Post
              key={post.id}
              message={post.data().message}
              email={post.data().email}
              name={post.data().name}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              message={post.message}
              email={post.email}
              name={post.name}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))}
    </div>
  );
};
export default Posts;
