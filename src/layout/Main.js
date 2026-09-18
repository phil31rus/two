import React from "react";
import MovieList from "../components/MovieList";
import Preloader from "../components/Preloader";
import Search from "../components/Search";
import "./Main.css";

class Main extends React.Component {

    state = {
        movies: [],
        loading: true,
        count: 0
    }

    componentDidMount() {
        fetch("https://www.omdbapi.com/?apikey=4eb9d7fd&s=matrix")
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    this.setState({ movies: data.Search, loading: false, count: data.totalResults });
                } else {
                    this.setState({ movies: [], loading: false, count: 0 });
                }
            })
            .catch(() => this.setState({ loading: false }));
    }

    searchMovie = (str, type = "all", page) => {
        this.setState({ loading: true });
        fetch(`https://www.omdbapi.com/?apikey=4eb9d7fd&s=${str}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    this.setState({ movies: data.Search, loading: false, count: data.totalResults });
                } else {
                    this.setState({ movies: [], loading: false, count: 0 });
                }
            })
            .catch(() => this.setState({ loading: false }));
    }

    render() {
        const { movies, loading, count } = this.state;

        return (
            <div className="main">
                <div className="wrap">
                    <Search searchMovie={this.searchMovie} totalCount={count} />
                    {
                        loading
                            ? <><Preloader /><p style={{ textAlign: "center" }}>Загрузка…</p></>
                            : <MovieList movies={movies} />
                    }
                </div>
            </div>
        );
    }
}

export default Main;