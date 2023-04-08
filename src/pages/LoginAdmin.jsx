import { useState, Fragment } from "react";
import {
  Button,
  Form,
  Toast,
  ToastContainer,
  ToastHeader,
  ToastBody,
} from "react-bootstrap";
import carBackground from "../assets/background-admin.svg";
import { loginAdmin } from "../store/action/admin-slice";
import classes from "./LoginAdmin.module.css";
import logoLogin from "../assets/Logo-login.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const LoginAdmin = () => {
  const [emailAdmin, setEmailAdmin] = useState();
  const [passwordAdmin, setPasswordAdmin] = useState();
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailAdmin = (e) => {
    e.preventDefault();
    setEmailAdmin(e.target.value);
  };

  const handlePasswordAdmin = (e) => {
    e.preventDefault();
    setPasswordAdmin(e.target.value);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email: emailAdmin, password: passwordAdmin }))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          setShowToast(true);
        }, 1000);

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsError(true);
        }, 1500);
      });
  };

  return (
    <Fragment>
      {showToast ? (
        <ToastContainer className="p-3" position="top-center">
          <Toast
            className="d-inline-block m-1"
            bg="success"
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}>
            <ToastHeader>
              <strong className="me-auto text-dark">Message</strong>
              <small className="text-dark">now</small>
            </ToastHeader>
            <ToastBody className="text-white fw-bold">
              Login Successful !
            </ToastBody>
          </Toast>
        </ToastContainer>
      ) : null}
      <div
        className={`container-fluid d-flex bg-light ${classes.containerLoginAdmin}`}>
        <div className="col-lg-8">
          <img
            className={`${classes.imgLoginAdmin} h-100`}
            src={carBackground}
            alt="background-admin"
          />
        </div>
        <div
          className={`col-lg-4 ${classes.formMobile} ${classes.formMobileNest}`}>
          <div className={classes.adminForm}>
            <img src={logoLogin} alt="Sign-In-Admin-BCR" />

            <h1
              className={`fw-bold mt-5 ${classes.headingFormAdmin}`}
              data-testid="title-Login">
              Welcome, Admin BCR
            </h1>
            {isError ? (
              <div className={classes.notifError}>
                Masukkan username dan password yang benar. Perhatikan penggunaan
                huruf kapital.
              </div>
            ) : null}
            <Form onSubmit={handleAdminLogin}>
              <fieldset>
                <Form.Group controlId="email">
                  <Form.Label className={classes.labelEmail}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={handleEmailAdmin}
                    placeholder="Contoh: kingemyu@gmail.co.uk"
                    className={classes.inputEmail}
                    required></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Masukkan email yang benar
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label className={classes.labelPassword}>
                    Password
                  </Form.Label>
                  <Form.Control
                    data-testid="type-button-password"
                    type="password"
                    onChange={handlePasswordAdmin}
                    minLength="6"
                    placeholder="6+ character"
                    className={classes.inputPassword}
                    required></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Masukan password minimal 6 karakter
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  className={`w-100 fw-bold ${classes.btnSubmitAdmin}`}>
                  Sign In
                </Button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginAdmin;
