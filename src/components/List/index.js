import React, { Component } from 'react';
import { connect } from 'react-redux';

import uuidV1 from 'uuid/v1';
import classNames from 'classnames';

import ListItem from './list-item';
import './index.css';

class List extends Component {
  render() {
    const restaurants = this.props.restaurants.map((restaurant) => {
      const isActive = (this.props.currentIndex === restaurant.id);
      return <ListItem {...restaurant} isActive={isActive} key={uuidV1()}/>
    });

    console.log('this.props', this.props);

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

// const mapStateToProps = state => ({
//   currentIndex: state.list.currentIndex
// });

function mapStateToProps(state) {
  return {
    currentIndex: state.list.currentIndex
  }
}

export default connect(mapStateToProps, {})(List);


class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      type: 'my'
    }
  }

  render() {
    return (
      <section className='Header'>
        <button onClick={() => this.setState({type: 'my'})} type='button' className={classNames('reset', { active: this.state.type === 'my'})}>Ma liste</button>
        <button onClick={() => this.setState({type: 'all'})} type='button' className={classNames('reset', { active: this.state.type === 'all'})}>Tout</button>
      </section>
    )
  }
}
