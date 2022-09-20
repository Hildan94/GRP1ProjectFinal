
import { render, screen } from '@testing-library/react';
import App from './App';


test('shows frontpage', () => {
  render(<App />);
});

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('has login button', () => {
  render(<App />);
  let button = screen.getByRole("button");
  expect(button).toHaveTextContent("Log ind");
});
*/

