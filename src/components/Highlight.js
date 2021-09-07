import React from 'react';

import '../styling/Highlight.css'
//bootstrap
import { Carousel, Row, Col, Container, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import img1 from '../img/prod-3.jpg';
import img2 from '../img/grp-1.jpg';
import img3 from '../img/box-3.jpg';

export default function Highlights(){

	return(
		<Container className="cardBody">
		<Row>
			<Col xs={12} md={12} className="text-center titleHigh">
				<hr></hr>
				<h1 className="text-center">Collections</h1>
				<hr></hr>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<img src={img1} className="highImage" alt="Flower Arrangements"/>
					<Card.Body>
						<Card.Title>
							<h2>Premium Bouquet </h2>
						</Card.Title>
						<Card.Text>
							Carefully arranged bouquet using premium dried flowers especially made for you!
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<img src={img2} className="highImage" alt="Candles"/>
					<Card.Body>
						<Card.Title>
							<h2>Scented Candles</h2>
						</Card.Title>
						<Card.Text>
							Scented hand-poured candles made of 100% Soy wax and fragrance oils with dried flowers on it.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<img src={img3} className="highImage" alt="Box-set"/>
					<Card.Body>
						<Card.Title>
							<h2>Gift Sets</h2>
						</Card.Title>
						<Card.Text>
							Thinking for a perfect gift set? How about our curated boxes-combination of scented candles, dried flowers mini bouquet and accessories of your choice.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={12} className="text-center">
				<Link className="btn btn-danger" to="/products">Browse Products</Link>
			</Col>
		</Row>
		</Container>
		
		// <div className="container carouselBody">	
		// 	<div className="text-center mt-5">
		// 		<h1>Collections</h1>
		// 	</div>
		// 	<Carousel fade variant="dark" className="carouselHigh container">	
		// 		<Carousel.Item>
		// 			<img
		// 			className="highImage d-block"
		// 			src={img1}
		// 			alt="First slide"
		// 			/>
		// 			<Carousel.Caption>
		// 			<h3>Premium Flowers</h3>
		// 			<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
		// 			</Carousel.Caption>
		// 		</Carousel.Item>
		// 		<Carousel.Item>
		// 			<img
		// 			className=" highImage d-block"
		// 			src={img2}
		// 			alt="Second slide"
		// 			/>

		// 			<Carousel.Caption>
		// 			<h3>Scented Candles</h3>
		// 			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		// 			</Carousel.Caption>
		// 		</Carousel.Item>
		// 		<Carousel.Item>
		// 			<img
		// 			className=" highImage d-block"
		// 			src={img3}
		// 			alt="Third slide"
		// 			/>

		// 			<Carousel.Caption>
		// 			<h3>Gift Sets</h3>
		// 			<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
		// 			</Carousel.Caption>
		// 		</Carousel.Item>
		// 	</Carousel>
		// </div>
		
	)
}