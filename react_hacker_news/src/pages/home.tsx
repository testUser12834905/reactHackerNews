import { List } from "@mui/material";
import { useEffect, useState } from "react";
import getNewest from "../api/getNewest";
import getItems, { HackerNewsReturnType } from "../api/getItems";
import ListNewsItems from "../components/ListNewsItem";
import LoadSpinner from "../components/LoadSpinner";
import MyTablePagination from "../components/Pagination";
import convertPageInfo from "../components/utils/convertPageInfo";
import useGetNewestPosts from "../hooks/useGetNewestPosts";
import useLoadPosts from "../hooks/useLoadPosts";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myIDS, setIDs] = useState<number[]>([]);
  const [renderedPosts, setRenderedPosts] = useState<
    HackerNewsReturnType[] | []
  >([]);

  const [preloadPosts, setPreloadPosts] = useState<HackerNewsReturnType[] | []>(
    [],
  );
  const [loadedPosts, setLoadedPosts] = useState<HackerNewsReturnType[] | []>(
    [],
  );

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const [pageInfo, setPageInfo] = useState<[number, number]>([0, 10]);

  useGetNewestPosts({ setIDs: setIDs });

  useLoadPosts({
    setLoaded: setLoadedPosts,
    setPreload: setPreloadPosts,
    IDs: myIDS,
  });

  useEffect(() => {
    if (
      preloadPosts.length > 0 &&
      preloadPosts.length + loadedPosts.length <= myIDS.length
    ) {
      setPreloadPosts([...loadedPosts, ...preloadPosts]);
    }

    console.log("posst: ", preloadPosts);
  }, [loadedPosts, myIDS, preloadPosts]);

  // BUG: after page 50 if comments are opened this breaks
  useEffect(() => {
    if (loadedPosts.length !== 0) {
      setIsLoading(false);
    }
    if (preloadPosts.length > 0 && !isCommentsOpen) {
      setRenderedPosts(preloadPosts?.slice(...convertPageInfo(pageInfo)) || []);
      setIsLoading(false);
    } else {
      setRenderedPosts(loadedPosts?.slice(...convertPageInfo(pageInfo)) || []);
    }
  }, [pageInfo, preloadPosts, loadedPosts, isCommentsOpen]);

  return (
    <>
      <LoadSpinner isLoading={isLoading} />
      <List>
        {!isLoading &&
          renderedPosts?.map((post) => (
            <ListNewsItems
              postData={post}
              setIsCommentsOpen={setIsCommentsOpen}
            />
          ))}
      </List>
      <MyTablePagination
        setPageInfo={setPageInfo}
        maxLen={preloadPosts?.length || loadedPosts.length}
      />
    </>
  );
};

export default Home;
