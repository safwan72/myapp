import React from 'react'
import { CDataTable,CBadge} from '@coreui/react';
import axios from "axios";
import { HOSTURL } from "../../redux/hosturl";
const MyTable = () => {
      const [setcustomers, setsetcustomers] = React.useState([]);
      React.useEffect(() => {
      async function getDishes() {
          const request = await axios.get(`${HOSTURL}api/login/adminuser/`);
          setsetcustomers(request.data);
                }
        getDishes();
      }, []);
    
      const fields = [
        { key: 'username', _style: { width: '30%'} },
        { key: 'email', _style: { width: '30%'} },
        { key: 'roles', _style: { width: '20%'} },
        { key: 'Admin Status', _style: { width: '10%'} },
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
           
          }}
        />
              </div>
              </div>
      )
  }

export default MyTable
