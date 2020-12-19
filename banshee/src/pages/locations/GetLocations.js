import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { addButtonStyle, iconStyle, PageTitle } from '../customers/GetCustomers'
import axios from 'axios'

const LocationsListContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`

const LocationContainer = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(57, 77, 107);
  border-radius: 5px;
  margin-bottom: 10px;
`
const LocationInnerContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgb(57, 77, 107);
  border-radius: 5px;
  & p {
    margin: 0;
  }
`

function GetLocations () {
  const [cities, setCities] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [locationToDelete, setLocationToDelete] = useState('')

  useEffect(() => {
    async function getLocations () {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/location',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('info', data.data)
        setCities(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getLocations()
  }, [showDialog])

  const history = useHistory()

  const addCity = (e) => {
    history.push('/dashboard/locations/add')
  }
  const editLocation = (e) => {
  }
  const deleteLocation = (id) => {
    setLocationToDelete(id)
    setShowDialog(true)
  }

  const onDeleteModal = async (value) => {
    if (value === 'Si') {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'DELETE',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/location/${locationToDelete}`,
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
      setLocationToDelete('')
      setShowDialog(false)
    }
  }

  return (
    <Container>
      <PageTitle>Ciudades de Operacion</PageTitle>
      <Dialog
        open={showDialog}
      >
        {`¿Estas seguro que deseas borrar la ciudad?`}
        <DialogActions>
          <button onClick={onDeleteModal.bind(this, 'Si')} color="primary">
            Si
          </button>
          <button onClick={onDeleteModal.bind(this, 'No')} color="primary" autoFocus>
            No
          </button>
        </DialogActions>
      </Dialog>
      {!!cities && cities.length > 0 ? 
        <LocationsListContainer>
          {cities.map(city => {
            return (
              <LocationContainer key={city._id}>
                <LocationInnerContainer>
                  <p>{city.city}</p>
                </LocationInnerContainer>
                <LocationInnerContainer>
                  <p>{city.state}</p>
                </LocationInnerContainer>
                <LocationInnerContainer>
                  <p>{city.country}</p>
                </LocationInnerContainer>
                <LocationInnerContainer>
                  <IconButton title="Editar ciudad" style={{padding: '3px'}}>
                    <EditIcon
                      onClick={editLocation.bind(this, city._id)}
                      style={{fontSize: '20px'}}
                    />
                  </IconButton>
                  <IconButton title="Borrar ciudad" style={{padding: '3px'}}>
                    <DeleteIcon
                      onClick={deleteLocation.bind(this, city._id)}
                      style={{fontSize: '20px'}}
                    />
                  </IconButton>
                </LocationInnerContainer>
              </LocationContainer>
            )
          })}
          
        </LocationsListContainer> : <p>Aun no tienes ciudades agregadas</p>

      }
      <IconButton style={iconStyle} title="Agregar ciudad">
        <AddCircleOutlineIcon
          style={addButtonStyle}
          onClick={addCity}
        />
      </IconButton>
    </Container>
  )
}

export default GetLocations