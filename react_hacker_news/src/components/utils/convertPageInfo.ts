const convertPageInfo = (pageInfo: [number, number]) => {
  // let pageCount = pageInfo[0];
  // let end = pageInfo[1];
  let [pageCount, perPageContent] = pageInfo;
  return [0 + pageCount * perPageContent, perPageContent * (pageCount + 1)];
};
export default convertPageInfo;
