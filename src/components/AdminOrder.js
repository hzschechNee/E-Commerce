// import React, { useEffect, useState } from 'react';
// import { Table, Button } from 'react-bootstrap';

// import Swal from 'sweetalert2';

// export default function AdminOrder(props){

//     const {orderData, fetchData} = props;

//     const [orderId, setOrderId] = useState('');
//     const [orders, setOrders] = useState([]);

//     useEffect(()=>{
//         const orderArr = orderData.map(order =>{
//             return(
//                 <tr key={order._id}>
//                     <td>{order._id}</td>
//                     <td>{order.name}</td>
//                     <td>{order._id}</td>
//                     <td>{order._id}</td>
//                 </tr>
//             )
//         })
//     })
// }   