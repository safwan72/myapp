import React from "react";
import "./section.css";
const Section = () => {
  return (
    <div className="py-5 section">
      <div className="container py-2">
        <div className="text-center">
          <span>Events</span>
          <h1>
            Enjoy <span className="text-danger">Our Events</span>
          </h1>
          <p style={{ width: "70%", margin: "auto", fontSize: "21px" }}>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>
      
      <div className='row my-5 py-5'>
<div className='col-md-5'>
    <div className='d-flex justify-content-center flex-column'>
    <h4> $200.99</h4>
    <h2> Guest Chef Night Party</h2>
    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
    <div className='lowertext mt-3'>
    <li><span><i className="fas fa-thumbs-up"></i></span>Away behind the word</li>
    <li><span><i className="fas fa-thumbs-up"></i></span>Bookmarksgrove right at the coast</li>
    <li><span><i className="fas fa-thumbs-up"></i></span>Separated they live</li>
    </div>
    </div>
</div>

<div className='col-md-1'></div>
<div className='col-md-6'>
    <img src='https://preview.colorlib.com/theme/meal2/images/xparty_2.jpg.pagespeed.ic.VGd3fPR10T.webp' alt='People Celebrating' className='celebimg'/>
</div>
      </div>
      </div>
    </div>
  );
};

export default Section;
