/* eslint-disable prettier/prettier */
import { Route, Redirect, Switch } from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import Jobdetails from './components/Jobdetails'
import './App.css'


const App = () => (
    <>
        <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/jobs" component={Jobs} />
            <ProtectedRoute exact path="/jobs/:id" component={Jobdetails} />
            <Route exact path='/not-found' component={NotFound} />
            <Redirect to='/not-found' />
        </Switch>
    </>
)
export default App
