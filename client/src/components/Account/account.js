import React, { useState } from 'react';
import { Paper, Dialog, DialogTitle } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import Password from './password.js'


const ACCOUNT = ({ user, setUser }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>

            {user?.result ? (<Paper elevation={2} className={classes.details}>

                <div className={classes.info}>Full Name : <span className={classes.data}>{user.result.name != null ? user.result.name : user.result.givenName}</span> </div>



                <div className={classes.info}>Email Address : <span className={classes.data}>{user.result.email} </span></div>



                <div className={classes.info}>Account created on :<span className={classes.data}> {moment(user.result.createdAt).format("MMMM Do, YYYY")}</span></div>


                {!user.result.googleId ? <button className={classes.password} onClick={() => { setOpen(true) }}>Change Password</button> : ""}


            </Paper >) : <Dialog open={true}>
                <DialogTitle >Access Denied!</DialogTitle>
            </Dialog>
            }
            <Dialog open={open} fullScreen onClose={handleClose}>
                <Password setOpen={setOpen} user={user} setUser={setUser} />
            </Dialog>

        </div >


    );
};

export default ACCOUNT;