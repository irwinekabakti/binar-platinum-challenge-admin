import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  NavItem,
} from "react-bootstrap";
import iconSearch from "../../assets/fi_search.svg";
import iconDropdown from "../../assets/chevron-down.svg";
import iconDashboard from "../../assets/fi_home.svg";
import iconCars from "../../assets/fi_truck.svg";
import classes from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/action/admin-slice";

const NavbarAdmin = ({ currentPage }) => {
  const navbarRef = useRef();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [navPanelCustom, setNavPanelCustom] = useState("");
  const [navMenuCustom, setNavMenuCustom] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutAdmin = () => {
    dispatch(logout());
    // navigate("/loginAdmin");
    navigate("/");
  };

  const handleSidebar = () => {
    if (!isSidebarActive) {
      setNavMenuCustom("display-flex");
      setTimeout(() => {
        setNavMenuCustom("display-flex open");
        setNavPanelCustom("display-block");
      }, 10);
      setTimeout(() => {
        setNavMenuCustom("display-flex open index");
      }, 360);
      setTimeout(() => {
        setNavPanelCustom("display-block open");
      }, 150);
    } else {
      setNavPanelCustom("display-block");
      setTimeout(() => {
        setNavPanelCustom("");
      }, 300);
      setTimeout(() => {
        setNavMenuCustom("display-flex");
      }, 140);
      setTimeout(() => {
        setNavMenuCustom("");
      }, 490);
    }
    setIsSidebarActive(!isSidebarActive);
  };

  const clickNavPanel = (location) => {
    if (navbarRef.current.clientWidth < 768) {
      handleSidebar();
      setTimeout(() => {
        navigate(location);
      }, 490);
    } else navigate(location);
  };

  const displayData = () => {
    if (currentPage === "cars") {
      clickNavPanel("/dashboard");
    }
  };

  const displayCars = () => {
    if (currentPage === "dashboard") {
      clickNavPanel("/cars");
    }
  };

  return (
    <>
      <div
        className={`bg-white navigation-panel position-absolute h-100 ${navPanelCustom} ${classes.navPanelClass}`}>
        {currentPage === "dashboard" && (
          <div className="dashboard-menu w-100 flex-column">
            <p className={`w-100 ps-4 pe-3 ${classes.titleDashboard}`}>
              DASHBOARD
            </p>
            <ul className={`p-0 ${classes.listDashboard}`}>
              <li className={`ps-4 pe-3 ${classes.listNameDashboard}`}>
                Dashboard
              </li>
            </ul>
          </div>
        )}
        {currentPage === "cars" && (
          <div className="cars-menu w-100 flex-column">
            <p className={`w-100 ps-4 pe-3 ${classes.titleCars}`}>CARS</p>
            <ul className={`p-0 ${classes.listCars}`}>
              <li className={`ps-4 pe-3 ${classes.listNameCars}`}>List Car</li>
            </ul>
          </div>
        )}
      </div>
      <Nav
        className={`navigation-menu position-absolute flex-column ${navMenuCustom} ${classes.navMenuClass} `}>
        <Nav.Link
          className={`${
            classes.navigationTab
          } w-100 d-flex flex-column justify-content-center align-items-center text-center ${
            currentPage === "dashboard" && "selected"
          }`}
          style={{ height: "64px" }}
          onClick={displayData}>
          <img src={iconDashboard} alt="dashboard" />
          <p className={`m-0 text-white ${classes.navTitle}`}>Dashboard</p>
        </Nav.Link>
        <Nav.Link
          className={`navigation-tab w-100 d-flex flex-column justify-content-center align-items-center text-center ${
            currentPage === "cars" && "selected"
          }`}
          style={{ height: "64px" }}
          onClick={displayCars}>
          <img src={iconCars} alt="cars" />
          <p className={`m-0 text-white ${classes.navTitle}`}>Cars</p>
        </Nav.Link>
      </Nav>
      <Navbar className={`bg-white p-0 ${classes.mainNavbar}`} ref={navbarRef}>
        <Container
          fluid
          className="h-100 p-0 d-flex justify-content-between align-items-center">
          <Col xs="auto" className={`h-100 d-flex ${classes.colNav}`}>
            <Button
              aria-label="Navigation Menu"
              className={`menu-button d-flex justify-content-center align-items-center position-relative ${classes.btnNavSideBar}`}
              onClick={handleSidebar}>
              <div className={classes.iconSideNav} />
            </Button>
            <div
              className={`h-100 w-100 d-flex align-items-center px-4 ${classes.spaceNavTop}`}>
              <div className={classes.iconTopNav} />
            </div>
          </Col>
          <Col className="h-100 d-flex justify-content-between">
            <div
              className={`h-100 w-100 d-flex justify-content-center align-items-center ${classes.containerBurgerButton}`}>
              <Button
                className={`bg-white p-1 d-flex flex-column border-0 ${classes.btnBurgerButton}`}>
                <span className={`bg-dark ${classes.burgerButton}`} />
                <span className={`bg-dark ${classes.burgerButton}`} />
                <span className={`bg-dark ${classes.burgerButton}`} />
              </Button>
            </div>
            <div className="d-flex h-100">
              <Form className="d-none d-md-flex align-items-center pe-3">
                <fieldset className="position-relative d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className={`formNavbar ${classes.formNavbar}`}
                  />
                  <img
                    src={iconSearch}
                    aria-hidden="true"
                    alt="search"
                    className={classes.iconSearch}
                  />
                  <Button className={`fw-bold ${classes.btnNavbarSearch}`}>
                    Search
                  </Button>
                </fieldset>
              </Form>
              <div
                className={`h-100 w-100 pe-3 d-flex justify-content-center align-items-center ${classes.containerProfile}`}>
                <Dropdown as={NavItem}>
                  <Dropdown.Toggle className="bg-white border-0 d-flex align-items-center admin-menu">
                    <div
                      className={`rounded-circle d-flex justify-content-center align-items-center ${classes.ImageProfileNavbar}`}>
                      R
                    </div>
                    <div className={`px-2 text-dark ${classes.profileNavbar}`}>
                      Marcus Raspot
                    </div>
                    <img
                      src={iconDropdown}
                      aria-hidden="true"
                      alt="icon-navbar"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogoutAdmin}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarAdmin;
