import React from 'react'
import axios from "axios";
import { HOSTURL } from "../../redux/hosturl";
import AddTimeAdmin from '../components/AddingModal/AddTimeAdmin';
import { CDataTable} from "@coreui/react";

const fields = [
    { key: "#" ,_style:{'width':'10%'}},
    { key: "id" ,_style:{'width':'10%'}},
    { key: "daytime" },
    { key: "created" },
  ];



const Daytimes = () => {
    const [previousdaytime, setpreviousdaytime] = React.useState([]);
    const [modalopen, setmodalopen] = React.useState(false);
    const handleopen=()=>{
        setmodalopen(!modalopen)
      }
    React.useEffect(() => {
      async function getPosts() {
        const request = await axios.get(`${HOSTURL}api/main/daytimedish/`);
        setpreviousdaytime(request.data.daytimes);
      }
      getPosts();
    }, []);

    return (
        <div>
        <h2 className="page-header">
            customers
        </h2>
                <button className='btn btn-danger w-25 mr-0' onClick={handleopen}>Add New Daytime </button>
                    <AddTimeAdmin modalopen={modalopen} handleopen={handleopen}/>
                    <div>
        <div className="table-wrapper">
          <CDataTable
            items={previousdaytime}
            fields={fields}
            columnFilter
            tableFilter
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              'daytime': (item) =>         <td>{item?.name}</td>
              ,
              '#': (item,i) =>         <td>{i+1}</td>
              ,
              "category name": (item) => <td>{item?.name}</td>,
              'created': (item, i) =><td>{item?.created_at}</td>
            }}
          />
        </div>
      </div>
    </div>
    )
}

export default Daytimes
