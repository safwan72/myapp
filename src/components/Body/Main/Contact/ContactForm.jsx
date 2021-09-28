import React from 'react'
import ContactLinks from './ContactLinks'

const ContactForm = () => {
    return (
        <div className='container py-4'> 
            <div className='container row'>
<div className='col-lg-5'>
<ContactLinks/>
</div>
<div className='col-lg-7'>
<form>
<div className="row my-3">
  <div className="col-sm-6">
    <input type="text" className="form-control" placeholder="Your Name" aria-label="Name"/>
  </div>
  <div className="col-sm-6">
    <input type="email" className="form-control" placeholder="Your Email" aria-label="Email"/>
  </div>
</div>
<div className="row my-3">
  <div className="col-sm">
    <input type="text" className="form-control" placeholder="Subject" aria-label="Subject"/>
  </div>
</div>
<div className="row my-3">
  <div className="col-sm">
  <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
  <label htmlFor="floatingTextarea2">Comments</label>
</div>  </div>
</div>
<div className='d-flex justify-content-start'>

  <button type="submit" className="btn btn-danger">Submit</button>
</div>
</form>
</div>
            </div>
        </div>
    )
}

export default ContactForm
