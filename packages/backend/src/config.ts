export type Mode = 'production' | 'development'

export enum DeploymentType {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development'
}

export interface Configuration {
  mode?: Mode
  api?: {
    baseUrl?: string
    version?: string
  }
  domainName: string
  database?: {
    debug: boolean
    engine: string
    port: number
    host: string
    database: string
    username: string
    password: string
  }
}

const domainName = 'openstay.dev'

export const customConfig: Configuration = {
  domainName,
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  api: {
    baseUrl:
      process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : `https://${domainName}`,
    version: 'v1'
  }
}

const buildConfig = (): Configuration => {
  const config: Configuration = {
    ...customConfig,
    database: {
      debug: customConfig.mode === 'development',
      engine: process.env.DB_ENGINE as string,
      host: process.env.DB_HOST as string,
      port: Number(process.env.DB_PORT) as number,
      database: process.env.DB_DATABASE as string,
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string
    }
  }

  return config
}

const Config = buildConfig()

export default Config
