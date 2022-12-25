import { strict as assert } from 'node:assert';
import range from '../../utils/range-ts';
import { GPS } from './part-2';

const logMap = (map: Map<GPS, GPS>, start: GPS) => {
  const numbers: string[] = [];
  let target = map.get(start);
  assert(target);
  numbers.push(target.value);
  for (const n of range(1, map.size)) {
    assert(target);
    target = map.get(target);

    assert(target);
    numbers.push(target.value);
  }

  console.log('numbers', numbers);
};

export default logMap;
