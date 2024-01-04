import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import getNewest from "../api/getNewest";
import getPosts, { HackerNewsStory } from "../api/getPost";
import MyTablePagination from "./pagination";
import convertPageInfo from "./utils/convertPageInfo";

const Home = () => {
  const [myIDS, setMyIDS] = useState<number[]>([]);
  const [posts, setPosts] = useState<HackerNewsStory[] | null>(null);
  const [pageInfo, setPageInfo] = useState<[number, number]>([0, 10]);

  useEffect(() => {
    getNewest().then((data) => setMyIDS(data));
  }, []);

  useEffect(() => {
    console.log("posts", posts);
  }, [posts]);

  useEffect(() => {
    getPosts(myIDS.slice(...pageInfo)).then((fetchedPosts) =>
      setPosts(fetchedPosts),
    );
  }, [myIDS, pageInfo]);

  return (
    <>
      <List>
        {posts?.map((post) => (
          <ListItem>
            <ListItemText
              primary={post.title}
              secondary={new Date(post.time * 1000).toLocaleString("en-GB")}
            />
            <a href={post.url} target="_blank" rel="noreferrer">
              click here
            </a>
          </ListItem>
        ))}
      </List>
      <MyTablePagination setPageInfo={setPageInfo} maxLen={myIDS.length} />
    </>
  );
};

export default Home;
