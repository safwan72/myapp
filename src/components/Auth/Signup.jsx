import React from "react";
import "./auth.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as actions from "../../components/redux/actioncreator";
import { connect } from "react-redux";
import axios from "axios";
import {HOSTURL} from '../redux/hosturl'
import { useHistory } from "react-router-dom";
import Navbar from '../Body/Home/Header/Navbar';
const mapDispatchToProps = (dispatch) => {
  return {
    auth: (val) => dispatch(actions.authload(val)),
  };
};


const schema = yup.object().shape({
  email: yup.string().required(),
});
const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      className="form-select"
    >
      <option value="Customer">Customer</option>
      <option value="Employee">Employee</option>
    </select>
  </>
));
const Signup = (props) => {
  const [status, setstatus] = React.useState("SignUp");
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handlestatus = () => {
    setstatus(status === "SignUp" ? "Login" : "SignUp");
  };
  const onSubmit = (data, e) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    e.preventDefault();
    if (status === "Login") {
      data = {
        email: data.email,
        password: data.password,
      };
      props.auth(data)
    }
    if (status === "SignUp") {
      data = {
        email: data.email,
        password: data.password,
        username: data.username,
        roles: data.roles,
      };
      axios.post(`${HOSTURL}api/login/newuser/`, data, header)
      .then(res=>{
        if(res.status===201 && res.data.roles==='Employee'){
          history.push(`/confirmation/${res.data.id}/`);        }
          else{
            history.push(`/signup`);   
          }
      })
      .catch(err=>{
        console.log(err)
      })
    }
    // const header = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // axios.post('http://127.0.0.1:8000/api/login/newuser/',data,header)
    // .then(res=>{
    //   console.log(res)
    // })
    // .catch(err=>{
    //   console.data(err)
    // })
    e.target.reset();
  };
  return (
    <div>
      <Navbar/>
    <div className="my-5 py-5">
      <div className="container my-5 py-5" style={{ paddingTop: "100px" }}>
        <div className="row-cols-sm-1 justify-content-center align-items-center">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="p-3">
              <button
                className="btn btn-danger my-3 w-100"
                type="button"
                onClick={handlestatus}
              >
                Switch to {status === "SignUp" ? "Login" : "SignUp"}
              </button>
              <input
                type="email"
                className="form-control my-2 rounded"
                placeholder="Enter Email"
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
              {status === "SignUp" ? (
                <>
                  <input
                    type="text"
                    className="form-control my-2 rounded"
                    placeholder="Enter Username"
                    {...register("username")}
                    required
                  />
                  <p>{errors.username?.message}</p>
                </>
              ) : null}

              <input
                type="password"
                className="form-control my-2 rounded"
                placeholder="Enter Password"
                {...register("password")}
              />
              {status === "SignUp" ? (
                <input
                  type="password"
                  className="form-control my-2 rounded"
                  placeholder="Confirm Password"
                  {...register("cpassword")}
                />
              ) : null}
              {status === "SignUp" ? (
                <Select label="Role: " {...register("roles")} />
              ) : null}
              <div className="d-flex justify-content-center pt-4">
                <input
                  type="submit"
                  className="btn btn-success rounded-3 "
                  value={status === "SignUp" ? "SignUp" : "Login"}
                  style={{
                    outline: "none",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Signup);
