import React from 'react';
import { Col, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateStore } from '../Redux/actions';
import TaskItem from './TaskItem';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.taskTitle = '';
        this.key = 0;

        this.state = {
            tasks: [],
        };

        this.addItem = this.addItem.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    addItem() {
        if (this.taskTitle) {
            const category = this.props.location.query;
            const { tasks } = category;

            tasks.unshift({
                title: this.taskTitle,
                isDone: false,
                text: '',
            });

            this.setState({
                tasks: this.state.tasks,
            });

            this.taskTitle = '';
            this.props.dispatch(updateStore());
        }
    }

    changeTitle(e) {
        this.taskTitle = e.target.value;
    }

    clearInput(e) {
        e.target.value = '';
    }

    render() {
        return (
            <Col md={7}>
                <main>
                    <div className="tasks-input">
                        <input
                            type="text"
                            placeholder="Enter task title"
                            className="form-control"
                            onChange={this.changeTitle}
                            onBlur={this.clearInput}
                        />
                        <Button onClick={this.addItem}>
                            Add
                        </Button>
                    </div>
                    <ListGroup className="task-list">
                    {
                        this.props.location.query.tasks.map(item => (
                            <TaskItem
                                title={item.title}
                                key={this.key++}
                                task={item}
                                taskArray={this.props.location.query.tasks}
                                activeItem={this.props.location.query}
                            />
                        ))
                    }
                    </ListGroup>
                </main>
            </Col>
        );
    }
}

export default connect(state => ({
    store: state,
}))(Main);
