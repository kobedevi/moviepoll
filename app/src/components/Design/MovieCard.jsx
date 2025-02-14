import React from 'react'
import Like from '../Like'

const MovieCard = () => {
  return (
    <div className='movieCard mt-4 mb-4'>
        <Like 
            onUpdate={onUpdate} 
            movieId={movie._id}
            movie={movie}
        />
        <Link to={route(Routes.MoviesDetail, {id: movie._id})}>
            <img src={`${movie.coverLink}`} alt='Movie poster'/>
        </Link>
        <Link to={route(Routes.MoviesDetail, {id: movie._id})}>
            <section>
                <p className='coverTitle mt-2 mb-0'>{movie.title}</p>
                <p className="coverYear mb-0">{format(new Date(movie.releaseDate), 'yyyy')}</p>
            </section>
        </Link>
    </div>
  )
}

export default MovieCard