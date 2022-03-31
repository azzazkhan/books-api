import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';

export class PrismaError extends PrismaClientUnknownRequestError {
  code: string;
}
