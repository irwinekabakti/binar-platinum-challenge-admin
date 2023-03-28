import React, { useState, useEffect } from "react";
import sort from "../../../assets/fi_sort.svg";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { tableDashboard } from "../../../store/action/dashboard-slice";
import classes from "./TableStyleNew.module.css";

function TableListOrder() {
  const dispatch = useDispatch();
  const jumpToPage = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const selector = useSelector((state) => state.dashboardStore);
  const selectTable = selector.dashboardData;
  // console.log(selectTable);

  const [sortEmail, setSortEmail] = useState(true);
  const [sortCar, setSortCar] = useState(true);
  const [sortStartRent, setSortStartRent] = useState(true);
  const [sortFinishRent, setSortFinisRent] = useState(true);
  const [sortPrice, setSortPrice] = useState(true);
  const [sortCategory, setSortCategory] = useState(true);
  const [sortData, setSortData] = useState("created_at:asc");

  const [limit, setLimit] = useState("10");
  const [page, setPage] = useState("1");

  useEffect(() => {
    dispatch(
      tableDashboard({
        sort: sortData,
        page: parseInt(page),
        pageSize: parseInt(limit),
      })
    );
  }, [sortData, limit, page]);

  const sortEmailClick = () => {
    if (sortEmail) {
      setSortData("user_email:asc");
    } else {
      setSortData("user_email:desc");
    }
    setSortEmail(!sortEmail);
  };

  const sortCarClick = () => {
    if (sortCar) {
      setSortData("car_name:asc");
    } else {
      setSortData("car_name:desc");
    }
    setSortCar(!sortCar);
  };

  const sortStartRentClick = () => {
    if (sortStartRent) {
      setSortData("start_rent_at:asc");
    } else {
      setSortData("start_rent_at:desc");
    }
    setSortStartRent(!sortStartRent);
  };

  const sortFinishRentClick = () => {
    if (sortFinishRent) {
      setSortData("finish_rent_at:asc");
    } else {
      setSortData("finish_rent_at:desc");
    }
    setSortFinisRent(!sortFinishRent);
  };

  const sortPriceClick = () => {
    if (sortPrice) {
      setSortData("price:asc");
    } else {
      setSortData("price:desc");
    }
    setSortPrice(!sortPrice);
  };

  const sortCategoryClick = () => {
    if (sortCategory) {
      setSortData("category:asc");
    } else {
      setSortData("category:desc");
    }
    setSortCategory(!sortCategory);
  };

  const changeLimit = (e) => {
    const selectLimit = e.target.value;
    setLimit(selectLimit);
  };

  const changePage = (e) => {
    const selectedPage = e.target.value;
    setPage(selectedPage);
  };

  return (
    <div className={classes.containerTable}>
      <div className="container">
        <div className="d-block">
          <div className={classes.wrapperDataChart}>
            <h4 className="fw-bold pt-5 mt-5">Dashboard</h4>
            <div className="d-flex">
              <div className={`me-3 ${classes.barBlue}`}></div>
              <h6 className="fw-bold mb-3">List Order</h6>
            </div>
          </div>
          <div className="container mt-5 justify-content-end">
            <table className={`table ${classes.tableDashboard}`}>
              <thead className={`table-head ${classes.tableDashboardHead}`}>
                <tr>
                  <th className={`th-no ${classes.thNumberDashboard}`}>No</th>
                  <th
                    className={`th-email ${classes.thEmailDashboard}`}
                    onClick={sortEmailClick}>
                    User Email<img src={sort} alt="sort"></img>
                  </th>
                  {/* <th
                    className={`th-other ${classes.thOtherDashboard}`}
                    onClick={sortCarClick}>
                    Car<img src={sort} alt="sort"></img>
                  </th> */}
                  <th
                    className={`th-other ${classes.thOtherDashboard}`}
                    onClick={sortCarClick}>
                    Car ID<img src={sort} alt="sort"></img>
                  </th>
                  <th
                    className={`th-other ${classes.thOtherDashboard}`}
                    onClick={sortStartRentClick}>
                    Start Rent<img src={sort} alt="sort"></img>
                  </th>
                  <th
                    className={`th-other ${classes.thOtherDashboard}`}
                    onClick={sortFinishRentClick}>
                    Finish Rent<img src={sort} alt="sort"></img>
                  </th>
                  <th
                    className={`th-other ${classes.thOtherDashboard}`}
                    onClick={sortPriceClick}>
                    Price<img src={sort} alt="sort"></img>
                  </th>
                  {/* <th
                    className={`th-other ${classes.thOtherDashboard}`}
                    onClick={sortCategoryClick}>
                    Category<img src={sort} alt="sort"></img>
                  </th> */}
                  <th
                    className={`th-other ${classes.thOtherDashboard}`}
                    onClick={sortCategoryClick}>
                    User ID<img src={sort} alt="sort"></img>
                  </th>
                </tr>
              </thead>

              {selectTable.map((items, key) => {
                return (
                  <tbody
                    key={key}
                    className={`table-body ${classes.tableBodyDashboard}`}>
                    <tr>
                      <td className="text-center">{items.id}</td>
                      <td>{items.User.email}</td>
                      {/* <td>{items.Car === null ? "Innova" : items.Car.name}</td> */}
                      <td>{items.CarId}</td>
                      <td>
                        {moment(items.start_rent_at).format("DD MMMM yyyy")}
                      </td>
                      <td>
                        {moment(items.finish_rent_at).format("DD MMMM yyyy")}
                      </td>
                      <td>Rp {items.total_price.toLocaleString("id-ID")}</td>
                      {/* <td>2-4 orang</td> */}
                      <td>{items.UserId}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <div className="d-flex justify-content-between align-items-end mx-4">
              <div className={`d-flex gap-5 ${classes.buttonRight}`}>
                <div>
                  <p
                    className={`table-dropdown-title ${classes.tableDropdownTitle}`}>
                    Limit
                  </p>
                  <select
                    defaultValue="choose"
                    onChange={changeLimit}
                    className={`table-dropdown ${classes.tableDropdown}`}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                  </select>
                </div>
                <div>
                  <p
                    className={`table-dropdown-title ${classes.tableDropdownTitle}`}>
                    Jump to Page
                  </p>
                  <select
                    defaultValue="1"
                    onChange={changePage}
                    className={`table-dropdown ${classes.tableDropdown}`}>
                    {jumpToPage.map((items, key) => {
                      return (
                        <option key={key} value={items}>
                          {items}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="d-flex gap-1">
                {jumpToPage.map((items, key) => {
                  return (
                    <div
                      key={key}
                      className={
                        page === items
                          ? `${classes.tablePageActive}`
                          : `${classes.tablePage}`
                      }
                      onClick={() => setPage(items)}>
                      <p className="m-0">{items}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableListOrder;
