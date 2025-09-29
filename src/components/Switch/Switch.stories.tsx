import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    checked: false,
    label: 'Switch',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium'] },
    color: { control: 'radio', options: ['primary', 'secondary'] },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const UncontrolledLike: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const CheckedPrimary: Story = {
  args: { checked: true, color: 'primary' },
};

export const CheckedSecondary: Story = {
  args: { checked: true, color: 'secondary' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
