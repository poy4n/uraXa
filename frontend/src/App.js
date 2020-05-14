import React, { useState } from 'react';

import Profile from './components/profile/Profile';
import Hub from './components/hub/Hub';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Add from './components/add/Add';
import Home from './components/home/Home';
import { UserContext } from './UserContext';

import { Router, Switch, Route, NavLink } from 'react-router-dom';
import history from './history';

import './App.css';

export default function App() {
	const [ token, setToken ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ login, setLogin ] = useState(false);

	const userContext = {
		token,
		setToken,
		email,
		setEmail,
		username,
		setUsername,
		login,
		setLogin
	};

	return (
		<div>
			<Router history={history}>
				<div className='header'>
					<div className='header-left'>
						<h1>uraXa</h1>
						<NavLink className='nav' activeClassName='active-nav' to='/' exact>
							Home
						</NavLink>
						<NavLink className='nav' activeClassName='active-nav' to='/map'>
							Map
						</NavLink>
						<NavLink className='nav' activeClassName='active-nav' to='/profile'>
							Profile
						</NavLink>
						<NavLink className='nav' activeClassName='active-nav' to='/add'>
							Add
						</NavLink>
					</div>
					<div className='header-right'>
						<h4>{login ? username : ''}</h4>
						<NavLink className='nav' activeClassName='active-nav' to='/login'>
							LogIn
						</NavLink>
						<NavLink className='nav' activeClassName='active-nav' to='/signup'>
							SignUp
						</NavLink>
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
			</Router>
		</div>
	);
}
