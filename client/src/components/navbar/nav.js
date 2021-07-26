
import { Typography, Dialog, DialogContent, Avatar, Toolbar } from '@material-ui/core';


import IconButton from '@material-ui/core/IconButton';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import React, { useLayoutEffect, useState } from 'react';
import TRY from '../Auth/proto/try';
import { useHistory } from "react-router-dom";
import useStyles from './styles';



function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default function PrimarySearchAppBar({ user, setUser }) {


    const [open, setOpen] = useState(false);
    const history = useHistory();


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [width] = useWindowSize();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleClose = () => {
        setOpen(false);
    }

    async function handleClick(e) {
        e.preventDefault();
        setOpen(true);
    }

    function endIt() {
        localStorage.clear();
        setUser(null);
        handleMenuClose();
        history.push('/');

    }

    const handleAccount = () => {
        history.push('/creator');
        handleMenuClose();
    };

    const openAccount = () => {
        history.push('/info');
        handleMenuClose();
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            style={{ marginTop: '6px' }}

        >
            <MenuItem disableFocusRipple disableRipple className={classes.items} onClick={openAccount}>Account settings</MenuItem>
            <MenuItem disableFocusRipple disableRipple className={classes.items} onClick={handleAccount}>Your content </MenuItem>
            <MenuItem disableFocusRipple disableRipple className={classes.items} onClick={endIt}>Log out</MenuItem>

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (

        <Menu
            anchorEl={mobileMoreAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem disableFocusRipple disableRipple className={classes.items} component={Link} to="/" onClick={handleMobileMenuClose}>HOME</MenuItem>
            <MenuItem disableFocusRipple disableRipple className={classes.items} component={Link} to="/compose" onClick={handleMobileMenuClose}>WRITE</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <div position="static" color="">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Button disableFocusRipple disableRipple className={classes.icon} component={Link} to="/" >EXPLORE</Button>
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionMobile}>

                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            disableFocusRipple disableRipple
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionDesktop}>

                        {width > 960 && mobileMoreAnchorEl != null ? setMobileMoreAnchorEl(null) : ""}

                        <Button disableFocusRipple disableRipple className={classes.but} component={Link} to="/">HOME</Button>
                        <Button disableFocusRipple disableRipple className={classes.but} component={Link} to="/compose">WRITE</Button>

                    </div>
                    <div className={classes.user}>

                        {user?.result ? (

                            <Avatar edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                className={classes.purple}
                                alt={user?.result.name}
                                src={user?.result.imageUrl}>{user?.result.name.charAt(0)}
                            </Avatar>


                        ) : (
                            <Button disableFocusRipple disableRipple onClick={handleClick} className={classes.signin} variant="contained" color="primary">Sign In</Button>
                        )}
                    </div>


                </Toolbar>
            </div>
            {renderMobileMenu}
            {renderMenu}

            <Dialog open={open} fullScreen onClose={handleClose} >
                <DialogContent>
                    <TRY setOpen={setOpen} setUser={setUser} />
                </DialogContent>
            </Dialog>
        </div>

    );
}
