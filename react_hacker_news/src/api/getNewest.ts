const getNewest = async (): Promise<Array<number>> => {
  try {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json",
    );
    const data: Array<number> = await res.json();
    return data.sort((a, b) => a + b);
  } catch (error) {
    console.error("error occured: ", error);
    return [];
  }
};

export default getNewest;
