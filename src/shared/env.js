import { pick, isUndefined } from 'lodash';

const eventToEnvironment = (event) => {
  switch (event) {
    case 'prod':
      return 'production';
    case 'dev':
      return 'development';
    default:
      return 'development';
  }
};

const isNode = () => isUndefined(process.browser);

const env = isNode() ?
  eventToEnvironment(process.env.npm_lifecycle_event || 'dev')
    : (window.__NODE_ENV__ || 'production');

if (isNode()) {
  process.env.NODE_ENV = env;
}

const getCOnfig = () => {
  let config = false;

  /* #if node */
  config = isNode() ? require(`../server/config/${env}`).default : { ...window.__CONFIG__ };
  /* #end */

  config = config || { ...window.__CONFIG__ };

  return config;
};

export default env;

export const config = getCOnfig();

export function filter(config) {
  return pick(config, ['apiUrl']);
}
