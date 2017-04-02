import React from 'react';
import { connect } from 'react-redux';

import { selectedRestaurant } from '../../actions';
import './index.css';

const ListItem = ({title, description, address, id, isActive, selectedRestaurant}) =>
  <li id={id}>
    {/*<a onClick={() => selectedRestaurant(id)} 
       href='#' className='reset'>
      <h1>{title}</h1>
      <p>{address}</p>
    </a>*/}
    <button type='button'>{title}</button>
    {(description && isActive) && <blockquote className='description'>{description}</blockquote>}
  </li>

const mapStateToProps = state => ({
  currentIndex: state.list.currentIndex
});

const mapDispatchToProps = () => ({
  selectedRestaurant
})

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
