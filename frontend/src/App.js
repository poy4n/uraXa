import React from 'react';

import Profile from './components/profile/Profile';
import Hub from './components/hub/Hub';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Add from './components/add/Add';
import Home from './components/home/Home';

import history from './history';

import { Router, Switch, Route, Link } from "react-router-dom";

import './App.css';

export default function App() {
	return (
		<div>
			<Router history={history}>
				<div className="header">
					<Link className="nav" to="/profile">Profile</Link>
					<Link className="nav" to="/hub">Hub</Link>
					<Link className="nav" to="/login">login</Link>
					<Link className="nav" to="/add">Add</Link>
					<Link className="nav" to="/">Home</Link>
				</div>
				<Switch>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/hub">
						<Hub />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/add">
						<Add />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
