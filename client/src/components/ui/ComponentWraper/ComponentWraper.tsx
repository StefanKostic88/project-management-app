import { ApolloError } from "@apollo/client";
import { FC, ReactNode } from "react";
import Spinner from "../Spinner/Spinner";

interface ComponentWraperProps {
  children: ReactNode;
  loading: boolean;
  error: ApolloError | undefined;
  spinner?: boolean;
}

const ComponentWraper: FC<ComponentWraperProps> = ({
  children,
  error,
  loading,
  spinner = true,
}) => {
  if (loading) return spinner ? <Spinner /> : null;
  if (error) return <p>Something went wrong</p>;

  return <>{!loading && !error && <>{children}</>}</>;
};

export default ComponentWraper;
