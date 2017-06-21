import React from 'react';
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Field, reduxForm } from 'redux-form'

import texts from '../../constants/texts'
// import './index.css';


class AddRestaurant extends React.Component {
  render() {
    return (
      <div className='SurveyDisplayWrapper'>
        <Helmet><title>{ texts.add_new_restaurant_legend }</title></Helmet>

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);
