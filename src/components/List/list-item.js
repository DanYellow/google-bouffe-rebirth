import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import { some, includes } from 'lodash'

import { selectedRestaurant, toggleFav, toggleSurveyItem, itineraryStepsCleared } from '../../actions';
import texts from '../../constants/texts';

import './index.css';

const itinerarySVG = {__html:`
<svg version="1.1" class="path" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
<rect class="path-2" x="18.99" y="22.542" transform="matrix(-0.5137 -0.858 0.858 -0.5137 9.5381 53.9832)" fill="#010202" width="2.155" height="3.492"/>
<path class="path-1" fill="#010202" d="M15.074,25.424c-0.428,0-0.85-0.075-1.253-0.223l-0.745,2.02
  c0.643,0.236,1.316,0.357,1.998,0.357c0.759,0,1.496-0.145,2.196-0.434l-0.817-1.992C16.013,25.332,15.549,25.424,15.074,25.424z"/>
<circle class="path-start" fill="#010202" cx="10.318" cy="25.007" r="1.77"/>
<path class="path-3" fill="#010202" d="M22.924,21.446l0.733,2.026c0.396-0.144,0.811-0.217,1.232-0.217
  c0.481,0,0.951,0.095,1.396,0.279l0.828-1.988c-0.706-0.295-1.456-0.446-2.224-0.446C24.218,21.103,23.556,21.218,22.924,21.446z"/>
<path class="map" fill="#010202" d="M35.137,10.375L25,3.062l-10.137,7.312L3.062,3.062v36.562l11.801,7.312L25,39.625l10.137,7.312
  l11.801-7.312V3.062L35.137,10.375z M43.281,37.59l-7.312,4.531v-7.98h-1.828v7.569l-7.312-5.273v-7.78h-3.656v7.78l-7.312,5.273
  v-9.397h-1.828v9.809L6.719,37.59V9.63l7.312,4.532v5.354h1.828v-5.352l7.312-5.275v6.971h3.656V8.889l7.312,5.275v3.523h1.828
  v-3.526l7.312-4.532V37.59z"/>
<polygon class="path-end" fill="#010202" points="33.541,24.035 35.912,26.367 33.582,28.736 34.867,30.021 37.202,27.649 
  39.569,29.979 40.854,28.685 38.484,26.356 40.811,23.991 39.516,22.708 37.191,25.076 34.824,22.751 "/>
<rect class="path-4" x="28.196" y="23.269" transform="matrix(-0.8689 -0.4949 0.4949 -0.8689 43.9088 60.3205)" fill="#010202" width="3.491" height="2.155"/>
</svg> `}

const ListItem = ({title, description, address, id, isActive, selectedRestaurant, position, toggleFav, toggleSurveyItem, favs, match, survey, itineraryStepsCleared}) => {
  const isFav = includes(favs, id);
  const isInSurvey = some(survey, {id: id});
  const surveyAvailable = ((survey.length === 4 && isInSurvey) || survey.length < 4) ? true : false;
  const surveyObject = {
    title,
    description,
    id
  };
  
  return (
    <li id={id} className={classNames({active: isActive})}>
      <section>
        <Link to={`/${id}`}
            onClick={() => { 
              selectedRestaurant(id, position); 
              itineraryStepsCleared() }}
            className='reset'>
            
          <h1>
          {title}
          {isFav && <sup className='icon-fav'></sup> }
          </h1>
          <p>{address}</p>
        </Link>
        {(description && isActive) && 
          <blockquote className='description'>{description}</blockquote>}

        {(isActive) && 
        <ul className='toolbox'>
          <li>
            <button type='button' className='reset fav' onClick={() => toggleFav(id)}>
              <span className={classNames('icon', {'icon-fav': isFav, 'icon-fav-no': !isFav})} />
              <span className='label'>{!isFav && texts.add_fav}
              {isFav && texts.del_fav}</span>
            </button>
          </li>
          
          <li>
            <Link to={{
                pathname: `/${id}/itinerary`,
              }}
              className='reset itinerary'>
              <div className="svg-container" dangerouslySetInnerHTML={itinerarySVG} />
              <span className='label'>{texts.display_itinerary}</span>
            </Link>
          </li>

          <li>
            <button type='button' disabled={!surveyAvailable} className='reset' onClick={() => toggleSurveyItem(surveyObject)}>
              <span className={classNames('icon', {'icon-survey-add': !isInSurvey, 'icon-survey-del': isInSurvey})} />
              <span className='label'>{!isInSurvey && texts.add_survey}
              {isInSurvey && texts.del_survey}</span>
            </button>
          </li>
        </ul>}
      </section>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  let {restaurant: {currentIndex, mapPosition}} = state;
  let {restaurants: {favs}} = state;
  return {
    currentIndex,
    mapPosition,
    favs,
    survey: state.survey.proposals
  }
};

const mapDispatchToProps = {
  selectedRestaurant,
  toggleFav,
  toggleSurveyItem,
  itineraryStepsCleared
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListItem));
