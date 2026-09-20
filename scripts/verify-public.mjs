import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const config=JSON.parse(fs.readFileSync('maintenance/config.json','utf8'));
if(typeof config.enabled!=='boolean')throw new Error('Explicit maintenance mode required');
const commands=config.enabled
  ? [['node',['scripts/build-holding.mjs']],['node',['scripts/verify-holding.mjs']]]
  : [['npm',['run','verify:site']]];
for(const [cmd,args] of commands){const p=spawnSync(cmd,args,{stdio:'inherit'});if(p.status!==0)process.exit(p.status??1);}
