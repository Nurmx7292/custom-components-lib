import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

describe('TextField', () => {
  test('renders input with label', () => {
    render(<TextField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders input without label', () => {
    render(<TextField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('applies error class when error is true', () => {
    render(<TextField error />);
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('error')).toBe(true);
  });

  test('applies variant class', () => {
    render(<TextField variant="outlined" />);
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('outlined')).toBe(true);
  });

  test('forwards standard input props', () => {
    const onChange = jest.fn();
    render(
      <TextField
        disabled
        type="email"
        onChange={onChange}
        className="custom-class"
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('type', 'email');
    expect(input.classList.contains('custom-class')).toBe(true);

    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalled();
  });

  test('generates unique id when not provided', () => {
    render(<TextField label="Label 1" />);
    render(<TextField label="Label 2" />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  test('uses provided id', () => {
    render(<TextField id="custom-id" label="Test" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'custom-id');
  });
});
