import React, { Component } from "react";

export default class NewsItem extends Component {
	render() {
		let { title, description, imageUrl, newsUrl, author, date, source } =
			this.props;
		return (
			<>
				<div className="container">
					<div className="card">
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								position: "absolute",
								right: "0",
							}}
						>
							<span className=" badge rounded-pill bg-danger">{source}</span>
						</div>
						<img
							style={{ height: "200px" }}
							src={
								imageUrl
									? imageUrl
									: "https://images.hindustantimes.com/img/2022/08/19/1600x900/ethiopian_airlines_pilots_miss_landing_fall_asleep_1660904485900_1660904486118_1660904486118.jpg"
							}
							className="card-img-top img-fluid"
							alt="..."
						/>
						<div className="card-body">
							<h5 className="card-title">{title}... </h5>
							<p className="card-text">{description}...</p>
							<p className="card-text">
								<small className="text-muted">
									By {!author ? "Unknown" : author} on{" "}
									{new Date(date).toGMTString()}
								</small>
							</p>

							<a
								rel="noreferrer"
								href={newsUrl}
								target="_blank"
								className="btn btn-sm btn-primary"
							>
								Read More
							</a>
						</div>
					</div>
				</div>
			</>
		);
	}
}
