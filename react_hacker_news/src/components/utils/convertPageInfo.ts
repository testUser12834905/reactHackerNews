const paginationRules = (pageInfo: [number, number]) => {
  let [pageCount, perPageContent] = pageInfo;
  return [0 + pageCount * perPageContent, perPageContent * (pageCount + 1)];
};
export default paginationRules;
