import { useEffect } from "react";
import {
  AddClientModal,
  Clients,
  Projects,
  AddProjectModal,
} from "../../components";

const Home = () => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <>
      <div className="d-flex gap-3 mb-4">
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
