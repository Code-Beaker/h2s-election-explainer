import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Navbar Component', () => {
  it('renders the logo correctly', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Elec/i)).toBeInTheDocument();
    expect(screen.getByText(/Guide/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Checklist/i)).toBeInTheDocument();
  });

  it('opens the eligibility modal when "Register Now" is clicked', () => {
    renderWithRouter(<Navbar />);
    const registerBtn = screen.getByText(/Register Now/i);
    fireEvent.click(registerBtn);
    
    expect(screen.getByText(/Wait! Want to check if you're eligible first?/i)).toBeInTheDocument();
  });

  it('shows not eligible message when "No, I\'m not" is clicked', () => {
    renderWithRouter(<Navbar />);
    fireEvent.click(screen.getByText(/Register Now/i));
    
    const noBtn = screen.getByText(/No, I'm not/i);
    fireEvent.click(noBtn);
    
    expect(screen.getByText(/Thanks for your honesty!/i)).toBeInTheDocument();
  });
});
