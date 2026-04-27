import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Checklist from './Checklist';

describe('Checklist Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders the checklist title correctly', () => {
    render(<Checklist />);
    expect(screen.getByText(/Your Voter/i)).toBeInTheDocument();
    expect(screen.getByText(/Checklist/i)).toBeInTheDocument();
  });

  it('renders the default tasks', () => {
    render(<Checklist />);
    expect(screen.getByText(/Check your name in the Voter List/i)).toBeInTheDocument();
    expect(screen.getByText(/Download your e-EPIC/i)).toBeInTheDocument();
  });

  it('allows toggling a task completion state', () => {
    render(<Checklist />);
    
    // Find the first task button
    const firstTaskButton = screen.getByText(/Check your name in the Voter List/i).closest('button');
    
    // Initially not completed (assuming default state has class 'task-item' but not 'completed')
    expect(firstTaskButton).not.toHaveClass('completed');
    
    // Click the task
    fireEvent.click(firstTaskButton);
    
    // Now it should be completed
    expect(firstTaskButton).toHaveClass('completed');
  });
});
