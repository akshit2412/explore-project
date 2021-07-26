import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, Container, TextField, Dialog, DialogTitle, CircularProgress, IconButton } from '@material-ui/core';
import { forgotPassword } from '../../../api/index';
import useStyles from './styles';
import Input from '../Input';
import { auth } from '../../../auth/auth';
import CloseIcon from '@material-ui/icons/Close';
import "./styles.css"

const initialState = { email: '', password: '', confirmPassword: '' };

const ChangePassword = ({ setOpen, changePage }) => {
    const [form, setForm] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const [nav, navigate] = useState(false);
    const [error, showError] = useState(false);
    const [error2, showError2] = useState(false);
    const [message, showMessage] = useState(false);

    const btnRef = useRef();
    const classes = useStyles();
    const userEmail = localStorage.getItem('email');



    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setForm({ ...form, email: userEmail });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        if (form.password.length < 8) {
            showError2(true);
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }

        }
        else if (form.password === form.confirmPassword) {
            navigate(true);
            await forgotPassword(form);
            setTimeout(() => {
                changePage(0);
            }, 5000)
            localStorage.clear();
            navigate(false);
            showMessage(true);




        } else {
            showError(true);
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
        }

    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        showError(false);
        showError2(false);
    };


    return (
        <Container component="main" maxWidth="sm" >
            <Paper className={classes.paper} elevation={3}>
                <Grid container justify="flex-end" alignItems="flex-end" >
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Grid>

                <div className="form">

                    <div className="label">Change Your Password</div>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField id="standard-read-only-input" defaultValue={userEmail} InputProps={{
                                    readOnly: true,
                                }} name="email" label="Email Address" handleChange={handleChange} type="email" fullWidth variant="outlined" />
                            </Grid>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} value={form.password} />
                            <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" value={form.confirmPassword} />
                            {error ? <p className={classes.error}>Passwords don't match. Try again.</p> : ''}
                            {error2 ? <p className={classes.error}>Length of the password must be atleast 8.</p> : ''}
                        </Grid>
                        <div className="continue">
                            <button ref={btnRef} className="submit2" >
                                Submit
                            </button>
                        </div>


                    </form>

                </div>
                <Dialog open={message} >
                    <DialogTitle >Your Password has been changed.</DialogTitle>
                    <DialogTitle >You will soon be directed to Login page.</DialogTitle>
                </Dialog>
                <Dialog open={nav}  >
                    <DialogTitle><CircularProgress /></DialogTitle>
                </Dialog>


            </Paper>

        </Container>
    );
};

export default ChangePassword;


