import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {
  '@/backend/presentation/helpers/http': r('./src/backend/presentation/helpers/http'),
  '@/backend/presentation/errors': r('./src/backend/presentation/errors'),
  '@/backend/data/use-cases/add-account/protocols': r('./src/backend/data/use-cases/add-account/protocols'),
  '@/backend/validation/protocols/email-validator': r('./src/backend/validation/protocols/email-validator'),
  '@/backend/main/factories/controllers/account/signup-controller-factory': r('./src/backend/main/factories/controllers/account/signup-controller-factory'),
  '@/backend/infra/validators/email-validator.adapter': r('./src/backend/infra/validators/email-validator.adapter'),
  '@/backend/data/use-cases/add-account': r('./src/backend/data/use-cases/add-account'),
  '@/backend/presentation/controllers/account-controllers/signup-controller': r('./src/backend/presentation/controllers/account-controllers/signup-controller'),
  '@/backend/infra/crypt/jwt-adapter/jwt-adapter': r('./src/backend/infra/crypt/jwt-adapter/jwt-adapter'),
  '@/backend/main/factories/use-cases/db-add-account-factory': r('./src/backend/main/factories/use-cases/db-add-account-factory'),
  '@/backend/infra/crypt/bcrypt-adapter/bcrypt-adapter': r('./src/backend/infra/crypt/bcrypt-adapter/bcrypt-adapter'),
  '@/backend/infra/db/prisma/repositories/account': r('./src/backend/infra/db/prisma/repositories/account'),
  '@/backend/validation/validators': r('./src/backend/validation/validators'),
  '@/backend/main/factories/use-cases/db-authentication-factory': r('./src/backend/main/factories/use-cases/db-authentication-factory'),
  '@/backend/data/use-cases/authentication': r('./src/backend/data/use-cases/authentication'),
  '@/backend/presentation/controllers/signup-controller': r('./src/backend/presentation/controllers/signup-controller'),
  '@/backend/main/factories/controllers/signup-controller-factory': r('./src/backend/main/factories/controllers/signup-controller-factory'),
  '@/backend/presentation/controllers/login-controller/protocols': r('./src/backend/presentation/controllers/login-controller/protocols'),
  '@/backend/presentation/controllers/login-controller': r('./src/backend/presentation/controllers/login-controller'),
  '@/backend/data/use-cases/authentication/protocols': r('./src/backend/data/use-cases/authentication/protocols'),
  '@/backend/presentation/middlewares/auth-middleware': r('./src/backend/presentation/middlewares/auth-middleware'),
  '@/backend/presentation/middlewares/protocols': r('./src/backend/presentation/middlewares/protocols'),
  '@/backend/data/use-cases/load-account-by-id/protocols': r('./src/backend/data/use-cases/load-account-by-id/protocols'),
  '@/backend/data/use-cases/load-account-by-id': r('./src/backend/data/use-cases/load-account-by-id'),
  '@/backend/presentation/controllers/add-post': r('./src/backend/presentation/controllers/add-post'),
  '@/backend/data/use-cases/add-post': r('./src/backend/data/use-cases/add-post'),
  '@/backend/data/use-cases/load-account-by-token': r('./src/backend/data/use-cases/load-account-by-token')
}