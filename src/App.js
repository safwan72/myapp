import React from 'react';
import Body from './components/Body/Body';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import * as ThemeAction from './components/redux/actioncreator'

const App=()=> {
  const u_id = useSelector(state => state.user_id);
  const user_details = useSelector(state => state.user_details);


  const dispatch = useDispatch()
  React.useEffect(() => {
    document.body.style.backgroundColor = "rgb(43, 42, 42)";  
    document.body.style.color = "white";  
     const handler=()=>{
      const totalScroll = document.documentElement.scrollTop;
      totalScroll > 150?document.getElementById("totopbtn").style.display = "inline":document.getElementById("totopbtn").style.display = "none"
    }
    window.addEventListener('scroll',handler)
    return ()=>window.removeEventListener('scroll',handler)
  }, [u_id,dispatch])
  React.useEffect(() => {
    dispatch(ThemeAction.rolebasedprofile(user_details?.role,u_id))

  }, [user_details,dispatch,u_id])

  const totopfun = () => {
    var rootElement = document.documentElement;
    // Scroll to top logic
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
     <Body/>
     <button className='btn btntop btn-danger' id='totopbtn' onClick={totopfun}><i className="fas fa-chevron-up"></i></button>
    </>
  );
}

export default App;
