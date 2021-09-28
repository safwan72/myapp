import React from "react";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import { useSelector } from "react-redux";
import "./customerorder.css";
import Navbar from "../../Home/Header/Navbar";
const CustomerOrders = () => {
  const [myorder, setmyorder] = React.useState([]);
  const u_id = useSelector((state) => state.user_id);
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/order/my_orders/${u_id}/`);
      setmyorder(request.data.order);
    }
    getPosts();
  }, [u_id]);
  return (
    <>
    <Navbar/>
    <div className="customerorder">
      <div className="customerorderinner">
        <div className="container my-5 py-5">
            <h1 className='text-center mb-4'>Previous Orders</h1>
          {myorder ? (
            <div className="table-responsive table-dark">
              <table className="table mytable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Total Items</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Delivery Man</th>
                    <th scope="col">Delivered</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {myorder?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{item?.items?.length}</td>
                        <td>{item?.coupon?.amount}</td>
                        <td>{item?.total_price_after_discount}</td>
                        <td>{item?.order_status}</td>
                        <td>{item?.assigned_to?.user?.username}</td>
                        <td>{item?.delivered ? "True" : "False"}</td>
                        <td>8/6/2021</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className="text-center">No Previous Orders</h3>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CustomerOrders;
