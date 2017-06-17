import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {listType} from '../modules';

const Header = (props) => {
    const {listType, type, favs} = props;
    return (
      <section className='Header'>
        <button onClick={() => listType('my')} type='button' className={classNames('reset', { active: type === 'my'})}>
          <p>
            Ma liste
          </p>
            <sup className='icon-fav'>
            {(favs.length > 0) && <span>{favs.length}</span>}
            </sup>
        </button>
        <button onClick={() => listType('all')} type='button' className={classNames('reset', { active: type === 'all'})}>
          <p>Tout</p>
        </button>
      </section>
    )
  
};

function mapStateToProps(state) {
  return {
    currentIndex: state.restaurant.currentIndex,
    type: state.list.type,
    favs: state.restaurants.favs,
  }
}

const mapDispatchToProps = {
  listType
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
