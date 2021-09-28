import React from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
const CustomerDetails = ({ smShow, setSmShow, u_id,history,myorder }) => {
  const [coupon, setcoupon] = React.useState("");
  const [address, setaddress] = React.useState();
  const [couponmsg, setcouponmsg] = React.useState('');
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  React.useEffect(() => {
    setcoupon(myorder?.coupon?myorder?.coupon?.code:'')
    setcouponmsg(myorder?.coupon?myorder?.coupon?.code:'')
    setaddress(myorder?.shipping_address?myorder?.shipping_address:'')
  }, [myorder])
  const addCoupon = () => {

    const val = {
      coupon: coupon,
    };

    async function getDishes() {
      const request = await axios.put(
        `${HOSTURL}api/order/add_coupon/${u_id}/`,
        val,
        header
      );
      setcouponmsg(request.data.coupon);
    }
    return getDishes();
  };
  const addaddress = () => {
    const val = {
      address: address,
    };

    async function getDishes() {
      const request = await axios.put(
        `${HOSTURL}api/order/add_address/${u_id}/`,
        val,
        header
      );
      if(request.status===200){
          setaddress('')
          setcouponmsg('');
          history.push('/delivery')

      }
    }
    return getDishes();
  };
  return (
    <div>
      <Modal
        size="lg"
        className="customermodal"
        show={smShow}
        onHide={setSmShow}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label htmlFor="entercoupon" className="form-label">
                Enter Coupon
              </label>
              <div className="row">
                <div className="col-sm-9 my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="entercoupon"
                    aria-label="Sizing example input"
                    onChange={(event) => {
                      setcoupon(event.target.value);
                    }}
                    value={coupon}
                    disabled={couponmsg===true?true:false}
                  />
                </div>
                <div className="col-sm-3 my-3">
                  <button className="btn btn-danger" onClick={addCoupon}>
                    Add Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="shoppingaddress" className="form-label">
                Enter Your Shipping Address
              </label>
              <textarea
                className="form-control"
                id="shoppingaddress"
                rows="3"
                onChange={(event) => {
                    setaddress(event.target.value);
                  }}
                  value={address}
                required
              ></textarea>
            </div>
            <button type="button" className="btn btn-primary mt-4" onClick={addaddress}>
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerDetails;
