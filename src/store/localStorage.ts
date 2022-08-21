import { RootState } from './store';

export const loadState = () => {
  try {
    const serialState = localStorage.getItem('store');
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('store', serialState);
  } catch (err) {
    console.log(err);
  }
};
