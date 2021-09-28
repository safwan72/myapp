import React from "react";
import Navbar from "../Home/Header/Navbar";
import "./profile.css";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import axios from "axios";
import { HOSTURL } from "../../redux/hosturl";
import { connect } from "react-redux";
import Spinner from '../Spinner/Spinner.js';
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        user_details: state.user_details,
        user_id: state.user_id,
    };
};

const Profile = (props) => {
    const [picstate, setpicstate] = React.useState(null);
    const [showpic, setshowpic] = React.useState(null);
    const { user_details } = props;
    const [userprofile, setuserprofile] = React.useState(null);
    const [userole, setuserole] = React.useState(null);
    const [loader, setloader] = React.useState(false);

    let history = useHistory();


    React.useEffect(() => {
        async function getDishes() {
            let url = null;
            switch (user_details?.role) {
                case 'Customer':
                    url = `${HOSTURL}api/login/customerupdate/${props.user_id}/`
                    break

                case 'Admin':
                    url = `${HOSTURL}api/login/adminuserupdate/${props.user_id}/`
                    break

                case 'Employee':
                    url = `${HOSTURL}api/login/staffupdate/${props.user_id}/`
                    break
                default:
                    break;
            }
            const request = await axios.get(url);
            setuserprofile(request.data);
            setshowpic(request.data?.profile_pic);
            setuserole(user_details?.role);
        }
        return getDishes();
    }, [props.user_id, user_details?.role]);


    return (
        <div>
            <Navbar />
            <div className="profile">
                <div className="profileinner">
                    <h1 className="text-center my-4">Your Profile                  
                        {userole === 'Employee' ? (
                    <span title="Verification Status" style={{cursor:'pointer'}}>
                            <>
                                {userprofile?.is_verified ? (
                                    <i className="fas fa-check-circle fa-md" style={{ color: 'green', marginLeft: '10px' }}></i>
                                ) : (
                                    <i className="fas fa-times fa-md" style={{ color: 'red', marginLeft: '10px' }} onClick={()=>{
                                        history.push(`/confirmation/${props.user_id}/`);    
                                    }}></i>
                                )}
                            </>
                    </span>
                        ) : null}
                    </h1>
                   
                    <div className="container my-5 py-5">
                        {loader ? (
                            <Spinner />
                        ) : (
                            <Formik
                                initialValues={{
                                    email: userprofile?.user ? userprofile?.user?.email : '',
                                    username: userprofile?.user ? userprofile?.user?.username : '',
                                    fullName: userprofile ? userprofile?.full_name : '',
                                    phone: userprofile ? userprofile?.phone : '',
                                    address: userprofile ? userprofile?.address : '',
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    let url = null;
                                    setloader(true);
                                    switch (userole) {
                                        case 'Customer':
                                            url = `${HOSTURL}api/login/customerupdate/${props.user_id}/`
                                            break

                                        case 'Admin':
                                            url = `${HOSTURL}api/login/adminuserupdate/${props.user_id}/`
                                            break

                                        case 'Employee':
                                            url = `${HOSTURL}api/login/staffupdate/${props.user_id}/`
                                            break
                                        default:
                                            break;
                                    }

                                    let formdata = new FormData();
                                    const user = {
                                        username: values.username,
                                        email: values.email,
                                    }
                                    formdata.append('user', user)
                                    formdata.append('full_name', values.fullName)
                                    formdata.append('address', values.address)
                                    formdata.append('phone', values.phone)
                                    if (picstate !== null) {
                                        formdata.append('profile_pic', picstate)
                                    }
                                    else {
                                        formdata.append('profile_pic', null)
                                    }

                                    axios.put(url, formdata)
                                        .then(res => {
                                            setuserprofile(res.data);
                                            setloader(false);

                                        })
                                        .catch(err => {
                                            console.log(err);
                                            setloader(false);

                                        })

                                }}
                                enableReinitialize
                            >
                                {(props) => (
                                    <form onSubmit={props.handleSubmit}>
                                        <div className="divdivimg mb-5">
                                            <div className="divimg">
                                                <img src={showpic} className="imgdiv" alt="username" />
                                                <input
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    id="icon-button-file"
                                                    type="file"
                                                    onChange={(event) => {
                                                        setshowpic(
                                                            URL.createObjectURL(event.target.files[0])
                                                        );
                                                        setpicstate(event.target.files[0]);

                                                    }}
                                                />
                                                <label
                                                    htmlFor="icon-button-file"
                                                    style={{
                                                        position: "absolute",
                                                        top: "40%",
                                                        left: "220px",
                                                    }}
                                                >
                                                    <i className="fas fa-camera fa-lg"></i>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                            <div className="col-sm-10">
                                                <input type="email"
                                                    className="form-control-plaintext" id="inputEmail" name='email' value={props.values.email} disabled style={{ color: "white" }} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputusername" className="col-sm-2 col-form-label">Username</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control-plaintext" id="inputusername" value={props.values.username} name='username' disabled style={{ color: "white" }} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputfullname" className="col-sm-2 col-form-label">FullName</label>
                                            <div className="col-sm-10">
                                                <input type="text" name='fullName' className="form-control" id="inputfullname" value={props.values.fullName} onChange={props.handleChange} style={{ color: "black" }} placeholder='Full Name' />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="number" name="phone" className="form-control" id="phone" value={props.values.phone} onChange={props.handleChange} style={{ color: "black" }} placeholder='Phone' />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputaddress" className="col-sm-2 col-form-label">Address</label>
                                            <div className="col-sm-10">
                                                <textarea className="form-control" value={props.values.address} id="inputaddress" rows="3" onChange={props.handleChange} placeholder='Address' name='address'></textarea>
                                            </div>
                                        </div>

                                        <div className="mt-5 text-center">
                                            <Button type="submit" variant="danger" className="w-50">
                                                Update
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Profile);
