import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
	static defaultProps = {
		country: "in",
		pageSize: 5,
		category: "science",
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	};
	capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			loading: true,
			page: 1,
			totalResults: 0,
		};
		document.title = `Newsify - ${this.capitalize(this.props.category)}`;
	}

	async updateNews() {
		this.props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		this.props.setProgress(30);
		let parsedData = await data.json();
		this.props.setProgress(70);
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		});
		this.props.setProgress(100);
	}
	async componentDidMount() {
		// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
		// this.setState({ loading: true });
		// let data = await fetch(url);
		// let parsedData = await data.json();
		// this.setState({
		// 	articles: parsedData.articles,
		// 	totalResults: parsedData.totalResults,
		// 	loading: false,
		// });
		this.updateNews();
	}

	// handleNextClick = async () => {
	// if (
	// 	!(
	// 		this.state.page + 1 >
	// 		Math.ceil(this.state.totalResults / this.props.pageSize)
	// 	)
	// ) {
	// 	let url = `https://newsapi.org/v2/top-headlines?country=${
	// 		this.props.country
	// 	}&category=${
	// 		this.props.category
	// 	}&apiKey=${this.props.apiKey}&page=${
	// 		this.state.page + 1
	// 	}&pageSize=${this.props.pageSize}`;
	// 	this.setState({ loading: true });
	// 	let data = await fetch(url);
	// 	let parsedData = await data.json();
	// 	this.setState({
	// 		articles: parsedData.articles,
	// 		page: this.state.page + 1,
	// 		loading: false,
	// 	});
	// }
	// 	this.setState({
	// 		page: this.state.page + 1,
	// 	});
	// 	this.updateNews();
	// };

	// handlePrevClick = async () => {
	// let url = `https://newsapi.org/v2/top-headlines?country=${
	// 	this.props.country
	// }&category=${
	// 	this.props.category
	// }&apiKey=${this.props.apiKey}&page=${
	// 	this.state.page - 1
	// }&pageSize=${this.props.pageSize}`;
	// this.setState({ loading: true });
	// let data = await fetch(url);
	// let parsedData = await data.json();
	// this.setState({
	// 	loading: false,
	// 	page: this.state.page - 1,
	// 	articles: parsedData.articles,
	// });
	// 	this.setState({
	// 		page: this.state.page - 1,
	// 	});
	// 	this.updateNews();
	// };

	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 });
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalResults: parsedData.totalResults,
		});
	};

	render() {
		return (
			<>
				<h2 className="my-5 text-center">
					Newsify- Top Headlines - {this.capitalize(this.props.category)}
				</h2>
				{this.state.loading && <Spinner />}
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length !== this.state.totalResults}
					loader={<Spinner />}
				>
					<div className="container">
						<div className="row ">
							{this.state.articles.map((element) => {
								return (
									<div className="col-md-4 my-2" key={element.url}>
										<NewsItem
											title={element.title ? element.title.slice(0, 45) : ""}
											description={
												element.description
													? element.description.slice(0, 88)
													: ""
											}
											imageUrl={element.urlToImage}
											newsUrl={element.url}
											author={element.author}
											date={element.publishedAt}
											source={element.source.name}
										></NewsItem>
									</div>
								);
							})}
						</div>
					</div>
				</InfiniteScroll>

				{/* {!this.state.loading && (
					<div className="my-2 container d-flex justify-content-between">
						<button
							disabled={this.state.page <= 1}
							type="button"
							onClick={this.handlePrevClick}
							className="btn btn-md btn-dark"
							>
							&laquo; Previous
						</button>
						<button
							disabled={
								this.state.page + 1 >
								Math.ceil(this.state.totalResults / this.props.pageSize)
							}
							type="button"
							onClick={this.handleNextClick}
							className="btn btn-md btn-dark"
							>
							Next &raquo;
						</button>
					</div>
				)} */}
			</>
		);
	}
}
