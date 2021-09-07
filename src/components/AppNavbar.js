import React, {useContext} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import '../styling/AppNav.css';

//react bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';

//react context
import UserContext from '../UserContext';

export default function AppNavbar(){

	

	const history = useHistory();

	const {user, unsetUser} = useContext(UserContext);
	console.log(user)

	const logout = ()=>{
		unsetUser();
		history.push('/login')
	}

	//apply conditional rendering in AppNavbar component such that a logout link will be shown instead of login and register when user is logged in 
	let rightNav = (user.email !== null) ?
	(
		<>
		{user.isAdmin === true ? 
			<Nav.Link onClick={logout}>Logout</Nav.Link>
			:
		<>
			<Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
			<Nav.Link as={NavLink} to="/history">My Orders</Nav.Link>
			<Nav.Link onClick={logout}>Logout</Nav.Link>
		</>
		}	
		</>
	)
	:
	(
		<>
			<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
			<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
		</>
	)


	return(

		<Navbar collapseOnSelect expand="lg" className="navbar">
			<Navbar.Brand as={Link} to="/" className="brand">
				Sozen
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={NavLink} to="/">Home</Nav.Link>
					<Nav.Link as={NavLink} to="/products">Products</Nav.Link>
				</Nav>
				<Nav className="ml-auto">
					{rightNav}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}