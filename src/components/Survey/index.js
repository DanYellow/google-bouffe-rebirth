import React from 'react';
import { connect } from 'react-redux';
import uuidV1 from 'uuid/v1';


import texts from '../../constants/texts';
import './index.css';
import { toggleSurvey } from '../../actions';


export const Survey = ({survey, toggleSurvey}) => {
  return (
    <div className='SurveyCreatorWrapper'>
      <header>{`${texts.current_survey} (${survey.length}/4)`}</header>

      <ul className='choices'>
        {survey.map((item) => {
          return (<li key={uuidV1()}>
            <button className='reset' onClick={() => toggleSurvey(item)} type='button'>
              <p>{item.title}</p>
              <span className={'icon-close'}></span>
            </button>
          </li>)
        })}
      </ul>
      {survey.length >= 2 && <ul className='btns'>
        <button type='button' className='reset create'>Créer sondage</button>
        <button type='button' className='reset cancel'>Annuler sondage</button>
      </ul>}
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    survey: state.restaurants.survey
  }
};

const mapDispatchToProps = {
  toggleSurvey
}

let SurveyContainer = connect(mapStateToProps, mapDispatchToProps)(Survey);

export default SurveyContainer;
