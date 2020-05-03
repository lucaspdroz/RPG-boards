import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Header from './components/Header';
import Upload from './screens/Upload';

export default () => (
    <Router>
        <div>
            <Header></Header>
            <Route exact path='/' component={Upload} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/create' component={Create} />
            <Route path='/show/:id' component={Show} />
        </div>
    </Router >
);
