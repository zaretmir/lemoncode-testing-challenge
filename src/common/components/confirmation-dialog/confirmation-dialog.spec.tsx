import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import userEvent from '@testing-library/user-event';

describe('Confirmation dialog specs', () => {
  it('should not show when isOpen is false', () => {
    // Given
    const dialogProps = {
      isOpen: false,
      onAccept: () => {
      },
      onClose: () => {
      },
      title: 'A Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };
    render(<ConfirmationDialogComponent {...dialogProps} />);
    const dialog = screen.queryByRole('dialog');

    // Then
    expect(dialog).not.toBeInTheDocument();
  });

  it('should show when isOpen is true', () => {
    // Given
    const dialogProps = {
      isOpen: true,
      onAccept: () => {
      },
      onClose: () => {
      },
      title: 'A Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };
    render(<ConfirmationDialogComponent {...dialogProps} />);
    const dialog = screen.queryByRole('dialog');

    // Then
    expect(dialog).toBeInTheDocument();
  });

  it('should have a title', () => {
    // Given
    const dialogProps = {
      isOpen: true,
      onAccept: () => {
      },
      onClose: () => {
      },
      title: 'A Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };
    render(<ConfirmationDialogComponent {...dialogProps} />);
    const dialogTitle = screen.getByRole('heading', { name: dialogProps.title });

    // Then
    expect(dialogTitle).toBeInTheDocument();
  });

  it('should render the children', () => {
    // Given
    const dialogProps = {
      isOpen: true,
      onAccept: () => {
      },
      onClose: () => {
      },
      title: 'A Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: React.createElement('p', null, 'A child content')
    };
    render(<ConfirmationDialogComponent {...dialogProps} />);
    const dialogContent = screen.getByText('A child content');

    // Then
    expect(dialogContent).toBeInTheDocument();
  });

  it('should have an Accept button and a Close button', () => {
    // Given
    const dialogProps = {
      isOpen: true,
      onAccept: () => {
      },
      onClose: () => {
      },
      title: 'A Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };

    render(<ConfirmationDialogComponent {...dialogProps} />);
    const acceptButton = screen.getByRole('button', { name: dialogProps.labels.acceptButton });
    const closeButton = screen.getByRole('button', { name: dialogProps.labels.closeButton });

    // Then
    expect(acceptButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it('should execute the onAccept callback when pressing the acceptButton', () => {
    // Given
    const dialogProps = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: () => {
      },
      title: 'A Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };

    render(<ConfirmationDialogComponent {...dialogProps} />);
    const acceptButton = screen.getByRole('button', { name: dialogProps.labels.acceptButton }) as HTMLButtonElement;

    // When
    userEvent.click(acceptButton);

    // Then
    expect(dialogProps.onAccept).toHaveBeenCalled();
  });

  it('should execute the onClose callback when pressing the closeButton', () => {
    // Given
    const dialogProps = {
      isOpen: true,
      onAccept: () => {
      },
      onClose: jest.fn(),
      title: 'A Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };

    render(<ConfirmationDialogComponent {...dialogProps} />);
    const closeButton = screen.getByRole('button', { name: dialogProps.labels.closeButton }) as HTMLButtonElement;

    // When
    userEvent.click(closeButton);

    // Then
    expect(dialogProps.onClose).toHaveBeenCalled();
  });
});
