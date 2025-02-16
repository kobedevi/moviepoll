'use client'

import { Link } from 'react-router-dom'
// import Like from '../Like'
import { route } from '../../core/routing'
import { useCallback } from 'react';
import useFetch from '../../core/hooks/useFetch';
import { searchMovies } from '../../core/modules/Movies/api';

const MovieCard = () => {

    const [query, setQuery] = useState('');
    const apiCall = useCallback((query) => {
        return searchMovies(query);
      }, [0, 10]);
    
      const {
        data,
        error,
        setError,
        isLoading,
        refresh,
      } = useFetch(apiCall);

    console.log(data);

  return (
    <div className='movieCard mt-4 mb-4'>
        <p>{data.description[0].title}</p>
        {/* <Like 
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
            </section>
        </Link> */}
    </div>
  )
}

export default MovieCard