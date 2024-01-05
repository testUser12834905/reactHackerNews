import { Launch } from "@mui/icons-material";
import { ListItem, IconButton, Link, ListItemText } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { HackerNewsReturnType } from "../api/getItems";
import PostComments from "./PostComments";

const ListNewsItems = ({
  postData: post,
  setIsCommentsOpen,
}: {
  postData: HackerNewsReturnType;
  setIsCommentsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const itemDisplay = (date: Date) => {
    const twoHrInPast = new Date(new Date().getTime() - 2 * 60 * 60 * 1000);

    const calculateTimeElapsed = () => {
      const timeInMins = (new Date().getTime() - date.getTime()) / 1000 / 60;
      if (timeInMins < 60) {
        return `${Math.ceil(timeInMins)} minutes ago`;
      } else {
        return `${Math.round(timeInMins / 60)} hours ago`;
      }
    };

    if (date < twoHrInPast) {
      return date.toLocaleString("en-GB");
    } else {
      return calculateTimeElapsed();
    }
  };

  const commentDisplay = (commentIDs: number[] | undefined) => {
    const nrOfComments = commentIDs ? commentIDs.length : 0;

    let buttonContent;

    if (nrOfComments === 0 || !commentIDs) {
      return <></>;
    } else if (nrOfComments === 1) {
      buttonContent = `| ${nrOfComments} comment`;
    } else {
      buttonContent = `| ${nrOfComments} comments`;
    }

    return (
      <PostComments
        commentIDs={commentIDs}
        buttonContent={buttonContent}
        setIsCommentsOpen={setIsCommentsOpen}
      />
    );
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <Link
              color="inherit"
              href={post.url}
              target="_blank"
              rel="noreferrer"
            >
              <Launch />
            </Link>
          </IconButton>
        }
      >
        <ListItemText
          primary={post.title}
          secondary={
            <>
              {itemDisplay(new Date(post.time * 1000))}
              {commentDisplay(post?.kids)}
            </>
          }
        />
      </ListItem>
    </>
  );
};

export default ListNewsItems;
