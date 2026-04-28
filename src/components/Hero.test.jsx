import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Hero from './Hero';

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Hero Component', () => {
  it('renders the main heading', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText(/Learn. Vote. /i)).toBeInTheDocument();
    expect(screen.getByText(/Shape the/i)).toBeInTheDocument();
    expect(screen.getByText(/Future/i)).toBeInTheDocument();
  });

  it('renders the call to action buttons', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText(/Ask Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Watch How it Works/i)).toBeInTheDocument();
  });

  it('displays statistics', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText(/900M\+/i)).toBeInTheDocument();
    expect(screen.getByText(/1M\+/i)).toBeInTheDocument();
  });
});
