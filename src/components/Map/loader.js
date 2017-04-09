import React from 'react';

import './loader.css';

import hamburger from '../../images/hamburger.svg';
import texts from '../../constants/texts';

const Loader = (props) => {
  return (
    <div className='Loader'>
      <img alt='loading image' src={hamburger} />
      <p>{texts.loading}</p>
    </div>
  );
}

export default Loader;
