import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {
  '@presentation/helpers/http': r('./src/backend/presentation/helpers/http'),
  '@presentation/errors': r('./src/backend/presentation/errors'),
  '@data/use-cases/add-account/protocols': r('./src/backend/data/use-cases/add-account/protocols'),
  '@validation/protocols/email-validator': r('./src/backend/validation/protocols/email-validator'),
  '@main/factories/controllers/account/signup-controller-factory': r('./src/backend/main/factories/controllers/account/signup-controller-factory'),
  '@infra/validators/email-validator.adapter': r('./src/backend/infra/validators/email-validator.adapter'),
  '@data/use-cases/add-account': r('./src/backend/data/use-cases/add-account'),
  '@presentation/controllers/account-controllers/signup-controller': r('./src/backend/presentation/controllers/account-controllers/signup-controller'),
  '@infra/crypt/jwt-adapter/jwt-adapter': r('./src/backend/infra/crypt/jwt-adapter/jwt-adapter'),
  '@main/factories/use-cases/db-add-account-factory': r('./src/backend/main/factories/use-cases/db-add-account-factory'),
  '@infra/crypt/bcrypt-adapter/bcrypt-adapter': r('./src/backend/infra/crypt/bcrypt-adapter/bcrypt-adapter'),
  '@infra/db/prisma/repositories/account': r('./src/backend/infra/db/prisma/repositories/account'),
  '@validation/validators': r('./src/backend/validation/validators'),
  '@main/factories/use-cases/db-authentication-factory': r('./src/backend/main/factories/use-cases/db-authentication-factory'),
  '@data/use-cases/authentication': r('./src/backend/data/use-cases/authentication'),
  '@presentation/controllers/signup-controller': r('./src/backend/presentation/controllers/signup-controller'),
  '@main/factories/controllers/signup-controller-factory': r('./src/backend/main/factories/controllers/signup-controller-factory'),
  '@presentation/controllers/login-controller/protocols': r('./src/backend/presentation/controllers/login-controller/protocols'),
  '@presentation/controllers/login-controller': r('./src/backend/presentation/controllers/login-controller'),
  '@data/use-cases/authentication/protocols': r('./src/backend/data/use-cases/authentication/protocols'),
  '@presentation/middlewares/auth-middleware': r('./src/backend/presentation/middlewares/auth-middleware'),
  '@presentation/middlewares/protocols': r('./src/backend/presentation/middlewares/protocols'),
  '@data/use-cases/load-account-by-id/protocols': r('./src/backend/data/use-cases/load-account-by-id/protocols'),
  '@data/use-cases/load-account-by-id': r('./src/backend/data/use-cases/load-account-by-id'),
  '@presentation/controllers/add-post': r('./src/backend/presentation/controllers/add-post')
}