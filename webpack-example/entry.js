import React from 'react';
import ReactDOM from 'react-dom';
import CSSComponent from 'babel!../loader/index.js!./component.css';
import AdvancedCSSComponent from 'babel!../loader/index.js!./advanced-component.css';
import UserComponent from 'babel!../loader/index.js!./UserComponent.css';

const Icon = () => (
  <span>Icon</span>
);

class App extends React.Component {
  render() {
    return (
      <div>
        <UserComponent
          avatar={<img src='https://api.adorable.io/avatars/285/abott@adorable.io.png' />}
          name='Merrick Christensen'
          biography='I am a kind chap but I get distracted easily. This entire component is compiled at build time. It can also compile Angular 2 components. I am not sure but I think I took this idea too far.'
          extra='Age 26 & Location Utah'
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
