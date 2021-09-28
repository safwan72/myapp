import React from 'react'
import axios from "axios";
import { HOSTURL } from "../redux/hosturl";
import { useSelector } from "react-redux";
import { CDataTable } from '@coreui/react';
import Navbar from "../Body/Home/Header/Navbar";
import { useHistory } from "react-router-dom";

const StaffPrevious = () => {
    const [myorder, setmyorder] = React.useState([]);
    const u_id = useSelector((state) => state.user_id);
    let history = useHistory();

    React.useEffect(() => {
      async function getPosts() {
        const request = await axios.get(
          `${HOSTURL}api/order/staff_prvious_orders/${u_id}/`
        );
        setmyorder(request.data);
      }
      getPosts();
    }, [u_id]);
    const fields = [
        { key: '#', _style: { 'width': '2%' } },
        { key: 'Order Id' },
        { key: 'User Details' },
        { key: 'Dishes', _style: { 'width': '15%' } },
        { key: 'Total Price' },
        { key: 'Discount' },
        { key: 'Coupon' },
        { key: 'Address', _style: { 'width': '3%' } },
        { key: 'Order Status' },
        { key: 'Order Date' },
    
    
      ]
    return (
        <div>
      <Navbar />
      <div className="delivery">
        <div className="inndelivery">
          <div className="container">
            <h1 className="text-center my-5"> Previous Orders </h1>
            <div className='justify-content-end  d-flex'>
            <button className='btn btn-warning' style={{marginRight:'20px'}} onClick={()=>{
                history.goBack();
            }}>
              Back to Orders
            </button>
            </div>
            <div className='stafforder'>
              <div className="table-wrapper">
                <CDataTable
                  items={myorder}
                  fields={fields}
                  columnFilter
                  tableFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  scopedSlots={{
                    '#':
                      (item, id) => {
                        return (
                          <td>
                            {id + 1}
                          </td>
                        )
                      },
                    'Order Id':
                      (item, id) => (
                        <td>
                          <b>{item?.id}</b>
                        </td>
                      ),
                    'User Details':
                      (item) => (
                        <td><p>{item?.user?.user?.username}</p>
                          <p>{item?.user?.user?.email}</p></td>
                      ),
                    'Dishes':
                      (item, i) => (
                        <td>
                          {item?.items?.map((dish, id) => {
                            return (
                              <p key={id}>{`${dish?.dish?.dish_name} X ${dish?.quantity} = ${dish?.dish?.new_price}`}</p>
                            )
                          })}

                        </td>
                      ),
                    'Total Price':
                      (item, i) => (
                        <td>
                          <p>{item?.total_price_after_discount}</p>
                        </td>
                      ),
                    'Discount':
                      (item, i) => (
                        <td>
                          <p>{item?.total_price - item?.total_price_after_discount}</p>
                        </td>
                      ),
                    'Coupon':
                      (item, i) => (
                        <td>
                          <p>{`${item?.coupon?.code} X ${item?.coupon?.amount}`}</p>
                        </td>
                      ),
                    'Address':
                      (item, i) => (
                        <td>
                          <p>{item?.shipping_address}</p>
                        </td>
                      ),
                    'Order Status':
                      (item, i) => (
                        <td>
                          <p>{item?.order_status}</p>
                        </td>
                      ),
                    'Order Date':
                      (item, i) => (
                        <td>
                          <p>{item?.start_date}</p>
                        </td>
                      ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default StaffPrevious
