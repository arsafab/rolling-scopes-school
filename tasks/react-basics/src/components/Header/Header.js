import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Logo from './Logo/Logo';
import Progress from './Progress/Progress';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.tasks = [];
        this.searchTitle = '';

        this.state = {
            tasks: [],
            searchTitle: '',
        };

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.items.length = 0;
        this.extractItems(nextProps.store);
        this.extractTasks();
    }

    onClick() {
        this.searchTitle = this.state.searchTitle;

        this.setState({
            searchTitle: '',
        });
    }

    onChange(e) {
        this.setState({
            searchTitle: e.target.value,
        });
    }

    extractTasks() {
        this.tasks.length = 0;
        this.items.forEach((item) => {
            item.tasks.forEach(state => this.tasks.push(state));
        });

        this.setState({
            tasks: this.tasks,
        });
    }

    extractItems(arr) {
        arr.forEach((item) => {
            this.items.push(item);
            if (item.subitems.length) this.extractItems(item.subitems);
        });
    }

    clearInput(e) {
        e.target.value = '';
    }

    render() {
        return (
            <header>
                <Row className="show-grid head">
                    <Col md={6}>
                        <NavLink to='/'>
                            <Logo />
                        </NavLink>
                    </Col>
                    <Col md={6} className="search-input">
                        <NavLink
                            to={{
                                pathname: '/done',
                                query: this.state.tasks,
                            }}
                        >
                            Show done
                        </NavLink>
                        <input
                            type="text"
                            placeholder="Search"
                            tasks={this.state.tasks}
                            onChange={this.onChange}
                            onBlur={this.clearInput}
                        />
                        <NavLink
                            to={{
                                pathname: `/search/${this.searchTitle}`,
                                query: this.state.tasks,
                            }}
                            onMouseOver={this.onClick}
                        >
                            <Button>Search</Button>
                        </NavLink>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Progress />
                </Row>
            </header>
        );
    }
}

export default connect(state => ({
    store: state,
}))(Header);
