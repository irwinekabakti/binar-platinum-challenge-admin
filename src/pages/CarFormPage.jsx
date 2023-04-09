import React, { Fragment } from "react";
import NavbarAdmin from "../components/Navbar/Navbar";
import CarForm from "../components/CarForm/CarForm";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./CarFormPage.module.css";

const CarFormPage = ({ currentPage }) => {
  return (
    <Fragment>
      <Container fluid className={`p-0 m-0 ${classes.containerCarFormPage}`}>
        <NavbarAdmin currentPage="cars" />
        <Row className="m-0">
          <Col
            xs="auto"
            className={`d-none d-md-block h-100 ${classes.colCarFormPage}`}></Col>
          <Col className="px-3">
            <p className="mt-4">
              <strong>
                Cars {"> "} List Car {"> "}
              </strong>
              {currentPage === "edit" ? "Edit Car" : "Add New Car"}
            </p>
            <h5 className="mt-4 mb-3">
              <strong>
                {currentPage === "edit" ? "Edit Car" : "Add New Car"}
              </strong>
            </h5>
            <CarForm formFunction={currentPage === "edit" ? "edit" : "add"} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CarFormPage;
