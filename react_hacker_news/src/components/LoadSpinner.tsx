import { CircularProgress } from "@mui/material";

type Props = { isLoading: boolean };

const LoadSpinner = ({ isLoading }: Props) => {
  return isLoading ? <CircularProgress /> : <></>;
};

export default LoadSpinner;
