import React, { useEffect, useState } from 'react'
import { Header, List, Map } from './exports'
import { CssBaseline, Grid, CircularProgress } from '@mui/material'
import { getPlacesData } from './api/api-call'

import classes from './App.module.css'
const App = () => {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [isError, setIsError] = useState(false)
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [rating, setRating] = useState('0')

  const [bounds, setBounds] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  })

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((coords) => {
        setCoordinates({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        })
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      setIsError(false)
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.rating > 0))
          setIsLoading(false)
          console.log(data)
        })
        .catch((error) => {
          setIsError(true)
          setIsLoading(false)
          console.log(error.message)
        })
    }
  }, [bounds, type])

  useEffect(() => {
    const filtered = places.filter((place) => {
      console.log(place.rating, rating)
      return Number(place.rating) > Number(rating)
    })
    setFilteredPlaces(filtered)
  }, [rating])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container className={classes.container}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            isLoading={isLoading}
            isError={isError}
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCord={setCoordinates}
            setBound={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
