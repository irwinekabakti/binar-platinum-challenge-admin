import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/Navbar/Navbar";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import CarModal from "../assets/car-box.svg";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEdit,
  faPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Cars.module.css";
import { carsDashboard } from "../store/action/dashboard-slice";
import { useDispatch, useSelector } from "react-redux";
import { deletedCarDashboard } from "../store/action/dashboard-slice";

const Cars = () => {
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showHeaderModal, setShowHeaderModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.dashboardStore);
  const displayedCars = selector.dataCars;

  let [searchParams, setSearchParams] = useSearchParams();
  const checkFormSuccess = () => {
    searchParams.get("formSuccess") && setShowFormModal(true);
    setSearchParams({});
  };

  const handlingFilterAllCar = () => {
    setCategory(null);
  };

  const handlingFilterSmallCar = () => {
    setCategory("small".toLocaleLowerCase());
  };

  const handlingFilterMediumCar = () => {
    setCategory("medium".toLocaleLowerCase());
  };

  const handlingFilterLargeCar = () => {
    setCategory("large".toLocaleLowerCase());
  };

  const toAddNewCar = () => {
    navigate("/cars/add-new");
  };

  const handleShowFormModal = () => {
    setShowFormModal(false);
  };

  const handleShowHeaderModal = () => {
    setShowHeaderModal(false);
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  const FormSuccessModal = (props) => {
    return (
      <Modal {...props} size="sm" className="special_modal">
        <Modal.Body
          className={`${classes.bodyModalSuccess} d-flex justify-content-center align-text-center text-white fw-bold`}>
          Data Berhasil Disimpan
        </Modal.Body>
      </Modal>
    );
  };

  const OpenHeaderModal = (props) => {
    return (
      <Modal {...props} size="sm" className="special_modal">
        <Modal.Body
          className={`${classes.bodyModalDelete} d-flex justify-content-center align-text-center text-primary fw-bold`}>
          Data Berhasil di Hapus
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    if (id !== null) {
      setShowModal(true);
    }
  }, [id]);

  const deleteCar = async () => {
    try {
      dispatch(deletedCarDashboard(id))
        .unwrap()
        .then(() => {
          getCars();
          // navigate("/cars");
        });
    } catch (error) {
      // console.log(error);
      alert(error);
    }
  };

  const getCars = () => {
    dispatch(carsDashboard())
      .then(() => {
        checkFormSuccess();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const isModalOpen = () => {
    deleteCar();
    setShowModal(false);
    setShowHeaderModal(true);
  };

  const OpenModal = (props) => {
    return (
      <Modal
        size="sm"
        className="w-10"
        aria-labelledby="container-modal-title-vcenter"
        centered
        {...props}
        backdrop="static"
        keyboard={false}>
        <Modal.Body>
          <div className="w-100 d-flex justify-content-center mt-4">
            <img src={CarModal} alt="mobil-infoModal" />
          </div>
          <div className="w-100 d-flex justify-content-center mt-3">
            <p>
              Setelah dihapus data mobil tidak dapat dikembalikan. Yakin ingin
              menghapus?
            </p>
          </div>

          <div className="container px-4 mt-5">
            <div className="row gx-5">
              <Col>
                <Button
                  style={{ width: "100%" }}
                  variant="primary"
                  onClick={isModalOpen}>
                  Ya
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ width: "100%" }}
                  variant="outline-primary"
                  onClick={props.onHide}>
                  Tidak
                </Button>
              </Col>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    getCars();
  }, []);

  const filterCars = () => {
    let renderCars = displayedCars;

    if (category) {
      renderCars = renderCars.filter((car) => {
        if (car.category === category) return car;
      });
    }

    return (
      <Row className="g-4 mb-5 mt-0">
        {renderCars.map((car) => (
          <Col
            xs={12}
            md={6}
            lg={4}
            xxl={4}
            className="containerCardCars"
            key={car.id}>
            <Card className="cardCars mt-0">
              <div className={classes.wrapperImageCars}>
                <Card.Img src={car.image} />
              </div>
              <Card.Body>
                <Card.Text className="fw-bold">{car.name}</Card.Text>
                <Card.Text className="fw-bold">
                  Rp {car.price.toLocaleString("id-ID")} / Hari
                </Card.Text>
                {car.category.toLowerCase() === "small" ? (
                  <p>
                    <small>
                      <FontAwesomeIcon icon={faUser} /> 2 - 4 People
                    </small>
                  </p>
                ) : null}
                {car.category.toLowerCase() === "medium" ? (
                  <p>
                    <small>
                      <FontAwesomeIcon icon={faUser} /> 4 - 6 People
                    </small>
                  </p>
                ) : null}
                {car.category.toLowerCase() === "large" ? (
                  <p>
                    <small>
                      <FontAwesomeIcon icon={faUser} /> 6 - 8 People
                    </small>
                  </p>
                ) : null}

                <p>
                  <small>
                    <FontAwesomeIcon icon={faClock} /> Updated at{" "}
                    {moment(car.updatedAt).format("DD MMMM YYYY h:mm A")}
                  </small>
                </p>
                <div className="d-flex justify-content-around">
                  <Button
                    variant="outline-danger"
                    size="lg"
                    className={`d-flex align-items-center ${classes.btnDelete}`}
                    style={{ width: "fit-content" }}
                    onClick={() => {
                      setId(car.id);
                    }}>
                    <FontAwesomeIcon icon={faTrash} className="me-2 " />
                    Delete
                  </Button>
                  <Button
                    variant="outline-none"
                    size="lg"
                    className={`d-flex align-items-center text-white ${classes.btnEdit}`}
                    style={{ width: "fit-content" }}
                    onClick={() => navigate(`/cars/edit/${car.id}`)}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container fluid className={`p-0 m-0 ${classes.containerCarsPage}`}>
      <NavbarAdmin currentPage="cars" />
      <Row className="m-0">
        <Col
          xs="auto"
          className={`d-none d-md-block h-100 ${classes.colCarsPage}`}></Col>
        <Col>
          <p className="mt-4">
            <strong>Cars {">"}</strong> List Car
          </p>
          <h5 className="mt-4">
            <strong>List Car</strong>
          </h5>
          <div className="d-flex justify-content-end">
            <Button
              className={`pe-3 mb-2 fw-bold ${classes.btnAddCar}`}
              onClick={toAddNewCar}>
              <FontAwesomeIcon icon={faPlus} className="me-2 " />
              Add New Car
            </Button>
          </div>
          <Button
            className={`me-3 mb-2 ${classes.btnFilterCars}`}
            onClick={handlingFilterAllCar}>
            All
          </Button>
          <Button
            className={`me-3 mb-2 ${classes.btnFilterCars}`}
            onClick={handlingFilterSmallCar}>
            2 - 4 people
          </Button>
          <Button
            className={`me-3 mb-2 ${classes.btnFilterCars}`}
            onClick={handlingFilterMediumCar}>
            4 - 6 people
          </Button>
          <Button
            className={`me-3 mb-2 ${classes.btnFilterCars}`}
            onClick={handlingFilterLargeCar}>
            6 - 8 people
          </Button>
          {filterCars()}
        </Col>
      </Row>
      <FormSuccessModal show={showFormModal} onHide={handleShowFormModal} />
      <OpenHeaderModal show={showHeaderModal} onHide={handleShowHeaderModal} />
      <OpenModal show={showModal} onHide={handleShowModal} />
    </Container>
  );
};

export default Cars;
