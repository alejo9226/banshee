import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { addButtonStyle, iconStyle, PageTitle } from '../customers/GetCustomers'


function GetMeetings () {

  const [meetings, setMeetings] = useState([])
  const [meetingToDelete, setMeetingToDelete] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const history = useHistory()

  useEffect(() => {
    async function getMeetings () {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/meeting',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(data.data)
        setMeetings(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getMeetings()
  }, [showDialog])

  const addMeeting = () => {
    history.push('/dashboard/meetings/add')
  }

  const deleteMeeting = (id) => {
    setMeetingToDelete(id)
    setShowDialog(true)
  }

  const editMeeting = (id) => {
    history.push(`/dashboard/meetings/edit/${id}`)
  }

  const onDeleteModal = async (value) => {
    if (value === 'Si') {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'DELETE',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/meeting/${meetingToDelete}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(data.data)
      } catch (err) {
        console.dir(err)
      }
      setShowDialog(false)
    } else {
      setMeetingToDelete('')
      setShowDialog(false)
    }
  }

  console.log('clientes', meetings)
  return (
    <Container>
      {!!meetings && meetings.length > 0 ? 
      <>
      <PageTitle>Maestro de Visitas</PageTitle>
      <Dialog
        open={showDialog}
      >
        {`¿Estas seguro que deseas borrar la visita?`}
        <DialogActions>
          <button onClick={onDeleteModal.bind(this, 'Si')} color="primary">
            Si
          </button>
          <button onClick={onDeleteModal.bind(this, 'No')} color="primary" autoFocus>
            No
          </button>
        </DialogActions>
      </Dialog>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Fecha Visita</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Valor Neto</th>
            <th>Valor Visita</th>
            <th>Comentarios</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
        {meetings.map(meeting => {
            return (
              <tr>
                <td>{meeting.date}</td>
                <td>{meeting.customer.fullname}</td>
                <td>{meeting.seller.name}</td>
                <td>{meeting.netAmount}</td>
                <td>{meeting.meetingValue}</td>
                <td>{meeting.comments}</td>
                <td>
                  <IconButton title="Editar visita" style={{padding: '3px'}}>
                    <EditIcon
                      onClick={editMeeting.bind(this, meeting._id)}
                      style={{fontSize: '20px'}}
                    />
                  </IconButton>
                  <IconButton title="Borrar visita" style={{padding: '3px'}}>
                    <DeleteIcon
                      onClick={deleteMeeting.bind(this, meeting._id)}
                      style={{fontSize: '20px'}}
                    />
                  </IconButton>
                </td>
              </tr>
            )
          }) 
        }
        </tbody>
      </Table>
      </> : <p>No has realizado ninguna visita</p> }
      <IconButton style={iconStyle} title="Agregar visita">
        <AddCircleOutlineIcon
          style={addButtonStyle}
          onClick={addMeeting}
        />
      </IconButton>
    </Container>
  )
}

export default GetMeetings