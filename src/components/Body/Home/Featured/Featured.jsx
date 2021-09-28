import React from "react";
import SingleFeatured from "./SingleFeatured";
import axios from "axios";
import { HOSTURL } from "../../../redux/hosturl";
import Spinner from '../../Spinner/Spinner'
const Featured = () => {
  const [featured, setfeatured] = React.useState([]);
  React.useEffect(() => {
    async function getPosts() {
      const request = await axios.get(`${HOSTURL}api/main/featuredishes/`);
      setfeatured(request.data);
    }
    getPosts();
  }, []);
  return (
    <div className="container py-3 featured">
      <div className='my-5'>
        <h1 className='mb-5 text-center pb-3'>Featured Dishes</h1>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {featured && featured.length > 0 ? (
              featured.map((item, i) => {
                return (
                  <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i} data-bs-interval="10000">
                    <div className="row">
                      <SingleFeatured
                        image={item.dish_picture}
                        header={item.dish_name}
                        price={item.price}
                        new_price={item.new_price}
                      />{" "}
                    </div>
                  </div>
                );
              })

            ) : (
              <Spinner />
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Featured;
