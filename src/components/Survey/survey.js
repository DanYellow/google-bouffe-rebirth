import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidV1 from 'uuid/v1';


// import texts from '../../constants/texts';
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

  _renderProposals(proposals) {
    const hash = this.props.match.params.hash;
    const isDisabled = (this.props.voteConfirmation && !this.state.canFakeVote) ? true : false;

    return (
      <ul className='proposals'>
        {proposals.map((proposal) => {
          return (
            <li key={uuidV1()}>
              <button className='reset' type='button' disabled={isDisabled}
              onClick={() => this.props.voteForAProposal(hash, proposal.id)}>
                <p>{proposal.title}</p>
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

  _renderVoteConfirmation() {
    /*<section className='FakeVotesContainer'>
      <button type='button' className='reset' onClick={() => this.renableVotes()}>
        Truquer les votes
      </button>
    </section>*/
    return (
      <div>
        <section className='VoteConfirmationContainer'>
          <span className='icon-checkmark' />
          <p>Vous avez voté pour : <b>{this.props.voteConfirmation}</b></p>
        </section>
        
      </div>
    )
  }

  render() {
    const {surveyContent, voteConfirmation} = this.props;
    return (
      <div className='SurveyDisplayWrapper'>
        <h1>
          Alors ce midi, <br/>
          on se fait ?
        </h1>
        {Object.keys(surveyContent).length && this._renderProposals(surveyContent.proposals) }
        
        {voteConfirmation && this._renderVoteConfirmation() }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    surveyContent: state.survey.content,
    voteConfirmation: state.survey.voteConfirmation,
  }
};

const mapDispatchToProps = {
  getProposalsForSurvey,
  voteForAProposal
}

let SurveyDisplayContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SurveyDisplay));

export default SurveyDisplayContainer;
