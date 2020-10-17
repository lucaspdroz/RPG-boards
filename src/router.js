import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Header from './components/Header';
import InitialPage from './screens/InitialPage';

export default () => (
    <Router>
        <div>
            <Header>
    <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/b0afdd473b5ba7ba2c70c2458/dcdb103bcd3f5824cbf9edc97.js");</script>
            </Header>
            <Route exact path='/' component={InitialPage} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/create' component={Create} />
            <Route path='/show/:id' component={Show} />
        </div>
    </Router >
);
