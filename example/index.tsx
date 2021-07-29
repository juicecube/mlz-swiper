import React from 'react';
import ReactDOM from 'react-dom';
import { Test } from '../test/index.test';

import { setHtmlFont } from './util';

setHtmlFont();

const App = () => <div><Test /></div>;
ReactDOM.render(<App/>, document.getElementById('root'));
