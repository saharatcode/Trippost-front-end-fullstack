import {Redirect, Switch, Route, useNavigate} from 'react-router-dom'
import React from 'react'
//import ไฟล์ route จาก config folder
import ConfigRoutes from '../../config/routes'

function PrivateRoute(props) {
    // const navigate = useNavigate()
    const role = props.role || "guest";
    // console.log(ConfigRoutes)

    const allowedRoutes = ConfigRoutes[role].allowedRoutes;
    const redirectRoutes = ConfigRoutes[role].redirectRoutes;

  return (
    <Switch>
        {allowedRoutes.map(route => (
        <Route 
            path={route.url}
            key={route.url}
            exact
            
        >
            <route.component setRole={props.setRole}/>
        </Route>
        ))}
        {/* navigate(redirectRoutes) */}
        <Redirect to={redirectRoutes}/>
    </Switch>
  )
}

export default PrivateRoute