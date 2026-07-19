import redis from "../../shared/redis/redis.js";

const verifySession = async (req, res, next) => {
  try {
    const session = req.cookies?.session;

    if (!session) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const data = await redis.get(`session-${session}`);

    if (!data) {
      return res.status(401).json({ message: "Session has expired" });
    }

    // req.user = JSON.parse(data);
    req.headers["x-user"] = JSON.stringify(JSON.parse(data));
    next();

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default verifySession;
