import React, { useState, useEffect } from 'react';
import { Grid, LinearProgress, Dialog, DialogTitle } from '@material-ui/core';
import { getmyposts } from '../../api/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import SyncLoader from "react-spinners/SyncLoader";

import decode from 'jwt-decode';


import Mypost from './Post/mypost';
import useStyles from './styles';

const MYPOSTS = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [open, setOpen] = useState(false);
    const [start, setstart] = useState(parseInt(0));
    const [postslength, setpostsLength] = useState(parseInt(-1));

    useEffect(() => {
        retrieve();
    }, [])

    function isSignedin() {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                localStorage.clear();
                setUser(null);
            }
        }

    }

    const retrieve = async () => {

        isSignedin();

        if (user && user.result._id) {
            const receivedposts = await getmyposts(user.result._id, start);
            setPosts(posts.concat(receivedposts.posts));
            setpostsLength(receivedposts.postslength);
        } else if (user && user.result.googleId) {
            const receivedposts = await getmyposts(user.result.googleId, start);
            setPosts(posts.concat(receivedposts.posts));
            setpostsLength(receivedposts.postslength);
        } else {
            setOpen(true);
        }

    }

    const nextPosts = async () => {
        if (user && user.result._id) {

            const receivedposts = await getmyposts(user.result._id, start + 12);
            setstart(start + 12);
            setPosts(posts.concat(receivedposts.posts));

        } else if (user && user.result.googleId) {

            const receivedposts = await getmyposts(user.result.googleId, start + 12);
            setstart(start + 12);
            setPosts(posts.concat(receivedposts.posts));

        } else {
            setOpen(true);
        }
    }

    return (
        <div>

            {!posts.length ? <LinearProgress className={classes.bar} /> : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={nextPosts}
                    hasMore={start < postslength && postslength >= 12}
                    loader={<div className={classes.loading}><SyncLoader size={10} /></div>}
                    endMessage={<div className={classes.loading}><h4>You're All Caught Up</h4></div>}
                >
                    <Grid className={classes.container} container >

                        {posts.map((post) => (
                            < Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                                <Mypost post={post} user={user} setUser={setUser} retrieve={retrieve} />
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>

            )}
            <Dialog open={open}  >
                <DialogTitle >Your session has expired, please login again.</DialogTitle>
            </Dialog>
        </div>



    );
};

export default MYPOSTS;

