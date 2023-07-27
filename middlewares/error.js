import { NOT_FOUND } from "http-status";

/**
 * Error handler.
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };

  res.status(err.status);
  res.json(response);
};
export { handler };

/**
 * Catch 404 and forward to error handler
 */
export function notFound(req, res, next) {
  const err = {
    message: "Not found",
    status: NOT_FOUND,
  };
  return handler(err, req, res);
}
