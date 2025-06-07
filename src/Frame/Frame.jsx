import './Frame.css';
import React from 'react';
import Photo from '../Photo/Photo.jsx';
import Button from '../Button/Button.jsx';

function Frame({children, title}) {
    const elements = {
      photo: null,
      text: null,
      button: null
    };
  
    React.Children.forEach(children, child => {
      if (child.type === Photo) {
        elements.photo = child;
      } else if (child.type === Button) {
        elements.button = child;
      } else {
        elements.text = child;
      }
    });
  
    return (
      <div className={'frame'}>
        {<span className="frame-title">{title}</span>}
        <div className="frame-content">
          {elements.photo}
          {elements.text}
          {elements.button}
        </div>
      </div>
    );
  }
  
  export default Frame;