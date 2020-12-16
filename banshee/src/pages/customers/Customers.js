import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import GetCustomers from './GetCustomers'
import PostCustomers from './PostCustomers'

function Customers () {
  const history = useHistory()
  const redirect = () => {
    const urlItems = history.location.pathname.split('/')
    console.log(urlItems)

    switch (urlItems[2]) {
      case 'list':
        return <GetCustomers />
      case 'post':
        return <PostCustomers />
    }
  }
  return (
    <Container>
      {redirect()}
    </Container>
  )
}

export default Customers