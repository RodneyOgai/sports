import React, {Component} from 'react'
import axios from 'axios'
import {render} from 'react-dom'
import './sportTable.css'
import Sport from '.././sportTree/sportTree'
import moment from "moment"

class SportTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			date : props.date,
			events: props.events
		}
	}
	// componentDidMount(){
	// 	axios
	//     .get("https://www.thesportsdb.com/api/v1/json/1/eventsday.php", {
	//     	params : {
	//     		d : this.props.date,
	//     	}
	// 	})
	// 	 .then(rez => {
	// 	 	this.state.events = rez.data.events;
	// 	 	this.setState({
	// 			events: this.state.events
	// 		})
	// 	 })
	// }
	render() {
		const sportEventsInfo = this.props.events.map((event, index) => (
			<div key={index} className="row">
				<div className="col-2 sport-table-item">{event.dateEvent}</div>
				<div className="col-2 sport-table-item">{event.strSport}</div>
				<div className="col-2 sport-table-item">{event.strLeague}</div>
				<div className="col-2 sport-table-item">{event.strEvent}</div>
				<div className="col-2 sport-table-item">{event.intHomeScore}</div>
				<div className="col-2 sport-table-item">{event.intAwayScore}</div>
			</div>));
		return (
			<div className="row table-wrapper">
				<div>
					<h1>Sport Table</h1>
					<div className = "sport-table">
						<div className="sport-table-header">
							<div className = "col-2 table-header-text">Date</div>
							<div className = "col-2 table-header-text">Sport Name</div>
							<div className = "col-2 table-header-text">League</div>
							<div className = "col-2 table-header-text">Teams</div>
							<div className = "col-2 table-header-text">Points Home</div>
							<div className = "col-2 table-header-text">Points Guest</div>
						</div>
						<div className="table-sport col-12">
							{sportEventsInfo}
						</div>
					</div>	
				</div>
			</div>
		)
	}
}

export default SportTable