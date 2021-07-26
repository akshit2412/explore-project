import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Signin from './signin';
import Email from './email';
import Verify from './verify';
import Password from './password';
import ForgotEmail from './forgotemail.js';
import ChangePassword from './changepassword.js'
import ForgotVerify from './forgotverify';



const TRY = ({ setOpen, setUser }) => {

    const [page, changePage] = useState(0);

    return (
        <Grid>
            {
                page === 0 ? <Signin setOpen={setOpen} setUser={setUser} changePage={changePage} />
                    : page === 1 ? <Email setOpen={setOpen} changePage={changePage} />
                        : page === 2 ? <Verify setOpen={setOpen} changePage={changePage} />
                            : page === 3 ? <Password setOpen={setOpen} setUser={setUser} />
                                : page === 4 ? <ForgotEmail setOpen={setOpen} changePage={changePage} />
                                    : page === 5 ? <ChangePassword setOpen={setOpen} changePage={changePage} />
                                        : <ForgotVerify setOpen={setOpen} changePage={changePage} />
            }
        </Grid>

    )
};

export default TRY;
