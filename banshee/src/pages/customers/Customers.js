import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { addButtonStyle, iconStyle } from '../customers/Customers'
import PostCustomers from './PostCustomers'
import GetCustomers from './GetCustomers'
import ViewCustomer from './ViewCustomer'
import EditCustomer from './EditCustomer'


function Customers () {

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
    console.log('splitted', urlItems)
    urlItems.splice(4, 1)
    urlItems.splice(0, 2)
    const lastUrl = urlItems.join('')
    console.log(lastUrl)
    switch (lastUrl) {
      case 'customersadd':
        return <PostCustomers />
      case 'customers':
        return <GetCustomers />
      case 'customersview':
        return <ViewCustomer />
      case 'customersedit':
        return <EditCustomer />
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

export default Customers