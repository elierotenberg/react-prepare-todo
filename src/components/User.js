import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { dispatched } from 'react-prepare';
import { compose } from 'redux';

import { fetchInto } from '../actions';
import { FETCH_STARTED, FETCH_FAILED } from '../constants';
import fetchShape from '../fetchShape';

import UserTaskList from './UserTaskList';
import UserAddTaskForm from './UserAddTaskForm';

const enhance = compose(
  dispatched(({ userName }, dispatch) =>
    dispatch(fetchInto(`/user/${userName}`, `/user/${userName}`))
  ),
  connect(({ fetchData }, { userName }) => ({
    user: fetchData[`/user/${userName}`],
  })),
);

class User extends PureComponent {
  static propTypes = {
    userName: PropTypes.string,
    user: fetchShape(PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.string),
    })),
  };

  render() {
    const { userName } = this.props;
    const { user } = this.props;
    if(!user || user.status === FETCH_STARTED) {
      return <div>
        <p>{userName}</p>
        <p>...</p>
      </div>;
    }
    if(user.status === FETCH_FAILED) {
      return <div>
        <p>{userName}</p>
        <p>{user.err.toString()}</p>
      </div>;
    }
    return <div>
      <p>{userName}</p>
      <UserTaskList userName={userName} items={user.value.items} />
      <UserAddTaskForm userName={userName} />
    </div>;
  }
}

export default enhance(User);
