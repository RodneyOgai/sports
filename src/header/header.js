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
			isRegistration : false,
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
					{this.state.isRegistration &&
						<Registration changeOpen={this.changeOpen} isOpen={this.state.isAutorization} />}
				</div>
			</div>
		)
	}
	changeOpen(isOpen, message) {
		isOpen = !isOpen;
		if (message === 'autorization') {	
			this.setState({
				isAutorization : isOpen,
				isRegistration : false
			});
		} else if (message === 'registration') {
			this.setState({
				isRegistration : isOpen,
				isAutorization : false
			});
		} else if (message === 'close') {
			this.setState({
				isRegistration : false,
				isAutorization : false
			});
		}
		console.log(isOpen, message);
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
								<button className="autor-button" onClick={() => this.props.changeOpen(this.state.isOpen, "autorization")}>Авторизоваться</button>
							</div>
							<div>
								<button className="autor-button" onClick={() => this.props.changeOpen(this.state.isOpen, "registration")}>Зарегистрироваться</button>
							</div>
						</div> 
		return(
			<div>
				{buttons}
			</div>
		)
	}
}

class Registration extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen : props.isOpen,
		}
	}
	render() {
		const formRegistration = <div className="registration-form">
									<form>
										<i className="fa fa-close" onClick ={() => this.props.changeOpen(this.state.isOpen, 'close')} />
										<div className="registration-wrapper">
											<label>Username</label>
											<div className="registration-input-wrapper">
												<input className="autor-input" />
											</div>
										</div> 
										<div className="registration-wrapper">
											<label>Name</label>
											<div className="registration-input-wrapper">
												<input className="autor-input" />
											</div>
										</div> 
										<div className="registration-wrapper">
											<label>E-mail</label>
											<div className="registration-input-wrapper">
												<input className="autor-input" type="email" />
											</div>
										</div> 
										<div className="registration-wrapper">
											<label>Phone Number</label>
											<div className="registration-input-wrapper">
												<input className="autor-input" type="phone" />
											</div>
										</div> 
										<div className="autor-wrapper">
											<label>Password</label>
											<div className="registration-input-wrapper">
												<input className="autor-input" type="password" />
											</div>
										</div>
										<div className="registration-wrapper">
											<label>Repeat Password</label>
											<div className="registration-input-wrapper">
												<input className="autor-input" />
											</div>
										</div> 
										<button className="registration-button">Отправить</button>
									</form>
								</div>;
		return(
			<div>
				{formRegistration}
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
						<i className="fa fa-close" onClick ={() => this.props.changeOpen(this.state.isOpen, 'close')} />
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