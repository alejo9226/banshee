import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import PostLocations from './PostLocations'
import GetLocations from './GetLocations'


function Locations () {

  const history = useHistory()

  const renderPage = () => {
    const urlItems = history.location.pathname.split('/')
    urlItems.splice(4, 1)
    urlItems.splice(0, 2)
    const lastUrl = urlItems.join('')
    console.log(lastUrl)
    switch (lastUrl) {
      case 'locationsadd':
        return <PostLocations />
      case 'locations':
        return <GetLocations />
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

export default Locations