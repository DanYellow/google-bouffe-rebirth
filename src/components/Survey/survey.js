import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import uuidV1 from 'uuid/v1';
import { filter } from 'lodash';
import { Helmet } from 'react-helmet'; 



import texts from '../../constants/texts';
import './index.css';
import { getProposalsForSurvey, voteForAProposal } from '../../actions';



class SurveyDisplay extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      canFakeVote: false
    }
  }

  componentWillMount() {
    const hash = this.props.match.params.hash;
    this.props.getProposalsForSurvey(hash);
  }

  _renderProposals({proposals}) {
    const hash = this.props.match.params.hash;
    const isDisabled = (this.props.voteConfirmation || typeof this.props.oldVote !== 'undefined') ? true : false;

    return (
      <ul className='proposals'>
        {proposals.map((proposal) => {
          return (
            <li key={uuidV1()}>
              <button className='reset' type='button' disabled={isDisabled}
              onClick={() => this.props.voteForAProposal(hash, proposal.id)}>
                <h1>{proposal.title}</h1>
                <p>{proposal.description}</p>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renableVotes() {
    this.setState({canFakeVote: true})
  }

  _renderAlreadyVotedTpl() {
    return (
      <div>
        <section className='VoteConfirmationContainer'>
          <p>
            <span className='icon-checkmark icon' />
            Vous avez déjà voté pour ce sondage, <br/> vous aviez choisi : <b>{this.props.oldVote.restaurant}</b>
          </p>
        </section>
      </div>
    )
  }

  _renderVoteConfirmationTpl() {
    /*<section className='FakeVotesContainer'>
      <button type='button' className='reset' onClick={() => this.renableVotes()}>
        Truquer les votes
      </button>
    </section>*/
    return (
      <div>
        <section className='VoteConfirmationContainer'>
          <p>
            <span className='icon-checkmark icon' />
            Vous avez voté pour : <b>{this.props.voteConfirmation.title}</b>
          </p>
        </section>
      </div>
    )
  }

  _renderSurveyErrorTpl() {
    return (
      <div>
        <section className='SurveyError'>
          <p>
            <span className='icon-close icon' />
            <b>{texts.survey_error_404}</b>
          </p>
          <Link to='/'>Retour à l'accueil</Link>
        </section>
      </div>
    )
  }

  render() {
    const {surveyContent, voteConfirmation, oldVote} = this.props;

    return (
      <div className='SurveyDisplayWrapper'>
        <Helmet><title>Sondage</title></Helmet>
        <h1>
          Alors ce midi, <br/>
          on se fait quoi ?
        </h1>
        {surveyContent.response && this._renderProposals(surveyContent.response) }
        {surveyContent.error && this._renderSurveyErrorTpl() }

        {(voteConfirmation && surveyContent.response) && this._renderVoteConfirmationTpl() }
        {(oldVote && surveyContent.response) && this._renderAlreadyVotedTpl() }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const {survey} = state
  const hash = ownProps.match.params.hash
  const oldVote = filter(survey.voted, {survey_hash: hash})[0];
  
  return {
    surveyContent: survey.content,
    voteConfirmation: survey.voteConfirmation,
    oldVote
  }
};

const mapDispatchToProps = {
  getProposalsForSurvey,
  voteForAProposal
}

let SurveyDisplayContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyDisplay));

export default SurveyDisplayContainer;
