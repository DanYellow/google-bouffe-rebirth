import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'

import { selectedRestaurant } from '../../actions';
import './index.css';

const ListItem = ({title, description, address, id, isActive, selectedRestaurant, position}) =>
  <li id={id} className={classNames({active: isActive})}>
    <a onClick={() => selectedRestaurant(id, position)} 
       href='#' className='reset'>
      <h1>{title}</h1>
      <p>{address}</p>
    </a>
    {(description && isActive) && <blockquote className='description'>{description}</blockquote>}
  </li>

const mapStateToProps = state => ({
  currentIndex: state.list.currentIndex,
  mapPosition: state.list.mapPosition,
});

const mapDispatchToProps = {
  selectedRestaurant
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
