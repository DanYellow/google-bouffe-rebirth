import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidV1 from 'uuid/v1';
import { Helmet } from 'react-helmet'; 


// import texts from '../../constants/texts';
import './index.css';
import { getSurveyResults } from '../../actions';


class SurveyResults extends React.Component {
  componentWillMount() {
    const hash = this.props.match.params.hash;
    this.props.getSurveyResults(hash);
  }

  _renderResults(results) {
    return (
      <div>
        <Helmet><title>Résultat sondage</title></Helmet>
        <ul>
          {results.reverse().map((vote) => {
            return <li key={uuidV1()}> { vote.title } : { vote.nbResponses }</li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    const {results} = this.props;

    if (Object.keys(results).length) { return this._renderResults(results.votes)}
    if (!Object.keys(results).length) { return <div />}
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

let SurveyResultsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyResults));

export default SurveyResultsContainer;
