import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

export const Header = styled.header`  
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 25px;
  width: 100%;
  padding-top: 15px;
  z-index: 3;
`

export const InnerHeader = styled.div`
  background-color: rgb(57, 77, 107);
  border-radius: 10px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`
export const BrandDiv = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 0 10px 25px;
`
export const Brand = styled.h1`
  font-size: 30px;
  color: rgb(229, 107, 111);
  margin: 0;
`

export const Navbar = styled.nav`
  padding: 0px 25px 0px 0px;

  & > a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
  }
  & > a:hover {
    color: rgb(229, 107, 111);
  }
`

function Home () {
  return (
    <>
    <Header>
      <InnerHeader>
        <BrandDiv>
          <Brand>InfoClientes</Brand>
        </BrandDiv>
        <Navbar>
          <Link to="/" >Home</Link>
          <Link to="/dashboard" >Dashboard</Link>
          <Link to="/signup" >Sign Up</Link>
          <Link to="/login" >Login</Link>
        </Navbar>
      </InnerHeader>
    </Header>
    <Container>
    Este es el home
    </Container>
    </>
  )
}

export default Home