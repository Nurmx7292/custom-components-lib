import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Switch from './Switch';

describe('Switch', () => {
  test('renders with label', () => {
    render(<Switch checked={false} onChange={() => {}} label="Toggle" />);
    expect(screen.getByLabelText('Toggle')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('reflects checked prop', () => {
    const { rerender } = render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    rerender(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('calls onChange with next value', () => {
    const onChange = jest.fn();
    render(<Switch checked={false} onChange={onChange} label="SW" />);
    fireEvent.click(screen.getByLabelText('SW'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Switch checked={false} disabled onChange={onChange} label="Disabled" />);
    fireEvent.click(screen.getByLabelText('Disabled'));
    expect(onChange).not.toHaveBeenCalled();
  });

  test('accepts provided id and passes to input', () => {
    render(<Switch id="custom-id" checked={false} onChange={() => {}} label="Id" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'custom-id');
  });
});


