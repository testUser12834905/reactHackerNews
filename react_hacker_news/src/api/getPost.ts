type HackerNewsStory = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const getPost = async (id: number): Promise<HackerNewsStory | null> => {
  try {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
    );
    const data: HackerNewsStory = await res.json();
    return data;
  } catch (error) {
    console.error("error occured: ", error);
    return null;
  }
};

export default getPost;
