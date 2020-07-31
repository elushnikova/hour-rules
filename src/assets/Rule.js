import Hour from './Hour';
// import Action from './Action';

/**
 * Rule
 * @param {string} action 
 * @param {boolean} isAllowed 
 * @param {Hour} hour
 */
function Rule(action, isAllowed, hour) {
  // if (!(action instanceof Action)) {
  //   throw new TypeError('`action` parameter must be an instance of Action object');
  // }

  if (typeof action !== 'string') {
    throw new TypeError('`action` parameter must be a string')
  }

  if (typeof isAllowed !== 'boolean') {
    throw new TypeError('`isAllowed` parameter must be a boolean')
  }

  if (!Object.prototype.hasOwnProperty.call(Hour, hour)) {
    throw new TypeError('`hour` parameter must be a valid key of Hour object')
  }

  this.action = action;
  this.isAllowed = isAllowed;
  this.hour = hour;
}

export default Rule;
