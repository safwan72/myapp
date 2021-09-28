import React from 'react'
import { CDataTable,CBadge} from '@coreui/react';
import axios from "axios";
import { HOSTURL } from "../../redux/hosturl";
const Customers = () => {
 
      const [setcustomers, setsetcustomers] = React.useState([]);
      React.useEffect(() => {
      async function getDishes() {
          const request = await axios.get(`${HOSTURL}api/login/adminuser/`);
          setsetcustomers(request.data);
                }
        getDishes();
      }, []);
    
      const fields = [
        { key: '#',_style:{'width':'10%'}},
        { key: 'username'},
        { key: 'email'},
        { key: 'roles' },
        { key: 'Admin Status' },
      ]
    
      const getBadge = (roles)=>{
        switch (roles) {
          case 'Admin': return 'danger'
          case 'Customer': return 'success'
          case 'Staff': return 'warning'
          default: return 'primary'
        }
      }
    
      return (
        <div>
        <div className="table-wrapper">
        <CDataTable
          items={setcustomers}
          fields={fields}
          columnFilter
          tableFilter
          itemsPerPage={5}
          hover
          sorter
          pagination
          scopedSlots = {{
            'roles':
              (item)=>(
                <td>
                  <CBadge color={getBadge(item.roles)}>
                    {item.roles}
                  </CBadge>
                </td>
              ),
            'Admin Status':
              (item)=>(
                <td>
               {item.is_superuser?'True':'False'}
                </td>
              ),
              '#':
              (item,i)=>(
                <td>
                  {i+1}
                </td>
              ),
          }}
        />
              </div>
              </div>
      )
  }

export default Customers
