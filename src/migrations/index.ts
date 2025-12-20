import * as migration_20250724_213141 from './20250724_213141';
import * as migration_20250724_215046 from './20250724_215046';

export const migrations = [
  {
    up: migration_20250724_213141.up,
    down: migration_20250724_213141.down,
    name: '20250724_213141',
  },
  {
    up: migration_20250724_215046.up,
    down: migration_20250724_215046.down,
    name: '20250724_215046'
  },
];
