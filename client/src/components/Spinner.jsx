import Header from "./header";
import "../App.css";
const Spinner = () => {
  return (
    <>
      <Header />
      <div className="spinner">
      <div className="spinner-border " role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
