import React from "react";
import "./delivery.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import { useHistory } from "react-router-dom";
import Navbar from "../../Home/Header/Navbar";

const Delivery = () => {
  const [myorder, setmyorder] = React.useState([]);
  const [mycart, setmycart] = React.useState([]);
  const u_id = useSelector((state) => state.user_id);
  let history = useHistory();

  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/order/my_cart/${u_id}/`);
      setmyorder(request.data.order);
      setmycart(request.data.order?.items);
    }
    getPosts();
  }, [u_id]);

  const handlecheckout = () => {
    async function getPosts() {
      const request = await axios.post(`${HOSTURL}api/order/checkout/${u_id}/`);
      if (request.status === 200 && request.data.status === "ok") {
        history.push("/home");
      }
    }
    getPosts();
  };

  return (
    <>
      <Navbar />
      <div className="delivery">
        <div className="inndelivery">
          <div className="container">
            <h1 className="text-center mb-3"> Delivery Information</h1>
            <div className="row my-5 py-5">
              <div className="col-md-5">
                <h2 className="text-center mb-4">Order Details</h2>
                <div className="card">
                  <div className="card-body">
                    {mycart?.map((item, i) => {
                      return (
                        <div className="row" key={i}>
                          <div className="col-sm-8">
                            <p>
                              {item.dish?.dish_name} * {item?.quantity}{" "}
                            </p>
                          </div>
                          <div className="col-sm-1"></div>
                          <div className="col-sm-3">
                            <p>{item?.dish_total}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-6">
                <h2 className="text-center mb-4">Billing Details</h2>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-4">
                        <h4>Address</h4>
                      </div>
                      <div className="col-sm-1"></div>
                      <div className="col-sm-7">
                        <p>
                          {myorder?.shipping_address ? (
                            myorder?.shipping_address
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <h4>Total Discount</h4>
                      </div>
                      <div className="col-sm-1"></div>
                      <div className="col-sm-7">
                        <p>
                          {myorder?.coupon
                            ? `${myorder?.coupon?.code} X ${myorder?.coupon?.amount}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <h4>Delivery Charge</h4>
                      </div>
                      <div className="col-sm-1"></div>
                      <div className="col-sm-7">
                        <p>{myorder?.delivery_charge}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <h4>Total Bill</h4>
                      </div>
                      <div className="col-sm-1"></div>
                      <div className="col-sm-7">
                        <p>{myorder?.total_price_after_discount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-danger float-end w-25 mb-5"
                onClick={handlecheckout}
              >
                CheckOut
              </button>
              <button
                className="btn btn-warning float-end w-25 ms-3 mb-5"
                onClick={()=>{
                  history.push('/cart')
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
