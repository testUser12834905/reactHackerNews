import { Dispatch, SetStateAction, useEffect } from "react";
import getItems, { HackerNewsPostType } from "../api/getItems";

type props = {
  setLoaded: Dispatch<SetStateAction<HackerNewsPostType[]>>;
  setPreload: Dispatch<SetStateAction<HackerNewsPostType[]>>;
  IDs: number[];
};

const useLoadPostsWithPreload = ({ setLoaded, setPreload, IDs }: props) => {
  const loadBuffer = 50;
  useEffect(() => {
    getItems<HackerNewsPostType>(IDs.slice(0, loadBuffer)).then(
      (fetchedPosts) => {
        setLoaded(fetchedPosts);
      },
    );

    getItems<HackerNewsPostType>(IDs.slice(loadBuffer)).then((fetchedPosts) => {
      setPreload(fetchedPosts);
    });
  }, [setLoaded, setPreload, IDs]);
};

export default useLoadPostsWithPreload;
