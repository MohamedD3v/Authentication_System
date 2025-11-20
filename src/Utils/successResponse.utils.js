export const successResponse = ({
  res,
  statusCode = 200,
  message = "",
  data = {},
} = {}) => {
  return res.status(statusCode).json({ message, data });
};
