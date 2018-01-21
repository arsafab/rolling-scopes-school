import React from 'react';
import { NavLink } from 'react-router-dom';
import {
        ListGroupItem,
        ListGroup,
        Button,
        Glyphicon,
    } from 'react-bootstrap';
import Confirmation from './Confirmation/Confirmation';

class Item extends React.Component {
    constructor(parent, title, func) {
        super();
        this.parent = parent;
        this.title = title;
        this.updateList = func;
        this.subitems = [];
        this.key = null;
        this.subitemsToggle = false;
        this.editorToggle = false;
        this.tasks = [];

        this.addSubitem = this.addSubitem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.itemsToggle = this.itemsToggle.bind(this);
        this.edit = this.edit.bind(this);
        this.submitTitle = this.submitTitle.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.setInputTitle = this.setInputTitle.bind(this);
    }

    setKey(index) {
        this.key = index;
    }

    setInputTitle(e) {
        e.target.value = this.title;
    }

    removeItem(index) {
        this.subitems.splice(index, 1);
        this.updateList();
    }

    itemsToggle() {
        this.subitemsToggle = !this.subitemsToggle;
        this.updateList();
    }

    edit() {
        this.editorToggle = !this.editorToggle;
        this.subitemsToggle = false;
        this.updateList();
    }

    submitTitle() {
        this.editorToggle = false;
        this.updateList();
    }

    changeTitle(e) {
        this.title = e.target.value;
    }

    clearInput(e) {
        e.target.value = '';
    }

    inputTitle() {
        if (!this.title) this.editorToggle = true;
    }

    addSubitem() {
        const item = new Item(this, '', this.updateList);

        this.subitems.unshift(item);
        this.subitemsToggle = true;

        this.updateList();
    }

    render() {
        const openBtn = (
            <Button
                className={this.subitems.length ? 'btn-small' : 'btn-small hidden'}
                onClick={this.itemsToggle}
            >
                <Glyphicon glyph="triangle-bottom" />
            </Button>
        );

        const title = (
            <NavLink
                activeClassName="active"
                to={{ pathname: `/category/${this.title}`, query: this }}
                onClick={this.updateList}
            >
                { this.title }
            </NavLink>
        );

        const editBtn = (
            <Button
                className="btn-small"
                onClick={this.edit}
            >
                <Glyphicon glyph="edit" />
            </Button>
        );

        const btnGroup = (
            <div className="pull-right btnGroup">
                <Confirmation
                    title="category"
                    onClick={this.parent.removeItem.bind(this.parent, this.key)}
                />

                <Button
                    className="btn-small"
                    onClick={this.addSubitem}
                >
                    <Glyphicon glyph="plus" />
                </Button>
            </div>
        );

        const subitemsList = (
            <ListGroup className={this.subitemsToggle ? 'subitems' : 'subitems hidden'}>
                {
                    this.subitems.map((subitem, i) => {
                            subitem.setKey(i);
                            subitem.inputTitle();
                            return subitem.render();
                    })
                }
            </ListGroup>
        );

        const inputGroup = (
            <div className={this.editorToggle ? 'edit' : 'edit hidden'}>
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
            <ListGroupItem key={this.key}>
                { openBtn }
                { title }
                { editBtn }
                { btnGroup }
                { subitemsList }
                { inputGroup }
            </ListGroupItem>
        );
    }
}

export default Item;
