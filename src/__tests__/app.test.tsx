import TopPage from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('TopPage', () => {
  it('should render title text', () => {
    render(<TopPage />);

    const h1Ele = screen.getByRole('heading', { level: 1 });
    expect(h1Ele.textContent).toBe('Manage your Properties');
  });

  it('should render start button', () => {
    render(<TopPage />);

    const buttonEle = screen.getByRole('button', { name: /get started/i });
    expect(buttonEle).toBeInTheDocument();
  });
});
