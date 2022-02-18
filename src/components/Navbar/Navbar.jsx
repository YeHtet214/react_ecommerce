import React from 'react';
import { AppBar, Toolbar, IconButton, MenuItem, Menu, Typography, Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { createTheme } from '@material-ui/core';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

  return (
    <>
        <AppBar position='fixed' className={classes.appBar} color='#fefefe' >
            <Toolbar className={classes.toolBar}>
                <Typography component={Link} to='/' variant='h6' color='inherit' className={classes.title} >
                    <img src={logo} alt="commerce shop logo" height="25px" />
                    <span>E_Commerce</span>
                </Typography>
                <div className={classes.grow} />
                <div>
                   { location.pathname === '/' && (
                        <IconButton component={Link} to='/cart' aria-label='show cart items' color='inherit' >
                            <Badge badgeContent={totalItems} color='secondary' >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                   )}
                </div>
            </Toolbar>
        </AppBar>
        <div className={classes.spacer} />
    </>
  )
}

export default Navbar