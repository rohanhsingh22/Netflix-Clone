import express from 'express'
import { getTrendingMovie, getMoviesTrailers, getMoviesDetails, getSimilarMovies, getMoviesByCatagory } from '../controllers/movie.controller.js'

const router = express.Router()

router.get('/trending', getTrendingMovie)
router.get('/:id/trailers', getMoviesTrailers)
router.get('/:id/details', getMoviesDetails)
router.get('/:id/similar', getSimilarMovies)
router.get('/:catagory', getMoviesByCatagory)

export default router