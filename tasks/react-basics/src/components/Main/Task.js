import React from 'react';
import { Col, FormControl, FormGroup, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateStore } from '../Redux/actions';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.tasks = {
            tasks: this.props.location.query.arr,
        };

        this.state = {
            title: this.props.location.query.task.title,
            isDone: this.props.location.query.task.isDone,
            text: this.props.location.query.task.text,
            activeItem: this.props.location.query.activeItem,
            targetItem: {},
        };

        this.changeTitle = this.changeTitle.bind(this);
        this.isDone = this.isDone.bind(this);
        this.changeText = this.changeText.bind(this);
        this.submitTaskChanges = this.submitTaskChanges.bind(this);
        this.initTargetItem = this.initTargetItem.bind(this);
        this.moveintoItem = this.moveIntoItem.bind(this);

        this.extractItems(this.props.store);
    }

    componentWillReceiveProps(nextProps) {
        this.items.length = 0;
        this.extractItems(nextProps.store);
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
        this.moveIntoItem();

        this.props.dispatch(updateStore());
    }

    extractItems(arr) {
        arr.forEach((item) => {
            this.items.push(item);
            if (item.subitems.length) this.extractItems(item.subitems);
        });
    }

    initTargetItem(item) {
        this.setState({
            targetItem: item,
        });
    }

    moveIntoItem() {
        if (this.state.targetItem.title) {
            this.state.activeItem.tasks.forEach((item, i) => {
                if (item.title === this.props.match.params.taskTitle) {
                    const tempActive = this.state.activeItem.tasks.splice(i, 1);
                    const tempTarget = this.state.targetItem.tasks.unshift(item);

                    this.setState({
                        activeItem: tempActive,
                        targetItem: tempTarget,
                    });

                    this.props.dispatch(updateStore());
                }
            });
        }
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
                            className="form-control"
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

                        <div className="move-block">
                            <h3>Move to:</h3>
                            {
                                this.items.map((item, i) => (
                                    <button
                                        className="btn btn-success"
                                        key={i}
                                        disabled={this.state.targetItem.title === item.title}
                                        onClick={this.initTargetItem.bind(this, item)}
                                    >
                                        {item.title}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </main>
            </Col>
        );
    }
}

export default connect(state => ({
    store: state,
}))(Task);
