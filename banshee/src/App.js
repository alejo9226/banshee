import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Customers from './pages/customers/Customers'
import Meetings from './pages/meetings/Meetings'
import SalesPeople from './pages/salespeople/SalesPeople'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import './App.css';

const App = () => (
  <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Banshee</Navbar.Brand>
      <Nav>
        <NavDropdown title="Clientes">
          <NavDropdown.Item href="/customers/list">Lista</NavDropdown.Item>
          <NavDropdown.Item href="/customers/post">Agregar</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Visitas">
          <NavDropdown.Item href="/meetings/list">Lista</NavDropdown.Item>
          <NavDropdown.Item href="/meetings/post">Agregar</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Vendedores">
          <NavDropdown.Item href="/salespeople/list">Lista</NavDropdown.Item>
          <NavDropdown.Item href="/salespeople/post">Agregar</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/customers/:path?' component={Customers} />
        <Route exact path='/meetings/:path?' component={Meetings} />
        <Route exact path='/salespeople/:path?' component={SalesPeople} />
      </Switch>
    </Router>
  </>
);

export default App;
