import React from 'react';
import { connect } from 'react-redux';
import uuidV1 from 'uuid/v1';


import texts from '../../constants/texts';
import './index.css';
import { toggleSurveyItem, cancelSurvey, createSurvey } from '../../actions';


export const Survey = ({surveyContent, toggleSurveyItem, cancelSurvey, createSurvey, url}) => {

  const _surveyCreationTpl = () => {
    return (
      <div>
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

  const _surveyURLTpl = () => {
    return (
      <div>
        <header>{`${texts.current_survey} (${surveyContent.length}/4)`}</header>
        <form>
          <input type='text' value={url} readOnly />
        </form>
      </div>
    )
  }

  return (
    <div className='SurveyCreatorWrapper'>
      {!url && _surveyCreationTpl()}
      {url && _surveyURLTpl()}
    </div>
  )
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
