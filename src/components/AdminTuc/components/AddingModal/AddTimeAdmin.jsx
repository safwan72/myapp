import React from 'react'
import {Modal,Button} from 'react-bootstrap';
import { Formik} from "formik";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import { useHistory } from "react-router-dom";
const AddTimeAdmin = ({ modalopen,handleopen}) => {
    let history = useHistory();

    return (
        <div>
             <Modal show={modalopen} onHide={handleopen} size='xl' scrollable>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body> 
           <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(values,{resetForm}) => {
          let formData = new FormData();
          formData.append("name", values.name);
//                   // http://127.0.0.1:8000/api/main/dishmodel/
const header = {
headers: {
"Content-Type": "application/json",
},
};
axios.post(`${HOSTURL}api/main/daytimecreate/`, formData, header)
.then((response) => {
    handleopen()
  resetForm();
  history.push('/admin')

})
.catch((error) => {
    resetForm();
    history.push('/admin')  
    handleopen()
});
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="dishNameSelect"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Select New Daytime
              </label>
              <input
                type="text"
                id="dishNameSelect"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                className="form-control"
                name="name"
                placeholder="Enter New Daytime"
                required
              />
            </div>
          
            <button type="submit" className="btn btn-danger my-3">
              Add
            </button>
          </form>
        )}
      </Formik>
</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleopen}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
        </div>
    )
}


export default AddTimeAdmin
