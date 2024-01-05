import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import getItems, { HackerNewsReturnType } from "../api/getItems";
import LoadSpinner from "./LoadSpinner";

type Props = {
  commentIDs: number[];
  buttonContent: string;
};

const PostComments = ({ commentIDs, buttonContent }: Props) => {
  const [open, setOpen] = useState(false);
  const [commentsData, setCommentsData] = useState<HackerNewsReturnType[] | []>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      getItems(commentIDs).then((fetchedComments) => {
        setCommentsData(fetchedComments);
        setIsLoading(false);
      });
    }
  }, [open, commentIDs]);

  return (
    <>
      <Button
        color="inherit"
        size="small"
        onClick={() => {
          setOpen(true);
          setIsLoading(true);
        }}
      >
        {buttonContent}
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Comments</DialogTitle>
        <LoadSpinner isLoading={isLoading} />
        <List>
          {commentsData.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText primary={comment.by} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default PostComments;
