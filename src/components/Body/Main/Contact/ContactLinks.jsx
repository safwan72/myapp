import React from "react";
import link from "./links";
const ContactLinks = () => {
  return (
    <div className="container">
      <div className="d-flex flex-column">
        {link.map((item, i) => {
          return (
            <div key={i} className="myclass">
              <div className="icony mt-3"><i className={"fas "+item.icon}></i></div>
              <div className="texty ms-4">
                <div className="d-flex flex-column">
                  <h5>{item.head}</h5>
                  <p>{item.firsttext}</p>
                  <p>{item.secondtext?item.secondtext:null}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactLinks;
