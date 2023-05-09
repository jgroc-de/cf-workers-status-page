import { processCronTrigger } from './functions/cronTrigger'

addEventListener('scheduled', event => {
  event.waitUntil(processCronTrigger(event));
});
