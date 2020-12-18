import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Home from './pages/Home'
import PrivateRoute from '../src/pages/dashboard/PrivateRoute'
import Dashboard from './pages/dashboard/Dashboard'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Customers from './pages/customers/Customers'
import PostCustomers from './pages/customers/PostCustomers'
import ViewCustomer from './pages/customers/ViewCustomer'
import EditCustomer from './pages/customers/EditCustomer'
import Meetings from './pages/meetings/Meetings'
import PostMeetings from './pages/meetings/PostMeetings'
import EditMeeting from './pages/meetings/EditMeeting'
import SalesPeople from './pages/salespeople/SalesPeople'
import Locations from './pages/locations/Locations'
import PostLocations from './pages/locations/PostLocations'
import styled from 'styled-components'
import { Container, Nav, NavDropdown } from 'react-bootstrap';



const App = () => (
  <>
    <Router>
      
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute
          exact
          path='/dashboard/:path?/:innerpath?/:innerinnerpath?'
          component={Dashboard}
        />
        {/* <Route exact path='/customers' component={Customers} />
        <Route exact path='/customers/add' component={PostCustomers} />
        <Route exact path='/customers/:customerid?' component={ViewCustomer} />
        <Route exact path='/customers/edit/:customerid?' component={EditCustomer} />
        <Route exact path='/meetings' component={Meetings} />
        <Route exact path='/meetings/add' component={PostMeetings} />
        <Route exact path='/meetings/edit/:meetingid?' component={EditMeeting} />
        <Route exact path='/salespeople/:path?' component={SalesPeople} />
        <Route exact path='/locations' component={Locations} />
        <Route exact path='/locations/add' component={PostLocations} /> */}
      </Switch>
    </Router>
  </>
);

export default App;
