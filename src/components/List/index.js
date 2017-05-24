import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { includes } from 'lodash';

import { listType } from '../../actions';
import ListItem from './list-item';
import texts from '../../constants/texts';
import './index.css';

class List extends Component {
  render() {
    const { match, isHidden } = this.props

    const restaurants = this.props.restaurants.map((restaurant, index) => {
      const isActive = Number(match.params.id_restaurant) === restaurant.id
      return <ListItem {...restaurant} isActive={isActive} key={`ListItem-${index}`}/>
    }).filter((restaurant) => {
      if (this.props.type === 'all') { return true; }
      return this.props.type === 'my' && includes(this.props.favs, restaurant.props.id);
    });

    return (
      <div className={classNames('ListWrapper', {hidden: isHidden})}>
        <Header />
        {(restaurants.length > 0) &&
          <ul className='List'>{restaurants}</ul>
        }

        {(!restaurants.length) && this._renderEmptyState() }
      </div>
    );
  }

  _renderEmptyState() {
    return (
      <div className='empty-list'>
        <span className='icon-fav-no icon' />
        <p>{texts.empty_list}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentIndex: state.restaurant.currentIndex,
  type: state.list.type,
  favs: state.restaurants.favs,
});

export default withRouter(connect(mapStateToProps, {})(List));


function mapStateToPropsHeader(state) {
  return {
    currentIndex: state.restaurant.currentIndex,
    type: state.list.type,
    favs: state.restaurants.favs,
  }
}

const mapDispatchToProps = {
  listType
}

const Header = connect(mapStateToPropsHeader, mapDispatchToProps)(class Header extends Component {
  render() {
    const {listType, type, favs} = this.props;
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
  }
});
