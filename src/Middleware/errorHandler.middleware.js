export const errorHandler = (err, req, res, next) => {
  const statusCode = err.cause || err.statusCode || 500;
  const message = err.message || "Something Broke!!";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
