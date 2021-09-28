import React from "react";
import Navbar from "../Body/Home/Header/Navbar";
import axios from "axios";
import { HOSTURL } from "../redux/hosturl";
import { useSelector } from "react-redux";
import { CDataTable } from '@coreui/react';
import './staff.css'
import EditOrderStaff from "./EditOrderStaff";
import { useHistory } from "react-router-dom";

const StaffOrders = () => {
  const [myorder, setmyorder] = React.useState([]);
  const u_id = useSelector((state) => state.user_id);
  let history = useHistory();

  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(
        `${HOSTURL}api/order/order_Assigned_to/${u_id}/`
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

  // const getBadge = (roles)=>{
  //   switch (roles) {
  //     case 'Admin': return 'danger'
  //     case 'Customer': return 'success'
  //     case 'Staff': return 'warning'
  //     default: return 'primary'
  //   }
  // }
  const [open, setopen] = React.useState(false)
  const [myid, setmyid] = React.useState(0)
  const [myitem, setmyitem] = React.useState(null)

  const handleOpen = (id, item) => {
    setopen(!open)
    setmyid(id)
    setmyitem(item)
  }

  return (
    <div>
      <Navbar />
      <div className="delivery">
        <div className="inndelivery">
          <div className="container">
            <h1 className="text-center my-5"> All Assigned Orders </h1>
            <div className='justify-content-end  d-flex'>
            <button className='btn btn-danger' style={{marginRight:'20px'}} onClick={()=>{
              history.push('/staffpreviousorders')
            }}>
              See Previous Orders
            </button>
            </div>
            {/* <div className="table-responsive">
              <table className="table mytable">
                <thead className="mytablehead">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order Id</th>
                    <th scope="col">User Details</th>
                    <th scope="col">Dishes</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Coupon</th>
                    <th scope="col" style={{width:'15px'}}>Address</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Order Date</th>
                  </tr>
                </thead>
                <tbody className="align-items-center">
                  {myorder?.map((item, i) => 
                  (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <b>{item?.id}</b>
                      </td>
                      <td><p>{item?.user?.user?.username}</p>
<p>{item?.user?.user?.email}</p></td>
<td>
{item?.items?.map((dish,id)=>{
   return (
    <p key={id}>{`${dish?.dish?.dish_name} X ${dish?.quantity} = ${dish?.dish?.new_price}`}</p>
)
})}
                      
                      </td>
                      <td>
                      <p>{item?.total_price_after_discount}</p>
                      </td>
                      <td>
                      <p>{item?.total_price-item?.total_price_after_discount}</p>
                      </td>
                      <td>
                      <p>{`${item?.coupon?.code} X ${item?.coupon?.amount}`}</p>
                      </td>
                      <td style={{width:'15px'}}>
                      <p>{item?.shipping_address}</p>
                      </td>
                      <td>
                        <p>{item?.order_status}</p>
                      </td>
                      <td>
                      <p>{item?.start_date}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <div className='stafforder'>
              <div className="table-wrapper">
                <EditOrderStaff open={open} handleopen={handleOpen} id={myid} u_id={u_id} myitem={myitem} />
                <CDataTable
                  items={myorder}
                  fields={fields}
                  columnFilter
                  tableFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  onRowClick={(item) => { handleOpen(item?.id, item) }}
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
  );
};

export default StaffOrders;
