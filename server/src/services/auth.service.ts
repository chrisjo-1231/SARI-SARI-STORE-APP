import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";

import { generateToken } from "../utils/jwt.js";

interface RegisterInput {
  fullname: string;
  email: string;
  password: string;
}

export async function register(data: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      fullname: data.fullname,
      email: data.email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
  };
}


interface LoginInput {
  email: string;
  password: string;
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);
return {
  token,
  user: {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  },
  };
}
