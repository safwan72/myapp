import React from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios";
import {HOSTURL} from '../../redux/hosturl'
import Navbar from '../Home/Header/Navbar';
import { useHistory } from "react-router-dom";

import {Alert} from 'react-bootstrap'
const Confirmation = (props) => {
    console.log(props);
    const location = useLocation();
    const [staffdetails, setstaffdetails] = React.useState('')
    const [staffmessage, setstaffmessage] = React.useState()
    const [staffcode, setstaffcode] = React.useState('')
    const [show, setShow] = React.useState(true);
    let history = useHistory();

    // staffupdate
    const id=props.match.params.id;
    React.useEffect(() => {
        async function getPosts() {
            const request = await axios.get(`${HOSTURL}api/login/staffupdate/${id}/`);
            setstaffdetails(request.data);
          }
          getPosts();
     }, [location,id]);
     const handleconf=()=>{
        const header = {
            headers: {
              "Content-Type": "application/json",
            },
          };
         const val={
             'code':staffcode
         }
        async function getPosts() {
            const request = await axios.post(`${HOSTURL}api/login/staff_confirmation/${id}/`,val,header);
            setstaffmessage(request.data.msg);
            setShow(true)
            setstaffcode()
            if(request.data.msg==='Confirmed'){
                setTimeout(() => {
                    history.push('/home')
                }, 3500);
            }
          }
          return getPosts()
     }
    return (
        <div>
         <Navbar/>
         <div className="delivery">
        <div className="inndelivery">
        
          <div className="container">
          <Alert variant={staffmessage==='Confirmed'?'success':'danger'} show={show} onClose={() => setShow(false)}  dismissible>
        <Alert.Heading>{staffmessage}</Alert.Heading>
      </Alert>
            <h1 className="text-center mb-3"> Confirmation On Staff Login</h1>
            <div className="mb-3">
              <label
                htmlFor="confcode"
                className="form-label"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Enter Staff Code
              </label>
              <input
                type="text"
                id="confcode"
                className="form-control"
                name="staffcode"
                onChange={(e)=>{
                    setstaffcode(e.target.value)
                }}
                value={staffcode}
                placeholder="Enter Staff Code"
                required
              />
            </div>
            <button type="button" onClick={handleconf} className="btn btn-danger my-3">
              Confirm
            </button>
        </div>   
        </div>   
        </div>   
        </div>   

    )
}

export default Confirmation
