import React, {useEffect} from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import * as ThemeAction from '../../../redux/actioncreator'

const Layout = () => {
    const u_id = useSelector(state => state.user_id);
    const user_details = useSelector(state => state.user_details);

    const mode = useSelector(state => state.mode)
    const color = useSelector(state => state.color)

    const dispatch = useDispatch()
    const user_profile = useSelector(state => state.user_profile);
const [sidebar, setsidebar] = React.useState(false)
    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
        dispatch(ThemeAction.rolebasedprofile(user_details?.role,u_id))

    }, [dispatch,u_id,user_details])

const handlesidebar=()=>{
    setsidebar(!sidebar)
}

    return (
            <Route render={(props) => (
                <div className={`layout ${mode} ${color}`}>
                    <Sidebar {...props} myprop={sidebar}/>
                    <div className={`layout__content ${sidebar?'layout__content_second':''}`}>
                        <TopNav user_profile={user_profile} handlesidebar={handlesidebar}/>
                        <div className="layout__content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
    )
}

export default Layout
