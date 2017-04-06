import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import { find } from 'lodash';

import { selectedRestaurant, toggleFav } from '../../actions';
import './index.css';

const ListItem = ({title, description, address, id, isActive, selectedRestaurant, position, toggleFav, favs, match}) => {
  const isFav = favs.includes(id);
  return (
  <li id={id} className={classNames({active: isActive})}>
    <section>
      <Link to={`${id}`}
         onDoubleClick={() => alert(title)}
         className='reset'>
        <h1>{title}</h1>
        <p>{address}</p>
      </Link>
      {(description && isActive) && 
        <blockquote className='description'>{description}</blockquote>}

      {(isActive) && 
      <ul className='toolbox'>
        <li>
          <button type='button' className='reset fav' onClick={() => toggleFav(id)}>
            <span className={classNames('icon', {'icon-fav': !isFav, 'icon-fav-no': isFav})} />
            {!isFav && 'Ajouter à ma liste'}
            {isFav && 'Retirer de ma liste'}
          </button>
        </li>
        { /*<li>
          <button type='button' className='reset'>
            <span className='icon'>X</span>
            Ajouter à ma liste
          </button>
        </li> */}
      </ul>}
    </section>
  </li>
  )
}


const mapStateToProps = (state, ownProps) => {
  let {restaurant: {currentIndex}, restaurant:{mapPosition}} = state;
  currentIndex = (currentIndex === -1) ? Number(ownProps.match.params.id_restaurant) : currentIndex;

  return {
    currentIndex: currentIndex,
    mapPosition: state.list.mapPosition,
    favs: state.restaurant.favs,
  }
};

const mapDispatchToProps = {
  selectedRestaurant,
  toggleFav
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListItem));
