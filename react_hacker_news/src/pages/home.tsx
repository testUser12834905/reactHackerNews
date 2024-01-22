import { List } from "@mui/material";
import { useState } from "react";
import { HackerNewsPostType } from "../api/getItems";
import ListNewsItems from "../components/ListNewsItem";
import LoadSpinner from "../components/LoadSpinner";
import MyTablePagination from "../components/Pagination";
import useCombineLoadedWithPreloaded from "../hooks/useCombineLoadedWithPreloaded";
import useGetNewestPosts from "../hooks/useGetNewestPosts";
import useLoadPostsWithPreload from "../hooks/useLoadPosts";
import useSetVisible from "../hooks/usePagination";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postIDs, setPostIDs] = useState<number[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<HackerNewsPostType[] | []>(
    [],
  );

  const [preloadPosts, setPreloadPosts] = useState<HackerNewsPostType[] | []>(
    [],
  );
  const [loadedPosts, setLoadedPosts] = useState<HackerNewsPostType[] | []>([]);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const [pageInfo, setPageInfo] = useState<[number, number]>([0, 10]);

  useGetNewestPosts({ setIDs: setPostIDs });

  useLoadPostsWithPreload({
    setLoaded: setLoadedPosts,
    setPreload: setPreloadPosts,
    IDs: postIDs,
  });

  useCombineLoadedWithPreloaded({
    loaded: loadedPosts,
    preload: preloadPosts,
    setLoaded: setLoadedPosts,
    length: postIDs.length,
  });

  useSetVisible({
    loaded: loadedPosts,
    preload: preloadPosts,
    isCommentsOpen,
    pageInfo,
    setIsLoading,
    setVisible: setVisiblePosts,
  });

  return (
    <>
      <LoadSpinner isLoading={isLoading} />
      <List>
        {!isLoading &&
          visiblePosts?.map((post) => (
            <ListNewsItems
              postData={post}
              setIsCommentsOpen={setIsCommentsOpen}
            />
          ))}
      </List>
      <MyTablePagination
        setPageInfo={setPageInfo}
        maxLen={loadedPosts.length}
      />
    </>
  );
};

export default Home;
