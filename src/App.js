import React, {Component} from 'react'
import {render} from 'react-dom'
import Sport from './sportTree/sportTree'
import styled from 'styled-components'
import SportTable from './sportTable/sportTable'
import moment from "moment"
import axios from "axios"

const SportWrapper = styled.div `
	width: 20%;
	float: left;
	margin-right: 20px;
`;

const SportTableWrapper = styled.div `
	width: 80%
`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(new Date()).format("YYYY-MM-DD"),
			events: []
		};
		this.updateDate = this.updateDate.bind(this);
	}

	componentDidMount(){
		axios
	    .get("https://www.thesportsdb.com/api/v1/json/1/eventsday.php", {
	    	params : {
	    		d : this.state.date,
	    	}
		})
		 .then(rez => {
		 	this.state.events = rez.data.events;
		 	this.setState({
				events: this.state.events
			})
		 })
	}

	updateDate(event) {
    	var changeDate = event.currentTarget.value;
    	console.log(changeDate);
    	this.setState({
    		date: changeDate,
    	});
		axios
	    .get("https://www.thesportsdb.com/api/v1/json/1/eventsday.php", {
	    	params : {
	    		d : changeDate,
	    	}
		})
		 .then(rez => {
		 	this.state.events = rez.data.events;
		 	this.setState({
				events: this.state.events
			})
		 })
    }

	render() {
		return (
			<div>
				<SportWrapper>
					<Sport updateDate={this.updateDate} date={this.state.date}/>
				</SportWrapper>
				<SportTableWrapper>
					<SportTable updateDate={this.updateDate} events={this.state.events} date={this.state.date}/>
				</SportTableWrapper>
			</div>
		)
	}
}



export default App;
