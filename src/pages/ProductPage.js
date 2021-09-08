import React, {useState, useEffect, useContext} from 'react';

//bootstrap
import {Container } from 'react-bootstrap';
import UserContext from '../UserContext';

//components
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';


export default function ProductPage(){

	const {user} = useContext(UserContext);
	const [products, setProducts] = useState([])
	

	const fetchData = ()=>{
		fetch(`${process.env.REACT_APP_CAPS3BACKEND}/products/all`)
		.then(res=> res.json())
		.then(data=>{
			console.log(data)

			setProducts(data)
		})
	}

	useEffect(()=>{
		fetchData()
	}, [])

	return(
		<Container>
			
			{
				(user.isAdmin === true) ?
				<AdminView productData={products} fetchData={fetchData}/>
				:
				<>
				<h1 className="text-center mt-5 mb-4 border-bottom border-dark">Collections</h1>
				<UserView productData={ products} />
				</>
			}
		</Container>
	)
}