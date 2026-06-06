import { hash, verify } from "@node-rs/argon2";

export async function hashAdminPassword(password: string) {
  return hash(password, {
    algorithm: 2,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1
  });
}

export async function verifyAdminPassword(hashValue: string, password: string) {
  return verify(hashValue, password);
}
