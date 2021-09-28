import React from "react";
import { Formik} from "formik";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import {Modal,Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const AddAdminDish = () => {
  const [modalopen, setmodalopen] = React.useState(false);
  const [previouscategory, setpreviouscategory] = React.useState([]);
  let history = useHistory();

  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/categorycreate/`);
      setpreviouscategory(request.data);
    }
    getPosts();
  }, []);

  const [previousdaytime, setpreviousdaytime] = React.useState([]);
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/daytimecreate/`);
      setpreviousdaytime(request.data);
    }
    getPosts();
  }, []);

  const handleopen=()=>{
    setmodalopen(!modalopen)
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        onClick={handleopen}
      >
        Add New Dish
      </button>     
        <Modal show={modalopen} onHide={handleopen} size='xl' scrollable>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body> 
           <Formik
        initialValues={{
          dish_name: "",
          dish_category:[ previouscategory?previouscategory[0]?.name:''],
          dish_daytime: [previousdaytime?previousdaytime[0]?.name:''],
          dish_picture: "",
          price: "",
          discount: "",
          dish_vat: "",
          dish_tax: "",
          dish_description: "",
          availability: false,
          featured: false,
        }}
        onSubmit={(values,{resetForm}) => {
          let formData = new FormData();
          formData.append("dish_name", values.dish_name);
          formData.append("dish_daytime", JSON.stringify(values.dish_daytime));
          formData.append("dish_category", JSON.stringify(values.dish_category));
          formData.append("dish_addons", JSON.stringify(values.dish_addons));
          formData.append("dish_variants", JSON.stringify(values.dish_variants));
          formData.append("dish_description", values.dish_description);
          formData.append("price", values.price);
          formData.append("discount", values.discount);
          formData.append("dish_vat", values.dish_vat);
          formData.append("dish_tax", values.dish_tax);
          formData.append("availability", values.availability);
          formData.append("featured", values.featured);
          if (values.dish_picture !== "") {
            formData.append("dish_picture", values.dish_picture);
          }
//                   // http://127.0.0.1:8000/api/main/dishmodel/
const header = {
headers: {
"Content-Type": "application/json",
},
};
axios.post(`${HOSTURL}api/main/dishmodel/`, formData, header)
.then((response) => {
if(response.data.message==='Added'){
setmodalopen(false)
  resetForm();
  history.push('/admin')

}
})
.catch((error) => {
  setmodalopen(false)
  resetForm();
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
                Select Dish Name
              </label>
              <input
                type="text"
                id="dishNameSelect"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                className="form-control"
                name="dish_name"
                placeholder="Enter Your Dish Name"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="categorySelect"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Select Any Category
              </label>
              <select
                id="categorySelect"
                className="form-select"
                multiple
                name="dish_category"
                onChange={(event) =>{
                  let values = [...event.target.selectedOptions].map(opt => opt.value);
                  props.setFieldValue('dish_category',values)
                }}
                onBlur={props.handleBlur}
                value={props.values.dish_category}
                aria-label="Select Category"
              >
                {previouscategory.map((item, i) => {
                  return (
                    <option value={item.name} key={i}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="categorySelect"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Select Any Daytime
              </label>
              <select
                className="form-select"
                id="daytimeSelect"
                multiple
                name="dish_daytime"
                onChange={(event) =>{
                  let values = [...event.target.selectedOptions].map(opt => opt.value);
                  props.setFieldValue('dish_daytime',values)
                }}
                onBlur={props.handleBlur}
                value={props.values.dish_daytime}
                aria-label="Select any Available Daytime"
              >
                {previousdaytime.map((day, i) => {
                  return (
                    <option value={day.name} key={i}>
                      {day.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="dish_description"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Enter Description about Dish
              </label>
              <textarea
                id="dish_description"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.dish_description}
                className="form-control"
                name="dish_description"
                placeholder="Enter Description about your Dish"
              />
            </div>
          
            <div className="mb-3">
              <label
                htmlFor="priceSelect"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Enter Dish Price
              </label>
              <input
                type="number"
                id="priceSelect"
                className="form-control"
                name="price"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.price}
                placeholder="Enter Your Dish Price"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="discountpriceSelect"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Enter Discount on Dish
              </label>
              <input
                type="number"
                id="discountpriceSelect"
                className="form-control"
                name="discount"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.discount}
                placeholder="Enter Discount on Your Dish in (%)"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="vatSelect"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Enter Vat upon Dish
              </label>
              <input
                type="number"
                id="vatSelect"
                className="form-control"
                name="dish_vat"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.dish_vat}
                placeholder="Enter Vat Upon Dish"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="taxSelect"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Enter Tax upon Dish
              </label>
              <input
                type="number"
                id="taxSelect"
                className="form-control"
                name="dish_tax"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.dish_tax}
                placeholder="Enter Tax Upon Dish"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="formFile"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Select your Dish Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                required
                name="dish_picture"
                onBlur={props.handleBlur}
                onChange={(event) =>{
                  props.setFieldValue("dish_picture", event.target.files[0]);
                }}
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.availability}
                type="checkbox"
                id="flexCheckCheckeddish"
                name="availability"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckCheckeddish"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Check If your Dish is Available
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.featured}
                type="checkbox"
                id="flexCheckChecked"
                name="featured"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckChecked"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Add This dish to Featured Items
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
  );
};

export default AddAdminDish;

