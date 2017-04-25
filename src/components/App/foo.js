import React, { Component } from 'react';
import { connect } from 'react-redux';


const fooActionSuccess = (namespace, initState) => {
  return {
    type: `${namespace}/FOO_ACTION`,
    payload: {
      initState
    }
  }
}

const fooAction = (initState) => {
  return (dispatch) => {
    return dispatch(
        fooActionSuccess(initState)
      )
  }
};

export const foo = (namespace) => (state = {}, action) => {
  switch (action.type) {
    case `${namespace}/FOO_ACTION`:
      return {...state, ...action.payload.initState}
    default:
      return state
  }
}



class Foo extends Component {
  componentWillMount() {
    // this.props.fooActionSuccess(this.props.text);
    // this.props.fooAction(this.props.text);
  }
  render() {
    return (
      <div className='App'>
        <p>
          { this.props.text.foo }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  return {
    zoumji: ownProps.text.foo + " hrghehgr"
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fooAction: (myParam) => dispatch(fooAction(ownProps.namespace, myParam)),
    fooActionSuccess: (myParam) => dispatch(fooActionSuccess(ownProps.namespace, myParam))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Foo);
