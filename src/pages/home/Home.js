import React, {useEffect, useState} from 'react'
import "./Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../../components/movieList/MovieList';

const Home = () => {
    const [popularMovie, setPopularMovie] = useState([])
    useEffect (()=>{
     fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")   
     .then(res=> res.json())
     .then(data=>{ console.log("the data is",data.results);
    setPopularMovie(data.results)
    })
    }, [])

    
  return (
    <>
    <div className='poster'>
        <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        transtionTime={3}
        showStatus={false}
        infiniteLoop={true}
        >
            {
                popularMovie?.map(movie=> (
                    <Link style={{textDecoration: "none",color: "white"}} to={'/movie/${movie.id}'}>
                    <div className='posterImage'>
                        <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}/>

                    </div>
                    <div className='posterImage__overlay'>
                        <div className='posterImage__title'>{movie.original_title}</div>
                        <div className='posterImage__runtime'>
                            <span className='posterImage__rating'>
                                {movie ? movie.vote_average :""}
                                <i className='fas fa-star'/>{""}


                            </span>

                        </div>
                        <div className='posterImage__description'>{movie ? movie.overview :""}</div>

                    </div>
                    </Link>
                ))
            }

        </Carousel>
        <MovieList/>

    </div>
    </>
  )
}

export default Home