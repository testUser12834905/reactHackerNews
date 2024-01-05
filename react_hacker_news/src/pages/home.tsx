import { List } from "@mui/material";
import { useEffect, useState } from "react";
import getNewest from "../api/getNewest";
import getItems, { HackerNewsReturnType } from "../api/getItems";
import ListNewsItems from "../components/ListNewsItem";
import LoadSpinner from "../components/LoadSpinner";
import MyTablePagination from "../components/Pagination";
import convertPageInfo from "../components/utils/convertPageInfo";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myIDS, setMyIDS] = useState<number[]>([]);
  const [posts, setPosts] = useState<HackerNewsReturnType[] | []>([]);
  const [renderedPosts, setRenderedPosts] = useState<
    HackerNewsReturnType[] | []
  >([]);

  const [bufferPosts, setBufferPosts] = useState<HackerNewsReturnType[] | []>(
    [],
  );

  const [pageInfo, setPageInfo] = useState<[number, number]>([0, 10]);

  useEffect(() => {
    getNewest().then((data) => setMyIDS(data));
  }, []);

  const loadBuffer = 50;
  useEffect(() => {
    getItems(myIDS.slice(0, loadBuffer)).then((fetchedPosts) => {
      setBufferPosts(fetchedPosts);
    });

    getItems(myIDS.slice(loadBuffer)).then((fetchedPosts) => {
      setPosts(fetchedPosts);
    });
  }, [myIDS]);

  useEffect(() => {
    if (posts.length > 0 && posts.length + bufferPosts.length <= myIDS.length) {
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
