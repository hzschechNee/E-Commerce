import React, {Fragment, useState} from 'react';
// import './App.css';

//routing
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch, Redirect} from 'react-router-dom';

//components
import AppNavbar from './components/AppNavbar';
import Product from './components/Product'

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import SpecificProduct from './pages/SpecificProduct';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';

//react context
import UserContext from './UserContext';

//bootstrap
import {Container} from 'react-bootstrap';

function App(){

	const [user, setUser] = useState({
		email: localStorage.getItem('email'),
		accessToken: localStorage.getItem('accessToken'),
		isAdmin: localStorage.getItem('isAdmin') === 'true'
	});

	const unsetUser = ()=>{
		localStorage.clear();
		setUser({
			email: null,
			accessToken: null,
			isAdmin: null
		})
	};

  return(
	<div>
		<Fragment>
    	<UserContext.Provider value={{user, setUser, unsetUser}}>
    		<Router>
    			<AppNavbar />
    				<Switch>
						<Route exact path="/" component={Home} />
	    				<Route exact path="/login" component={Login} />
	    				<Route exact path="/register" component={Register} />
	    				<Route exact path="/products" component={ProductPage} />
						<Route exact path="/products/:productId" component={SpecificProduct} />
						<Route exact path='/cart' component={CartPage} />
						<Route exact path="/history">
							{user.email === null ? <Redirect to="/"/>:<OrderPage/>}
						</Route>
						<Route component={NotFound} />
    				</Switch>
    		</Router>
    	</UserContext.Provider>
    	</Fragment>
	</div>
    

    );
}

export default App;