import React from 'react';
import { connect } from 'react-redux';
import v from 'voca';

import texts from '../../constants/texts';
import './index.css';
import { toggleSurveyItem, cancelSurvey, createSurvey,
          deleteExistingSurvey, displayExistingSurvey
       } from '../../actions';


export const Survey = ({
    surveyContent, toggleSurveyItem, cancelSurvey, 
    createSurvey, url, inProgress, isRequestPending,
    displayExistingSurvey, deleteExistingSurvey
  }) => {

  const _surveyCreationTpl = () => {
    const limitProposals = 4;
    const minProposalsForSurvey = 2;
    const isDisabled = isRequestPending;
    
    return (
      <div>
        <header>
          <section className='title'>
            <h1>{`${texts.current_survey} (${surveyContent.length}/${limitProposals})`}</h1>
            {url && <button type='button' title={texts.survey_exists} className='icon-warning icon reset' />}
          </section>
          {url && <ul className='btns'>
            <button type='button' className='reset create' onClick={() => displayExistingSurvey()}>{texts.survey_display_existing}</button>
            <button type='button' className='reset cancel' onClick={() => deleteExistingSurvey()}>{texts.survey_delete_existing}</button>
          </ul> }
        </header>

        <ul className='choices'>
          {surveyContent.map((item, index) => {
            return (<li key={`choice-${index}`}>
              <button className='reset' disabled={isDisabled} onClick={() => toggleSurveyItem(item)} type='button'>
                <p>{item.title}</p>
                <span className='icon-close' />
              </button>
            </li>)
          })}
        </ul>

        {surveyContent.length >= minProposalsForSurvey && <ul className='btns'>
          <button type='button' className='reset create' onClick={() => createSurvey(surveyContent)}>Créer sondage</button>
          <button type='button' className='reset cancel' onClick={() => cancelSurvey()}>Annuler sondage</button>
        </ul>}
      </div>
    )
  }

  const selectLink = (e) => {
    e.currentTarget.setSelectionRange(0, 9999);
  }

  let completeURL = '';
  if (url) {
    completeURL = `${document.location.origin}/#${url}`
    window.localStorage.setItem('last_survey_hash', url)
  }

  const _surveyURLTpl = () => {
    const lastSurveyHash = window.localStorage.getItem('last_survey_hash')
    const urlResults = `${document.location.origin}/#${v.insert(lastSurveyHash, '/results', 7)}`

    return (
      <div>
        <header>{texts.survey_links}</header>
        <form>
          <fieldset>
            <label htmlFor='survey'>{texts.survey_}</label>
            <input
              id='survey'
              onClick={selectLink}
              type='text' value={completeURL} readOnly />
          </fieldset>
          <fieldset>
            <label htmlFor='results'>{texts.survey_results}</label>
            <input
              id='results'
              onClick={selectLink}
              type='text' value={urlResults} readOnly />
          </fieldset>
        </form>

        <ul className='btns'>
          <button type='button' className='reset cancel' onClick={() => cancelSurvey()}>Annuler sondage</button>
        </ul>
      </div>
    )
  }

  return (
    <div className='SurveyCreatorWrapper'>
      {(url && !inProgress) && _surveyURLTpl()}
      {(!url || inProgress) && _surveyCreationTpl()}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    surveyContent: state.survey.proposals,
    url: state.survey.url,
    inProgress: state.survey.inProgress,
    isRequestPending: state.isRequestPending
  }
};

const mapDispatchToProps = {
  toggleSurveyItem,
  cancelSurvey,
  createSurvey,
  displayExistingSurvey,
  deleteExistingSurvey
}

let SurveyContainer = connect(mapStateToProps, mapDispatchToProps)(Survey);

export default SurveyContainer;
