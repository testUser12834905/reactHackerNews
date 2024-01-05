export type HackerNewsReturnType = {
  by: string; // Author
  descendants: number; // total comments
  id: number;
  kids?: number[]; // comment ids
  score?: number;
  time: number;
  title: string; // Title
  text?: string; // for comments
  type: string;
  url: string; // Link
};

const getItems = async (
  ids: number[],
): Promise<HackerNewsReturnType[] | []> => {
  let posts: HackerNewsReturnType[] = [];

  const promises = ids.map(async (id) => {
    try {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      const post: HackerNewsReturnType = await res.json();
      posts = [...posts, post];
    } catch (error) {
      console.error("error occurred: ", error);
    }
  });

  await Promise.all(promises);
  posts.sort((a, b) => b.time - a.time);
  return posts;
};

export default getItems;
