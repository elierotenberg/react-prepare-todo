import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchInto } from '../actions';
import { FETCH_NOT_STARTED, FETCH_STARTED, FETCH_FAILED } from '../constants';
import fetchShape from '../fetchShape';

const enhance = compose(
  connect(
    ({ fetchData }) => ({
      postedUser: fetchData['/user?add'] || {
        status: FETCH_NOT_STARTED,
      },
    }),
    (dispatch) => ({
      postUser: async (userName) => {
        await dispatch(fetchInto('/user', '/user?add', {
          forceFetch: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName,
          }),
        }));
        await dispatch(fetchInto('/user', '/user', { forceFetch: true }));
      },
    }),
  ),
);

class UserAddForm extends PureComponent {
  static propTypes = {
    postedUser: fetchShape(PropTypes.shape({
      items: PropTypes.array,
    })),
    postUser: PropTypes.func,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      userName: '',
    };
  }

  submit(e) {
    e.preventDefault();
    const { userName } = this.state;
    this.props.postUser(userName);
    this.setState({
      userName: '',
    });
  }

  updateUserName(e) {
    const { target: { value } } = e;
    this.setState({
      userName: value,
    });
  }

  render() {
    const { postedUser: { status, err } } = this.props;
    const { userName } = this.state;
    return <div>
      <form onSubmit={(e) => this.submit(e)} disabled={status === FETCH_STARTED}>
        <input type='text' value={userName} onChange={(e) => this.updateUserName(e)} />
        <input type='submit' value='Add user' />
      </form>
      {(status === FETCH_NOT_STARTED || status === FETCH_STARTED) ? null : (
        status === FETCH_FAILED ? <div>Error while creating user: {err}</div> :
          <div>User successfully created</div>
      )}
    </div>;
  }
}

export default enhance(UserAddForm);
