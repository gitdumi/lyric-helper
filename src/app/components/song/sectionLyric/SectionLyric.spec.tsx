import { render, screen } from '@testing-library/react';
import SectionLyric from './SectionLyric';

test('renders the landing page', () => {
  const value = 'to be or not to be';

  render(
    <SectionLyric index={0} sectionIndex={0} value={value} provided={null} setIsLoading={null} />
  );

  expect(screen.getByDisplayValue(value)).toHaveTextContent(value);
});
