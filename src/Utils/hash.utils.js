import bcrypt from "bcryptjs";

export const generateHashing = async ({
  plaintext = "",
  saltRound = +process.env.SALT_ROUND,
} = {}) => {
  return await bcrypt.hash(plaintext, saltRound);
};

export const compareHashing = async ({
  plaintext = "",
  hashValue = "",
} = {}) => {
  return await bcrypt.compare(plaintext, hashValue);
};
