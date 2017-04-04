import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuidV1 from 'uuid/v1';
import classNames from 'classnames';

import { listType } from '../../actions';
import ListItem from './list-item';
import './index.css';

class List extends Component {
  render() {
    const restaurants = this.props.restaurants.map((restaurant) => {
      const isActive = (this.props.currentIndex === restaurant.id);
      return <ListItem {...restaurant} isActive={isActive} key={uuidV1()}/>
    }).filter((restaurant) => {
      if (this.props.type === 'all') { return true; }
      return this.props.type === 'my' && restaurant.props.id < 3;
    })

    return (
      <div className='ListWrapper'>
        <Header />
        <ul className='List'>
          {restaurants}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentIndex: state.restaurant.currentIndex,
  type: state.list.type
});

export default connect(mapStateToProps, {})(List);


function mapStateToPropsHeader(state) {
  return {
    currentIndex: state.restaurant.currentIndex,
    type: state.list.type
  }
}

const mapDispatchToProps = {
  listType
}

const Header = connect(mapStateToPropsHeader, mapDispatchToProps)(class Header extends Component {
  render() {
    const {listType, type} = this.props;
    return (
      <section className='Header'>
        <button onClick={() => listType('my')} type='button' className={classNames('reset', { active: type === 'my'})}>Ma liste</button>
        <button onClick={() => listType('all')} type='button' className={classNames('reset', { active: type === 'all'})}>Tout</button>
      </section>
    )
  }
});
