import React, { useState, useRef } from 'react';
import { Paper, Grid,  Container, DialogTitle, Dialog, CircularProgress } from '@material-ui/core';

import { forgotEmail } from '../../../api/index';
import Input from '../Input';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./styles.css"


const initialState = { email: '' };

const ForgotEmail = ({ setOpen, changePage }) => {
    const [form, setForm] = useState(initialState);
    const [error, displayError] = useState(false);
    const [nav, navigate] = useState(false);
    const btnRef = useRef();

    const switchMode = () => {
        changePage(0);
        setForm(initialState);
    };
    const handleError = () => {
        displayError(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        navigate(true);
        e.preventDefault();
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        const verified = await forgotEmail(form);

        if (verified.code == 200) {
            changePage(6);

        } else
            if (verified.code == 400) {
                displayError(true);
                navigate(false);
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }

            }

    };

    const handleChange = (e) => {
        if (e.target.name === "email")
            localStorage.setItem('email', e.target.value);

        setForm({ ...form, [e.target.name]: e.target.value });
    }




    return (
        <Container component="main" maxWidth="sm" >
            <Paper className="paper" elevation={3}>
                <Grid container justify="flex-end" >
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <div className="form">
                    <div className="label">Forgot your Password?</div>
                    <div className="sublabel">Enter the email associated with your account.</div>



                    <form onSubmit={handleSubmit}>

                        <Grid container spacing={2}>
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" value={form.email} />
                        </Grid>


                        <div className="continue">
                            <button ref={btnRef} className="submit2" >
                                Continue
                            </button>
                        </div>




                    </form>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <p className="query">Want to Sign in?<button onClick={switchMode} className="query1">SIGN IN</button></p>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={error} onClose={handleError} >
                    <DialogTitle >Sorry, this account doesn't exist.</DialogTitle>
                </Dialog>
                <Dialog open={nav}  >
                    <DialogTitle><CircularProgress /></DialogTitle>
                </Dialog>

            </Paper>

        </Container >
    );
};

export default ForgotEmail;
