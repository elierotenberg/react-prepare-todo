import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchInto } from '../actions';

const enhance = compose(
  connect(
    () => ({}),
    (dispatch, { userName }) => ({
      addTask: async (item) => {
        await dispatch(fetchInto(`/user/${userName}`, '/user?addTask', {
          forceFetch: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item,
          }),
        }));
        await dispatch(fetchInto(`/user/${userName}`, `/user/${userName}`, { forceFetch: true }));
      },
    }),
  ),
);

class UserAddTaskForm extends PureComponent {
  static propTypes = {
    userName: PropTypes.string,
    addTask: PropTypes.func,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      item: '',
    };
  }

  submit(e) {
    e.preventDefault();
    const { item } = this.state;
    this.props.addTask(item);
    this.setState({
      item: '',
    });
  }

  updateItem(e) {
    const { value } = e.target;
    this.setState({
      item: value,
    });
  }

  render() {
    const { item } = this.state;
    return <form onSubmit={(e) => this.submit(e)}>
      <input type='text' value={item} onChange={(e) => this.updateItem(e)} />
      <input type='submit' value='Add item' />
    </form>;
  }
}

export default enhance(UserAddTaskForm);
