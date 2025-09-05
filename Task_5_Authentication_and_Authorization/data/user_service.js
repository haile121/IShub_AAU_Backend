import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10);

export async function countUsers() {
  return User.countDocuments();
}

export async function createUser({ username, password }) {
  if (!username || !password)
    throw Object.assign(new Error("Username and password are required"), {
      status: 400,
    });
  const exists = await User.findOne({ username });
  if (exists)
    throw Object.assign(new Error("Username already taken"), { status: 409 });

  const isFirst = (await countUsers()) === 0;
  const passwordHash = await bcrypt.hash(password, rounds);
  const user = await User.create({
    username,
    passwordHash,
    role: isFirst ? "admin" : "user",
  });
  return user.toJSON();
}

export async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (!user)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)
    throw Object.assign(new Error("Invalid credentials"), { status: 401 });

  const token = jwt.sign(
    { sub: user._id.toString(), username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return { token, user: user.toJSON() };
}

export async function promoteToAdmin(targetUserId) {
  const user = await User.findById(targetUserId);
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  if (user.role === "admin") return user.toJSON();
  user.role = "admin";
  await user.save();
  return user.toJSON();
}
