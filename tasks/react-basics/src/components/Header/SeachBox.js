import React from 'react';
import { ListGroup, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskItem from '../Main/TaskItem';

function SearchBox(props) {
    let key = 0;

    return (
        <Col md={7}>
            <main>
                <ListGroup className="task-list">
                    {
                        props.location.query.map((item) => {
                            if (props.match.params.searchTitle === item.title) {
                                return (
                                    <TaskItem
                                        title={item.title}
                                        key={key++}
                                        category={props.location.query.title}
                                        task={item}
                                        taskArray={props.location.query.tasks}
                                    />
                                );
                            }
                            return null;
                        })
                    }
                </ListGroup>
            </main>
        </Col>
    );
}

export default connect(state => ({
    store: state,
}))(SearchBox);
