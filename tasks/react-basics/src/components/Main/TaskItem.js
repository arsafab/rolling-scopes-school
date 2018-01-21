import React from 'react';
import { Link } from 'react-router-dom';
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
            editorToggle: false,
            title: this.props.title,
            isDone: this.props.task.isDone,
        };

        this.edit = this.edit.bind(this);
        this.submitTitle = this.submitTitle.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.setInputTitle = this.setInputTitle.bind(this);
        this.isDone = this.isDone.bind(this);
    }

    setInputTitle(e) {
        e.target.value = this.state.title;
    }

    edit() {
        this.setState({
            editorToggle: true,
        });
    }

    submitTitle() {
        this.setState({
            editorToggle: false,
        });
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
        const inputGroup = (
            <div className={this.state.editorToggle ? 'edit' : 'edit hidden'}>
                <input
                    type="text"
                    onChange={this.changeTitle}
                    onBlur={this.clearInput}
                    onFocus={this.setInputTitle}
                />
                <Button onClick={this.submitTitle}>
                    OK
                </Button>
            </div>
        );

        return (
            <ListGroupItem>
                <FormGroup>
                    <Checkbox
                        onClick={this.isDone}
                        defaultChecked={this.state.isDone}
                    />
                </FormGroup>

                <Link
                    to={{
                        pathname: `/task/${this.state.title}`,
                        query: {
                            task: this.props.task,
                            arr: this.props.taskArray,
                        },
                    }}
                    className="title"
                >
                    {this.state.title}
                </Link>

                <Button
                    className="btn-small pull-right"
                    onClick={this.edit}
                >
                    <Glyphicon glyph="edit" />
                </Button>

                { inputGroup }

            </ListGroupItem>
        );
    }
}

export default connect(state => ({
    store: state,
}))(TaskItem);
