import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'
import Customers from '../customers/Customers'
import Meetings from '../meetings/Meetings'
import SalesPeople from '../salespeople/SalesPeople'
import Locations from '../locations/Locations'
import { Container } from 'react-bootstrap'
import { Header, InnerHeader, BrandDiv, Brand, Navbar } from '../Home'
import axios from 'axios'

const DashboardDiv = styled.div`
  box-sizing: border-box;
  display: block;
  overflow: scroll;
  width: 100vw;
  height: 100vh;

`

function Dashboard() {
  const history = useHistory()

  const [isLogged, setIsLogged] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    async function verifyUser () {
      
      const token = localStorage.getItem('token')

      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/user',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }) 
        setIsLogged(true)
        setUserName(data.data)
      } catch (err) {
        localStorage.removeItem('token')
        history.push('/login')
      }
    }
    verifyUser()
    
  })

  const renderPage = () => {
    const urlItems = history.location.pathname.split('/')
    switch (urlItems[2]) {
      case 'customers':
        return <Customers />
      case 'meetings':
        return <Meetings />
      case 'salespeople':
        return <SalesPeople />
      case 'locations':
        return <Locations />
      default:
        return <Container><h1>Bienvenido al Dashboard</h1></Container>
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }
  return (
    <DashboardDiv>
      <Header>
        <InnerHeader>
          <BrandDiv>
            <Brand>InfoClientes</Brand>
          </BrandDiv>
          <Navbar>
            <Link to="/" >Home</Link>
            <Link to="/dashboard/customers" >Clientes</Link>
            <Link to="/dashboard/meetings" >Visitas</Link>
            <Link to="/dashboard/salespeople" >Vendedores</Link>
            <Link to="/dashboard/locations" >Ciudades de Operacion</Link>
            <Link onClick={logout}>Logout</Link>
          </Navbar>
        </InnerHeader>
      </Header>
      {renderPage()}
    </DashboardDiv>
  )
}

export default Dashboard
