import React, {Component} from 'react'
import {render} from 'react-dom'
import moment from "moment"
import axios from "axios"
import './header.css'
import styled from 'styled-components'

class Header extends Component {
	render() {
		const logo = <h1>Logo</h1>
		return(
			<div className="header">
				<div>
					{logo}
				</div>
			</div>
		)
	}
}

export default Header;