import AddHouseModal from '@/components/modal/AddHouseModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

const MockedAddHouseModal = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AddHouseModal />
    </QueryClientProvider>
  );
};

jest.mock('../../src/hooks/use-add-house.ts', () => {
  return {
    useAddHouse: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
  };
});

jest.mock('../../src/components/icons', () => ({
  CrossIcon: jest.fn(() => <div data-testid='cross-icon-mock' />),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('AddHouseModal', () => {
  describe('Render', () => {
    it('should render the trigger button', () => {
      render(<MockedAddHouseModal />);

      const button = screen.getByRole('button', { name: /add house/i });

      expect(button).toBeInTheDocument();
    });

    it('should not render the modal window unless the button is clicked', () => {
      render(<MockedAddHouseModal />);

      const submitButton = screen.queryByRole('button', { name: /submit/i });

      expect(submitButton).not.toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should open modal when button is clicked', async () => {
      render(<MockedAddHouseModal />);

      const button = screen.getByRole('button', { name: /add house/i });
      await userEvent.click(button);

      const submitButton = await screen.findByRole('button', {
        name: /submit/i,
      });

      expect(submitButton).toBeInTheDocument();
    });

    it('should submit the form when all the required fields are filled, and reset the form values', async () => {
      render(<MockedAddHouseModal />);

      const button = screen.getByRole('button', { name: /add house/i });
      await userEvent.click(button);

      const houseNameInput = screen.getByLabelText('House Name');
      const locationInput = screen.getByLabelText('Location');
      const submitButton = screen.getByText('Submit');
      await userEvent.type(houseNameInput, 'Test House');
      await userEvent.type(locationInput, 'Vancouver');
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(houseNameInput).toHaveTextContent('');
        expect(locationInput).toHaveTextContent('');
      });
    });
  });
});
