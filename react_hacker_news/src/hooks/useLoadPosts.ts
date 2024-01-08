import { Dispatch, SetStateAction, useEffect } from "react";
import getItems, { HackerNewsReturnType } from "../api/getItems";

type props = {
  setLoaded: Dispatch<SetStateAction<HackerNewsReturnType[]>>;
  setPreload: Dispatch<SetStateAction<HackerNewsReturnType[]>>;
  IDs: number[];
};

const useLoadPosts = ({ setLoaded, setPreload, IDs }: props) => {
  useEffect(() => {
    const loadBuffer = 50;
    getItems(IDs.slice(0, loadBuffer)).then((fetchedPosts) => {
      setLoaded(fetchedPosts);
    });

    getItems(IDs.slice(loadBuffer)).then((fetchedPosts) => {
      setPreload(fetchedPosts);
    });
  }, [setLoaded, setPreload, IDs]);
};

export default useLoadPosts;
