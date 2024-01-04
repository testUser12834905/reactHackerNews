import { useEffect, useState } from "react";
import getNewest from "../api/getNewest";
import getPosts, { HackerNewsStory } from "../api/getPost";

const Home = () => {
  const [myIDS, setMyIDS] = useState<number[]>([]);
  const [posts, setPosts] = useState<HackerNewsStory[] | null>(null);

  useEffect(() => {
    getNewest().then((data) => setMyIDS(data));
  }, []);

  useEffect(() => {
    getPosts(myIDS.slice(0, 10)).then((fetchedPosts) => setPosts(fetchedPosts));
  }, [myIDS]);

  return (
    <ul style={{ color: "black" }}>
      {posts?.map((post) => (
        <li key={post.id}>
          <p>{post.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default Home;
