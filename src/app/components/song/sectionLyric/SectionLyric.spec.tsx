import { render, screen } from '@testing-library/react';
import SectionLyric from './SectionLyric';
import { Provider } from 'react-redux';
import testStore from '../../../store/__test_store';

test('render section lyric', () => {
  const value = 'to be or not to be';

  render(
    <Provider store={testStore}>
      <SectionLyric index={0} sectionIndex={0} value={value} provided={null} setIsLoading={null} />
    </Provider>
  );

  expect(screen.getByDisplayValue(value)).toHaveTextContent(value);
});
