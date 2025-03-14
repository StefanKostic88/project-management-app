import { Link, useParams } from "react-router-dom";
import { Spinner } from "../../components";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQuery";
import { ProjectInterfaceQuery } from "../../components/Projects/Project.model";

const Project = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<ProjectInterfaceQuery>(
    GET_PROJECT,
    {
      variables: { id },
    }
  );

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data?.project.name}</h1>
        </div>
      )}
    </>
  );
};

export default Project;
