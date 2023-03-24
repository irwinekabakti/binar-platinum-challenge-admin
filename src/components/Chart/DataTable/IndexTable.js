import React from "react";
import CarsTable from "./CarsTable";
import classes from "./TableStyle.module.css";

const IndexTable = () => {
  return (
    <main className={classes.containerDataChart}>
      <div className={classes.wrapperDataChart}>
        <h4 className="fw-bold pt-5 mt-5">Dashboard</h4>
        <div className="d-flex">
          <div className={`me-3 ${classes.barBlue}`}></div>
          <h6 className="fw-bold mb-3">List Order</h6>
        </div>
        <CarsTable rowsPerPage={5} />
      </div>
    </main>
  );
};

export default IndexTable;
