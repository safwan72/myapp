import React from 'react'
import Routes from './Routes';
import { connect } from 'react-redux';
import * as actions from '../../components/redux/actioncreator'
import Footer from './Footer/Footer';
const mapStateToProps = (state)=>{
    return{
        token: state.token,
        user_details:state.user_details,
        user_id: state.user_id,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        authcheck:()=>dispatch(actions.authcheck())
    }
}
const Body = (props) => {
    const {authcheck}=props;
    React.useEffect(() => {
        authcheck()
    }, [authcheck])
    return (
        <div>
            <Routes/>
            <Footer/>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Body);
