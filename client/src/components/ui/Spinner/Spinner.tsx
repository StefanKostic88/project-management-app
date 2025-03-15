const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "125px" }}
    >
      <div className="spinner-border " role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
