import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  test('does not render when open is false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <div>Content</div>
      </Modal>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test('renders children when open', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <div>Content</div>
      </Modal>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('closes on backdrop click by default', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <div>Content</div>
      </Modal>,
    );
    fireEvent.click(document.querySelector('.backdrop') as Element);
    expect(onClose).toHaveBeenCalled();
  });

  test('does not close on backdrop click when disabled', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose} disableBackdropClose>
        <div>Content</div>
      </Modal>,
    );
    fireEvent.click(document.querySelector('.backdrop') as Element);
    expect(onClose).not.toHaveBeenCalled();
  });

  test('closes on Escape key', () => {
    const onClose = jest.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <div>Content</div>
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
