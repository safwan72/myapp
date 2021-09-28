import React from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import { Formik } from "formik";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Spinner from '../../Spinner/Spinner'
const CustomerNewAddonVariant = ({ modalopen, handleopen, cart, dish, handlereload }) => {
  const [variants, setvariants] = React.useState([]);
  const u_id = useSelector(state => state.user_id);
  let history = useHistory();
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/variantcreate/`);
      setvariants(request.data);
    }
    getPosts();
  }, []);
  const [addons, setaddons] = React.useState([]);
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/addoncreate/`);
      setaddons(request.data);
    }
    getPosts();
  }, []);
  return (
    <Modal show={modalopen} onHide={handleopen} size='xl' scrollable>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {addons && addons.length>0 && variants && variants.length>0?(
                  <Formik
                  initialValues={{
                    dish_addons: cart?.dish_addons ? [...cart?.dish_addons?.map(item => { return item.name })] : [addons[0]?.name],
                    dish_variants: cart?.dish_variants ? [...cart?.dish_variants?.map(item => { return item.variant_name })] : [variants[0]?.variant_name],
                  }}
                  onSubmit={(values, { resetForm }) => {
                    let formData = new FormData();
                    formData.append("dish_addons", JSON.stringify(values.dish_addons));
                    formData.append("dish_variants", JSON.stringify(values.dish_variants));
                    formData.append("dish", dish);
                    const header = {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    };
        
                    axios.post(`${HOSTURL}api/order/add_variant_addons/${u_id}/`, formData, header)
                      .then((response) => {
                        if (response.status === 200) {
                          handleopen(false)
                          handlereload()
                          resetForm();
                          history.push('/cart')
        
                        }
                      })
                      .catch((error) => {
                        handleopen(false)
                        resetForm();
                        history.push('/cart')
                      });
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
        
                      <div className="mb-3">
                        <label
                          htmlFor="addonSelect"
                          className="form-label"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          Select Any Addons
                        </label>
                        <select
                          id="addonSelect"
                          className="form-select"
                          multiple
                          name="dish_category"
                          onChange={(event) => {
                            let values = [...event.target.selectedOptions].map(opt => opt.value);
                            props.setFieldValue('dish_addons', values)
                          }}
                          onBlur={props.handleBlur}
                          value={props.values.dish_addons}
                          aria-label="Select Addons"
                        >
                          {addons.map((item, i) => {
                            return (
                              <option value={item.name} key={i}>
                                {`${item.name} X ${item.price}`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
        
        
                      <div className="mb-3">
                        <label
                          htmlFor="variantSelect"
                          className="form-label"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          Select Any Variants
                        </label>
                        <select
                          className="form-select"
                          id="variantSelect"
                          multiple
                          name="dish_variants"
                          onChange={(event) => {
                            let values = [...event.target.selectedOptions].map(opt => opt.value);
                            props.setFieldValue('dish_variants', values)
                          }}
                          onBlur={props.handleBlur}
                          value={props.values.dish_variants}
                          aria-label="Select any Variant"
                        >
                          {variants.map((day, i) => {
                            return (
                              <option value={day.variant_name} key={i}>
                                {`${day.variant_name} X ${day.price}`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <button type="submit" className="btn btn-danger my-3">
                        Add
                      </button>
                    </form>
                  )}
                </Formik>
        
        ):(
          <Spinner/>
        ) }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleopen}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )
}

export default CustomerNewAddonVariant;
