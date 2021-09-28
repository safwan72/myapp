import React from "react";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import SingleDish from "./SingleDish";
import Spinner  from "../../Spinner/Spinner";
const ListMenu = () => {
  const [alldishes, setalldishes] = React.useState([]);
  const [dishstate, setdishstate] = React.useState({});
  
  React.useEffect(() => {
    async function getDishes() {
      const request = await axios.get(`${HOSTURL}api/main/dishmodel/`);
      setdishstate(request.data);
      setalldishes(request.data?.results);
    }
    getDishes();
  }, []);
  const [previouscategory, setpreviouscategory] = React.useState([]);
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/categorycreate/`);
      setpreviouscategory(request.data);
    }
    getPosts();
  }, []);

  const [previousdaytime, setpreviousdaytime] = React.useState([]);
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/daytimedish/`);
      setpreviousdaytime(request.data.daytimes);
    }
    getPosts();
  }, []);
  const handlenext=()=>{
    async function getPosts() {
      const request = await axios.get(`${dishstate?.next}`);
      setdishstate(request.data);
      setalldishes(request.data?.results);
        }
    getPosts();
  }
  const handleprevious=()=>{
    async function getDishes() {
      const request = await axios.get(`${dishstate?.previous}`);
      setdishstate(request.data);
      setalldishes(request.data?.results);
        }
    getDishes();
  }
  let mydish=null;
  if(alldishes!==null && alldishes.length!==0){
    mydish=(
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-1">
      {alldishes.map((item,i)=>{
        return(
          <SingleDish key={i} id={item.id} image={item.dish_picture} head={item.dish_name} price={item.price} new_price={item.new_price}/>
        )
      })}
    </div>
    )
  }
  else{
    mydish=(
      <div className='text-center'>
      <Spinner/>
      </div>
    )
  }
  if(dishstate?.count===0){
    mydish=(
      <h1 className='text-center'>No Dishes To Show</h1>
    )
  }
const handlebuttondropdown=(e)=>{
  async function getDishes() {
    const request =await axios.get(`${HOSTURL}api/main/daytime/${e}/`);
    setdishstate(request.data);
    setalldishes(request.data?.results);
  }
return getDishes();
}
const handlealldishes=(e)=>{
  async function getDishes() {
    const request =await axios.get(`${HOSTURL}api/main/dishmodel/`);
    setdishstate(request.data);
    setalldishes(request.data?.results);
  }
return getDishes();
}
const handlecategorydropdown=(e)=>{
  async function getDishes() {
    const request = await axios.get(`${HOSTURL}api/main/category/${e}/`);
    setdishstate(request.data);
    setalldishes(request.data?.results);
  }
return getDishes();
}
  return (
    <div className="menu">
      <div className="container py-5">
        <h1 className="text-center mt-3 mb-5">Have a Look at Our Menu</h1>
        <div className="row">
          <div className="col-md-2">
            <div className="d-flex justify-content-center flex-column">
              <button className="btn btn-secondary mb-5" type="button" onClick={handlealldishes}>
                All Dishes
              </button>
              <div className="dropdown mb-5">
                <button
                  className="btn btn-danger dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  See All Categories
                </button>
                <ul
                  className="dropdown-menu"
                  style={{zIndex:'1000'}}
                  aria-labelledby="dropdownMenuButton1"
                >
                  {previouscategory.map((item, i) => {
                    return (
                      <li key={i}>
                        <button className="dropdown-item" onClick={()=>handlecategorydropdown(item.id)}>
                          {item.name}
                        </button>
                      </li>
                    );
                  })}{" "}
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  See All Available Daytimes
                </button>
                <ul
                  className="dropdown-menu zindex-3"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {previousdaytime.map((item, i) => {
                    return (
                      <li key={i}>
                        <button className="dropdown-item" onClick={()=>handlebuttondropdown(item.id)}>
                          {item.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className='mb-4'>
              {dishstate.previous ? (
                <span onClick={handleprevious}>
                  <i className="fas fa-chevron-left mx-3 iconsss"></i>
                </span>
              ) : null}
              {dishstate.next ? (
                <span onClick={handlenext}>
                  <i className="fas fa-chevron-right mx-3 iconsss"></i>
                </span>
              ) : null}
            </div>
                {mydish}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
