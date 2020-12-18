import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import PostSalesPeople from './PostSalesPeople'
import GetSalesPeople from './GetSalesPeople'
import { IconButton } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { addButtonStyle, iconStyle } from '../customers/Customers'


function SalesPeople () {

  const [sellers, setSellers] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function getSellers () {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/salespeople',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSellers(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getSellers()
  }, [])

  const addSeller = (e) => {
    history.push(`/dashboard/salespeople/add`)
  }

  const renderPage = () => {
    const urlItems = history.location.pathname.split('/')
    urlItems.splice(0, 2)
    const lastUrl = urlItems.join('')
    console.log(lastUrl)
    switch (lastUrl) {
      case 'salespeopleadd':
        return <PostSalesPeople />
      case 'salespeople':
        return <GetSalesPeople />
      default:
        return <Container><h1>Bienvenido al Dashboard</h1></Container>
    }
  }

  return (
    <Container>
      {renderPage()}
    </Container>
  )
}

export default SalesPeople