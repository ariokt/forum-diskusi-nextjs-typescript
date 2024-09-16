import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<Navbar />);
  });

  it('should render image with alt threads', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'threads logo');
  });
})