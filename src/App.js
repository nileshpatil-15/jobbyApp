/* eslint-disable prettier/prettier */
import {Route, Redirect,Switch} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.
  



// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route  path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <Route exact path='/not-found' component={NotFound}/>
      
      <Redirect to='/not-found'/>
    </Switch>
  </>
)
export default App
