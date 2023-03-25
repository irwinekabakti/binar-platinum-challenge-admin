import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import iconUpload from "../../assets/fi_upload.svg";
import classes from "./CarForm.module.css";
import { useSelector } from "react-redux";

const CarForm = ({ formFunction }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const selector = useSelector((state) => state.dashboardStore);
  const selectedCarAdmin = selector.dataCars;
  // const selectUpdate = selectedCarAdmin.map((item) => item.createdAt);
  // console.log(selectUpdate);
  console.log(selectedCarAdmin);
  // console.log(selectedCarAdmin.createdAt);
  // console.log(selectedCarAdmin.updatedAt);

  const config = {
    headers: {
      access_token: localStorage.getItem("token_Admin"),
    },
  };
  let formData = new FormData();

  const uploadEditForm = async () => {
    try {
      const response = await axios.put(
        `https://bootcamp-rent-cars.herokuapp.com/admin/car/${id}`,
        formData,
        config
      );
      if (response.status === 200) navigate("/cars?formSuccess=true");
    } catch (err) {
      console.log(err);
    }
  };

  const uploadAddForm = async () => {
    try {
      const response = await axios.post(
        `https://bootcamp-rent-cars.herokuapp.com/admin/car`,
        formData,
        config
      );

      if (response.status === 201) {
        navigate("/cars?formSuccess=true");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const appendFormData = (key, value) => {
    if (value !== "" && value !== null) formData.append(key, value);
  };

  const prepareFormData = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!!form.checkValidity()) {
      appendFormData("name", name);
      appendFormData("price", price);
      appendFormData("image", image);
      appendFormData("category", category);

      formFunction === "edit" && uploadEditForm();
      if (formFunction === "add") {
        formData.append("status", false);
        uploadAddForm();
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
    <Form onSubmit={prepareFormData}>
      <div className="w-100 bg-white p-3">
        <fieldset className={`${classes.fieldFormSet} w-100`}>
          <Form.Group as={Row} className="mb-3" controlId="name">
            <Form.Label
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Nama/Tipe Mobil<span className="text-danger">*</span>
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
          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Harga<span className="text-danger">*</span>
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                min="9999"
                placeholder="Input Harga Sewa Mobil"
                required={formFunction === "edit" ? false : true}
                className={classes.formBox}
                onChange={handlePrice}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="image">
            <Form.Label
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Foto<span className="text-danger">*</span>
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
          <Form.Group as={Row} className="mb-3" controlId="category">
            <Form.Label
              column
              sm="4"
              className="mb-0 d-flex align-items-center">
              Kategori<span className="text-danger">*</span>
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
          <div>
            <Row className="mb-3">
              <Col sm="4" className="mb-0">
                Created at
              </Col>
              <Col sm="8">-</Col>
              {/* <Col sm="8">{selectUpdate}</Col> */}
            </Row>
            <Row>
              <Col sm="4" className="mb-0">
                Updated at
              </Col>
              <Col sm="8">-</Col>
              {/* <Col sm="8">{selectUpdate}</Col> */}
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
        <Button
          type="submit"
          className={`d-flex align-items-center text-white ${classes.formButtonSave}`}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CarForm;
