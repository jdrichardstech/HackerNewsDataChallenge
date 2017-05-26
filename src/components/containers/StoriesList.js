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
		stories:[]
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
					for(let i = 0; i<storyData.length; i++){
						axios.get(`https://hacker-news.firebaseio.com/v0/user/${storyData[i].by}.json`)
						.then((r)=>{
							storyData[i].karma = r.data.karma
							// console.log("STORYDATA: " + JSON.stringify(storyData))
							return storyData
						})
					}
				})
			}
		})
		.then((storyData) => {
			console.log( "NEXT DATA: " + JSON.stringify(storyData))
		})
		.catch()
		}


	render(){
		return(
			<div>
				<h1>Conatainer StoriesList</h1>
			</div>
		)
	}
}

export default StoriesList
