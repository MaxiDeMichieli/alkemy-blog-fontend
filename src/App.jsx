import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Router from './router/Router';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Container maxWidth="md">
          <Router />
        </Container>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
