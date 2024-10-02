import { fetchFromTMDB } from "../services/tmdb.service.js";


export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1')
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)]

        res.json({success: true, content: randomMovie})
    } catch (error) {
        res.status(500).json({ success: false, messsage: 'Internal server error' + error.messsage})
    }
}

export async function getMoviesTrailers(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.json({success: true, trailers: data.results})
    } catch (error) {
        if(error.messsage.includes('404')){
            return res.status(404).send(null)
        }

        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

export async function getMoviesDetails(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({success: true, content: data})
    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null)
        }

        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params
    try {
        const data = fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({success: true, similar: data.results})
    } catch (error) {
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}


export async function getMoviesByCatagory(req, res) {
    const { catagory } = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${catagory}?language=en-US&page=1`)
        res.status(200).json({success: true, content: data.results})
    } catch (error) {
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}




