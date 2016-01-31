import logger from '../utils/logger';

export default async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err);

    ctx.body = err.message;
    ctx.status = err.status || 500;
  }
};
