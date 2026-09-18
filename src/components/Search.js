import React from "react";
import "./Search.css";

class Search extends React.Component {
    state = {
        search: "",
        type: "all",
        page: 1
    }

    handleSearch = () => {
        this.setState(
            { page: 1 },
            () => this.props.searchMovie(this.state.search, this.state.type, 1)
        )
    }

    handleKey = (event) => {
        if (event.key === "Enter") {
            this.handleSearch()
        }
    }

    handleFilter = (event) => {
        this.setState(
            { type: event.target.dataset.type, page: 1 },
            () => this.props.searchMovie(this.state.search, this.state.type, 1)
        )
    }

    prevPage = () => {
        this.setState(
            this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 },
            () => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        )
    }

    nextPage = () => {
        let total = Math.ceil(this.props.totalCount / 10);
        this.setState(
            this.state.page === total ? { page: total } :
                { page: this.state.page + 1 },
            () => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        )
    }

    setPage = (num) => {
        this.setState(
            { page: num },
            () => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
        )
    }

    render() {
        let limit = 10;
        let totalPage = Math.ceil(this.props.totalCount / limit);

        let lastIndex = totalPage <= 10 ? totalPage : this.state.page + limit - 1;
        let firstIndex = totalPage <= 10 ? 0 : lastIndex - limit;

        let mas = [];
        for (let i = 1; i <= totalPage; i++) {
            mas.push(i);
        }

        return (
            <>
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={e => this.setState({ search: e.target.value })}
                        onKeyDown={this.handleKey}
                    />
                    <button className="btn" onClick={this.handleSearch}>Search</button>
                </div>
                <div className="radio">
                    <label htmlFor="all">
                        <input type="radio" name="type" id="all" data-type="all" checked={this.state.type === "all"} onChange={this.handleFilter} /> All
                    </label>
                    <label htmlFor="movies">
                        <input type="radio" name="type" id="movies" data-type="movie" checked={this.state.type === "movie"} onChange={this.handleFilter} /> Movies only
                    </label>
                    <label htmlFor="series">
                        <input type="radio" name="type" id="series" data-type="series" checked={this.state.type === "series"} onChange={this.handleFilter} /> Series only
                    </label>
                    <label htmlFor="games">
                        <input type="radio" name="type" id="games" data-type="game" checked={this.state.type === "game"} onChange={this.handleFilter} /> Games only
                    </label>
                </div>
                <div className="navigation">
                    <button className="btn" onClick={this.prevPage} style={{ opacity: this.state.page === 1 ? ".5" : "1" }}>Prev</button>

                    <div className="items">
                        {
                            mas
                                .slice(firstIndex, lastIndex)
                                .map((el, index) => (
                                    <button
                                        className="btn"
                                        key={index}
                                        style={{ background: this.state.page !== el ? "" : "gray" }}
                                        onClick={() => this.setPage(el)}
                                    >{el}</button>
                                ))
                        }
                    </div>

                    <button className="btn" onClick={this.nextPage} style={{ opacity: this.state.page === totalPage ? ".5" : "1" }}>Next</button>
                </div>
            </>
        )
    }
}

export default Search;