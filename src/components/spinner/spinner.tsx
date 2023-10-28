'use client';
import { FadeLoader } from 'react-spinners';

interface SpinnerProps {
  color?: string;
  height?: number;
  width?: number;
  margin?: number;
}

const Spinner = ({
  color = '#7B8FA1',
  height = 11,
  width = 4,
  margin = -6,
}: SpinnerProps) => {
  return (
    <div>
      <FadeLoader
        color={color}
        loading
        height={height}
        width={width}
        margin={margin}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Spinner;
