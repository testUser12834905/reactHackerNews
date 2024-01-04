import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import getNewest from "../api/getNewest";
import getPosts, { HackerNewsStory } from "../api/getPosts";
import MyTablePagination from "./pagination";
import convertPageInfo from "./utils/convertPageInfo";

const Home = () => {
  const [myIDS, setMyIDS] = useState<number[]>([]);
  const [posts, setPosts] = useState<HackerNewsStory[] | null>(null);
  const [renderedPosts, setRenderedPosts] = useState<HackerNewsStory[] | []>(
    [],
  );

  const [pageInfo, setPageInfo] = useState<[number, number]>([0, 10]);

  useEffect(() => {
    getNewest().then((data) => setMyIDS(data));
  }, []);

  useEffect(() => {
    getPosts(myIDS.slice(0, 10)).then((fetchedPosts) => {
      fetchedPosts ? setRenderedPosts(fetchedPosts) : setRenderedPosts([]);
    });
  }, [myIDS]);

  useEffect(() => {
    getPosts(myIDS).then((fetchedPosts) => {
      const fetchedPostsData = fetchedPosts ? fetchedPosts : [];
      setPosts(fetchedPostsData);
    });
  }, [myIDS]);

  useEffect(() => {
    console.log("posst: ", posts);
  }, [posts]);

  useEffect(() => {
    setRenderedPosts(posts?.slice(...convertPageInfo(pageInfo)) || []);
    console.log("posts: ", posts);
    console.log("rendered p: ", renderedPosts);
  }, [pageInfo]);

  return (
    <>
      <List>
        {renderedPosts?.map((post) => (
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
      <MyTablePagination
        setPageInfo={setPageInfo}
        maxLen={posts?.length || renderedPosts.length}
      />
    </>
  );
};

export default Home;
