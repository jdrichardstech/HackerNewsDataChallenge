import React, { Component } from 'react'
import axios from 'axios'

class StoriesList extends Component{
	state={
		title:'',
		url:'',
		timeStamp:'',
		score:null,
		id:'',
		karma:null,
		stories:null,
		finalStories:[]
	}

	componentWillMount(){
	let topTenStories = []
	let storyData = []
		axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
		.then((response)=>{
			let topStoryIds = response.data
			for(let i=0;i<10;i++){
				let randomStoryIds = topStoryIds[Math.floor(Math.random() * topStoryIds.length)]
				topTenStories.push(randomStoryIds)
			}
	 			return topTenStories
		})
		.then((topTenStories)=>{
			for(let i = 0; i<topTenStories.length;i++){
				axios.get(`https://hacker-news.firebaseio.com/v0/item/${topTenStories[i]}.json`)
				.then((res)=>{
					let info = res.data
					storyData.push(info)
					console.log("STORYDATA GETTER: " + JSON.stringify(storyData))
					return storyData
				})
				.then((storyData)=>{
					let scoreSortAscending = (score1, score2) =>{
						score1 = score1.score
						score2 = score2.score
						return score1 - score2
					}
					storyData.sort(scoreSortAscending)
					return storyData
				})
				.then((storyData)=>{
					for(let i = 0; i < storyData.length; i++){
						axios.get(`https://hacker-news.firebaseio.com/v0/user/${storyData[i].by}.json`)
						.then((r)=>{
							storyData[i].karma = r.data.karma

							this.setState({
								stories: storyData
							})
							return storyData
						})
					}
				})
			}
		})

		.catch()

		}


	render(){
		let stories = this.state.stories

		let content = (stories == null) ? null :
			stories.map((item, i) => {
				return (
					<li style={{textAlign:'left'}} key={i}><h3>Story {i+1}:</h3>Title: {item.title}<br />URL: <a href={item.url} target="_blank">{item.url}</a><br/>Timestamp: {item.time}<br />Story score: {item.score}<br />Author id: {item.id}<br />Karma: {item.karma}<br /><br /></li>
				)
			})

		return(
			<div>
				<h1>HackerNews Random Stories List</h1>
				<ul style={{listStyle:'none', float:'left'}} >
					{content}
				</ul>


			</div>
		)
	}
}

export default StoriesList
