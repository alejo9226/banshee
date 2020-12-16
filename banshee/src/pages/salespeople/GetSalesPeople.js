import axios from 'axios'
import { useEffect, useState } from 'react'


function GetSalesPeople () {

  const [sellers, setSellers] = useState([])

  useEffect(() => {
    async function getSellers () {
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/salespeople',
        })
        setSellers(data.data)
      } catch (err) {
        console.dir(err)
      }
    }
    getSellers()
  }, [])




  return (
    <div>
      {!!sellers && sellers.length > 0 ? 
        sellers.map(seller => {
          return <p>{seller.name}</p>
        }) : <p>No tienes vendedores aun</p>
      }
      
    </div>
  )
}

export default GetSalesPeople