import React, { useState } from 'react';

import Profile from './components/profile/Profile';
import Hub from './components/hub/Hub';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Add from './components/add/Add';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

import { UserContext } from './UserContext';

import { Router, Switch, Route, NavLink } from 'react-router-dom';
import history from './history';

import './App.css';

export default function App() {
	const [ token, setToken ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ login, setLogin ] = useState(false);
	const [ types, setTypes ] = useState([]);
	const [ mapSearch, setMapSearch ] = useState([]);
	const [ center, setCenter ] = useState({});

	const [ data, setData ] = useState([]);

	const userContext = {
		token,
		setToken,
		email,
		setEmail,
		username,
		setUsername,
		login,
		setLogin,
		center,
		setCenter,
		data,
		setData,
		types,
		setTypes,
		mapSearch,
		setMapSearch
	};

	return (
		<div>
			<Router history={history}>
			<main>
				<div className='header'>
					<div className='header-left'>
						{!login ? <h1>uralla</h1> : null}
						{login ? <h1>uraXa</h1> : null}
						<NavLink className='nav' activeClassName='active-nav' to='/' exact>
							Home
						</NavLink>
						<NavLink className='nav' activeClassName='active-nav' to='/map'>
							Map
						</NavLink>
					</div>
					<div className='header-right'>
						<h5>
							{login ? 'heXo' : ''} {login ? username : ''}
						</h5>
						{login ? (
							<NavLink className='nav' activeClassName='active-nav' to='/profile'>
								Profile
							</NavLink>
						) : null}
						{!login ? (
							<NavLink className='nav' activeClassName='active-nav' to='/login'>
								LogIn
							</NavLink>
						) : null}
						{!login ? (
							<NavLink className='nav' activeClassName='active-nav' to='/signup'>
								SignUp
							</NavLink>
						) : null}
					</div>
				</div>
				<Switch>

						<UserContext.Provider value={userContext}>
							<Route path='/profile'>
								<Profile />
							</Route>
							<Route path='/map'>
								<Hub />
							</Route>
							<Route path='/signup'>
								<Signup />
							</Route>
							<Route path='/login'>
								<Login />
							</Route>
							<Route path='/add'>
								<Add />
							</Route>
							<Route path='/' exact>
								<Home />
							</Route>
						</UserContext.Provider>
					
				</Switch>
			</main>
			</Router>
			<Footer />
		</div>
	);
}
