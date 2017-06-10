import React from 'react';
import ReactDOM from 'react-dom';
import SpideyApp from './components/SpideyApp';
import ServiceContainer from "./utils/serviceContainer";
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <SpideyApp serviceContainer={ new ServiceContainer() } />,
  document.getElementById('root')
);
