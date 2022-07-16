import React, { useState, useEffect, createRef } from 'react'
import classes from './styles.module.css'
import { StyledEngineProvider } from '@mui/material/styles'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  CssBaseline,
  Grid,
  Card,
  CircularProgress,
} from '@mui/material'
import PlaceDetail from '../PlaceDetail/PlaceDetail'
const List = (props) => {
  return (
    <>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <div className={classes.container}>
          <Typography variant='h5'>Food and Dining around you</Typography>

          {props.isError ? (
            <div className={classes.progress}>
              <Typography variant='h5'>
                Something went wrong. Please try again later.
              </Typography>
            </div>
          ) : props.isLoading ? (
            <div className={classes.progress}>
              <CircularProgress size='5rem' />
            </div>
          ) : (
            <>
              <div className={classes.filter}>
                <FormControl
                  className={classes.formControl}
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel>Type</InputLabel>
                  <Select
                    className={classes.select}
                    value={props.type}
                    label='Type'
                    onChange={(e) => {
                      props.setType(e.target.value)
                    }}
                  >
                    <MenuItem value={'restaurants'}>Restaurants</MenuItem>
                    <MenuItem value={'hotels'}>Hotels</MenuItem>
                    <MenuItem value={'attractions'}>Attractions</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel>Rating</InputLabel>
                  <Select
                    className={classes.select}
                    value={props.rating}
                    label='Rating'
                    onChange={(e) => {
                      props.setRating(e.target.value)
                    }}
                  >
                    <MenuItem value={'0'}>All</MenuItem>
                    <MenuItem value={'4.5'}>Above 4.5</MenuItem>
                    <MenuItem value={'4'}>Above 4.0</MenuItem>
                    <MenuItem value={'3'}>Above 3.0</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {props.places.length ? (
                <Grid container spacing={3}>
                  {props.places?.map((place, i) => (
                    <Grid item xs={12} key={i}>
                      <PlaceDetail place={place} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant='h5'>No Best results found</Typography>
              )}
            </>
          )}
        </div>
      </StyledEngineProvider>
    </>
  )
}

export default List
