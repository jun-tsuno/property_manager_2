import LoginForms from '@/components/pages/login-page/LoginForms';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('LoginForm', () => {
  describe('Render', () => {
    it('should render email and password input', () => {
      render(<LoginForms />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    // const mockRouter = { push: jest.fn() };

    it('should call signIn function when required fields are filled', async () => {
      render(<LoginForms />);

      await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
      await userEvent.type(screen.getByLabelText(/password/i), 'password');
      await userEvent.click(screen.getByRole('button', { name: /log in/i }));

      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password',
      });
    });
  });
});
