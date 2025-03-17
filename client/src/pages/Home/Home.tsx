import { useEffect } from "react";
import {
  AddClientModal,
  Clients,
  Projects,
  AddProjectModal,
} from "../../components";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <div className="d-flex gap-3 mb-4 mt-5">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default Home;
