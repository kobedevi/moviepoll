"use client"

import { fetchLikedMovies } from '../core/modules/likedMovies/api';
import useFetch from '../core/hooks/useFetch';
import { createContext, useContext } from 'react';
import Spinner from './Design/Spinner';
import Alert from './Design/Alert';
import MainRouting from '../core/routing/MainRouting';

const LikedMovies = createContext();

const App = () => {
    const {
        data: likedMovies,
        setData: setLikedMovies,
        error,
        isLoading
    } = useFetch(fetchLikedMovies);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error.message}</Alert>;
    }

    return (
        <div className="content">
            <div className="app">
                <main>
                    {/* add likedMovies to provider so we can prevent constant connections to check if movie is liked or not*/}
                    <LikedMovies.Provider value={{likedMovies, setLikedMovies}}>
                        <MainRouting />
                    </LikedMovies.Provider>
                </main>
            </div>
        </div>
    )
};

const useLikedMovies = () => {
    return useContext(LikedMovies);
}

export {
    useLikedMovies,
}

export default App;