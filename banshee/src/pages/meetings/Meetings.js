import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import GetMeetings from './GetMeetings'
import EditMeetings from './EditMeeting'
import PostMeetings from './PostMeetings'


function Customers () {

  const history = useHistory()

  const renderPage = () => {
    const urlItems = history.location.pathname.split('/')
    urlItems.splice(4, 1)
    urlItems.splice(0, 2)
    const lastUrl = urlItems.join('')
    console.log(lastUrl)
    switch (lastUrl) {
      case 'meetingsadd':
        return <PostMeetings />
      case 'meetings':
        return <GetMeetings />
      case 'meetingsedit':
        return <EditMeetings />
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