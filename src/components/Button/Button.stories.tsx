import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button, { type ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'contained',
    size: 'medium',
  },
  argTypes: {
    variant: { control: 'radio', options: ['text', 'contained', 'outlined'] },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = { args: { variant: 'contained' } };
export const Text: Story = { args: { variant: 'text' } };
export const Outlined: Story = { args: { variant: 'outlined' } };

export const Small: Story = { args: { size: 'small' } };
export const Medium: Story = { args: { size: 'medium' } };
export const Large: Story = { args: { size: 'large' } };

export const Disabled: Story = { args: { disabled: true } };
