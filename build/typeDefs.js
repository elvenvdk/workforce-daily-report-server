import gql from "graphql-tag";
export const typeDefs = gql `
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
    checklist(id: ID!): Checklist
    checklistCreators: [ChecklistCreator]
    checklistCreator(id: ID!): ChecklistCreator
    foreman(id: ID!): Foreman
    workreportList: [SigninSignout]
    workreport(id: ID!): SigninSignout
    costCodes: [CostCode]
    employeeRates: [EmployeeRates]
    timesheet(id: ID!): Timesheet
    timesheets: [Timesheet]
    jobTimesheets(id: ID!): [Timesheet]
    costSummaries: [CostSummary]
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
    deleteWorksiteEmployees(input: ID!): WorksiteEmployees
    createSI(input: CreateSIInput): SigninSignout
    updateSI(input: UpdateSIInput): SigninSignout
    createChecklist(input: CreateChecklistInput): Checklist
    updateChecklist(input: CreateChecklistInput): Checklist
    createWorkReportEmailTemplate(input: WorkreportEmailTemplateInput): WorkreportEmailTemplate
    createChecklistCreator(input: ChecklistCreatorInput): ChecklistCreator
    createCostCodes(input: CostCodeInput): CostCode
    deleteCostCodes(input: DeleteCostCodesInput): CostCode
    updateCostCode(input: UpdateCostCodeInput): CostCode
    createEmployeeRates(input: EmployeeRatesInput): EmployeeRates
    updateEmployeeRates(input: EmployeeRatesUpdate): EmployeeRates
    deleteJobRates(input: ID!): EmployeeRates
    createTimesheet(input: TimesheetInput): Timesheet
    updateCostSummary(input: CostCodeInput): CostSummary
    createCostSummary(input: CostSummaryInput): CostSummary
  }

  scalar GraphQLJSONObject

  type WorkreportEmailTemplate {
    email: String
  }

  type EmployeeRates {
    id: ID!
    employee: String
    employeeId: String
    stPay: Float
    dtPay: Float
  }

  input EmployeeRatesInput {
    employee: String
    employeeId: String
    stPay: Float
    dtPay: Float
  }

  input EmployeeRatesUpdate {
    employee: String
    employeeId: String
    stPay: Float
    dtPay: Float
  }

  type employeeHrs {
    name: String
    id: String
    laborCode: String
    costCode: String
    regHours: Float
    otHours: Float
    regRate: Float
    otRate: Float
    regWages: Float
    otWages: Float
    workerClass: String
    percentage: Float
    wagesOAndPOT: Float
    wagesOAndPRT: Float
    wagesTotalRT: Float
    wagesTotalOT: Float
    total: Float
    date: Date
  }

  type Timesheet {
    id: ID!
    jobName: String
    jobId: String
    weekEnding: Date
    reportDate: Date
    reportHours: [employeeHrs]
  }

  input employeeHrsInput {
    name: String
    id: String
    laborCode: String
    costCode: String
    regHours: Float
    otHours: Float
    regRate: Float
    otRate: Float
    regWages: Float
    otWages: Float
    workerClass: String
    percentage: Float
    wagesOPOT: Float
    wagesOPRT: Float
    wagesTotalRT: Float
    wagesTotalOT: Float
    total: Float
    date: Date
  }

  input TimesheetInput {
    jobName: String
    jobId: String
    weekEnding: Date
    reportDate: Date
    reportNumber: String
    reportHours: [employeeHrsInput]
  }

  type CostSummary {
    id: ID!
    laborCode: String
    costCode: String
    totalHours: Float
    totalAmount: Float
    jobId: String
    jobDate: Date
  }

  input CostSummaryInput {
    laborCode: String
    costCode: String
    totalHours: Float
    totalAmount: Float
    jobId: String
    jobDate: Date
  }

  input CostSummaryUpdate {
    id: ID!
    laborCode: String
    costCode: String
    totalHours: Float
    totalAmount: Float
    jobId: String
  }

  input WorkreportEmailTemplateInput {
    email: String
  }

  type Agency {
    id: ID
    agencyName: String
  }

  type ChecklistCount {
    count: Int
  }

  type SIWorker {
    id: ID!
    firstName: String
    lastName: String
    middleInitial: String
    last4SSN: String
    class: String
    timeIn: Date
    timeOut: Date
    timeInSignature: String
    timeOutSignature: String
    doubleTime: Float
    regularTime: Float
    notes: String
    costcode: String
    laborcode: String
  }

  type Worker {
    id: ID!
    firstName: String
    lastName: String
    middleInitial: String
    last4SSN: String
    class: String
    jobs: [WorksiteEmployees]
    level: Int
    type: String
    email: String
    role: String
    active: Boolean
    costcode: String
    laborCode: String
    phone: String
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
    docPrefix: String
    percentage: Float
    shouldVerifyId: Boolean
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

  type CostCode {
    id: ID
    budget: Float
    laborCode: String
    costCode: String
    description: String
  }

  input CostCodeInput {
    budget: Float
    laborCode: String
    costCode: String
    description: String
  }

  input UpdateCostCodeInput {
    id: ID!
    budget: Float
    laborCode: String
    costCode: String
    description: String
  }

  input DeleteCostCodesInput {
    id: [String]
  }

  type WorksiteLocation {
    name: String
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
    workLocation: [WorksiteLocation]
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
    titleOfChangeOrder: String
    percentage: Float
  }

  type SIMaterialsDesc {
    qty: Int
    um: String
    unitCost: Float
    totalCost: Float
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

  type TaskKeyValuePair {
    key: String
    value: Task
  }

  type ChecklistCreatorFieldTasks {
    id: Int
    question: String
    answer: String
  }

  type ChecklistCreator {
    id: ID
    type: String
    fieldTasks: [ChecklistCreatorFieldTasks]
  }

  input ChecklistCreatorQuestionsInput {
    id: Int
    question: String
    answer: String
  }

  input ChecklistCreatorInput {
    id: ID
    type: String
    fieldTasks: [ChecklistCreatorQuestionsInput]
  }

  type Checklist {
    id: ID
    agency: Agency
    type: String
    checklistType: String
    fieldTasks: [Task]
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
    remarks: String
    nonconformanceRemarks: String
    additionalRemarks: AdditionalRemarks
    reportNo: String
    specificationsNo: String
    createdAt: Date
    updatedAt: Date
  }

  scalar JSON

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
    # fieldTasks: GraphQLJSONObject
    fieldTasks: [TaskInput]
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
    remarks: String
    nonconformanceRemarks: String
    additionalRemarks: AdditionalRemarksInput
    checklistType: String
    reportNo: String
    specificationsNo: String
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
    date1: Date
    name2: String
    signature2: String
    title2: String
    date2: Date
    name3: String
    signature3: String
    title3: String
    date3: Date
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
    docPrefix: String
    percentage: Float
    shouldVerifyId: Boolean
  }

  input UpdateJobInput {
    id: ID!
    worksiteId: String
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
    docPrefix: String
    percentage: Float
    shouldVerifyId: Boolean
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
    phone: String
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
    doubleTime: Float
    regularTime: Float
    costcode: String
    laborCode: String
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
    costcode: String
  }

  input MaterialsDescInput {
    qty: Int
    um: String
    unitCost: Float
    totalCost: Float
    item: String
    description: String
  }

  input TaskInput {
    details: String
    progress: String
    status: String
    title: String
  }

  input WorksiteLocationInput {
    name: String
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
    workLocation: [WorksiteLocationInput]
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
    docPrefix: String
    titleOfChangeOrder: String
    percentage: Float
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
    workLocation: [WorksiteLocationInput]
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
    CreateSIInput: String
    titleOfChangeOrder: String
    percentage: Float
  }

  input UpdateWorkerInput {
    id: ID!
    firstName: String
    lastName: String
    middleInitial: String
    last4SSN: String
    class: String
    active: Boolean
    costcode: String
    email: String
    phone: String
  }

  scalar Date
`;
