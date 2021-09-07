import React, {useState, useEffect, useContext} from 'react';

import '../styling/Register.css';

import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

import UserContext from '../UserContext';

import {Redirect, useHistory, Link} from 'react-router-dom';

export default function Register(){

	const {user, setUser} = useContext(UserContext);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	const [registerButton, setRegisterButton] = useState("");

	const history = useHistory();

	useEffect(()=>{
		if(firstName !== '' && lastName !== '' && email !== '' && password !== '' && verifyPassword !== ''){
			setRegisterButton(true)
		} else{
			setRegisterButton(false)
		}
	}, [firstName, lastName, email, password, verifyPassword, registerButton])


	function registerUser(e){
		e.preventDefault();

		fetch('http://localhost:8000/users/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				verifyPassword: verifyPassword
			})
		})
		.then(res => res.json())
		.then(result =>{
			console.log(result)

			if(result === true){
				Swal.fire({
					title: 'You are registered!',
					icon: 'success',
					text: `Thank your for registering to Sozen, ${firstName}`
				})
				history.push('/login');
			} else{
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'User already exists. Please try again.'
				})
				setFirstName('')
				setLastName('')
				setEmail('')
				setPassword('')
				setVerifyPassword('')
			}
		})
	}

	return(
		<div className="mx-3">
			<Form onSubmit={e=> registerUser(e)} className="register border container-fluid">
				<h1 className="pb-2">Create an account.</h1>
				<Form.Group>
					<Form.Control type="text" placeholder="Enter your first name." value={firstName} onChange={e=> setFirstName(e.target.value)} required />
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" placeholder="Enter your last name." value={lastName} onChange={e=> setLastName(e.target.value)} required />
				</Form.Group>
				<Form.Group>
					<Form.Control type="email" placeholder="Enter your email." value={email} onChange={e=> setEmail(e.target.value)} required />
				</Form.Group>
				<Form.Group>
					<Form.Control type="password" placeholder="Enter your password." value={password} onChange={e=> setPassword(e.target.value)} required />
				</Form.Group>
				<Form.Group>
					<Form.Control type="password" placeholder="Verify your password." value={verifyPassword} onChange={e=> setVerifyPassword(e.target.value)} required />
				</Form.Group>
				{registerButton ?
					<Button type="submit" className="btn-lg btn-danger btn-block">Submit</Button>
					:
					<Button type="submit" className="btn-lg btn-danger btn-block" disabled>Submit</Button>
				}
				<div className="py-3 text-center">
					<span>Already have an account? Click here to  </span>
					<Link className="text-warning" to="/login">login</Link>
				</div>
			</Form>
		</div>

	)

}