import React, { useState } from 'react';
import { Menu, MenuItem, Card, CardContent, Typography, Dialog, DialogContent, DialogTitle, CircularProgress } from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import decode from 'jwt-decode';

import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { deletePost } from '../../../api/index';
import { projectStorage } from '../../create/firebase/config';
import { useHistory } from "react-router-dom";



import Edit from '../../editpost/editpost.js';
import useStyles from './styles';
import LinesEllipsis from 'react-lines-ellipsis';
import MoreIcon from '@material-ui/icons/MoreVert';






const Mypost = ({ post, user, setUser }) => {


    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const love = post.likes.length;
    const [consent, setConsent] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [nav, navigate] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [error, displayError] = useState(false);
    const history = useHistory();



    const isMenuOpen = Boolean(anchorEl);

    const readMore = () => {
        history.push(`/read/${post._id}`);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const consentOver = () => {
        setConsent(false);
    }

    const closeError = () => {
        displayError(false);
    }

    const askConsent = () => {
        if (!user) {
            setOpen1(true);

        } else {
            const token = user?.token;

            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {

                localStorage.clear();
                setUser(null);
                setOpen1(true);

            } else {

                setConsent(true);
                handleMenuClose();
            }
        }
    }


    const handleDelete = async () => {

        navigate(true);
        handleMenuClose();
        
        if (post.imgname&&post.imgname!='') {
            const storageRef1 = projectStorage.ref();
            const desertRef = storageRef1.child(post.imgname);
            await desertRef.delete();
        }

        const deleted = await deletePost(post);
        if (deleted.code == 200) {
            history.push("/");
            history.push("/creator");
        } else {
            displayError(true);
            navigate(false);
        }

    }





    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = () => {
        if (!user) {
            setOpen1(true);

        } else {
            const token = user?.token;

            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {

                localStorage.clear();
                setUser(null);
                setOpen1(true);

            } else {
                setOpen(true);
                handleMenuClose();
            }
        }
    }


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
            <MenuItem disableFocusRipple disableRipple className={classes.items} onClick={handleEdit}><EditIcon style={{ fontSize: 18 }} /> &nbsp; Edit this Post</MenuItem>
            <MenuItem disableFocusRipple disableRipple className={classes.items} onClick={askConsent}> <DeleteIcon style={{ fontSize: 18 }} />&nbsp; Delete this post</MenuItem>
        </Menu>
    );





    return (

        <Card className={classes.card}>




            <CardContent>

                {
                    post.title.length <= 20 ? (<Typography className={classes.title}  >{post.title}</Typography>) : <Typography className={classes.title} variant="h5" >{`${post.title.substring(0, 21)}...`}</Typography>
                }

                <div className={classes.card1}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
                </div>
                <div className={classes.bottom}>
                    <Typography className={classes.date}>{moment(post.createdAt).format("MMMM Do, YYYY")}</Typography>
                    <Typography className={classes.label}>{post.label}</Typography>
                </div>

                <MoreIcon
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    className={classes.overlay4}
                />
                <LinesEllipsis className={classes.post} text={post.post} maxLine={4} />

                <div className={classes.readmore}>
                    <button disableFocusRipple disableRipple className={classes.more} onClick={readMore}>CONTINUE READING</button>
                </div>

            </CardContent>


            <div className={classes.love}>
                {love > 1 ? `${love} likes` : `${love} like`}
            </div>

            {renderMenu}



            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" >
                <DialogContent>
                    <Edit post={post} user={user} setUser={setUser} />
                </DialogContent>
            </Dialog>

            <Dialog open={consent} onClose={consentOver}>

                <DialogTitle ><Typography className={classes.deleteTitle}>Do you really want to delete this post? Once deleted, the post can't be recovered.</Typography> </DialogTitle>
                <div className={classes.delete}>

                    <button onClick={handleDelete} className={classes.deletebutton} >Delete</button>
                    <button onClick={consentOver} className={classes.deletebutton} >Cancel</button>
                </div>
                <DeleteIcon style={{ fontSize: 30 }} />
            </Dialog>



            <Dialog open={nav}  >
                <DialogTitle><CircularProgress /></DialogTitle>
            </Dialog>

            <Dialog open={open1} >
                <DialogTitle >Your session has ended, please login to make any changes to your post.</DialogTitle>
            </Dialog>
            <Dialog open={error} oncClose={closeError} >
                <DialogTitle >Error! Please try again.</DialogTitle>
            </Dialog>

        </Card >
    );
};

export default Mypost;



