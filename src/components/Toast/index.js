import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ToastActions from './actions';

import './style.css';

const Toast = ({message, actions}) => {

  // const growlerClass = classNames('growler', growler.type, {
  //   'growler--hiding': growler.status === 'hide' ? true : false,
  //   'growler--hidden': growler.status === 'hidden' ? true : false,
  // });

  return (
    <section className='Toast'>
        <div className='wrapper'>
          <p>{message}</p>
        </div>
      </section>
  );
};


const mapStateToProps = state => ({
  message: state.toast.message
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ToastActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);