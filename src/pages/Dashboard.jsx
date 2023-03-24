import React from "react";
import NavbarAdmin from "../components/Navbar/Navbar";
import GraphicCar from "../components/Chart/GraphicCar";
import { Col, Container, Row } from "react-bootstrap";
import IndexTable from "../components/Chart/DataTable/IndexTable";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div>
      <Container fluid className={`p-0 m-0 ${classes.containerDashboard}`}>
        <NavbarAdmin currentPage="dashboard" />
        <Row className="m-0">
          <Col
            xs="auto"
            className={`${classes.colDashboard} d-none d-md-block h-100`}></Col>
        </Row>
        <div className={classes.dataGraphTable}>
          <GraphicCar />
          <br />
        </div>
      </Container>
      <br />
      <br />
      <IndexTable />
    </div>
  );
};

export default Dashboard;
