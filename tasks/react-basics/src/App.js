import React from 'react';
import { Route } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';

import Header from './components/Header/Header';
import Aside from './components/Aside/Aside';
import Main from './components/Main/Main';
import Task from './components/Main/Task';
import SearchBox from './components/Header/SeachBox';
import DoneTasks from './components/Header/DoneTasks';

function App() {
    return (
        <Grid>
            <Header />
            <Row className="show-grid">
                <Aside />
                <Route
                    exact
                    path="/category/:itemTitle"
                    render={props => (<Main {...props} />)}
                />
                <Route
                    exact
                    path="/done"
                    render={props => (<DoneTasks {...props} />)}
                />
                <Route
                    path="/search/:searchTitle"
                    render={props => (<SearchBox {...props} />)}
                />
                <Route
                    path="/task/:taskTitle"
                    render={props => (<Task {...props} />)}
                />
            </Row>
        </Grid>
    );
}

export default App;
