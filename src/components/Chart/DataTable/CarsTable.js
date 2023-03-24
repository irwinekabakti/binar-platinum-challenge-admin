import React, { useState, useEffect } from "react";
import useTable from "./useTable";
import TableFooter from "./TableFooter";
import classes from "./TableStyle.module.css";
import { useSelector, useDispatch } from "react-redux";
import { tableDashboard } from "../../../store/action/dashboard-slice";
import moment from "moment";

const CarsTable = ({ rowsPerPage }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.dashboardStore);
  const selectedOrderedCar = selector.dashboardData;
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(selectedOrderedCar, page, rowsPerPage);

  const fetchData = () => {
    dispatch(tableDashboard())
      .then()
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table className={classes.tableDataChart}>
        <thead className={classes.tableRowHeaderDataChart}>
          <tr>
            <th className={classes.tableHeaderDataChart}>No</th>
            <th className={classes.tableHeaderDataChart}>User Email</th>
            <th className={classes.tableHeaderDataChart}>Car ID</th>
            <th className={classes.tableHeaderDataChart}>Start Rent</th>
            <th className={classes.tableHeaderDataChart}>Finish Rent</th>
            <th className={classes.tableHeaderDataChart}>Price</th>
            <th className={classes.tableHeaderDataChart}>User ID</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((carsData) => (
            <tr className={classes.tableRowItemsDataChart} key={carsData.id}>
              <td className={classes.tableCellDataChart}>{carsData.id}</td>
              <td className={classes.tableCellDataChart}>
                {carsData.User.email}
              </td>
              <td className={classes.tableCellDataChart}>{carsData.CarId}</td>
              <td className={classes.tableCellDataChart}>
                {moment(carsData.start_rent_at).format("DD MMMM YYYY")}
              </td>
              <td className={classes.tableCellDataChart}>
                {moment(carsData.finish_rent_at).format("DD MMMM YYYY")}
              </td>
              <td className={classes.tableCellDataChart}>
                Rp {carsData.total_price.toLocaleString("id-ID")}
              </td>
              <td className={classes.tableCellDataChart}>{carsData.UserId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default CarsTable;
