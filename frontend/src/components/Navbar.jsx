import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

const NavbarComponent = (props) => {
    const isAuthenticated = props.isAuthenticated
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>SGH Compactor Management System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">

                                <LinkContainer to="/">
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/stock-in">
                                    <Nav.Link>Stock In</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/stock-out">
                                    <Nav.Link>Stock Out</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/logs">
                                    <Nav.Link>Logs</Nav.Link>
                                </LinkContainer>

                                {/* <LinkContainer to="/Login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer> */}
                            

                            <div>{props.isAuthenticated ? "Yes":"No"}</div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComponent