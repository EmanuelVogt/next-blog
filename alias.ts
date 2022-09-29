import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {
  '@presentation/helpers/http': r('./src/backend/presentation/helpers/http'),
  '@presentation/errors': r('./src/backend/presentation/errors')
}