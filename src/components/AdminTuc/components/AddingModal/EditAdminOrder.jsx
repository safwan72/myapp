import React from 'react'
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import { Formik} from "formik";
import { useHistory } from "react-router-dom";

const EditAdminOrder = (prop) => {
  let history = useHistory();
  const id=prop.match.params.id;
    const [myorder, setmyorder] = React.useState({});
    const deloptions=[
      {
        'name':'UnConfirmed',
        'value':'UnConfirmed'
      },
      {
        'name':'Shipped',
        'value':'Shipped'
      },
      {
        'name':'Delivered',
        'value':'Delivered'
      },
      {
        'name':'Receieved',
        'value':'Receieved'
      }
    ]
    // all_staffs
    React.useEffect(() => {
        async function getPosts() {
          const request = await axios.get(`${HOSTURL}api/order/order_by_id/${id}/`);
          setmyorder(...request.data);
        }
        getPosts();
      }, [id]);

    const [staffs, setstaffs] = React.useState([])
      React.useEffect(() => {
        async function getPosts() {
          const request = await axios.get(`${HOSTURL}api/login/all_staffs/`);
          setstaffs(request.data);
        }
        getPosts();
      }, []);

    return (
        <div>
          <h1 className='text-center mb-4'>My Order</h1>
          <Formik
          enableReinitialize
        initialValues={{
          user: myorder?.user?.user?myorder?.user?.user?.username:'',
          items: myorder?.items?.length,
          total_price: myorder?.total_price_after_discount?myorder?.total_price_after_discount:0,
          coupon: myorder?.coupon?.code?myorder?.coupon?.code:'',
          order_status: myorder?.order_status?myorder?.order_status:false,
          shipping_address: myorder?.shipping_address?myorder?.shipping_address:'',
          delivery_charge: myorder?.delivery_charge?myorder?.delivery_charge:0,
          delivered: myorder?.delivered?myorder?.delivered:false,
          assigned_to:myorder?.assigned_to?myorder?.assigned_to?.id:''
        }}
        onSubmit={(values,{resetForm}) => {
          const value={
            user:myorder?.user?.user?.email,
            order_status:[...values.order_status][0],
            delivered:values.delivered,
            delivery_charge:values.delivery_charge,
            assigned_to:(values.assigned_to)
          }
          // console.log(value)
          // order_by_id_edit
          const header = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          async function getPosts() {
            const request = await axios.put(`${HOSTURL}api/order/order_by_id_edit/${id}/`,value,header);
            if(request.status===200){
              history.push('/admin')
            }
          }
          getPosts();
}}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Customer Name
              </label>
              <input
                type="text"
                id="username"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.user}
                className="form-control"
                name="user"
                disabled
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="totalprice"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Total Price
              </label>
              <input
                type="number"
                id="totalprice"
                className="form-control"
                name="total_price"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.total_price}
                placeholder="Your Total Price"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="deliverycharge"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Edit Delivery Charge 
              </label>
              <input
                type="number"
                id="deliverycharge"
                className="form-control"
                name="delivery_charge"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.delivery_charge}
                placeholder="Enter Delivery Charge"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="orderstatus"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Select Order Status
              </label>
              <select
                id="orderstatus"
                className="form-select"
                name="order_status"
                onChange={(event) =>{
                  let values = [...event.target.selectedOptions].map(opt => opt.value);
                  props.setFieldValue('order_status',values)
                }}
                onBlur={props.handleBlur}
                value={props.values.order_status}
                aria-label="Change Order Status"
              >
                {deloptions.map((item, i) => {
                  return (
                    <option defaultValue={myorder?.order_status} value={item.value} key={i}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="assignorder"
                className="form-label"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Select Assigned Staff to Deliver
              </label>
              <select
                id="assignorder"
                className="form-select"
                name="assigned_to"
                onChange={(event) =>{
                  props.setFieldValue('assigned_to',event.target.value)
                }}
                onBlur={props.handleBlur}
                value={props.values.assigned_to}
                aria-label="Assign Staff"
              >
                {staffs.map((item, i) => {
                  return (
                    <option defaultValue={myorder?.assigned_to?.user?.username} value={item.id} key={i}>
                      {item.user.username}
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
                id="deliverycheck"
                name="delivered"
                checked={props.values.delivered?true:false}
              />
              <label
                className="form-check-label"
                htmlFor="deliverycheck"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Check If Order is Delivered
              </label>
            </div>
            
            <button type="submit" className="btn btn-danger my-3">
              Add
            </button>
            <button type="button" className="ms-3 btn btn-warning my-3" onClick={()=>history.goBack()}>
              Cancel
            </button>
          </form>
        )}
      </Formik>
        </div>
    )
}

export default EditAdminOrder
