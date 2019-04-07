import React, {Component} from 'react'
import {render} from 'react-dom'
import './sportTree.css'
import axios from 'axios' 
import SportTable from '.././sportTable/sportTable'
import moment from "moment"


class Sport extends Component {
	constructor(props) {
		super(props)
		this.state = { 
		date: props.date,
		sportsList : {
			sports: [],
			countries: [
				{
					name: 'Russia',
					isOpen: false
				},
				{
					name: 'England',
					isOpen: false
				},
				{
					name: 'Germany',
					isOpen: false
				}
			],
			leagues: [],
			teams: []
		},
		isOpen: false,
		}
	}

	componentDidMount() {
    axios
      .get("https://www.thesportsdb.com/api/v1/json/1/all_sports.php")
      .then(rez => {
      	this.state.sportsList.sports = rez.data.sports;
      	this.setState(this.state.sportsList.sports);
	      this.state.sportsList.sports.map(sport => {
	      		sport.countries = this.state.sportsList.countries;
	      		sport.countries.map(country => {
	      			country.leagues = this.state.sportsList.leagues;
	      		})
	      		return  this.state.sportsList.sports;
	      })
      })
    }
	render() {
		const treeHeader = <div><span>Choose Data: </span><input 
			type="date" 
			defaultValue={this.state.date} 
			onChange={(event) => this.props.updateDate(event)}
			className="input-date"/></div>;
		const sportLists = this.state.sportsList.sports.map(sport => 
				        	<li key={sport.idSport} className="sport item">
				        		<span className="item-sports"  onClick={() => this.openClose(sport)}>
					        		{sport.strSport}
					        		<input type="checkbox" className="checkbox" />
				        		</span>
								{sport.isOpen && <div className="sport-container">
									<ul className="country-wrapper">
										{sport.countries.map((country , index) =>
											<li key={index} className="country item">
											 		<span className="item-sports"  onClick={() => this.getLeagues(sport, country)}>
											 			{country.name}
											 		<input type="checkbox" className="checkbox"/>
											 	</span>
											 	{country.isOpen && <div className="sport-container">
													<ul className="country-wrapper">
														{country.leagues.map((league , index) =>
															<li key={index} className="league item">
															 		<span className="item-sports" onClick={() => this.getTeams(league)}>
															 			{league.strLeague}
															 		<input type="checkbox" className="checkbox"/>
															 	</span>
															 	{league.isOpen && <div className="sport-container">
																	<ul className="country-wrapper">
																		{league.teams.map((team , index) =>
																			<li key={index} className="teams item">
																			 		<span className="item-sports">
																			 			{team.strTeam}
																			 		<input type="checkbox" className="checkbox"/>
																			 	</span>
																			</li>
																			)}
																	</ul>
																</div> }
															</li>
															)}
													</ul>
												</div> }
											</li>
											)}
									</ul>
								</div> }
				        	</li>);
		return (
			<div className="sport-container">
				<div className="sport-container-header">
					{treeHeader}
				</div>
				<div>
					 <ul>
					 	{sportLists}
				      </ul>
				</div>
			</div>
		)
	}

	getTeams(league) {
	var currentLeague = league;
		axios
    	.get("https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?",{
    		params: {
    			l : currentLeague.strLeague,
    		}
    	})
    	.then(rez => {
    		if(rez.data.teams !== null) {
    			this.state.sportsList.teams = rez.data.teams;
	    		this.state.sportsList.sports.map(sport => {
	    			sport.countries.map(country => {
	    				country.leagues.map(league => {
	    					league.teams = this.state.sportsList.teams;
	    					if(league === currentLeague) {
	    						league.isOpen = true; 
	    					} else {
	    						league.isOpen = false;
	    					}
	    					this.setState({
								isOpen: league.isOpen
							})
	    				})
	    			})
	    		})
    		} else {
    			this.state.sportsList.teams = [];
    		}
    	})
		console.log(league);
	}

	getLeagues(sport, country) {
		console.log(country);
		var currentCountry = country;
		var currentSport = sport;
		var sportName = sport.strSport;
		var countryName = country.name;
		axios
	    .get("https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php", {
	    	params : {
	    		c: countryName,
	    		s: sportName
	    	}
		})
	    .then(rez => {
	    		if(rez.data.countrys !== null) {
	    			this.state.sportsList.leagues = rez.data.countrys;
					this.state.sportsList.sports.map(sport => {
						sport.countries.map(country => {
			      			country.leagues = this.state.sportsList.leagues;
			      			if (country === currentCountry) {
								country.isOpen = !country.isOpen;
							} else {
								country.isOpen = false;
							}
							this.setState({
								isOpen: country.isOpen
							})
		      			})
					})
	    		} else {
	    			this.state.sportsList.leagues = [];
	    		}
			})
		}

	openClose(sport){
		var currentSport = sport;
		console.log(sport);
		this.state.sportsList.sports.map(sport =>{
			if(sport === currentSport) {
				sport.isOpen = !sport.isOpen;
			} else {
				sport.isOpen = false;
			}
			this.setState({
				isOpen: sport.isOpen
			})
			sport.countries.map(country => {
				country.isOpen = false;
				this.setState({
					isOpen: country.isOpen
				})
	      	})
		})
	}
}



export default Sport