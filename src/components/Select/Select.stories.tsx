import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Select, { type SelectProps, type SelectOption } from './Select';

const ageOptions: SelectOption[] = [
  { value: '', label: 'None' },
  { value: '10', label: 'Ten' },
  { value: '20', label: 'Twenty' },
  { value: '30', label: 'Thirty' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: {
    options: ageOptions,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Age',
    placeholder: 'Select age',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Choose an option',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    value: '20',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Options with Disabled',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3 (Disabled)', disabled: true },
    ],
  },
};

export const Multiple: Story = {
  args: {
    label: 'Multiple Selection',
    multiple: true,
    options: [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
    ],
  },
};
