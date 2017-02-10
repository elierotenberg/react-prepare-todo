import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchInto } from '../actions';

const enhance = compose(
  connect(
    () => ({}),
    (dispatch, { userName }) => ({
      removeTask: async (itemId) => {
        await dispatch(fetchInto(`/user/${userName}/${itemId}`, '/user?removeTask', {
          forceFetch: true,
          method: 'DELETE',
        }));
        await dispatch(fetchInto(`/user/${userName}`, `/user/${userName}`, { forceFetch: true }));
      },
    }),
  ),
);

class UserTaskList extends PureComponent {
  static propTypes = {
    userName: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
    removeTask: PropTypes.func,
  };

  render() {
    const { items } = this.props;
    return <ul>{items.map((item, itemId) =>
      <li key={itemId}>{item}[<a href='#' onClick={(e) => {
        e.preventDefault();
        this.props.removeTask(itemId);
      }}>x</a>]</li>
    )}</ul>;
  }
}

export default enhance(UserTaskList);
