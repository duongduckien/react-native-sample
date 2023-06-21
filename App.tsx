import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { store } from './src/store';

// Containers
import Routes from './src/routes';

Icon.loadFont();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
