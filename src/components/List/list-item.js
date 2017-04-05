import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'

import { selectedRestaurant, toggleFav } from '../../actions';
import './index.css';

const ListItem = ({title, description, address, id, isActive, selectedRestaurant, position, toggleFav, favs}) => {

  
  return (
  <li id={id} className={classNames({active: isActive})}>
    <section>
      <a onClick={() => selectedRestaurant(id, position)}
         onDoubleClick={() => alert(title)}
         href='#' className='reset'>
        <h1>{title}</h1>
        <p>{address}</p>
      </a>
      {(description && isActive) && 
        <blockquote className='description'>{description}</blockquote>}

      {(isActive) && 
      <ul className='toolbox'>
        <li>
          <button type='button' className='reset' onClick={() => toggleFav(id)}>
            <span className='icon-fav icon' />
            {!favs.includes(id) && 'Ajouter à ma liste'}
            {favs.includes(id) && 'Retirer de ma liste'}
          </button>
        </li>
        <li>
          <button type='button' className='reset'>
            <span className='icon'>X</span>
            Ajouter à ma liste
          </button>
        </li>
      </ul>}
    </section>
  </li>
  )
}


const mapStateToProps = state => ({
  currentIndex: state.list.currentIndex,
  mapPosition: state.list.mapPosition,
  favs: state.restaurant.favs,
});

const mapDispatchToProps = {
  selectedRestaurant,
  toggleFav
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
