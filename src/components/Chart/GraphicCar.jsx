import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import classes from "./GraphicCar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { chartDashboard } from "../../store/action/dashboard-slice";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const GraphicCar = () => {
  const [labels, setLabels] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [startDateRent, setStartDateRent] = useState(`2022-01-01`);
  const [finishDateRent, setFinishDateRent] = useState(`2022-01-31`);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.dashboardStore);
  const selectedChart = selector.chartOrder;

  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const fetchData = async () => {
    try {
      dispatch(chartDashboard({ from: startDateRent, until: finishDateRent }));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    let labels = [];
    let amounts = [];
    selectedChart.map((report) => {
      labels.push(report.day);
      amounts.push(report.orderCount);
    });
    setLabels(labels);
    setAmounts(amounts);
  }, [selectedChart]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    fetchData();
  }, [startDateRent, finishDateRent]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cars List Report",
        backgroundColor: "#586B90",
        borderColor: "rgb(255, 99, 132)",
        data: amounts,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    scales: {
      y: {
        display: true,
        title: {
          text: "Amount of Car Rented",
          display: true,
          font: {
            family: "Arial",
            size: 12,
            style: "normal",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
    plugins: {
      tooltip: {},
    },
  };

  return (
    <>
      <Col className="grafic-title d-flex align-items-center">
        <Row>
          <p className="mt-2">
            <strong>Dashboard {" > "} </strong> Dashboard
          </p>
          <div className="d-flex">
            <div className={`me-3 ${classes.barBlue}`}></div>
            <Col className="fw-bold">Rented Car Data Visualization</Col>
          </div>
        </Row>
      </Col>
      <br />
      <Col>
        <Col className={classes.detailSelect}>Month</Col>
        <Form className="d-flex mb-5">
          <Form.Select
            aria-label="Default select example"
            style={{ width: 122, borderRadius: 2, fontSize: 12 }}
            onChange={(e) => {
              let date = new Date(e.target.value);
              let lastDay = new Date(2022, date.getMonth() + 1, 0);
              setStartDateRent(`2022-${e.target.value}-1`);
              setFinishDateRent(`2022-${e.target.value}-${lastDay.getDate()}`);
            }}>
            <option disabled>Open this select menu</option>
            {months.map((month) => (
              <option value={month.id} key={month.id}>
                {month.name} - 2022
              </option>
            ))}
          </Form.Select>
          <br />
          <Button variant="outline-none" className={classes.btnGo}>
            Go
          </Button>
        </Form>
      </Col>
      <div>
        <Bar data={data} width={200} height={400} options={options} />
      </div>
    </>
  );
};

export default GraphicCar;
