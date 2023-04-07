import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import iconUpload from "../../assets/fi_upload.svg";
import classes from "./CarForm.module.css";
import { useDispatch } from "react-redux";
import {
  uploadedCarDashboard,
  editedCarDashboard,
} from "../../store/action/dashboard-slice";

const CarForm = ({ formFunction }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const addNewCarForm = async () => {
    dispatch(uploadedCarDashboard({ name, price, category, image }))
      .unwrap()
      .then(() => {
        navigate("/cars?formSuccess=true");
      });
  };

  const editCarForm = async () => {
    dispatch(editedCarDashboard({ name, price, category, image, id }))
      .unwrap()
      .then(() => {
        navigate("/cars?formSuccess=true");
      });
  };

  const formData = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!!form.checkValidity()) {
      if (formFunction === "add") {
        addNewCarForm();
      }

      if (formFunction === "edit") {
        editCarForm();
      }
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const backToCars = () => {
    navigate("/cars");
  };

  return (
    <Form onSubmit={formData}>
      <div className="w-100 bg-white p-3">
        <fieldset className={`${classes.fieldFormSet} w-100`}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="name"
            data-testid="wrapper-labelName">
            <Form.Label
              data-testid="label-Name"
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Nama/Tipe Mobil
              <span className="text-danger" data-testid="label-SpanName">
                *
              </span>
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Input Nama/Tipe Mobil"
                required={formFunction === "edit" ? false : true}
                className={classes.formBox}
                onChange={handleName}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="price"
            data-testid="wrapper-labelPrice">
            <Form.Label
              data-testid="label-Price"
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Harga
              <span className="text-danger" data-testid="label-SpanPrice">
                *
              </span>
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                placeholder="Input Harga Sewa Mobil"
                required={formFunction === "edit" ? false : true}
                className={classes.formBox}
                onChange={handlePrice}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="image"
            data-testid="wrapper-Photo">
            <Form.Label
              data-testid="label-Photo"
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Foto
              <span className="text-danger" data-testid="label-SpanPhoto">
                *
              </span>
            </Form.Label>
            <Col sm="8" className="position-relative">
              <img
                src={iconUpload}
                alt=""
                className="position-absolute"
                style={{ right: "21px", top: "9px" }}
              />
              <Form.Control
                type="file"
                accept="image/png, image/gif, image/jpeg"
                required={formFunction === "edit" ? false : true}
                className={classes.formBox}
                onChange={handleImage}
              />
              <p
                className="mb-0"
                style={{
                  lineWeight: 300,
                  fontSize: "10px",
                  lineHeight: "14px",
                  color: "#8A8A8A",
                }}>
                File size max. 2MB
              </p>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="category"
            data-testid="wrapper-Category">
            <Form.Label
              data-testid="label-Category"
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Kategori
              <span className="text-danger" data-testid="label-SpanCategory">
                *
              </span>
            </Form.Label>
            <Col sm="8">
              <Form.Select
                className={classes.formBox}
                onChange={handleCategory}>
                <option hidden>Pilih Kategori Mobil</option>
                <option value="small">2 - 4 orang</option>
                <option value="medium">4 - 6 orang</option>
                <option value="large">6 - 8 orang</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <div className="formInfo">
            <Row className="mb-3">
              <Col sm="4" className="mb-0">
                Created at
              </Col>
              <Col sm="8">-</Col>
            </Row>
            <Row>
              <Col sm="4" className="mb-0">
                Updated at
              </Col>
              <Col sm="8">-</Col>
            </Row>
          </div>
        </fieldset>
      </div>
      <div className="d-flex" style={{ marginTop: "40px" }}>
        <Button
          className={`d-flex align-items-center me-3 ${classes.formButtonCancel}`}
          onClick={backToCars}>
          Cancel
        </Button>
        {formFunction === "edit" ? (
          <Button
            type="submit"
            className={`d-flex align-items-center text-white ${classes.formButtonSave}`}>
            Edit
          </Button>
        ) : null}
        {formFunction === "add" ? (
          <Button
            type="submit"
            className={`d-flex align-items-center text-white ${classes.formButtonSave}`}>
            Save
          </Button>
        ) : null}
      </div>
    </Form>
  );
};

export default CarForm;
