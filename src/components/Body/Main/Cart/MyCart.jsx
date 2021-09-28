import React from "react";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomerDetails from "./CustomerDetails";
import CustomerNewAddonVariant from "./CustomerNewAddonVariant";
const MyCart = () => {
  const [mycart, setmycart] = React.useState([]);
  const [myorder, setmyorder] = React.useState([]);
  const u_id = useSelector((state) => state.user_id);
  let history = useHistory();
  const [smShow, setSmShow] = React.useState(false);
  const [addvar, setaddvar] = React.useState(false);
  const [doreload, setdoreload] = React.useState(false);
  const [selectedcartcart, setselectedcartcart] = React.useState();
  const [selectedcartdish, setsetselectedcartdish] = React.useState();
  const handlesmshow = () => {
    setSmShow(!smShow);
  };
  const handleaddvar = () => {
    setaddvar(!addvar);
  };
  const val = {
    id: u_id,
  };
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/order/my_cart/${u_id}/`);
      setmyorder(request.data.order);
      setmycart(request.data.order?.items);
    }
    getPosts();
  }, [u_id, doreload]);
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const handlereload = () => {
    setdoreload(!doreload)
  }
  return (
    <div className="my-5 py-5 cartmy">
      <div className="container">
        {mycart && mycart.length > 0 ? (
          <div className="table-responsive">
            <table className="table mytable">
              <thead className="mytablehead">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">Dish</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Addons</th>
                  <th scope="col">Variants</th>
                  <th scope="col">Price</th>
                  <th scope="col">Addon/Variant</th>
                </tr>
              </thead>
              <tbody className="align-items-center">
                {mycart?.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <img
                        src={item.dish?.dish_picture}
                        alt={item.dish?.dish_name}
                        className=" tableimg"
                      />
                    </td>
                    <td>{item.dish?.dish_name}</td>
                    <td>
                      <span
                        className="cartincrease"
                        onClick={() => {
                          async function getPosts() {
                            const request = await axios.post(
                              `${HOSTURL}api/order/add_dish/${item.dish?.id}/`,
                              val,
                              header
                            );
                            setmyorder(request.data.order);
                            setmycart(request.data.order?.items);
                          }
                          getPosts();
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </span>
                      {item.quantity}
                      <span
                        className="cartdecrease"
                        onClick={() => {
                          async function getPosts() {
                            const request = await axios.post(
                              `${HOSTURL}api/order/decrease_dish/${item.dish?.id}/`,
                              val,
                              header
                            );
                            setmyorder(request.data.order);
                            setmycart(request.data.order?.items);
                          }
                          getPosts();
                        }}
                      >
                        <i className="fas fa-minus"></i>
                      </span>
                    </td>
                    <td>
                      {item?.dish_addons?.length > 0 && item?.dish_addons ? (
                        item?.dish_addons?.map((addon, addkey) => {
                          return (
                            <p
                              key={addkey}
                            >{`${addon.name} X ${addon.price}\n`}</p>
                          );
                        })
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td>
                      {item?.dish_variants?.length > 0 &&
                        item?.dish_variants ? (
                        item?.dish_variants?.map((addon, addkey) => {
                          return (
                            <p
                              key={addkey}
                            >{`${addon.variant_name} X ${addon.price}\n`}</p>
                          );
                        })
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td>{item?.dish_total}</td>
                    <td>
                      {addvar ? (
                        <CustomerNewAddonVariant
                          modalopen={addvar}
                          handleopen={handleaddvar}
                          cart={selectedcartcart}
                          dish={selectedcartdish}
                          handlereload={handlereload}
                        />
                      ) : (
                        null
                      )}
                      <span
                        className="badge bg-danger ms-2 my-3"
                        style={{ cursor: "pointer" }}
                        onClick={()=>{
                          handleaddvar();
                          setselectedcartcart(item)
                          setsetselectedcartdish(item.dish?.id)
                        }}
                      >
                        New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="text-center">No Items In Cart</h1>
        )}
      </div>
      {mycart && mycart.length > 0 ? (
        <div className="container mt-5">
          <div className="d-flex justify-content-end align-items-center">
            <div>
              <div className="card" style={{ width: "250px" }}>
                <div className="card-body">
                  <h2 className="text-center mb-4">Cart Total</h2>
                  <div className="d-flex flex-row align-items-center">
                    <p style={{ width: "60%" }}>Subtotal</p>
                    <p style={{ width: "40%" }}>{myorder?.total_price}</p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p style={{ width: "60%" }}>Delivery</p>
                    <p style={{ width: "40%" }}>{myorder?.delivery_charge}</p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p style={{ width: "60%" }}>Coupon</p>
                    <p style={{ width: "40%" }}>
                      {myorder?.coupon
                        ? `${myorder?.coupon?.code} X ${myorder?.coupon?.amount}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p style={{ width: "60%" }}>Total</p>
                    <p style={{ width: "40%" }}>
                      {myorder?.total_price_after_discount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="float-end">
            <button className="btn btn-danger" onClick={handlesmshow}>
              Proceed To Checkout
            </button>
          </div>
          <CustomerDetails
            smShow={smShow}
            setSmShow={handlesmshow}
            history={history}
            u_id={u_id}
            myorder={myorder}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MyCart;
