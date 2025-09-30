import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  test('renders select with options', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('renders select with label', () => {
    render(<Select label="Choose Option" options={mockOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('renders placeholder option', () => {
    render(<Select options={mockOptions} label="Select an option" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('applies disabled to options', () => {
    render(<Select options={mockOptions} />);
    const option3 = screen.getByText('Option 3');
    expect(option3).toBeDisabled();
  });

  test('forwards standard select props', () => {
    const onChange = jest.fn();
    render(
      <Select
        options={mockOptions}
        disabled
        onChange={onChange}
        className="custom-class"
        multiple
      />,
    );
    const select = screen.getByRole('listbox');
    expect(select).toBeDisabled();
    expect(select.classList.contains('custom-class')).toBe(true);

    fireEvent.change(select, { target: { value: 'option1' } });
    expect(onChange).toHaveBeenCalled();
  });

  test('generates unique id when not provided', () => {
    render(<Select label="Label 1" options={mockOptions} />);
    render(<Select label="Label 2" options={mockOptions} />);

    const selects = screen.getAllByRole('combobox');
    expect(selects[0].id).not.toBe(selects[1].id);
  });

  test('uses provided id', () => {
    render(<Select id="custom-id" label="Test" options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'custom-id');
  });

  test('renders children when provided', () => {
    render(
      <Select>
        <option value="child1">Child Option 1</option>
        <option value="child2">Child Option 2</option>
      </Select>,
    );
    expect(screen.getByText('Child Option 1')).toBeInTheDocument();
    expect(screen.getByText('Child Option 2')).toBeInTheDocument();
  });
});
