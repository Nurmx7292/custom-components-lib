import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('renders checkbox with label', () => {
    render(<Checkbox label="Test Checkbox" />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders checkbox without label', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('applies disabled state', () => {
    render(<Checkbox label="Disabled Checkbox" disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  test('handles checked state', () => {
    render(<Checkbox label="Checked Checkbox" defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('forwards standard checkbox props', () => {
    const onChange = jest.fn();
    render(
      <Checkbox
        label="Test"
        onChange={onChange}
        className="custom-class"
        name="test-checkbox"
        value="test-value"
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'test-checkbox');
    expect(checkbox).toHaveAttribute('value', 'test-value');

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });

  test('generates unique id when not provided', () => {
    render(<Checkbox label="Label 1" />);
    render(<Checkbox label="Label 2" />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0].id).not.toBe(checkboxes[1].id);
  });

  test('uses provided id', () => {
    render(<Checkbox id="custom-id" label="Test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  test('handles indeterminate state', () => {
    render(<Checkbox label="Indeterminate Checkbox" indeterminate />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  test('calls onChange when clicked', () => {
    const onChange = jest.fn();
    render(<Checkbox label="Clickable" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Checkbox label="Disabled" disabled onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});
