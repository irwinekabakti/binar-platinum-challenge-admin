import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <section id="loading" className="container loading ">
      <div className="d-flex text-align-center justify-content-center">
        <Spinner animation="grow" role="status" style={{ margin: "auto" }}>
          <span className=" visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </section>
  );
};

export default Loading;
