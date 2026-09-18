import React from "react";
import MovieList from "../components/MovieList";
import Preloader from "../components/Preloader";
import Search from "../components/Search";
import "./Main.css";

class Main extends React.Component{

    state = {
        movies: [],
        loading: true,
        count: 0
    }

    componentDidMount(){
        fetch("http://www.omdbapi.com/?apikey=4eb9d7fd&s=matrix")
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, loading: false, count: data.totalResults}))
    }

    searchMovie = (str, type="all", page) => {
        this.setState({loading: true})
        fetch(`http://www.omdbapi.com/?apikey=4eb9d7fd&s=${str}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, loading: false, count: data.totalResults}))
    }

    render(){   
        const {movies, loading, count} = this.state;
        // console.log(count);
        
        return (
            <div className="main">
                <div className="wrap">
                    <Search searchMovie={this.searchMovie} totalCount={count} />
                    {
                        loading ? <Preloader /> : <MovieList movies={movies} />
                    }                    
                </div>
            </div>
        )
    }
}

export default Main;