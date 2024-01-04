export type HackerNewsStory = {
  by: string; // Author
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string; // Title
  type: string;
  url: string; // Link
};

const getPosts = async (ids: number[]): Promise<HackerNewsStory[] | null> => {
  let posts: HackerNewsStory[] = [];

  for (const id of ids) {
    try {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      const post: HackerNewsStory = await res.json();
      posts = [...posts, post];
    } catch (error) {
      console.error("error occured: ", error);
    }
  }
  return posts ? posts : null;
};

export default getPosts;
