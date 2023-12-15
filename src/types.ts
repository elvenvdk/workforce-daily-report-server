import { Types } from 'mongoose';

import * as Express from 'express';
import { Send } from 'express-serve-static-core';

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}
export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

export interface IUserContext {
  userToken?: string;
  userRole: string;
}

export interface IUserContextUser {
  firstName: string;
  lastName: string;
  middleInitial: string;
  class: string;
  level: number;
  role: string;
  email: string;
}

export type RegisterUserType = {
  userName: string;
  password: string;
  user: string;

}

export type EmailChecklistType = {
  email: string;
  recipient: string;
  attachment: any;
  emailBody: string;
}

export type EmailChecklistLinkType = {
  email: string;
  recipient: string;
  attachment: string;
  emailBody: string;
  link: URL
}

export type RegisterUserResponseType = {
  msg?: string;
  data?: object;
}

export interface IAuth {
  userName: string;
  password: string;
  user: Types.ObjectId;
  active: boolean;
  userToken: string;
  level: string;
  type: string;
}

export interface IWorker {
  firstName: string;
  lastName: string;
  middleInitial: string;
  last4SSN: string;
  class: string;
  userToken: string | null;
  authorization: Types.ObjectId;
  level: number;
  role: string;
  email: string;
  active: boolean
}

export interface IWorkType {
  typeContract: string;
  typeChangeOrder: string;
  typeTandM: string;
  typeExtraWork: string;
}

export interface IWorksiteEmployees {
  employees: WorkerType[];
  foremanId: Types.ObjectId;
  jobId: Types.ObjectId;
}

export type WorkerType = Types.ObjectId;

export interface ISiteEmployee {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  middleInitial: string;
  last4SSN: string;
  timeIn: Date;
  timeOut: Date;
  timeInSignature: string;
  timeOutSignature: string;
  imageCapture: string;
  notes: string;
  doubleTime: number;
  regularTime: number;
  doubletimeSignature: string;
  costcode: string
}

export type MaterialsType = {
  qty: number;
  um: string;
  unitCost: number;
  totalCost: number;
  item: string;
  description: string;
};


// export interface ISiteEmployees {
//   employees: ISiteEmployee[];
// }

export interface IAgency {
  id: string;
  agencyName: string;
}

export type TaskType = {
  details: string;
  progress: string;
  status: string;
  title: string;
}

export type WorksiteLocation = {
  name: string;
}

export interface ISigninSignout {
  agency: IAgency;
  contractNo: string;
  shift: string;
  contractStartDate: Date;
  startDate: Date;
  taskCompletionDate: Date;
  laborTicketAvb: string;
  jobName: string;
  location: string;
  workLocation: WorksiteLocation[];
  workType: string;
  workDescription: string;
  incidentReport: string;
  incidentReportText: string;
  remarks: string;
  siteEmployees: ISiteEmployee[];
  materialsDesc: MaterialsType[];
  foreman: string;
  projectMgr: string;
  agencyRep: string;
  contractorRep: string;
  foremanSignature: string;
  projectMgrSignature: string;
  agencyRepSignature: string;
  contractorRepSignature: string;
  signatureDate: Date;
  temperature: number;
  forcast: string;
  tasks: TaskType[];
  createdAt: Date;
  updatedAt: Date;
  canRecall: boolean
  hasBeenRecalled: boolean
  reportNo: string
  titleOfChangeOrder: string
}

export interface IProjectMgr {
  firstName: string;
  lastName: string;
  signature: string;
  job: Types.ObjectId;
}

export interface IJob {
  jobName: string;
  location: string;
  contractNo: string;
  contractStartDate: Date;
  agencyId: Types.ObjectId;
  laborTicketAbv: string;
  contractorRepId: Types.ObjectId;
  projectMgrId: Types.ObjectId;
  worksiteId: Types.ObjectId;
  startDate: Date;
  taskCompletionDate: Date;
  active: boolean;
  docPrefix: string;
}

export interface IContractRep {
  firstName: string;
  lastName: string;
  signature: string;
  jobId: Types.ObjectId;
}

export type ChecklistTaskType = {
  id: number;
  question: string;
  answer: string
}

export interface ITasks {
  [key: string]: ChecklistTaskType;
}

export interface IChecklist {
  type: string;
  checklistType: string;
  agency: IAgency;
  location: string;
  fieldTasks: ITasks;
  contractNo: string;
  description: string;
  contractor: string;
  sub_contractor: string;
  locationOfWork: string;
  date: Date;
  preparedBy: string;
  datePrepared: string;
  inspectorName: string;
  surveillanceReport: string;
  drawing: string;
  reportNo: string
  specificationsNo: string
  remarks: string
  nonconformanceRemarks: string

  additionalRemarks: {
    text: string;
    name1: string;
    signature1: string;
    title1: string;
    date1: Date;
    name2: string;
    signature2: string;
    title2: string;
    date2: Date;
    name3: string;
    signature3: string;
    title3: string;
    date3: Date;
  },
}

export type ChecklistQuestion = {
  id: number;
  question: string;
  answer: string;
}

export interface IChecklistCreator {
  type: string;
  fieldTasks: ChecklistQuestion
}

export interface ICostCodes {
  laborCode: string;
  costCode: string;
  description: string;
}

export type employeeRate = {
  employee: string;
  stPay: number;
  dtPay: number;
}

export interface IEmployeeRates {
  jobName: string;
  jobId: Types.ObjectId;
  date: Date;
  employeeRates: employeeRate[]
}


