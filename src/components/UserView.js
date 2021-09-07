import React, {useState, useEffect} from 'react';
import Product from './Product';

export default function UserView({productData}){
	
	const [products, setProducts] = useState([])

	useEffect(()=>{

		const productsArr = productData.map(product=>{
			//only render active courses
			if(product.isActive === true){
				return(
					<Product key={product._id} productProp={product}/>
				)
			} else {
				return null
			}
		});

		//set the products state to the result of our map function, to bring our returned product components outside of the scope of our effect where our return statement below can see
		setProducts(productsArr)

	}, [productData])

	return(
		<>
			{products}
		</>

		)
}