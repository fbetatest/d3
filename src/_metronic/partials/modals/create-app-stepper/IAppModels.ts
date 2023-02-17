export interface IAppBasic {
  projectName: string
  description: string
}

export type TAppFramework = 'HTML5' | 'ReactJS' | 'Angular' | 'Vue'

export interface IAppDatabase {
  databaseName: string
  databaseSolution: 'MySQL' | 'Firebase' | 'DynamoDB'
}

export type TAppStorage = 'Basic Server' | 'AWS' | 'Google'

export interface ICreateAppData {
  appBasic: IAppBasic
  appFramework: TAppFramework
  appDatabase: IAppDatabase
  appStorage: TAppStorage
}

export const defaultCreateAppData: ICreateAppData = {
  appBasic: {projectName: '', description: ''},
  appFramework: 'HTML5',
  appDatabase: {databaseName: 'db_name', databaseSolution: 'MySQL'},
  appStorage: 'Basic Server',
}

export type StepProps = {
  data: ICreateAppData,
  updateData: (fieldsToUpdate: Partial<ICreateAppData>) => void,
  hasError: boolean
}
