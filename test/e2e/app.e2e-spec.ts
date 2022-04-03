import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { AppModule } from '../../src/app.module';
import * as pactum from 'pactum';
import { registrationRequest } from 'src/auth/validations';

describe('E2E Route Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const PORT = 8400;

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

    // Set the base URL for application, this will help in writing testing paths
    pactum.request.setBaseUrl(`http://localhost:${PORT}/`);
  });

  // Close the application and the database connection
  afterAll(() => app.close());

  describe('Authentication', () => {
    const data: registrationRequest = {
      name: 'Lorem User',
      email: 'someone@example.com',
      password: 'lorem-password-123',
    };
    describe('Registration', () => {
      it('can register', () => {
        return pactum.spec().post('register').withBody(data).expectStatus(201);
      });

      it('cannot register without name', () => {
        return pactum
          .spec()
          .post('register')
          .withBody({ ...data, name: undefined })
          .expectStatus(400);
      });

      it('cannot register without email', () => {
        return pactum
          .spec()
          .post('register')
          .withBody({ ...data, email: undefined })
          .expectStatus(400);
      });

      it('cannot register without password', () => {
        return pactum
          .spec()
          .post('register')
          .withBody({ ...data, password: undefined })
          .expectStatus(400);
      });

      it('cannot register without credentials', () => {
        return pactum.spec().post('register').expectStatus(400);
      });

      it('cannot register again with same email', () => {
        return pactum.spec().post('register').withBody(data).expectStatus(403);
      });
    });

    describe('Login', () => {
      const { email, password } = data;
      it('can login', () => {
        return pactum
          .spec()
          .post('login')
          .withBody({ email, password })
          .expectStatus(200)
          .stores('token', 'token');
      });

      it('cannot login without email', () => {
        return pactum
          .spec()
          .post('login')
          .withBody({ password })
          .expectStatus(400);
      });

      it('cannot login without password', () => {
        return pactum
          .spec()
          .post('login')
          .withBody({ email })
          .expectStatus(400);
      });

      it('cannot login without credentials', () => {
        return pactum.spec().post('login').expectStatus(400);
      });

      it('cannot login with invalid credentials', () => {
        return pactum
          .spec()
          .post('login')
          .withBody({
            email: 'some-invalid-email-address@example-app.com',
            password: 'some-invalid-password-123',
          })
          .expectStatus(403);
      });
    });
  });

  describe('User operations', () => {
    it('Can fetch own profile', () => {
      return pactum
        .spec()
        .post('user/profile')
        .expectStatus(200)
        .stores('token', 'token');
    });
  });
  // describe('Bookmarks management', () => undefined);
});
