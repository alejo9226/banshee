import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import GetMeetings from './GetMeetings'
import PostMeetings from './PostMeetings'

function Meetings () {
  const history = useHistory()
  const redirect = () => {
    const urlItems = history.location.pathname.split('/')
    console.log(urlItems)

    switch (urlItems[2]) {
      case 'list':
        return <GetMeetings />
      case 'post':
        return <PostMeetings />
    }
  }
  return (
    <Container>
      {redirect()}
    </Container>
  )
}

export default Meetings