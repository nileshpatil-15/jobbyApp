/* eslint-disable prettier/prettier */
import { Route,Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'



const ProtectedRoute = (props) => {
   
 
    const jwtToken = Cookie.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken === undefined) {
      return  <Redirect to='/login' />
    }
   
      return  <Route {...props}/>
    
}

export default ProtectedRoute