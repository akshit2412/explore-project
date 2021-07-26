import React, { useState } from 'react';

import POSTS from './components/Posts/Posts.js';
import CREATE from './components/create/create.js';
import EXPAND from './components/expand/expand.js';
import MYPOSTS from './components/mycontent/myposts.js'
import ButtonAppBar from './components/navbar/nav';
import ACCOUNT from './components/Account/account.js'
import { BrowserRouter, Switch, Route } from "react-router-dom";




const App = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (

        <BrowserRouter>
            <ButtonAppBar user={user} setUser={setUser} />

            <Switch>
                <Route exact path="/" >
                    <POSTS user={user} setUser={setUser} />
                </Route>
                <Route exact path="/compose"  >
                    <CREATE user={user} setUser={setUser} />
                </Route>
                <Route path="/read/:id" >
                    <EXPAND user={user} />
                </Route>
                <Route path="/creator">
                    <MYPOSTS />
                </Route>
                <Route path="/info">
                    <ACCOUNT user={user} setUser={setUser} />
                </Route>


            </Switch>


        </BrowserRouter >



    );
}

export default App;