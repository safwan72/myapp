import React from 'react';
import {Link} from 'react-router-dom';
const Banner = ({captionhead,mainhead,para,buttontext}) => {
    return (
        <div className='banner'>
        <div className='d-flex justify-content-center align-items-center'>
            <div className="col-lg-12 text-center">
<span className="caption aos-init aos-animate" data-aos="fade-up" data-aos-delay="0">{captionhead}</span>
<h1 className="mb-4 heading text-white aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">{mainhead}</h1>
<div className="mb-4 text-white desc aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
<p>{para}</p>
</div>
<p className="mb-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300"><Link to="/" className="btn btn-danger">{buttontext}</Link></p>
</div>
        </div>
        </div>
    )
}

export default Banner
