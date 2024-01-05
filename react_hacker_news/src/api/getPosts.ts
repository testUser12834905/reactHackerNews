export type HackerNewsStory = {
  by: string; // Author
  descendants: number; // total comments
  id: number;
  kids: number[]; // comment ids
  score: number;
  time: number;
  title: string; // Title
  type: string;
  url: string; // Link
};

const getPosts = async (ids: number[]): Promise<HackerNewsStory[] | []> => {
  let posts: HackerNewsStory[] = [];

  const promises = ids.map(async (id) => {
    try {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      const post: HackerNewsStory = await res.json();
      posts = [...posts, post];
    } catch (error) {
      console.error("error occurred: ", error);
    }
  });

  await Promise.all(promises);
  posts.sort((a, b) => b.time - a.time);
  return posts;
};

export default getPosts;
