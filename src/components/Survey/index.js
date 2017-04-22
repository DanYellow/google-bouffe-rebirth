import React from 'react';
import { connect } from 'react-redux';
import uuidV1 from 'uuid/v1';
import v from 'voca';

import texts from '../../constants/texts';
import './index.css';
import { toggleSurveyItem, cancelSurvey, createSurvey } from '../../actions';


export const Survey = ({surveyContent, toggleSurveyItem, cancelSurvey, createSurvey, url}) => {

  const _surveyCreationTpl = () => {
    return (
      <div className='SurveyCreatorWrapper'>
      <header>{`${texts.current_survey} (${surveyContent.length}/4)`}</header>

      <ul className='choices'>
        {surveyContent.map((item) => {
          return (<li key={uuidV1()}>
            <button className='reset' onClick={() => toggleSurveyItem(item)} type='button'>
              <p>{item.title}</p>
              <span className={'icon-close'}></span>
            </button>
          </li>)
        })}
      </ul>

      {surveyContent.length >= 2 && <ul className='btns'>
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
      <div className='SurveyCreatorWrapper'>
      
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

  if (!url) { return _surveyCreationTpl() }
  if (url) { return _surveyURLTpl() }
}


const mapStateToProps = (state, ownProps) => {
  return {
    surveyContent: state.survey.proposals,
    url: state.survey.url
  }
};

const mapDispatchToProps = {
  toggleSurveyItem,
  cancelSurvey,
  createSurvey
}

let SurveyContainer = connect(mapStateToProps, mapDispatchToProps)(Survey);

export default SurveyContainer;
