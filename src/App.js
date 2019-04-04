import React, {Component} from 'react'
import {render} from 'react-dom'
import Sport from './sportTree/sportTree'
import styled from 'styled-components'
import SportTable from './sportTable/sportTable'

const SportWrapper = styled.div `
	width: 20%;
	float: left;
	margin-right: 20px;
`;

const SportTableWrapper = styled.div `
	width: 80%
`;

class App extends Component {
	render() {
		return (
			<div>
				<SportWrapper>
					<Sport />
				</SportWrapper>
				<SportTableWrapper>
					<SportTable />
				</SportTableWrapper>
			</div>
		)
	}
}



export default App;
