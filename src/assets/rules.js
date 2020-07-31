import Rule from './Rule';
import Action from './Action';
import { useScreen, eat, work, play, browse, readNews, readPm } from './actions';

/**
 * @param {Action} action 
 * @param {string} schedule must match the mask of `####-####-####-####-####-####`, where each # is either 0 or 1. Each # represents an Hour, and 0/1 represents whether this Action is allowed during the Hour.
 */
function generateRules(action, schedule) {
  if (!(action instanceof Action)) {
    throw new TypeError('`action` parameter must be an instance of Action object');
  }

  if (typeof schedule !== 'string') {
    throw new TypeError('`schedule` parameter must be a string');
  }

  const scheduleRegex = /^(([01]{4}-){5})([01]{4})$/;
  if (!schedule.match(scheduleRegex)) {
    throw new Error('`schedule` parameter must match the mask of `####-####-####-####-####-####`, where each # is either 0 or 1')
  }

  return schedule
    .replace(/-/g, '')
    .split('')
    .map(isAllowedStr => Boolean(Number(isAllowedStr)))
    .map((isAllowed, index) => new Rule(action.title, isAllowed, `h${index.toString().padStart(2, '0')}`));
}

const useScreenRules = generateRules(useScreen, '0000-0001-1111-1111-1111-1000');
const eatRules = generateRules(eat, '0000-0000-1000-0100-0011-0000');
const workRules = generateRules(work, '0000-0111-1111-1111-1110-0000');
const playRules = generateRules(play, '0000-0000-0000-0000-0111-0000');
const browseRules = generateRules(browse, '0000-0000-0000-0000-0111-1000');
const readNewsRules = generateRules(readNews, '0000-0001-0000-1000-0111-0000');
const readPmRules = generateRules(readPm, '0000-0001-0000-1000-0111-1000');

const rules = [
  ...useScreenRules,
  ...eatRules,
  ...workRules,
  ...playRules,
  ...browseRules,
  ...readNewsRules,
  ...readPmRules,
];

export default rules;
