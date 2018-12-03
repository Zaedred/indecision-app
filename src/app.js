import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

registerServiceWorker();