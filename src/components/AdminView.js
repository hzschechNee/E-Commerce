import React, {useState, useEffect} from 'react';
//bootstrap
import {Table, Button, Modal, Form} from 'react-bootstrap';

//swal
import Swal from 'sweetalert2';

export default function AdminView(props){
	//destructure our product data from the props being passed by the parent component

	const {productData, fetchData} = props;

	//add a state for productID for fetch URL
	const [productId, setProductId] = useState('');


	const [products, setProducts] = useState([]);

	//add state for form in add product
	const [name, setName] =useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState()

	//states for the modal of add product
	const [showAdd, setShowAdd] = useState(false)
	//state for update product modal(open/close)
	const [showEdit, setShowEdit] = useState(false)

	//functions to handle opening and closing our add product modal
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	//function to handle opening our edit product modal which first needs to fetch the current products data so that it can populate the values of the inputs in the modal form 
	const openEdit = (product) => {
		setProductId(product._id);
		setName(product.name);
		setDescription(product.description);
		setPrice(product.price);
		setImage(product.image);

		setShowEdit(true);
	};


	//function to handle closing edit product modal. we need to reset all relevant states back to their default values, so that we can reuse them
	const closeEdit = () =>{	
		setShowEdit(false)
		setName('')
		setDescription('')
		setPrice(0)
		setImage([])
	}

	useEffect(()=>{
		const productsArr = productData.map(product=>{
			return(
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
						{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td>
						<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Update</Button>
						{
							product.isActive 
							?
							<Button variant="danger" size="sm" onClick={()=> archiveToggle(product._id, product.isActive)}>Disable</Button>
							:
							<Button variant="success" size="sm" onClick={()=> activateToggle(product._id, product.isActive)}>Enable</Button>
						}
					</td>
				</tr>
				)
		})

		setProducts(productsArr)
	}, [productData])


	//function for the Add producte
	const addProduct = (e) => {
		e.preventDefault();

		let data = new FormData();
		data.append('name', name);
		data.append('description', description);
		data.append('price', price);
		data.append('image', image);

		fetch(`${process.env.REACT_APP_CAPS3BACKEND}/products/create`, {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: data
			// body: JSON.stringify({
			// 	name: name,
			// 	description: description,
			// 	price: price,
			// })
		})
		.then(res=>res.json())
		.then(data=> {
			console.log(data)
			if(data === true){
				//lets run our fetchData function that we passed from out parent component, in order to re-render our page
				fetchData()
				//show a success message
				Swal.fire({
					title: 'Yaaaaaayyyy!',
					icon: 'success',
					text: 'product created successfully.'
				})
				//reset all states to their default values, for better user experience (inputs are blank again if the user decides to add another product)
				setName('')
				setDescription('')
				setPrice('')

				//close our modal
				closeAdd()
			}else{
				fetchData()
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

	//update/edit product
	const editProduct = (e, productId) =>{
		e.preventDefault();

		fetch(`${process.env.REACT_APP_CAPS3BACKEND}/products/update/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
			})
		})
		.then(res => res.json())
		.then(data =>{
			if(data === true){
				fetchData()
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'product successfully updated.'
				})
				closeEdit()
			} else {
				fetchData()
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again'
				})
			}
		})
	}


	//archive a product
	const archiveToggle = (productId, isActive) =>{
		fetch(`${process.env.REACT_APP_CAPS3BACKEND}/products/archive/${productId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res=> res.json())
		.then(data => {
			if(data === true){
				fetchData()
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'product successfully archived.'
				})
			} else{
				fetchData()
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})

	}


	//activate a product(false)
	const activateToggle = (productId, isActive) =>{
		fetch(`${process.env.REACT_APP_CAPS3BACKEND}/products/activate/${productId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res=> res.json())
		.then(data => {
			if(data === true){
				fetchData()
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'product successfully activated.'
				})
			} else{
				fetchData()
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})

	}

	return(
		<>
			<div className="border border-dark mt-5">
			<div className="text-center my-4">
				<h2>Admin Dashboard</h2>
				<div className="d-flex justify-content-center">
					<Button variant="primary" onClick={openAdd}>Add New Product</Button>
				</div>
			</div>
			<Table stripe bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="bg-white">
					{products}
				</tbody>
			</Table>	
			</div>
			

			{/*add Modal*/}
			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Title of the Product" required value={name} onChange={e => setName(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Image</Form.Label>
							<Form.Control type="file" placeholder="Select file" required onChange={e => setImage(e.target.files[0])}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" required value={price} onChange={e => setPrice(e.target.value)}/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

		{/* edit Modal*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Title of the Product" required value={name} onChange={e => setName(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" required value={price} onChange={e => setPrice(e.target.value)}/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

		</>


		)
}
