module.exports = function clearToken(res, req) {
  const token = req.cookies?.token;

  if (token) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }
};
