import React, { useState, useRef } from 'react';
import { Paper, Grid, Container, Dialog, DialogTitle, CircularProgress, IconButton } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { signIn, googleSignin } from '../../../api/index';

import Input from '../Input';
import { auth } from '../../../auth/auth';
import CloseIcon from '@material-ui/icons/Close';
import './styles.css';

const initialState = { email: '', password: '' };

const Signin = ({ setOpen, setUser, changePage }) => {
    const [form, setForm] = useState(initialState);
    const [error, displayError] = useState(false);
    const [error1, displayError1] = useState(false);
    const [error2, displayError2] = useState(false);
    const [nav, navigate] = useState(false);
    const btnRef = useRef();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        changePage(1);
        setForm(initialState);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleError = () => {
        displayError(false);
    };
    const handleError1 = () => {
        displayError1(false);
    };
    const handleError2 = () => {
        displayError2(false);
    };

    const forgotPassword = async () => {
        changePage(4);
        setForm(initialState);

    }

    const handleSubmit = async (e) => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        navigate(true);
        e.preventDefault();
        const data = await signIn(form);
        if (data.code == 200) {
            auth({ data: data.info });
            setOpen(false);
            setUser(JSON.parse(localStorage.getItem('profile')));
        } else if (data.code == 400) {
            navigate(false);
            displayError(true);
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
        }
        else if (data.code == 404) {
            navigate(false);
            displayError1(true);
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
        }

    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const googleSuccess = async (res) => {
        navigate(true);
        const result = res?.profileObj;
        result.name = result?.givenName;
        const token = res?.tokenId;

        try {
            const response = await googleSignin({ email: result.email });

            if (response.code == 400) {

                navigate(false);
                displayError2(true);

            } else if (response.code == 200) {

                auth({ data: { result, token } });
                setOpen(false);
                setUser(JSON.parse(localStorage.getItem('profile')));
            }

        } catch (error) {

            alert('Google Sign In was unsuccessful. Try again later');
        };


    };

    const googleError = () => {
        alert('Google Sign In was unsuccessful. Try again later');
    }

    return (
        <Container component="main" maxWidth="sm" >
            <Paper className="paper" elevation={3}>
                <Grid container justify="flex-end"  >
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <div className="form">

                    <div className="label">Sign in</div>
                    <div className="sublabel">Enter the email associated with your acccount.</div>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" value={form.email} />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} value={form.password} />
                        </Grid>
                        <Grid container justify="flex-end">
                            <button className="forgot" type="button" onClick={forgotPassword}>Forgot your Password?</button>
                        </Grid>
                        <div className="submit">
                            <div className="SignIn">
                                <button className="submit1">Sign in</button>
                            </div>
                            <div className="GoogleLogin">
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_CLIENTID}
                                    buttonText="Sign in with Google"
                                    onSuccess={googleSuccess}
                                    onFailure={googleError}
                                    cookiePolicy="single_host_origin"
                                />
                            </div>

                        </div>
                    </form>



                    <Grid container justify="flex-end">
                        <Grid item>
                            <p className="query">No Account?<button onClick={switchMode} className="query1">SIGN UP</button></p>
                        </Grid>
                    </Grid>

                </div>



                <Dialog open={error} onClose={handleError} >
                    <DialogTitle >User name or password is wrong!</DialogTitle>
                </Dialog>
                <Dialog open={error1} onClose={handleError1} >
                    <DialogTitle>User does not exist, please sign up! </DialogTitle>
                </Dialog>
                <Dialog open={error2} onClose={handleError2} >
                    <DialogTitle>This email is already registered, try login with password. </DialogTitle>
                </Dialog>

                <Dialog open={nav}  >
                    <DialogTitle><CircularProgress /></DialogTitle>
                </Dialog>

            </Paper>

        </Container>
    );
};

export default Signin;
