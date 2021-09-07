import React, {useState, useEffect, useContext} from 'react';
//bootstrap
import {Container, Card, Button, Form} from 'react-bootstrap';
//react-router
import {Link, useHistory, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';



export default function SpecificProduct(){

	const history = useHistory();

	const {user} = useContext(UserContext);

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [quantity, setQuantity] = useState(1)

	const {productId} = useParams();
	console.log(productId)

	useEffect(()=>{
		fetch(`http://localhost:8000/products/${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			}
		})
		.then(res=> res.json())
		.then(data => {
			console.log(data)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
			setQuantity(data.quantity)
		})
	}, [])


	//for order button
	const order = (productId)=>{

		fetch(`http://localhost:8000/orders/create-order/${productId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				quantity: quantity
			})
		})
		.then(res => res.json())
		.then(data =>{
			if(data){
				Swal.fire({
					title: 'yeyyy',
					icon: 'success',
					text: "Thank you for your purchase!"
				})
				history.push('/products');

			} else{
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

	const addToCart = (productId) => {

		fetch(`http://localhost:8000/carts/add-cart/${productId}`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		  },
		  body: JSON.stringify({
			quantity: quantity,
		  }),
		})
		  .then((res) => res.json())
		  .then((data) => {
			Swal.fire({
				title: "Yeeeyyy!!!",
				icon: "success",
				text: `You added ${name} to your Cart`,
			  });
		  })
		  .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
	  };

	

	return(
		<Container>
			<Card className="mt-4">
				<Card.Header className="bg-dark text-white text-center">
					<h4>{name}</h4>
				</Card.Header>
				<Card.Body>
					<Card.Text>{description}</Card.Text>
					<h6>Price: Php {price}</h6>
				</Card.Body>
				<Card.Footer>
					<Form.Control type="number" value={quantity} onChange={e=> setQuantity(e.target.value)} required />
					

					{
						user.accessToken !== null ?
					<>
						<Button variant="danger" block onClick={()=> order(productId)} className="mt-4">Order.</Button>
						<Button variant="danger" block onClick={()=> addToCart(productId)}> Add to Cart </Button>
					</>
						:
						<Link className="btn btn-warning" to="/login">Login to purchase.</Link>
					}
				</Card.Footer>
			</Card>
		</Container>

		)

}
