import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Paper, LinearProgress, Dialog, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { lovePost } from '../../api/index';
import { postbyID } from '../../api/index';
import moment from 'moment';

import useStyles from './styles';
import { useHistory, useParams } from 'react-router';


const EXPAND = ({ user }) => {

    const classes = useStyles();
    const [post, setPost] = useState(1);
    const [error, showError] = useState(false);
    const { id } = useParams();

    let history = useHistory();

    const Likes = () => {
        if (user) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><Button color="primary" onClick={handleLike}><ThumbUpAltIcon /></Button></>
                ) : (
                    <><Button color="primary" onClick={handleLike}><ThumbUpAltOutlined /></Button></>
                );
        } else {
            return <><Button color="primary" onClick={() => { showError(true) }}><ThumbUpAltOutlined /></Button></>
        }
    };

    const handleClose = () => {
        showError(false);
    }




    const handleLike = async () => {
        const liked = await lovePost(post);
        if (liked.code == 200) {
            getPost(liked.post);
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    const getPost = async () => {
        const posts = await postbyID(id);
        setPost(posts);
    }

    return (

        <Grid className={classes.expand}>

            {post === 1 ? <LinearProgress /> : (<Paper elevation={4} >
                <Grid className={classes.close}>
                    <Grid container justify="flex-end"  >
                        <IconButton disableFocusRipple disableRipple edge="start" color="inherit" onClick={() => { history.goBack() }} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>


                <Typography className={classes.heading}>{post.title}</Typography>
                <div className={classes.info}>
                    <Typography >Written by {post.name} </Typography>
                    <Typography>{moment(post.createdAt).format("MMMM Do, YYYY")} </Typography>
                </div>



                {post.selectedFile ? <div className={classes.card}>
                    <img className={classes.media} src={post.selectedFile} />
                </div> : ''}

                <Typography className={classes.post}>{post.post}</Typography>

                <div className={classes.like}>
                    <div className={classes.likeicon} >
                        <Likes />
                    </div>
                    <p className={classes.likes}> {post.likes.length} {post.likes.length <= 1 ? 'like' : 'likes'}</p>
                </div>

                <Dialog open={error} onClose={handleClose} >
                    <DialogTitle >Please Login to give this post a like.</DialogTitle>
                </Dialog>





            </Paper>)}

        </Grid >


    );
};

export default EXPAND;