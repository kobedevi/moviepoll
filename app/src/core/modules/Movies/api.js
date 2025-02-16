
const searchMovies = (data) => (headers) => {
    return fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${data}`, {
    });
}

export {
    searchMovies,
}