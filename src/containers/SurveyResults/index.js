import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.css';
import { getSurveyResults } from './modules';

import Results from './components/results';

// UTILISER RECOMPOSE !!


class SurveyResults extends React.Component {
  componentDidMount() {
    const hash = this.props.match.params.hash;

    if (hash) {
      this.props.getSurveyResults(hash);
    }
  }

  render() {
    const {results} = this.props;

    if (Object.keys(results).length) { return (<Results results={results.votes} />) }
    if (!Object.keys(results).length) { return (<p>Chargement...</p>)}
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.survey.results,
  }
};

const mapDispatchToProps = {
  getSurveyResults
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyResults));
