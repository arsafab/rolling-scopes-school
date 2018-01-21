import React from 'react';
import { Col, FormControl, FormGroup, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateStore } from '../Redux/actions';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.tasks = {
            tasks: this.props.location.query.arr,
        };
        this.state = {
            title: this.props.location.query.task.title,
            isDone: this.props.location.query.task.isDone,
            text: this.props.location.query.task.text,
        };

        this.changeTitle = this.changeTitle.bind(this);
        this.isDone = this.isDone.bind(this);
        this.changeText = this.changeText.bind(this);
        this.submitTaskChanges = this.submitTaskChanges.bind(this);
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    isDone() {
        this.setState({
            isDone: !this.props.location.query.isDone,
        });
    }

    changeText(e) {
        this.setState({
            text: e.target.value,
        });
    }

    submitTaskChanges() {
        this.props.location.query.task.title = this.state.title;
        this.props.location.query.task.isDone = this.state.isDone;
        this.props.location.query.task.text = this.state.text;

        this.props.dispatch(updateStore());
    }

    render() {
        return (
            <Col md={7}>
                <main>
                    <div className="task-container">

                        <div className="btnGroup">
                            <Link
                                to={{
                                    pathname: '/',
                                    query: this.tasks,
                                }}
                                onClick={this.submitTaskChanges}
                            >
                                Save Changes
                            </Link>

                            <Link
                                to={{
                                    pathname: '/',
                                    query: this.tasks,
                                }}
                            >
                                Cancel
                            </Link>
                        </div>

                        <input
                            defaultValue={this.props.match.params.taskTitle}
                            onChange={this.changeTitle}
                        />

                        <FormGroup>
                            <Checkbox
                                onClick={this.isDone}
                                defaultChecked={this.props.location.query.task.isDone}
                            >
                                Done
                            </Checkbox>
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <FormControl
                                componentClass="textarea"
                                placeholder="Enter your description of this task"
                                defaultValue={this.state.text}
                                onChange={this.changeText}
                            />
                        </FormGroup>
                    </div>
                </main>
            </Col>
        );
    }
}

export default connect(state => ({
    store: state,
}))(Task);
