import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { registrationRequest } from 'src/auth/validations';

describe('e2e tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const PORT = 8400;
  const url = (path: string) => `http://localhost:${PORT}/${path}`;

  // Bootstrap the application and clean the database
  beforeAll(async () => {
    // Only get required modules for testing and compile them
    const refModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = refModule.createNestApplication();
    // Use the validations similar in production app
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
      }),
    );
    await app.init(); // Initialize the application
    await app.listen(8400); // Listen on custom port

    // Retrieve the prisma service from the application
    prisma = app.get(PrismaService);
    await prisma.cleanDatabase(); // Truncate all tables
  });

  // Close the application and the database connection
  afterAll(() => app.close());

  describe('Authentication', () => {
    it('can register', () => {
      const data: registrationRequest = {
        name: 'Lorem User',
        email: 'someone@example.com',
        password: 'lorem-password-123',
      };

      return pactum
        .spec()
        .post(url('register'))
        .withBody(data)
        .expectStatus(201)
        .inspect();
    });
  });
  // describe('User operations', () => undefined);
  // describe('Bookmarks management', () => undefined);
});
