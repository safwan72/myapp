import React from 'react'
import {Modal,Button} from 'react-bootstrap';
import { Formik} from "formik";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import { useHistory } from "react-router-dom";

const AddModalCategory = ({ modalopen,handleopen}) => {

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
          picture: "",
          isActive: false,
        }}
        onSubmit={(values,{resetForm}) => {
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("isActive", values.isActive);
          if (values.picture !== "") {
            formData.append("picture", values.picture);
          }
//                   // http://127.0.0.1:8000/api/main/dishmodel/
const header = {
headers: {
"Content-Type": "application/json",
},
};
axios.post(`${HOSTURL}api/main/categorycreate/`, formData, header)
.then((response) => {
    handleopen()
  resetForm();
  history.push('/admin')

})
.catch((error) => {
handleopen()
history.push('/admin')
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
                Select New Category Name
              </label>
              <input
                type="text"
                id="dishNameSelect"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                className="form-control"
                name="name"
                placeholder="Enter Your Category Name"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="formFile"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Select Category Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                name="picture"
                required
                // onChange={props.handleChange}
                onBlur={props.handleBlur}
                onChange={(event) =>{
                  props.setFieldValue("picture", event.target.files[0]);
                }}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                onChange={props.handleChange}
                checked={props.values.isActive?true:false}
                onBlur={props.handleBlur}
                value={props.values.isActive}
                type="checkbox"
                id="flexCheckChecked"
                name="isActive"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckChecked"
                style={{ color: "black", fontWeight: "bold" }}
                
              >
                Check If you want Category to be Active
              </label>
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

export default AddModalCategory
