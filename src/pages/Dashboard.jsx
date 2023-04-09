import React, { Fragment } from "react";
import NavbarAdmin from "../components/Navbar/Navbar";
import GraphicCar from "../components/Chart/GraphicCar";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./Dashboard.module.css";
import TableListOrder from "../components/Chart/DataTable/IndexTableNum2";

const Dashboard = () => {
  return (
    <Fragment>
      <Container
        fluid
        className={`p-0 m-0 ${classes.containerDashboard}`}
        data-testid="container-Dashboard">
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
      <TableListOrder />
    </Fragment>
  );
};

export default Dashboard;
