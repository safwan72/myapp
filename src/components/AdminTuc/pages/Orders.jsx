import React from "react";
import { CDataTable} from "@coreui/react";
import axios from "axios";
import { HOSTURL } from "../../redux/hosturl";
import { useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";

// const customerTableHead = [
//   "",
//   "id",
//   "user",
//   "Total Items",
//   "Dishes",
//   "Total Price",
//   "Discount Total",
//   "After Discount Price",
//   "Coupon",
//   "Ref. Code",
//   "Order Status ",
//   "Shipping Address",
//   "Delivery Charge",
//   "Delivered",
//   "Received",
//   "Created At",
//   "Ordered At",
// ];
const fields = [
  { key: "#" },
  { key: "id" },
  { key: "user" },
  { key: "Total Items" },
  { key: "Dishes", _style: { width: "40%" } },
  { key: "Total Price" },
  { key: "Discount Total" },
  { key: "After Discount Price" },
  { key: "Coupon" },
  { key: "Ref. Code" },
  { key: "Order Status " },
  { key: "Shipping Address", _style: { width: "10%" } },
  { key: "Delivery Charge" },
  { key: "Delivered" },
  { key: "Received" },
  { key: "Created At" },
  { key: "Ordered At" },
];

// const renderHead = (item, index) => <th key={index}>{item}</th>;

// const renderBody = (item, index, handleopen) => (
//   <tr key={index} onClick={() => handleopen(item?.id)}>
//     <td>{index + 1}</td>
//     <td>{item?.id}</td>
//     <td>{item?.user?.email}</td>
//     <td>{item?.items?.length}</td>
//     <td>
//       {item?.items?.map((item, i) => {
//         return <p key={i}>{`${item?.dish?.dish_name} x ${item?.quantity}`}</p>;
//       })}
//     </td>
//     <td>{item?.total_price}</td>
//     <td>{item?.total_price - item?.total_price_after_discount}</td>
//     <td>{item?.total_price_after_discount}</td>
//     <td>
//       {item?.coupon ? `${item?.coupon?.code} X ${item?.coupon.amount}` : "N/A"}
//     </td>
//     <td>{item?.ref_code ? item?.ref_code : "N/A"}</td>
//     <td>{item?.order_status}</td>
//     <td>{item?.shipping_address}</td>
//     <td>{item?.delivery_charge}</td>
//     <td>{item?.delivered ? "True" : "False"}</td>
//     <td>{item?.received ? "True" : "False"}</td>
//     <td>{item?.start_date}</td>
//     <td>{item?.ordered_date}</td>
//   </tr>
// );

const Orders = () => {
  const [allorders, setallorders] = React.useState([]);
  const { path } = useRouteMatch();
  let history = useHistory();

  const handleOpen = (id) => {
    history.push(`${path}/${id}/`);
  };
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/order/all_orders/`);
      setallorders(request.data);
    }
    getPosts();
  }, []);
  return (
    <div>
      <h2 className="page-header">All Orders</h2>
      <div>
        <div className="table-wrapper">
          <CDataTable
            items={allorders}
            fields={fields}
            columnFilter
            tableFilter
            itemsPerPage={5}
            hover
            sorter
            pagination
            onRowClick={(item)=>{
                handleOpen(item?.id)
            }}
            scopedSlots={{
              "#": (item, i) => <td>{i + 1}</td>,
              "Order Status ": (item) => <td>{item?.order_status}</td>,
              "Ref. Code": (item) => (
                <td>{item?.ref_code ? item?.ref_code : "N/A"}</td>
              ),
              'Coupon': (item) => (
                <td>
                  {item?.coupon
                    ? `${item?.coupon?.code} X ${item?.coupon.amount}`
                    : "N/A"}
                </td>
              ),
              'user': (item) => <td>{item?.user?.email}</td>,
              "Discount Total": (item) => (
                <td>{item?.total_price - item?.total_price_after_discount}</td>
              ),
              "After Discount Price": (item) => (
                <td>{item?.total_price_after_discount}</td>
              ),
              "Total Price": (item) => <td>{item?.total_price}</td>,
              "Total Items": (item) => <td>{item?.items?.length}</td>,
              'Dishes': (item) => (
                <td>
                  {item?.items?.map((item, i) => {
                    return (
                      <p
                        key={i}
                      >{`${item?.dish?.dish_name} x ${item?.quantity}`}</p>
                    );
                  })}
                </td>
              ),
              "Shipping Address": (item) => <td>{item?.shipping_address}</td>,
              "Delivery Charge": (item) => <td>{item?.delivery_charge}</td>,
              'Delivered': (item) => (
                <td>{item?.delivered ? "True" : "False"}</td>
              ),
              'Received': (item) => <td>{item?.received ? "True" : "False"}</td>,
              "Created At": (item) => <td>{item?.start_date}</td>,
              "Ordered At": (item) => <td>{item?.ordered_date}</td>,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
