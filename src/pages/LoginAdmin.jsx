import { useState, Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import carBackground from "../assets/background-admin.svg";
import { loginAdmin } from "../store/action/admin-slice";
import classes from "./LoginAdmin.module.css";
import logoLogin from "../assets/Logo-login.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../components/Loading/Loading";

const LoginAdmin = () => {
  const [emailAdmin, setEmailAdmin] = useState();
  const [passwordAdmin, setPasswordAdmin] = useState();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState();

  const handleEmailAdmin = (e) => {
    e.preventDefault();
    setEmailAdmin(e.target.value);
  };

  const handlePasswordAdmin = (e) => {
    e.preventDefault();
    setPasswordAdmin(e.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(`login admin is here`);
    dispatch(loginAdmin({ email: emailAdmin, password: passwordAdmin }))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        setIsError(true);
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div
      className={`container-fluid d-flex bg-light ${classes.containerLoginAdmin}`}>
      {loading ? (
        <div style={{ margin: "25% auto" }}>
          <Loading />
        </div>
      ) : (
        <Fragment>
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

              <h1 className={`fw-bold mt-5 ${classes.headingFormAdmin}`}>
                Welcome, Admin BCR
              </h1>
              {isError ? (
                <div className={classes.notifError}>
                  Masukkan username dan password yang benar. Perhatikan
                  penggunaan huruf kapital.
                </div>
              ) : null}
              <Form onSubmit={handleAdminLogin}>
                <fieldset>
                  <Form.Group controlId="email">
                    <Form.Label className={classes.labelEmail}>
                      Email
                    </Form.Label>
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
        </Fragment>
      )}
    </div>
  );
};

export default LoginAdmin;
