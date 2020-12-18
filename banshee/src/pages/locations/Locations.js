import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'
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

function Locations () {
  const [cities, setCities] = useState([])

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
  }, [])

  const history = useHistory()

  const addCity = (e) => {
    history.push('/locations/add')
  }
  return (
    <Container>
      <PageTitle>Ciudades de Operacion</PageTitle>
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

export default Locations