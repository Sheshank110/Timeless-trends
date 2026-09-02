import { ApiError } from '../utils/ApiError.js';

/**
 * Validate request body/params/query using a Zod schema.
 * @param {import('zod').ZodSchema} schema
 * @param {'body' | 'params' | 'query'} source
 */
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const messages = result.error.errors.map(
        (e) => `${e.path.join('.')}: ${e.message}`
      );
      throw new ApiError(400, `Validation failed: ${messages.join('. ')}`);
    }

    // Replace with parsed/transformed data
    req[source] = result.data;
    next();
  };
};
