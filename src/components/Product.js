import React, {useState, useEffect} from 'react';
import '../styling/Product.css'

import { Card, Button, Row, Col } from 'react-bootstrap';
//add proptypes to validate the props
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function Product({productProp}){

	const {_id, name, description, price, image} = productProp;
	/*const [count, setCount] = useState(0);
	const [seat, setSeat] = useState(30);


	function enroll(){
		if(count === 30){
			alert("No more seats available")
		} else {
			setCount(count + 1) 
			setSeat(seat - 1)
		}
	}*/
	return(
	
	<div>
		<Card className="text-center mt-2 cardBody">
			<Card.Body>
					<Card.Img src={`http://localhost:8000/${image.path}`} className="cardImg"/>
					<Card.Title>
						{name}
					</Card.Title>
					<Card.Text>
						<h6>Description:</h6>
						<p>{description}</p>

						<h6>Price:</h6>
						<p>Php {price.toLocaleString()}.00</p>
					</Card.Text>
					<Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>

			</Card.Body>
		</Card>
	</div>
	
		
	)
}


Product.propTypes = {
	
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}