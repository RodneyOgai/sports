import React, {Component} from 'react'
import {render} from 'react-dom'
import moment from "moment"
import axios from "axios"
import './header.css'
import styled from 'styled-components'

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAutorization : false,
		};
		this.changeOpen = this.changeOpen.bind(this);
	}
	render() {
		const logo = "../img/1.png";
		return(
			<div className="header">
				<div>
					<img src={logo} className="logo" alt="logo" />
					<h1 className="header-h1">Sport Calendar</h1>
				</div>
				<div className="pull-right">
					{!this.state.isAutorization && 
						<Buttons changeOpen={this.changeOpen} isOpen={this.state.isAutorization} />
					}
					{this.state.isAutorization && 
						<Autorization changeOpen={this.changeOpen} isOpen={this.state.isAutorization} />
					}
				</div>
			</div>
		)
	}
	changeOpen(isOpen) {
		isOpen = !isOpen;
		this.setState({
			isAutorization : isOpen,
		});
		console.log(isOpen);
	}
}

class Buttons extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen : props.isOpen,
		}
	}
	render() {
		const buttons = <div>
							<div>
								<button className="autor-button" onClick={() => this.props.changeOpen(this.state.isOpen)}>Авторизоваться</button>
							</div>
							<div>
								<button className="autor-button">Зарегистрироваться</button>
							</div>
						</div> 
		return(
			<div>
				{buttons}
			</div>
		)
	}
}

class Autorization extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen : props.isOpen,
		}
	}
	render() {
		const form = <div className="autorization">
						<i className="fa fa-close" onClick ={() => this.props.changeOpen(this.state.isOpen)} />
						<div className="autor-wrapper">
							<label>Username</label>
							<div className="autor-input-wrapper">
								<input className="autor-input" /> <i className="fa fa-user" />
							</div>
						</div> 
						<div className="autor-wrapper">
							<label>Password</label>
							<div className="autor-input-wrapper">
								<input className="autor-input" type="password" /> <i className="fa fa-key"/>
							</div>
						</div>
						<button className="autor-button">Войти</button>
					</div>;
		return(
			<div>
				{form}
			</div>
		)
	}
}

export default Header;