const Routes = Object.freeze({
    // old
    Home: "/",
    Login: '/login',

    LikedMovies: '/likedMovies',

    Movies: '/movies',
    MoviesCreate: '/movies/create',
    MoviesEdit: '/movies/:id/edit',
});

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /movies/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach(key => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { Routes };