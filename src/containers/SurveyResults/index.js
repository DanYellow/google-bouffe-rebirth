import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { renderComponent, compose, branch, lifecycle } from 'recompose'

import './index.css'
import { getSurveyResults } from './modules'

import Results from './components/results'

const SurveyResults = (props) => {
  const {results = []} = props

  return (<Results results={results.votes} />)
}

const Loader = () => (<p>Chargement...</p> )

const mapStateToProps = (state) => {
  return {
    results: state.survey.results,
  }
};

const mapDispatchToProps = {
  getSurveyResults
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
      componentDidMount() {
        const hash = this.props.match.params.hash;
          if (hash) {
            this.props.getSurveyResults(hash);
          }
      }
  }),

  branch(
    (props) => Object.keys(props.results).length === 0,
    renderComponent(Loader)
  )
)(SurveyResults)

export default withRouter(enhance);
