import crypto from 'crypto';

export default function generateUniqId(): string {
  const generatedId = crypto.randomBytes(4).toString('HEX');

  return generatedId;
}
