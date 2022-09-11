import Header from './Header';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

describe('Header component', () => {
  it('should display as expected', () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>
    );
    console.log(container);
  });
});
