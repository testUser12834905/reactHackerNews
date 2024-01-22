interface HackerNewsGenericType {
  by: string; // Author
  id: number;
  kids?: number[]; // comment ids
  time: number;
  type: string;
}
export interface HackerNewsPostType extends HackerNewsGenericType {
  descendants: number; // total comments
  score?: number;
  title: string; // Title
  url: string; // Link
}

export interface HackerNewsCommentType extends HackerNewsPostType {
  text: string; // for comments
  parent: number;
}

const getItems = async <T extends HackerNewsGenericType>(
  ids: number[],
): Promise<T[] | []> => {
  let posts: T[] = [];

  const promises = ids.map(async (id) => {
    try {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      const post = await res.json();
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
