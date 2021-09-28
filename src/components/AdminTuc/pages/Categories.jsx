import React from "react";
import axios from "axios";
import { HOSTURL } from "../../redux/hosturl";
import AddModalCategory from "../components/AddingModal/AddModalCategory";
import { CDataTable } from "@coreui/react";


const fields = [
  { key: "#" },
  { key: "id" },
  { key: "category name" },
  { key: "Active" },
  { key: "created" },
];

const Categories = () => {
  const [previouscategory, setpreviouscategory] = React.useState([]);
  const [modalopen, setmodalopen] = React.useState(false);
  const handleopen = () => {
    setmodalopen(!modalopen);
  };
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/categorycreate/`);
      setpreviouscategory(request.data);
    }
    getPosts();
  }, []);
  return (
    <div>
      <h2 className="page-header">Categories</h2>
      <button className='btn btn-danger w-25 mr-0' onClick={handleopen}>Add New Category </button>
          <AddModalCategory modalopen={modalopen} handleopen={handleopen}/>
      <div>
        <div className="table-wrapper">
          <CDataTable
            items={previouscategory}
            fields={fields}
            columnFilter
            tableFilter
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              'Active': (item) => <td>{item?.isActive ? "True" : "False"}</td>,
              "category name": (item) => <td>{item?.name}</td>,
              "#": (item, i) => <td>{i + 1}</td>,
              'created': (item, i) => <td>{item?.created_at}</td>,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
