import { Launch } from "@mui/icons-material";
import {
  ListItem,
  IconButton,
  Link,
  ListItemText,
  Button,
} from "@mui/material";
import { HackerNewsStory } from "../api/getPosts";

const ListNewsItems = ({ postData: post }: { postData: HackerNewsStory }) => {
  const commentDisplay = (nrOfComments: number) => {
    let buttonContent;
    if (post.descendants === 0) {
      return <></>;
    } else if (post.descendants === 1) {
      buttonContent = `| ${nrOfComments} comment`;
    } else {
      buttonContent = `| ${nrOfComments} comments`;
    }
    return (
      <Button color="inherit" size="small">
        {buttonContent}
      </Button>
    );
  };

  const itemDisplay = (date: Date) => {
    const twoHrInPast = new Date(new Date().getTime() - 2 * 60 * 60 * 1000);

    const calculateTimeElapsed = () => {
      const timeInMins = (new Date().getTime() - date.getTime()) / 1000 / 60;
      if (timeInMins < 60) {
        return `${Math.round(timeInMins)} minutes ago`;
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
              {commentDisplay(post.descendants)}
            </>
          }
        />
      </ListItem>
    </>
  );
};

export default ListNewsItems;
