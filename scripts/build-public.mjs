// A reversible public deployment mode. The full Next site and its gates remain intact.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const config = JSON.parse(fs.readFileSync('maintenance/config.json', 'utf8'));
if (typeof config.enabled !== 'boolean') throw new Error('Explicit maintenance mode required');
const command = config.enabled ? ['node', ['scripts/build-holding.mjs']] : ['npm', ['run', 'build:site']];
const result = spawnSync(command[0], command[1], { stdio: 'inherit' });
process.exit(result.status ?? 1);
