import InputBox from "./InputBox";
import Posts from "./Posts";
import Stories from "./Stories";

const Feed = ({ posts }) => {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 xl:mr-40 overflow-y-auto scrollbar-hide mr-7">
      <div>
        {/* stories */}
        <Stories />
        {/* Inputbox */}
        <InputBox />
        {/* Posts */}
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Feed;
