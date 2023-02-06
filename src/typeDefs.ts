import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    agencies: [Agency]
    agency(id: ID!): Agency
    jobs: [Job]
    job(id: ID!): Job
    worksiteEmployeesList: [WorksiteEmployees]
    worksiteEmployees(id: ID!): [WorksiteEmployees]
    worker(id: ID!): Worker
    workers: [Worker]
    checklists: [Checklist]
    foreman(id: ID!): Foreman
    workreportList: [SigninSignout]
    workreport(id: ID!): SigninSignout
  }

  type Mutation {
    createAgency(input: CreateAgencyInput!): Agency
    updateAgency(input: UpdateAgencyInput!): Agency
    deleteAgency(input: ID!): Agency
    createJob(input: CreateJobInput!): Job
    updateJob(input: UpdateJobInput!): Job
    deleteJob(input: ID!): Job
    createWorker(input: CreateWorkerInput): Worker
    updateWorker(input: UpdateWorkerInput): Worker
    deleteWorker(input: ID!): Worker
    createWorksiteEmployees(input: CreateWorksiteEmployeesInput): WorksiteEmployees
    updateWorksiteEmployees(input: UpdateWorksiteEmployeesInput): WorksiteEmployees
    createSI(input: CreateSIInput): SigninSignout
    updateSI(input: UpdateSIInput): SigninSignout
    createChecklist(input: CreateChecklistInput): Checklist
    createWorkReportEmailTemplate(input: WorkreportEmailTemplateInput): WorkreportEmailTemplate
  }

  scalar GraphQLJSONObject

  type WorkreportEmailTemplate {
    email: String
  }

  input WorkreportEmailTemplateInput {
    email: String
  }

  type Agency {
    id: ID!
    agencyName: String
  }


  type ChecklistCount {
    count: Int
  }

  type SIWorker {
    id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    last4SSN: String!
    class: String!
    timeIn: Date
    timeOut: Date
    timeInSignature: String
    timeOutSignature: String
    doubleTime: Int
    regularTime: Int
  }

  type Worker {
    id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    last4SSN: String
    class: String
    jobs: [WorksiteEmployees]
    level: Int
    type: String
    email: String
    role: String
    active: Boolean
  }

  type Job {
    id: ID
    jobName: String
    location: String
    contractNo: String
    contractStartDate: Date
    agency: Agency
    laborTicketAbv: String
    contractorRep: ContractorRep
    projectMgr: ProjectMgr
    siteEmployees: WorksiteEmployees
    startDate: Date
    taskCompletionDate: Date
    active: Boolean
  }

  type WorksiteEmployees {
    id: ID
    employees: [Worker]
    foreman: Worker
    job: Job
    jobId: String
    foremanId: String
  }

  type Foreman {
    id: ID
    self: Worker
    worksites: [WorksiteEmployees]
  }

  type WorkType {
    id: ID!
    typeContract: String
    typeChangeOrder: String
    typeTandM: String
    typeExtraWork: String
  }

  type SigninSignout {
    id: ID!
    agency: Agency
    contractNo: String
    shift: String
    contractStartDate: Date
    startDate: Date
    taskCompletionDate: Date
    jobName: String
    location: String
    workType: String
    siteEmployees: [SIWorker]
    foreman: String
    projectMgr: String
    agencyRep: String
    contractorRep: String
    foremanSignature: String
    projectMgrSignature: String
    agencyRepSignature: String
    contractorRepSignature: String
    signatureDate: Date
    temperature: Float
    forcast: String
    tasks: [SITask]
    incidentReport: String
    incidentReportText: String
    remarks: String
    materialsDesc: [SIMaterialsDesc]
    workDescription: String
    createdAt: Date
    updatedAt: Date
    canRecall: Boolean
    hasBeenRecalled: Boolean
    reportNo: String
  }

  type SIMaterialsDesc {
    qty: String
    item: String
    description: String
  }

  type SITask {
    details: String
    progress: String
    status: String
    title: String
  }

  type ContractorRep {
    id: ID!
    firstName: String!
    lastName: String!
    signature: String
    job: Job
  }

  type ProjectMgr {
    id: ID!
    firstName: String!
    lastName: String!
    signature: String
    job: Job
  }

  type Task {
    id: Int
    question: String
    answer: String
  }

  type Checklist {
    id: ID
    agency: Agency
    type: String
    fieldTasks: Task
    contractNo: String
    description: String
    contractor: String
    sub_contractor: String
    location: String
    date: Date
    preparedBy: String
    datePrepared: String
    inspectorName: String
    surveillanceReport: String
    drawing: String
    additionalRemarks: AdditionalRemarks
    reportNo: String
  }

  type AdditionalRemarks {
    text: String
    name1: String
    signature1: String
    title1: String
    date1: String
    name2: String
    signature2: String
    title2: String
    date2: String
    name3: String
    signature3: String
    title3: String
    date3: String
  }

  input AgencyInput {
    id: ID
    agencyName: String
  }

  input CreateChecklistInput {
    id: ID
    agency: AgencyInput
    type: String
    fieldTasks: GraphQLJSONObject
    contractNo: String
    description: String
    contractor: String
    sub_contractor: String
    location: String
    date: Date
    preparedBy: String
    datePrepared: String
    inspectorName: String
    surveillanceReport: String
    drawing: String
    additionalRemarks: AdditionalRemarksInput
    checklistType: String
    reportNo: String
  }

  input TaskInput {
    id: Int
    question: String
    answer: String
  }

  input AdditionalRemarksInput {
    text: String
    name1: String
    signature1: String
    title1: String
    date1: String
    name2: String
    signature2: String
    title2: String
    date2: String
    name3: String
    signature3: String
    title3: String
    date3: String
  }

  input CreateAgencyInput {
    agencyName: String!
  }

  input UpdateAgencyInput {
    id: ID!
    agencyName: String!
  }

  input CreateJobInput {
    jobName: String!
    location: String
    contractNo: String
    contractStartDate: Date
    agencyId: String
    laborTicketAbv: String
    contractorRepId: String
    projectMgrId: String
    startDate: Date
    taskCompletionDate: Date
    active: Boolean
  }

  input UpdateJobInput {
    id: ID!
    jobName: String
    location: String
    contractNo: String
    contractStartDate: Date
    agencyId: String
    laborTicketAbv: String
    contractorRepId: String
    projectMgrId: String
    startDate: Date
    taskCompletionDate: Date
    active: Boolean
  }

  input CreateWorksiteEmployeesInput {
    employees: [String]
    foremanId: String
    jobId: String
  }

  input UpdateWorksiteEmployeesInput {
    id: ID!
    employees: [String]
    foremanId: String
    jobId: String
  }

  input CreateWorkerInput {
    firstName: String
    lastName: String
    middleInitial: String
    last4SSN: String
    class: String
    level: Int
    role: String
    email: String
    active: Boolean
  }

  input SIWorkerInput {
    id: ID
    firstName: String
    lastName: String
    class: String
    middleInitial: String
    last4SSN: String
    timeIn: Date
    timeOut: Date
    timeInSignature: String
    timeOutSignature: String
    imageCapture: String
    notes: String
    doubleTime: Int
    regularTime: Int
  }

  input UpdateSIWorker {
    id: ID!
    firstName: String
    lastName: String
    middleInitial: String
    last4SSN: String
    class: String
    timeIn: Date
    timeOut: Date
  }

  input MaterialsDescInput {
    qty: String
    item: String
    description: String
  }

  input TaskInput {
    details: String
    progress: String
    status: String
    title: String
  }

  # input SiteEmployeesInput {
  #   employees: [SIWorkerInput]
  # }

  input CreateSIInput {
    agency: AgencyInput
    contractNo: String
    shift: String
    contractStartDate: Date
    startDate: Date
    taskCompletionDate: Date
    laborTicketAbv: String
    jobName: String
    location: String
    workType: String
    workDescription: String
    incidentReport: String
    incidentReportText: String
    remarks: String
    siteEmployees: [SIWorkerInput]
    materialsDesc: [MaterialsDescInput]
    foreman: String
    projectMgr: String
    agencyRep: String
    contractorRep: String
    foremanSignature: String
    projectMgrSignature: String
    agencyRepSignature: String
    contractorRepSignature: String
    signatureDate: Date
    temperature: Float
    forcast: String
    tasks: [TaskInput]
    canRecall: Boolean
    hasBeenRecalled: Boolean
    reportNo: String
  }

  input UpdateSIInput {
    id: ID!
    agency: AgencyInput
    contractNo: String
    shift: String
    contractStartDate: Date
    startDate: Date
    taskCompletionDate: Date
    laborTicketAbv: String
    jobName: String
    location: String
    workType: String
    workDescription: String
    incidentReport: String
    incidentReportText: String
    remarks: String
    siteEmployees: [SIWorkerInput]
    materialsDesc: [MaterialsDescInput]
    foreman: String
    projectMgr: String
    agencyRep: String
    contractorRep: String
    foremanSignature: String
    projectMgrSignature: String
    agencyRepSignature: String
    contractorRepSignature: String
    signatureDate: Date
    temperature: Float
    forcast: String
    tasks: [TaskInput]
    canRecall: Boolean
    hasBeenRecalled: Boolean
    reportNo: String
  }

  input UpdateWorkerInput {
    id: ID!
    firstName: String
    lastName: String
    middleInitial: String
    last4SSN: String
    class: String
    active: Boolean
  }

  scalar Date
`;
