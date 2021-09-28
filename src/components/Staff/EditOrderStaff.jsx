import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { HOSTURL } from "../redux/hosturl";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const EditOrderStaff = ({ open, handleopen, id, u_id, myitem }) => {
    let history=useHistory();
  const deloptions = [
    {
      name: "UnConfirmed",
      value: "UnConfirmed",
    },
    {
      name: "Shipped",
      value: "Shipped",
    },
    {
      name: "Delivered",
      value: "Delivered",
    },
    {
      name: "Receieved",
      value: "Receieved",
    },
  ];

  return (
    <div>
      <Modal show={open} onHide={handleopen} size="xl" scrollable>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              order_id: myitem ? myitem?.id : "",
              customer_name: myitem ? myitem?.user?.user?.username : "",
              customer_email: myitem ? myitem?.user?.user?.email : "",
              total: myitem ? myitem?.total_price_after_discount : "",
              discount: myitem
                ? myitem?.total_price - myitem?.total_price_after_discount
                : "",
              coupon: myitem ? myitem?.coupon?.code : "",
              shipping_address: myitem ? myitem?.shipping_address : "",
              order_status: myitem ? myitem?.order_status : "",
              delivered: myitem ? myitem?.delivered : "",
            }}
            onSubmit={(values, { resetForm }) => {
              const header = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const data={
                'order_id':values.order_id,
                'order_status':values.order_status,
                'delivered':values.delivered
              }
              axios.post(`${HOSTURL}api/order/staff_change_status/${u_id}/`, data, header)
              .then((response) => {
                handleopen();
            history.push('/home')
              })
              .catch((error) => {
                console.log(error)  
                handleopen();
                history.push('/home')
              });
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="order_id"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Order Id
                  </label>
                  <input
                    type="number"
                    id="order_id"
                    className="form-control"
                    name="order_id"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.order_id}
                    disabled={props.values.order_id ? true : false}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="customer_name"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    disabled={props.values.customer_name ? true : false}
                    value={props.values.customer_name}
                    className="form-control"
                    name="customer_name"
                    placeholder="Enter Your Dish Name"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="customer_email"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Customer Email
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    disabled={props.values.customer_email ? true : false}
                    value={props.values.customer_email}
                    className="form-control"
                    name="customer_email"
                    placeholder="Customer Email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="total"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    id="total"
                    className="form-control"
                    name="total"
                    disabled={props.values.total ? true : false}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.total}
                    placeholder="Total"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="discount"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Total Discount
                  </label>
                  <input
                    type="number"
                    id="discount"
                    disabled={props.values.discount ? true : false}
                    className="form-control"
                    name="discount"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.discount}
                    placeholder="Total Discount"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="coupon"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Coupon
                  </label>
                  <input
                    type="text"
                    id="coupon"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.coupon}
                    disabled={props.values.coupon ? true : false}
                    className="form-control"
                    name="coupon"
                    placeholder="Coupon"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="shipping_address"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Shipping Address
                  </label>
                  <textarea
                    id="shipping_address"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.shipping_address}
                    className="form-control"
                    disabled={props.values.shipping_address ? true : false}
                    name="shipping_address"
                    placeholder="Shipping Address"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="statuselect"
                    className="form-label"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Select Order Status
                  </label>
                  <select
                    id="statuselect"
                    className="form-select"
                    name="dish_category"
                    onBlur={props.handleBlur}
                    value={props.values.order_status}
                    onChange={(event) => {
                      props.setFieldValue("order_status", event.target.value);
                    }}
                    aria-label="Select Order Status"
                  >
                    {deloptions.map((item, i) => {
                      return (
                        <option
                          defaultValue={myitem?.order_status}
                          value={item.name}
                          key={i}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.delivered}
                    type="checkbox"
                    id="delivered"
                    name="delivered"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="delivered"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Delivered?
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

export default EditOrderStaff;
