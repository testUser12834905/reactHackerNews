import Launch from "@mui/icons-material/Launch";
import {
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import getNewest from "../api/getNewest";
import getPosts, { HackerNewsStory } from "../api/getPosts";
import ListNewsItems from "../components/ListNewsItem";
import LoadSpinner from "../components/LoadSpinner";
import MyTablePagination from "../components/Pagination";
import convertPageInfo from "../components/utils/convertPageInfo";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myIDS, setMyIDS] = useState<number[]>([]);
  const [posts, setPosts] = useState<HackerNewsStory[] | []>([]);
  const [renderedPosts, setRenderedPosts] = useState<HackerNewsStory[] | []>(
    [],
  );

  const [bufferPosts, setBufferPosts] = useState<HackerNewsStory[] | []>([]);

  const [pageInfo, setPageInfo] = useState<[number, number]>([0, 10]);

  useEffect(() => {
    getNewest().then((data) => setMyIDS(data));
  }, []);

  const loadBuffer = 50;
  useEffect(() => {
    getPosts(myIDS.slice(0, loadBuffer)).then((fetchedPosts) => {
      setBufferPosts(fetchedPosts);
    });

    getPosts(myIDS.slice(loadBuffer)).then((fetchedPosts) => {
      setPosts(fetchedPosts);
      // appendToPosts(fetchedPosts);
    });
  }, [myIDS]);

  useEffect(() => {
    if (posts.length > 0 && posts.length + bufferPosts.length <= myIDS.length) {
      // const localPosts = posts;
      // const localRenderedPosts = renderedPosts;
      setPosts([...bufferPosts, ...posts]);
    }

    console.log("posst: ", posts);
  }, [bufferPosts, myIDS, posts]);

  useEffect(() => {
    if (bufferPosts.length !== 0) {
      setIsLoading(false);
    }
    if (posts.length > 0) {
      setIsLoading(false);
      setRenderedPosts(posts?.slice(...convertPageInfo(pageInfo)) || []);
    } else {
      setRenderedPosts(bufferPosts?.slice(...convertPageInfo(pageInfo)) || []);
    }
  }, [pageInfo, posts, bufferPosts]);

  return (
    <>
      <LoadSpinner isLoading={isLoading} />
      <List>
        {!isLoading &&
          renderedPosts?.map((post) => <ListNewsItems postData={post} />)}
      </List>
      <MyTablePagination
        setPageInfo={setPageInfo}
        maxLen={posts?.length || bufferPosts.length}
      />
    </>
  );
};

export default Home;
