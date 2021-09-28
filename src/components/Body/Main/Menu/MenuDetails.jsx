import React from "react";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import Spinner from "../../Spinner/Spinner";
import "./menu.css";
import Navbar from "../../Home/Header/Navbar";
const MenuDetails = (props) => {
  const [dishstate, setdishstate] = React.useState({});
  React.useEffect(() => {
    async function getDishes() {
      const request = await axios.get(
        `${HOSTURL}api/main/dishes/${props.match.params.id}/`
      );
      setdishstate(...request.data);
    }
    return getDishes();
  }, [props.match.params.id]);
  return (
    <>
      <Navbar />
      <div className="container py-5 detail">
        <div className="py-5 mt-5">
          {(!dishstate) ? (
            <Spinner />
          ) : (
            <div className="card p-4">
              <div className="row g-2">
                <div className="col-md-4 detailmenuimg">
                  <img
                    src={`${dishstate?.dish_picture}`}
                    className="rounded-start"
                    alt={`${dishstate?.dish_name}`}
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6 dishdetail">
                  <div className="card-body">
                    <h2 className="text-center mb-4">
                      {dishstate?.dish_name}
                    </h2>
                    <div>
                      <div className='row mb-5 align-items-center'>
                        <div className='col-sm-4'>
                          <h4>Old Price</h4>
                        </div>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-6'>{dishstate?.price}</div>
                      </div>
                      <div className='row mb-5 align-items-center'>
                        <div className='col-sm-4'>
                          <h4>Total Discount</h4>
                        </div>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-6'>{dishstate?.discount} %</div>
                      </div>
                      <div className='row mb-5 align-items-center'>
                        <div className='col-sm-4'>
                          <h4>New Price</h4>
                        </div>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-6'>{dishstate?.new_price}</div>
                      </div>
                      <div className='row mb-5 align-items-center'>
                        <div className='col-sm-4'>
                          <h4>Category</h4>
                        </div>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-6 '>
                          {dishstate.dish_category?.map((item, i) => {
                            return (
                              <p key={i}>{item.name}</p>
                            )
                          })}
                        </div>
                      </div>
                      <div className='row mb-5 align-items-center'>
                        <div className='col-sm-4'>
                          <h4>Available Daytime</h4>
                        </div>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-6'>
                          {dishstate.dish_daytime?.map((item, id) => {
                            return (
                              <p key={id}>{item.name}</p>
                            )
                          })}                    </div>
                      </div>
                      <div className='row mb-5 align-items-start'>
                        <div className='col-sm-4 mt-4'>
                          <h4>Dish Description</h4>
                        </div>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-6'>{dishstate?.dish_description}</div>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </>
  );
};

export default MenuDetails;
