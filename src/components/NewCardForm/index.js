import React from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Input from 'material-ui/Input';

import './index.css';

const styles = {
  input: {
    margin: 5
  }
}

class NewCardForm extends React.Component {
  constructor(props) {
    super(props);;
    this.state = {
      value: '',
      isOpened: false,
      isEnabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      isEnabled: false
    });
    this.props.addMovie(this.state.value)
      .then((response) => {
        this.setState({
          value: '',
          isEnabled: true
        });
        this.handleShowForm(false);
      })
      .catch((error) => {
        this.setState({
          isEnabled: true
        });
        console.log('Holly molly', error);
      })
    event.preventDefault();
  }

  handleShowForm(flag) {
    let statusCopy = Object.assign({}, this.state);
    statusCopy.isOpened = flag;
    this.setState(statusCopy)
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state && this.state.isOpened) {
      this.handleShowForm(false);
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    return (
      <div ref={this.setWrapperRef} id="new-card-form">{this.state.isOpened ?
        (<form onSubmit={this.handleSubmit}>
          <Input
            style={styles.input}
            value={this.state.value} onChange={this.handleChange}
            inputProps={{
              'aria-label': 'Description',
            }}
            disabled={!this.state.isEnabled}
            autoFocus={true}
          />
          <Button disabled={!this.state.isEnabled} type="submit" variant="raised" color="primary">
            Submit
          </Button>
        </form>) :
        (<Button onClick={() => this.handleShowForm(true)} variant="fab" color="primary" aria-label="add">
          <AddIcon />
        </Button>)}
      </div>
    )
  }
}

export default NewCardForm;