import React from 'react';
import { Link } from 'react-router-dom';
import {
        ButtonToolbar,
        Button,
        Modal,
        Glyphicon,
    } from 'react-bootstrap';
import './Confirmation.css';

class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };

        this.open = this.open.bind(this);
        this.cancel = this.cancel.bind(this);
	}

	open() {
		this.setState({
			show: true,
		});
	}

    cancel() {
        this.setState({
			show: false,
		});
    }

    render() {
        return (
            <ButtonToolbar>
                <Button
                    className="btn-small"
                    onClick={this.open}
                >
                    <Glyphicon glyph="trash" />
                </Button>

				<Modal
					show={this.state.show}
					onHide={this.cancel}
					dialogClassName="confirmation"
					bsSize="small"
				>
					<Modal.Body className="text-center">
						Do you want remove this {this.props.title}?
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.cancel}>Cancel</Button>
                        <Link
                            to="/"
							onClick={this.props.onClick}
							onMouseUp={this.cancel}
                        >
                            <Button
								bsStyle="danger"
								className="removeBtn"
                            >
                                Remove
                            </Button>
                        </Link>
					</Modal.Footer>
				</Modal>
            </ButtonToolbar>
        );
    }
}

export default Confirmation;
