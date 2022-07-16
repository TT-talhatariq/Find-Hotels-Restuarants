import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { StyledEngineProvider } from '@mui/material/styles'
import classes from './styles.module.css'
import { useMediaQuery, Paper, Typography, Rating, Card } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
const Map = (props) => {
  const isDesktop = useMediaQuery('(min-width:600px)')

  const mapChangeHandler = (e) => {
    props.setCord({ lat: e.center.lat, lng: e.center.lng })
    props.setBound({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
  }
  return (
    <>
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={props.coordinates}
          center={props.coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={mapChangeHandler}
        >
          {props.places?.map((place, i) => (
            <div
              className={classes.container}
              key={i}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color='primary' fontSize='large' />
              ) : (
                <Card
                  className={classes.paper}
                  sx={{
                    backgroundColor: 'white',
                  }}
                  elevation={10}
                  style={{ height: 120, width: 100 }}
                >
                  <Typography
                    className={classes.typography}
                    variant='subtitle2'
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                    }
                  />
                  <Rating
                    name='read-only'
                    size='small'
                    value={Number(place.rating)}
                    readOnly
                  />
                </Card>
              )}
            </div>
          ))}
        </GoogleMapReact>
      </div>
      <StyledEngineProvider injectFirst></StyledEngineProvider>
    </>
  )
}

export default Map
