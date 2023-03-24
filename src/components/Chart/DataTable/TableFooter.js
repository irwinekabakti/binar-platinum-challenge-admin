import React, { useEffect } from "react";
import classes from "./TableStyle.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={classes.tableFooterDataChart}>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${classes.buttonDataChart} ${
            page === el
              ? `${classes.activeButtonDataChart}`
              : `${classes.inactiveButtonDataChart}`
          }`}
          onClick={() => setPage(el)}>
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
