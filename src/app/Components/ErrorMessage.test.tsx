import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

it('renders error when message provided', () => {
  render(<ErrorMessage message="Something went wrong" />);
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});

it('renders nothing when message is empty', () => {
  const { container } = render(<ErrorMessage message="" />);
  expect(container).toBeEmptyDOMElement();
});
