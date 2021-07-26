import React, { useState, useRef, useEffect } from 'react';
import { Paper, Grid, TextField, Container, Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { passwordChange } from '../../api/index.js'
import decode from 'jwt-decode';

import Input from './Input';
import CloseIcon from '@material-ui/icons/Close';
import './styles.css';

const initialState = { email: '', oldpassword: '', password: '', confirmPassword: '' };



const Password = ({ setOpen, user, setUser }) => {
    const [form, setForm] = useState(initialState);
    const [nav, navigate] = useState(false);
    const [error, showError] = useState(false);
    const [error1, showError1] = useState(false);
    const [error2, showError2] = useState(false);

    const [change, showChange] = useState(false);
    const [open1, setOpen1] = useState(false);



    const btnRef = useRef();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleShowPassword = () => setShowPassword(!showPassword);


    const handleClose = () => {
        setOpen(false);
    };
    // const handleClose1 = () => {
    //     setOpen1(false);
    // };

    useEffect(() => {
        setForm({ ...form, email: user.result.email });
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }

        if (!user) {
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
            setUser(null);
            setOpen1(true);
        } else {
            const token = user?.token;

            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                setTimeout(() => {
                    history.push('/');
                }, 5000)
                localStorage.clear();
                setUser(null);
                setOpen1(true);



                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }

            } else if (form.password.length < 8) {
                showError2(true);
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }

            }
            else if (form.password === form.confirmPassword) {

                navigate(true);
                const changed = await passwordChange(form);
                if (changed.code == 400) {
                    showError1(true);
                    navigate(false);
                    if (btnRef.current) {
                        btnRef.current.removeAttribute("disabled");
                    }

                } else if (changed.code == 200) {
                    navigate(false);
                    showChange(true);

                    setTimeout(() => {
                        history.push('/');
                    }, 3000)
                    localStorage.clear();
                    setUser(null);

                }

            } else {
                showError(true);
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }
            }
        }


    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        showError(false);
        showError1(false);
        showError2(false);
    };



    return (
        <Container component="main" maxWidth="sm" >
            <Paper className="paperp" elevation={3}>
                <Grid container justify="flex-end"  >
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <div className="formp">


                    <div className="labelp">Change Your Password</div>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12}>
                                {user ?
                                    (<TextField id="standard-read-only-input" defaultValue={user.result.email} InputProps={{
                                        readOnly: true,
                                    }} name="email" label="Email Address" handleChange={handleChange} type="email" fullWidth variant="outlined" />) : ""
                                }
                            </Grid>
                            <Input name="oldpassword" label="Old Password" handleChange={handleChange} type='password' value={form.oldpassword} />
                            {error1 ? <p className="errorp">Incorrect Password</p> : ''}
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} value={form.password} />
                            <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showConfirmPassword ? 'text' : 'password'} handleShowConfirmPassword={handleShowConfirmPassword} value={form.confirmPassword} />
                            {error ? <p className="errorp">Passwords don't match. Try again.</p> : ''}
                            {error2 ? <p className="errorp">Length of the password must be atleast 8.</p> : ''}

                        </Grid>



                        <div className="submitp3">

                            <button className="submitp4">
                                Submit
                            </button>


                        </div>
                    </form>



                </div>


                <Dialog open={nav}  >
                    <DialogTitle><CircularProgress /></DialogTitle>
                </Dialog>

                <Dialog open={change}>
                    <DialogTitle>Your password has been changed successfully. </DialogTitle>
                    <DialogContent>You will be redirected to homepage in few seconds.</DialogContent>
                </Dialog>

                <Dialog open={open1}  >
                    <DialogTitle >Your session has ended, please login to change your password.</DialogTitle>
                </Dialog>

            </Paper>
        </Container>


    );
};

export default Password;
