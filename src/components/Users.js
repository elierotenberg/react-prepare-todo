import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { dispatched } from 'react-prepare';
import { compose } from 'redux';

import { fetchInto } from '../actions';
import { FETCH_STARTED, FETCH_FAILED } from '../constants';
import fetchShape from '../fetchShape';

import User from './User';
import UserAddForm from './UserAddForm';

const enhance = compose(
  dispatched((props, dispatch) => dispatch(fetchInto('/user', '/user'))),
  connect(({ fetchData }) => ({
    users: fetchData['/user'],
  })),
);

class Users extends PureComponent {
  static propTypes = {
    users: fetchShape(PropTypes.shape({
      users: PropTypes.array,
    })),
  };

  render() {
    const { users } = this.props;
    if(!users || users.status === FETCH_STARTED) {
      return <div>...</div>;
    }
    if(users.status === FETCH_FAILED) {
      return <div>{users.err.toString()}</div>;
    }
    return <div>
      <h3>Users</h3>
      <ul>{users.value.users.map((userName) =>
        <li key={userName}><User userName={userName} /></li>
      )}</ul>
      <UserAddForm />
    </div>;
  }
}

export default enhance(Users);
