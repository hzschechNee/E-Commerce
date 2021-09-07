import React, {useState, useEffect, useContext, Fragment} from 'react';

import '../styling/Login.css';
//bootstrap
import {Form, Button} from 'react-bootstrap';
//sweetalert
import Swal from 'sweetalert2';
//react-context
import UserContext from '../UserContext';

import {Redirect, useHistory, Link} from 'react-router-dom';


export default function Login(){

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginButton, setLoginButton] = useState(false);

	const history = useHistory();

	useEffect(()=>{
		if(email !== '' && password !== ''){
			setLoginButton(true)
		} else{
			setLoginButton(false)
		}
	}, [email, password, loginButton]);


	function loginUser(e){
		e.preventDefault();

		fetch('http://localhost:8000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data=>{
			console.log(data)

			if(data.accessToken !== undefined){
				localStorage.setItem('accessToken', data.accessToken);
				setUser({accessToken: data.accessToken})

				// Swal.fire({
				// 	title: 'Yippeeee!',
				// 	icon: 'success',
				// 	text: `Happy Shopping, ${email}!`
				// })

				fetch('http://localhost:8000/users/profile', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(result =>{
					console.log(result)

					localStorage.setItem('email', result.email)
					localStorage.setItem('isAdmin', result.isAdmin)

					if(result.isAdmin === true){
						setUser({
							email: result.email,
							isAdmin: result.isAdmin
						})

						Swal.fire({
							title: 'Yippeeee!',
							icon: 'success',
							text: `Welcome Admin!`
						})

						history.push('/products')
					} else{

						Swal.fire({
							title: 'Yippeeee!',
							icon: 'success',
							text: `Happy Shopping, ${email}!`
						})

						history.push('/')
					}
				})
			} else{
				Swal.fire({
					title: 'Ooooppps!',
					icon: 'error',
					text: 'Something went error. Check your credentials.'
				})
			}
			setEmail('')
			setPassword('')
		})
	}
	if(user.email !== null){
		return<Redirect to="/" />
	}

	return (
		<div className="mx-3">
			<Fragment>
			<Form onSubmit={e=> loginUser(e)} className="login border container-fluid">
				<h1 className="text-center pb-3">LOGIN</h1>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" placeholder="Enter your email." value={email} onChange={e=> setEmail(e.target.value)} required />
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Enter your password." value={password} onChange={e=> setPassword(e.target.value)} required />
				</Form.Group>
				{loginButton ?
					<Button type="submit" className="btn-lg btn-danger btn-block">Submit</Button>
					:
					<Button type="submit" className="btn-lg btn-danger btn-block" disabled>Submit</Button>
				}
				<div className="py-3 text-center">
					<span>Don't have an account yet? Click here to </span>
					<Link className="text-warning" to="/register">register</Link>
				</div>
			</Form>
		</Fragment>
		</div>
		
	)
}