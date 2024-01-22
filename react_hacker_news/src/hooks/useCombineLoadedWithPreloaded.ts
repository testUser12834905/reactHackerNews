import { Dispatch, SetStateAction, useEffect } from "react";
import { HackerNewsPostType } from "../api/getItems";

type props = {
  loaded: HackerNewsPostType[];
  preload: HackerNewsPostType[];
  length: number;
  setLoaded: Dispatch<SetStateAction<HackerNewsPostType[]>>;
};

const useCombineLoadedWithPreloaded = ({
  loaded,
  preload,
  length,
  setLoaded,
}: props) => {
  useEffect(() => {
    if (preload.length > 0 && preload.length + loaded.length <= length) {
      setLoaded([...loaded, ...preload]);
    }
  }, [loaded, preload, length, setLoaded]);
};

export default useCombineLoadedWithPreloaded;
