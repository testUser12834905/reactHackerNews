import TablePagination from "@mui/material/TablePagination";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const MyTablePagination = ({
  setPageInfo,
  maxLen,
}: {
  setPageInfo: Dispatch<SetStateAction<[number, number]>>;
  maxLen: number;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPageInfo([page, rowsPerPage]);
  }, [page, rowsPerPage, setPageInfo]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={maxLen}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default MyTablePagination;
