// Middleware to expose CSRF token to frontend
const csrfMiddleware = (req, res, next) => {
  // Make CSRF token available in response locals
  res.locals.csrfToken = req.csrfToken();
  
  // Optionally, you can also send it in a custom header
  res.setHeader('X-CSRF-Token', req.csrfToken());
  
  next();
};

module.exports = csrfMiddleware;