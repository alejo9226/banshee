import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import GetSalesPeople from './GetSalesPeople'
import PostSalesPeople from './PostSalesPeople'

function SalesPeople () {
  const history = useHistory()
  const redirect = () => {
    const urlItems = history.location.pathname.split('/')
    console.log(urlItems)

    switch (urlItems[2]) {
      case 'list':
        return <GetSalesPeople />
      case 'post':
        return <PostSalesPeople />
    }
  }
  return (
    <Container>
      {redirect()}
    </Container>
  )
}

export default SalesPeople