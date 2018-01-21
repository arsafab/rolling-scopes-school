import React from 'react';
import { Col, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addItem, removeItem, updateStore } from '../Redux/actions';
import Item from './Item';
import './Aside.css';

class Aside extends React.Component {
    constructor(props) {
        super(props);
        this.itemTitle = '';

        this.state = {
            update: true,
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    updateList() {
        this.setState({
            update: !this.state.update,
        });
        this.props.dispatch(updateStore());
    }

    addItem() {
        if (this.itemTitle) {
            const item = new Item(this, this.itemTitle, this.updateList.bind(this));
            this.itemTitle = '';

            this.props.dispatch(addItem(item));
        }
    }

    removeItem(index) {
        const items = this.props.store;

        items.splice(index, 1);

        this.props.dispatch(removeItem(items));
        this.updateList();
    }

    changeTitle(e) {
        this.itemTitle = e.target.value;
    }

    clearInput(e) {
        e.target.value = '';
    }

    render() {
        return (
            <Col md={5}>
                <aside>
                    <div className="category-input">
                        <input
                            type="text"
                            placeholder="Enter category title"
                            className="form-control"
                            onChange={this.changeTitle}
                            onBlur={this.clearInput}
                        />
                        <Button onClick={this.addItem}>
                            Add
                        </Button>
                    </div>
                    <ListGroup className="categories">
                        {
                            this.props.store.map((item, i) => {
                                item.setKey(i);
                                return item.render();
                            })
                        }
                    </ListGroup>
                </aside>
            </Col>
        );
    }
}

export default connect(state => ({
    store: state,
}))(Aside);
