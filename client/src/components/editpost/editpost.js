import React, { useState, useRef } from 'react';
import { TextField, Paper, Grid, Dialog, Container, MenuItem, FormControl, InputLabel, Select, CircularProgress, DialogTitle } from '@material-ui/core';
import { editPost, imgEdit } from '../../api/index';
import decode from 'jwt-decode';
import { useHistory } from "react-router-dom";
import CancelIcon from '@material-ui/icons/Cancel';

import { projectStorage } from '../create/firebase/config';
import './styles.css';


const EDIT = ({ post, user, setUser }) => {

    const [postData, setPostData] = useState({ _id: post._id, title: post.title, post: post.post, label: post.label });
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(post.selectedFile);
    const [name, setName] = useState(post.imgname);
    const [open1, setOpen1] = useState(false);
    const [nav, navigate] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const [img, setImg] = useState(null);
    const types = ['image/png', 'image/jpeg', 'image/jpg'];


    const btnRef = useRef();



    const resetInputField = (e) => {
        setInputValue('');
        setImg(null);
        setFile('');
        setName('');
    }




    const handleClose = () => {
        setOpen(false);
    }
    const handleClose1 = () => {
        setOpen1(false);
    }


    const handleChange = (e) => {
        if (!user) {
            setUser(null);
            setOpen1(true);
        } else {
            let selected = e.target.files[0];

            if (selected && types.includes(selected.type)) {
                setImg(selected);
                setFile('U');
                setName(selected.name);
            } else {
                if (selected)
                    setOpen(true);
            }
        }
    };

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

                localStorage.clear();
                setUser(null);
                setOpen1(true);
                if (btnRef.current) {
                    btnRef.current.removeAttribute("disabled");
                }

            } else {
                navigate(true);
                const time = new Date();
                if (img) {

                    if (post.selectedFile && post.selectedFile != '') {
                        const storageRef1 = projectStorage.ref();
                        const desertRef = storageRef1.child(post.imgname);
                        await desertRef.delete();
                    }

                    let imgname;
                    if (user.result._id) {
                        imgname = `${img.name} ${user.result._id} ${time}`
                    }
                    else if (user.result.googleId) {
                        imgname = `${img.name} ${user.result.googleId} ${time}`
                    }
                    const storageRef = projectStorage.ref(imgname);
                    storageRef.put(img).then(
                        async () => {
                            const url = await storageRef.getDownloadURL();
                            const posted = await editPost(postData);

                            if (posted.code == 200) {
                                const imgposted = await imgEdit({ img: url, id: posted.id, imgname: imgname });
                                if (imgposted.code == 200) {
                                    history.push('/');
                                    history.push('/creator');
                                }
                            }
                        });

                } else {
                    if (post.selectedFile !== '' && file === '') {
                        const storageRef1 = projectStorage.ref();
                        const desertRef = storageRef1.child(post.imgname);
                        await desertRef.delete();
                    }


                    const posted = await editPost(postData);
                    if (file === '') {
                        const imgposted = await imgEdit({ img: file, id: posted.id, imgname: name });
                        if (imgposted.code == 200) {
                            history.push('/');
                            history.push('/creator');
                        }

                    }
                    if (posted.code == 200) {
                        history.push('/');
                        history.push('/creator');

                    }

                }

            }
        }


    }



    return (
        <Container component="main" className="editing" >
            <Paper className="paperc1" elevation={0}>

                <div className="labelc1">Edit your post</div>

                <form autoComplete="off" onSubmit={handleSubmit}>

                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={8} md={9} lg={9} >
                            <TextField name="title" label="Title" variant="outlined" required InputLabelProps={{ required: false }} fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={postData.label}
                                    onChange={(e) => { setPostData({ ...postData, label: e.target.value }) }}
                                    label="Category"
                                    required
                                >
                                    <MenuItem value={'Poetry'}>Poetry</MenuItem>
                                    <MenuItem value={'Movie'}>Movie</MenuItem>
                                    <MenuItem value={'Sports'}>Sports</MenuItem>
                                    <MenuItem value={'Music'}>Music</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}  >
                            <TextField name="post" label="Post" variant="outlined" required InputLabelProps={{ required: false }} fullWidth multiline rows={15} value={postData.post} onChange={(e) => setPostData({ ...postData, post: e.target.value })} />
                        </Grid>
                        <Grid item xs={5} sm={4} md={4} lg={4} >
                            <Container fullWidth>
                                {file && file !== '' ? <div className="uploadc"> {name.substring(0, 10)} <button className="removec" type="button" onClick={resetInputField}><CancelIcon /></button></div> : ""}
                                <label className="imginput">
                                    {!file || file === '' ? <div className="uploadc" >UPLOAD IMAGE</div> : ""}
                                    <input type="file" value={inputValue} onChange={handleChange} />
                                </label>
                            </Container>
                        </Grid>

                        <Grid item xs={7} sm={8} md={8} lg={8} >
                            <Container className="submitc6" fullWidth>
                                <button ref={btnRef} className="submitc5" type="submit" >Submit</button>
                            </Container>

                        </Grid>
                    </Grid>

                </form>


                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle >Please select a valid image. </DialogTitle>
                    <DialogTitle >The image type must be amongst (.png, .jpeg, .jpg) </DialogTitle>
                </Dialog>
                <Dialog open={open1} onClose={handleClose1} >
                    <DialogTitle >Your Session has expired, please login to make any changes.</DialogTitle>
                </Dialog>
                <Dialog open={nav}  >
                    <DialogTitle ><CircularProgress /></DialogTitle>
                </Dialog>

            </Paper>
        </Container>


    );
};

export default EDIT;


