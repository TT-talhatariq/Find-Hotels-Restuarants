import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import classes from './styles.module.css'
import cx from 'classnames'
import { AppBar, Toolbar, Typography, Box, InputBase } from '@mui/material'
import { useState } from 'react'

const Header = (props) => {
  const [Autocomplete, setAutocomplete] = useState(null)

  const onLoad = (autoC) => {
    setAutocomplete(autoC)
  }
  const onPlaceChanged = () => {
    const lat = Autocomplete.getPlace().geometry.location.lat()
    const lng = Autocomplete.getPlace().geometry.location.lng()
    props.setCoordinates({ lat, lng })
  }

  return (
    <>
      <StyledEngineProvider injectFirst>
        <AppBar position='static' className={classes.Appbar}>
          <Toolbar className={classes.Toolbar}>
            <Typography
              varient='h5'
              className={cx(classes.title, classes.logo)}
            >
              Travel Advisor
            </Typography>
            <Box display='flex' alignItems='center'>
              <Typography className={classes.title} varient='h6'>
                Explore new Places
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </StyledEngineProvider>
    </>
  )
}

export default Header
