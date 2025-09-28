import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TextField, { type TextFieldProps } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    placeholder: 'Enter text',
  },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
  },
};

export const Error: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: true,
    placeholder: 'Enter password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
    value: 'Cannot edit this',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
  },
};

