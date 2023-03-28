import "./App.css";
// a52876b6612245a8966afab657a96082
import LoadingBar from "react-top-loading-bar";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
// import NewsItem from "./components/NewsItem";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default class App extends Component {
	pageSize = 5;
	state = {
		progress: 0,
	};
	setProgress = (progress) => {
		this.setState({
			progress: progress,
		});
	};
	country = "us";
	apiKey = process.env.REACT_APP_NEWS_API;
	render() {
		return (
			<>
				<BrowserRouter>
					<Navbar></Navbar>
					<LoadingBar color="#f11946" height={3} progress={this.state.progress} />
					<Routes>
						<Route
							exact
							path="/business"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="business"
									category="business"
									country={this.country}
									pageSize={this.pageSize}
								></News>
							}
						/>
						<Route
							exact
							path="/entertainment"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="entertainment"
									category="entertainment"
									country={this.country}
									pageSize={this.pageSize}
								></News>
							}
						/>
						<Route
							exact
							path="/general"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="general"
									category="general"
									country={this.country}
									pageSize={this.pageSize}
								></News>
							}
						/>
						<Route
							exact
							path="/health"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="health"
									category="health"
									country={this.country}
									pageSize={this.pageSize}
								></News>
							}
						/>
						<Route
							exact
							path="/science"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="science"
									category="science"
									country={this.country}
									pageSize={this.pageSize}
								></News>
							}
						/>
						<Route
							exact
							path="/sports"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="sports"
									category="sports"
									country={this.country}
									pageSize={this.pageSize}
								></News>
							}
						/>
						<Route
							exact
							path="/technology"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="technology"
									category="technology"
									country={this.country}
									pageSize={this.pageSize}
								></News>
							}
						/>
					</Routes>
				</BrowserRouter>
			</>
		);
	}
}
