const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.json({ error: "user not logged in" });
  }

  try {
    const validToken = verify(token, "secret");
    req.user = validToken;

    // IF TOKEN IS VALID CONTINUES
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
