import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  StyledEngineProvider,
  Typography,
  Box,
  Rating,
  Chip,
  Button,
  CardActions,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import classes from './styles.module.css'
const PlaceDetail = ({ place }) => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Card elevation={6}>
          <CardMedia
            style={{ height: 350 }}
            image={
              place.photo
                ? place.photo.images.large.url
                : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
            }
            title={place.name}
          />
          <CardContent>
            <Typography gutterBottom variant='h5'>
              {place.name}
            </Typography>
            <Box display='flex' justifyContent='space-between' my={2}>
              <Rating name='read-only' value={Number(place.rating)} readOnly />
              <Typography component='legend'>
                {place.num_reviews} review{place.num_reviews > 1 && 's'}
              </Typography>
            </Box>

            <Box>
              <Typography variant='h6'> Ranking </Typography>
              <Typography gutterBottom variant='subtitle1'>
                {place.ranking}
              </Typography>
            </Box>
            {place?.awards?.map((award) => (
              <Box gutterBottom>
                <Typography variant='h6'> Awards </Typography>

                <Typography
                  className={classes.subtitle}
                  variant='subtitle2'
                  color='textSecondary'
                >
                  <img src={award.images.small} />
                  {award.display_name}
                </Typography>
              </Box>
            ))}
            <div className={classes.chip}>
              {place?.cuisine?.map(({ name }) => (
                <Chip
                  key={name}
                  size='small'
                  label={name}
                  className={classes.chipItem}
                />
              ))}
            </div>
            {place.location_string && (
              <Typography
                gutterBottom
                variant='body2'
                color='textSecondary'
                className={classes.subtitle}
              >
                <LocationOnIcon /> {place.location_string}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              size='small'
              color='primary'
              onClick={() => window.open(place.web_url, '_blank')}
            >
              Trip Advisor
            </Button>
            <Button
              size='small'
              color='primary'
              onClick={() => window.open(place.website, '_blank')}
            >
              Website
            </Button>
          </CardActions>
        </Card>
      </StyledEngineProvider>
    </>
  )
}

export default PlaceDetail
