import { Dispatch, SetStateAction, useEffect } from "react";
import getNewest from "../api/getNewest";

type props = {
  setIDs: Dispatch<SetStateAction<number[]>>;
};
const useGetNewestPosts = ({ setIDs }: props) => {
  useEffect(() => {
    getNewest().then((data) => setIDs(data));
  }, [setIDs]);
};

export default useGetNewestPosts;
