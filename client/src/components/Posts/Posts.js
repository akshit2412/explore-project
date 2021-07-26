import React, { useState, useEffect } from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { getPosts } from '../../api/index';
import decode from 'jwt-decode';
import Post from './Post/Post';
import useStyles from './styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import SyncLoader from "react-spinners/SyncLoader";


const POSTS = ({ user, setUser }) => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [start, setstart] = useState(parseInt(0));
    const [postslength, setpostsLength] = useState(parseInt(-1));

    useEffect(() => {
        retrieve();
    }, [])


    const isSignedin = () => {
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
        const receivedposts = await getPosts(start);
        setPosts(posts.concat(receivedposts.posts));
        setpostsLength(receivedposts.postslength);

    }

    const nextPosts = async () => {
        const receivedposts = await getPosts(start + 12);
        setstart(start + 12);
        setPosts(posts.concat(receivedposts.posts));
    }

    return (

        <Grid>
            {!posts.length ? <LinearProgress /> : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={nextPosts}
                    hasMore={start < postslength}
                    loader={<div className={classes.loading}><SyncLoader size={10} /></div>}
                    endMessage={<div className={classes.loading}><h4>You're All Caught Up</h4></div>}
                >
                    <Grid className={classes.container} container >

                        {posts.map((post) => (
                            < Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                                <Post post={post} retrieve={retrieve} />
                            </Grid>
                        ))}

                    </Grid>
                </InfiniteScroll>
            )
            }
        </Grid >




    );
};

export default POSTS;

