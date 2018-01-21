import React from 'react';
import { Col, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.tasks = [];
        this.completed = 0;
        this.percent = 100;

        this.state = {
            now: this.percent,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.items.length = 0;
        this.extractItems(nextProps.store);
        this.extractTasks();
        this.countCompleted();
        this.countPercent();
    }

    extractItems(arr) {
        arr.forEach((item) => {
            this.items.push(item);
            if (item.subitems.length) this.extractItems(item.subitems);            
        });
    }

    extractTasks() {
        this.tasks.length = 0;
        this.items.forEach((item) => {
            item.tasks.forEach(state => this.tasks.push(state));
        });
    }

    countCompleted() {
        let tmp = 0;

        this.tasks.forEach((item) => {
            if (item.isDone) tmp += 1;
        });

        this.completed = tmp;
    }

    countPercent() {
        if (this.tasks.length) this.percent = (this.completed * 100) / this.tasks.length;

        this.setState({
            now: this.percent,
        });
    }

    render() {
        return (
            <Col md={12}>
                <ProgressBar now={this.state.now} />
            </Col>
        );
    }
}

export default connect(state => ({
    store: state,
}))(Progress);
