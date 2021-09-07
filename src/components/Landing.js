import React, { useEffect, useState } from 'react';

import '../styling/Landing.css'
//bootstrap grid system component
import {Link} from 'react-router-dom';
import desktop from '../img/body.jpg';
import mobile from '../img/landing-2.jpg';

const Landing = () =>{

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const imageUrl = windowWidth >= 650 ? desktop: mobile;

	useEffect(()=>{
		const handleWindowResize = () =>{
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleWindowResize);

		return () =>{
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return(
		<div className="Landing" style={{backgroundImage: `url(${imageUrl})`}}>
			<div className="landingContent">
				<p className="nameText">Sozen Fleurs Séchées</p>
				<small>Premium Dried Flowers</small>
			</div>
		</div>
	);
};

export default Landing;


// export default function Landing(){
// 	return(
		

// 		<div className="landing">
// 			<div className=" d-flex flex-row align-items-center justify-content-center mb-4 mx-5 text-center">
// 				<div className="landingText p-3">
// 					<h1>Sozen Fleurs Sechees</h1>
// 					<p>Premium Dried Flowers</p>
// 					<Link className="btn btn-warning" to="/login">Buy now.</Link>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

