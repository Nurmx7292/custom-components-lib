import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {},
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

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
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
    value: 'Cannot edit this',
  },
};
