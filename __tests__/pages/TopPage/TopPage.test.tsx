import TopPage from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('TopPage', () => {
  it('should render the app title', () => {
    render(<TopPage />);

    const titleHeading = screen.getByRole('heading', { level: 1 });

    expect(titleHeading).toHaveTextContent(/manage your properties/i);
  });

  it('should render the Link component', () => {
    render(<TopPage />);

    const link = screen.getByRole('link', { name: /get started/i });

    expect(link).toBeInTheDocument();
  });
});
