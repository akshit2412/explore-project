import { Card, CardContent, Typography } from '@material-ui/core/';

import moment from 'moment';
import { useHistory } from "react-router-dom";
import useStyles from './styles';
import LinesEllipsis from 'react-lines-ellipsis';
import React from 'react';


const Post = ({ post }) => {


    const classes = useStyles();
    const love = post.likes.length;
    const history = useHistory();


    const readMore = () => {
        history.push(`/read/${post._id}`);
    }




    return (

        <Card className={classes.card}>


            <CardContent>

                {
                    post.title.length <= 18 ? (<Typography className={classes.title}  >{post.title}</Typography>) : <Typography className={classes.title} variant="h5" >{`${post.title.substring(0, 19)}...`}</Typography>
                }
                <Typography className={classes.info}>Creator: <span className={classes.creator}>{post.name.substring(0, 25)}</span></Typography>
                <div className={classes.card1}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
                </div>


                <div className={classes.bottom}>
                    <Typography className={classes.date}>{moment(post.createdAt).format("MMMM Do, YYYY")}</Typography>
                    <Typography className={classes.label}>{post.label}</Typography>
                </div>
                <LinesEllipsis className={classes.post} text={post.post} maxLine={4} />


                <div className={classes.readmore}>
                    <button className={classes.more} onClick={readMore}>CONTINUE READING</button>
                </div>

            </CardContent>

            <div className={classes.love}>
                {love > 1 ? `${love} likes` : `${love} like`}
            </div>



        </Card >
    );
};

export default Post;