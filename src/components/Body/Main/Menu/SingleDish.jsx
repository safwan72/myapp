import React from 'react'
import './menu.css';
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { handledecrease, handleincrease } from '../NeccesaryFunctions'
const SingleDish = ({ id, image, head, price, new_price, ...props }) => {
  const u_id = useSelector((state) => state.user_id);
  const user_details = useSelector((state) => state.user_details);
  let history = useHistory();

  const val = {
    id: u_id
  }
  return (
    <div className="detail">
      <div className="col">
        <div className="card carddish">
          <Link to={`/dish/${id}/`} style={{ cursor: 'pointer' }}>
            <img src={image} className="card-img-top" alt={head} />
          </Link>
          <div className="card-body">
            <div className='d-flex flex-row justify-content-between align-items-center'>
              <div>
                <h5 className="card-title">{head}</h5>
                <p className="card-text"><span style={{ textDecoration: 'line-through' }} className='oldprice'>{price} </span>{new_price}</p>
              </div>
              {user_details?.role === 'Customer' ? (
                <div>
                  <span className='addicon' onClick={() => { handleincrease(id, val, history) }} style={{ cursor: 'pointer' }}><i className="fas fa-plus"></i></span>
                  <span className='minusicon' onClick={() => { handledecrease(id, val, history) }} style={{ cursor: 'pointer' }}><i className="fas fa-minus"></i></span>
                </div>
              ) : null}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleDish
