import React from 'react'
import { CDataTable} from '@coreui/react';

import axios from 'axios';
import { HOSTURL } from "../../redux/hosturl";

import AddAdminDish from '../components/AddingModal/AddAdminDish';

const fields = [
    { key: '#' },
    { key: 'id' },
    { key: 'dish_name' , _style: { width: '10%'}},
    { key: 'dish_daytime', _style: { width: '10%'} },
    { key: 'dish_category' , _style: { width: '10%'}},
    { key: 'price' },
    { key: 'new_price' },
    { key: 'discount (%) ' },
    { key: 'dish_tax (%) ' },
    { key: 'dish_vat (%) ' },
    { key: 'availability' },
    { key: 'featured' },
  ]




// const customerTableHead = [
//     '',
//     'id',
//     'dish_name',
//     'dish_daytime',
//     'dish_category',
//     'price',
//     'new_price',
//     'discount (%) ',
//     'dish_tax',
//     'dish_vat',
//     'availability',
//     'featured',
// ]


// const renderBody = (item, index) => (
//     <tr key={index}>
//         <td>{index+1}</td>
//         <td>{item?.id}</td>
//         <td>{item?.dish_name}</td>
//         <td>{item?.dish_daytime?.length>0 && item?.dish_daytime?item?.dish_daytime.map((daytime,i)=>{
//              return(
//                 <p key={i}>{`${i+1} ${daytime?.name}`}</p>
//             )
//         }):'N/A'}</td>
//         <td>{item?.dish_category?.length>0 && item?.dish_category?item?.dish_category?.map((category,i)=>{
//              return(
//                 <p key={i}>{`${i+1} ${category?.name}`}</p>
//             )
//         }):'N/A'}</td>   
//         <td>{item?.price}</td>
//         <td>{item?.new_price}</td>
//         <td>{item?.discount}</td>
//         <td>{item?.dish_tax}</td>
//         <td>{item?.dish_vat}</td>
//         <td>{item?.availability?'True':'False'}</td>
//         <td>{item?.featured?'True':'False'}</td>
//     </tr>
// )


const Products = () => {
    const [previousdishes, setpreviousdishes] = React.useState([]);
    React.useEffect(() => {
      async function getPosts() {
        const request = await axios.get(`${HOSTURL}api/main/alldishes/`);
        setpreviousdishes(request.data);
      }
      getPosts();
    }, []);
    return (
<div>
            <h2 className="page-header">
                Dishes
            </h2>
                            <AddAdminDish/>
                            <div>
        <div className="table-wrapper">
        <CDataTable
          items={previousdishes}
          fields={fields}
          columnFilter
          tableFilter
          itemsPerPage={5}
          hover
          sorter
          pagination
          scopedSlots = {{
            '#':
              (item,i)=>(
                <td>{i+1}</td>
              ),
            'dish_daytime':
              (item)=>(
                <td>{item?.dish_daytime?.length>0 && item?.dish_daytime?item?.dish_daytime.map((daytime,i)=>{
                    return(
                       <p key={i}>{`${i+1} ${daytime?.name}`}</p>
                   )
               }):'N/A'}</td>
              ),
            'dish_vat (%) ':
              (item)=>(
                <td>{item?.dish_vat}</td>
              ),
            'discount (%) ':
              (item)=>(
                <td>{item?.discount}</td>
              ),
            'dish_tax (%) ':
              (item)=>(
                <td>{item?.dish_tax}</td>
              ),
            'dish_category':
              (item)=>(
                <td>{item?.dish_category?.length>0 && item?.dish_category?item?.dish_category?.map((category,i)=>{
                    return(
                       <p key={i}>{`${i+1} ${category?.name}`}</p>
                   )
               }):'N/A'}</td>   
              ),
            'availability':
              (item)=>(
                <td>{item?.availability?'True':'False'}</td> 
              ),
            'featured':
              (item)=>(
                <td>{item?.featured?'True':'False'}</td> 
              ),
           
          }}
        />
              </div>
              </div>
        </div>
    )
}

export default Products
