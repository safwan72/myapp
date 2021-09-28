import React from "react";
import "./footer.css";
import links from "./links";
const Footer = () => {
  return (
    <div className="footer py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex flex-column justify-content-center">
              <h3>
                About Meal <span className="text-danger">O.</span>
              </h3>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <p>
                <span>
                  <i className="fab fa-facebook iconyss"></i>
                </span>
                <span>
                  <i className="fab fa-whatsapp iconyss"></i>
                </span>
                <span>
                  <i className="fab fa-twitter iconyss"></i>
                </span>
                <span>
                  <i className="fab fa-instagram iconyss"></i>
                </span>
                <span>
                  <i className="fab fa-github iconyss"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <div className="d-flex flex-column justify-content-center">
              <h3>Projects</h3>
              {links.projects.map((item, i) => {
                return (
                  <li
                    style={{
                      listStyle: "none",
                      marginLeft: "12px",
                      color: "#ffd",
                    }}
                    key={i}
                  >
                    {item.name}
                  </li>
                );
              })}
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex flex-column justify-content-center">
              <h3>Services</h3>
              {links.services.map((item, i) => {
                return (
                  <li
                    style={{
                      listStyle: "none",
                      marginLeft: "12px",
                      color: "#ffd",
                    }}
                    key={i}
                  >
                    {item.name}
                  </li>
                );
              })}
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex flex-column justify-content-center">
              <h3>Contacts</h3>
              <p>43 Raymouth Rd. Baltemoer, London 3910</p>
              {links.contact.map((item, i) => {
                return (
                  <li
                    style={{
                      listStyle: "none",
                      marginLeft: "12px",
                      color: "#ffd",
                    }}
                    key={i}
                  >
                    {item.name}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center" style={{margin:'auto'}}>Copyright ©2021 All rights reserved || </p>
    </div>
  );
};

export default Footer;
