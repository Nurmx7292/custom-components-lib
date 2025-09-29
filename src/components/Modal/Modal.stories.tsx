import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  args: {
    children: <div>Modal content</div>,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Open modal</button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <div>
            <h3>Controlled Modal</h3>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </Modal>
      </div>
    );
  },
};

export const DisableBackdropClose: Story = {
  args: {
    open: true,
    disableBackdropClose: true,
    children: <div>Clicking backdrop will not close this modal</div>,
  },
};
