/**
 * Action
 * @param {string} slug 
 * @param {string} title 
 * @param {string | undefined} description
 * @todo Disable special chars except dash in slug
 */
function Action(slug, title, description) {
  if (typeof slug !== 'string') {
    throw new TypeError('`slug` parameter must be a string');
  }

  if (!slug.length) {
    throw new Error('`slug` parameter must not be empty');
  }

  if (typeof title !== 'string') {
    throw new TypeError('`title` parameter must be a string');
  }

  if (!title.length) {
    throw new Error('`title` parameter must not be empty');
  }

  if (typeof description !== 'string' && typeof description !== 'undefined') {
    throw new TypeError('`description` parameter must be a string or undefined');
  }

  this.slug = slug;
  this.title = title;
  this.description = description;
}

export default Action;
