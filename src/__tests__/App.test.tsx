import { render, screen } from '@testing-library/react';
import React from 'react';
import AppMenu from '../app/components/menu';

test('Open menu', () => {
  render(<AppMenu />);
  const elem = screen.getByTestId('LyricsSharpIcon');
  expect(elem).toBeTruthy();
});
