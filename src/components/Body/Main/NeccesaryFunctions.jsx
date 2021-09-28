import axios from "axios";
import { HOSTURL } from "../../redux/hosturl";

const header = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const handledecrease = (id, val,history) => {
  return axios
    .post(`${HOSTURL}api/order/decrease_dish/${id}/`, val, header)
    .then((res) => {
      history.push('/cart')

    })
    .catch((err) => {      history.push('/cart')});
};
export const handleincrease = (id, val,history) => {
    async function getPosts() {
        const request = await axios.post(`${HOSTURL}api/order/add_dish/${id}/`, val, header)
            
        if(request.status===200){
          history.push('/cart')
        }
        }
      return  getPosts()
};
