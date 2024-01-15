import { List } from "@mui/material";
import { useEffect, useState } from "react";
import getNewest from "../api/getNewest";
import getItems, { HackerNewsReturnType } from "../api/getItems";
import ListNewsItems from "../components/ListNewsItem";
import LoadSpinner from "../components/LoadSpinner";
import MyTablePagination from "../components/Pagination";
import paginationRules from "../components/utils/convertPageInfo";
import useGetNewestPosts from "../hooks/useGetNewestPosts";
import useLoadPostsWithPreload from "../hooks/useLoadPosts";
import useCombineLoadedWithPreloaded from "../hooks/useCombineLoadedWithPreloaded";
import usePagination from "@mui/material/usePagination/usePagination";
import useSetVisible from "../hooks/usePagination";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postIDs, setPostIDs] = useState<number[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<HackerNewsReturnType[] | []>(
    [],
  );

  const [preloadPosts, setPreloadPosts] = useState<HackerNewsReturnType[] | []>(
    [],
  );
  const [loadedPosts, setLoadedPosts] = useState<HackerNewsReturnType[] | []>(
    [],
  );

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
