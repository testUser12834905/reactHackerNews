import { Dispatch, SetStateAction, useEffect } from "react";
import { HackerNewsPostType } from "../api/getItems";
import paginationRules from "../components/utils/convertPageInfo";

type props = {
  loaded: HackerNewsPostType[];
  preload: HackerNewsPostType[];
  isCommentsOpen: boolean;
  pageInfo: [number, number];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setVisible: Dispatch<SetStateAction<HackerNewsPostType[]>>;
};
const useSetVisible = ({
  loaded,
  preload,
  isCommentsOpen,
  pageInfo,
  setIsLoading,
  setVisible,
}: props) => {
  // BUG: after page 50 if comments are opened this breaks
  useEffect(() => {
    if (loaded.length !== 0) {
      setIsLoading(false);
    }

    setVisible(loaded?.slice(...paginationRules(pageInfo)) || []);

    return () => {
      setIsLoading(true);
    };
  }, [loaded, preload, pageInfo, isCommentsOpen, setVisible, setIsLoading]);
};

export default useSetVisible;
