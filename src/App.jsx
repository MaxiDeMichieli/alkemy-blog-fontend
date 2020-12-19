import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Router from './router/Router';
import Header from './components/Header';
import theme from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
