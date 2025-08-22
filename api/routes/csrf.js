const express = require('express');
const router = express.Router();

// Route to get CSRF token
router.get('/token', (req, res) => {
  res.json({ 
    csrfToken: req.csrfToken() 
  });
});

module.exports = router;