import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, TextField, Container, Dialog, DialogTitle, IconButton, CircularProgress } from '@material-ui/core';
import { verifyOtp } from '../../../api/index';
import useStyles from './styles';
import Input from '../Input';
import CloseIcon from '@material-ui/icons/Close';
import './styles.css'


const initialState = { email: "", otp: '' };

const ForgotVerify = ({ setOpen, changePage }) => {

    const [form, setForm] = useState(initialState);
    const [error, displayError] = useState(false);
    const classes = useStyles();
    const userEmail = localStorage.getItem('email');
    const [showPassword, setShowPassword] = useState(false);
    const [nav, navigate] = useState(false);
    const btnRef = useRef();


    const handleShowPassword = () => setShowPassword(!showPassword);



    const handleError = () => {
        displayError(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setForm({ ...form, email: userEmail });
    }, [])

    const handleSubmit = async (e) => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        navigate(true);
        e.preventDefault();
        const verified = await verifyOtp(form);
        if (verified.code == 200) {
            changePage(5);
        }
        else
            if (verified.code == 400) {
                navigate(false);
                displayError(true);
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }

            }

    };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    return (
        <Container component="main" maxWidth="sm" >

            <Paper className={classes.paper} elevation={5}>
                <Grid container justify="flex-end" alignItems="flex-end" >
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <div className="form">
                    <div className="label">Verify Otp</div>
                    <div className="sublabel">An otp has been sent to your account.<br />This otp is valid only for 15 mins.</div>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField id="standard-read-only-input" defaultValue={userEmail} InputProps={{
                                    readOnly: true,
                                }} name="email" label="Email Address" handleChange={handleChange} type="email" fullWidth variant="outlined" />
                            </Grid>
                            <Input name="otp" label="otp" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} value={form.otp} />
                        </Grid>


                        <div className="continue">
                            <button ref={btnRef} className="submit2" >
                                Verify otp
                            </button>
                        </div>


                    </form>

                </div>
                <Dialog open={error} onClose={handleError} >
                    <DialogTitle >Wrong otp!</DialogTitle>
                </Dialog>
                <Dialog open={nav}  >
                    <DialogTitle><CircularProgress /></DialogTitle>
                </Dialog>

            </Paper>

        </Container>
    );
};

export default ForgotVerify;
