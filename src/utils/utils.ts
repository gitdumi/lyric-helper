import { Lyric, SectionState } from '../app/interfaces';

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getNewKey = () => {
  return makeid(20);
};

export function reorder(list: SectionState[] | Lyric[], startIndex: number, endIndex: number) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function promiseState(promise: Promise<any>) {
  const t = {};
  return Promise.race([promise, t]).then(
    (v) => (v === t ? 'pending' : 'fulfilled'),
    () => 'rejected'
  );
}
