import { Dispatch, SetStateAction, useEffect } from "react";
import { HackerNewsReturnType } from "../api/getItems";

type props = {
  loaded: HackerNewsReturnType[];
  preload: HackerNewsReturnType[];
  length: number;
  setLoaded: Dispatch<SetStateAction<HackerNewsReturnType[]>>;
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
