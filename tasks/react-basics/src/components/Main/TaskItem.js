import React from 'react';
import { NavLink } from 'react-router-dom';
import {
        ListGroupItem,
        FormGroup,
        Checkbox,
        Button,
        Glyphicon,
    } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateStore } from '../Redux/actions';

class TaskItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            isDone: this.props.task.isDone,
        };

        this.changeTitle = this.changeTitle.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.setInputTitle = this.setInputTitle.bind(this);
        this.isDone = this.isDone.bind(this);
    }

    setInputTitle(e) {
        e.target.value = this.state.title;
    }

    changeTitle(e) {
         this.setState({
            title: e.target.value,
        });
    }

    clearInput(e) {
        e.target.value = '';
    }

    isDone() {
        this.props.task.isDone = !this.props.task.isDone;
        this.props.dispatch(updateStore());
    }

    render() {
        return (
            <ListGroupItem>
                <FormGroup>
                    <Checkbox
                        onClick={this.isDone}
                        defaultChecked={this.state.isDone}
                    />
                </FormGroup>

                <span className="title">
                    {this.state.title}
                </span>

                <NavLink
                    to={{
                        pathname: `/task/${this.state.title}`,
                        query: {
                            task: this.props.task,
                            arr: this.props.taskArray,
                            activeItem: this.props.activeItem,
                        },
                    }}
                    className="pull-right"
                >
                    <Button className="btn-small">
                        <Glyphicon glyph="edit" />
                    </Button>
                </NavLink>
            </ListGroupItem>
        );
    }
}

export default connect(state => ({
    store: state,
}))(TaskItem);
