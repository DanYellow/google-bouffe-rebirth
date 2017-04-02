import React, { Component } from 'react';

import uuidV1 from 'uuid/v1';

import './index.css';

class List extends Component {
  render() {
    const restaurants = this.props.restaurants.map((restaurant) => {
      return <ListItem {...restaurant} key={uuidV1()}/>
    });

    return (
      <div className='ListWrapper'>
        <ul className='List'>
          {restaurants}
        </ul>
      </div>
    );
  }
}

export default List;


class ListItem extends Component {
  render() {
    const {title, description, address, id} = this.props;

    return (
      <li id={id}>
        <h1>{title}</h1>
        <p>{address}</p>
      </li>
    )
  }
}
