import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { includes } from 'lodash';

import ListItem from './components/list-item';
import texts from '../../constants/texts';
import './index.css';

import Header from './components/header';

class List extends Component {
  render() {
    const { match, isHidden } = this.props

    const restaurants = this.props.restaurants.map((restaurant, index) => {
      const isActive = Number(match.params.id_restaurant) === restaurant.id
      return <ListItem {...restaurant} isActive={isActive} key={restaurant.id}/>
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
