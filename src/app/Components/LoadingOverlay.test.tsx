import { render, screen } from '@testing-library/react';
import LoadingOverlay from './LoadingOverlay';

it('shows overlay when show = true', () => {
  render(<LoadingOverlay show={true} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

it('does not render when show = false', () => {
  const { queryByText } = render(<LoadingOverlay show={false} />);
  expect(queryByText(/loading/i)).toBeNull();
});
