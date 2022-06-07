const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/Users");

// 1) Headers -> { Authorization : "Bearer 12345", cookies , ...}
// 1) Autorization -> "Bearer 12345"
// 2) Split -> ["Bearer", "12345"]
// 3) Index 1 -> 12345
// 4) String -> "12345"
const getToken = (req) => String(req.get("Authorization")).split(" ")[1];

// authorization
function checkAuth(req, res, next) {
  const token = getToken(req);
  if (!token) return res.sendStatus(401);

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    UserModel.findById(id).then((user) => {
      req.user = user;
      next();
    });
  } catch {
    // le token n'est pas bon : malformé, expiré, etc.
    res.sendStatus(403);
  }
}
exports.checkAuth = checkAuth;
