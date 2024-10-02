import express from 'express'
import { getTrendingMovie, getMoviesTrailers } from '../controllers/movie.controller.js'

const router = express.Router()

router.get('/trending', getTrendingMovie)
router.get('/:id/trailers', getMoviesTrailers)

export default router