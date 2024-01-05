import { Launch } from "@mui/icons-material";
import { ListItem, IconButton, Link, ListItemText } from "@mui/material";
import { HackerNewsStory } from "../api/getPosts";

const ListNewsItems = ({ postData: post }: { postData: HackerNewsStory }) => {
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
          secondary={new Date(post.time * 1000).toLocaleString("en-GB")}
        />
      </ListItem>
    </>
  );
};

export default ListNewsItems;
