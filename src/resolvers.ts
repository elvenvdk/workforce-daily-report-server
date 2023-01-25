import Agency from "./models/agency.ts";
import Job from "./models/job.ts";
import Worker from "./models/worker.ts";
import WorksiteEmployees from "./models/worksiteEmployees.ts";
import SigninSignout from "./models/signinSignout.ts";
import Checklist from "./models/checklist.ts";
import { sendEmail } from "./aws/emailService.ts"
import { IUserContext } from './types';

type userContext = {
  userToken: string
}

export const resolvers = {
  Query: {
    agency: async (_root: any, { id: agencyId }: any) => await Agency.findOne({ id: agencyId }),

    agencies: async () => await Agency.find(),

    job: async (_root: any, { id: jobId }: any, contextValue: IUserContext) => {
      // if (contextValue.user.role !== "ADMIN") {
      //   throw new Error("Not Authorized");
      // }
      const job = await Job.findById(jobId)
      return job;
    },

    jobs: async () => await Job.find(),

    workers: async () => await Worker.find({ role: "FIELD" }),

    worker: async (_root: any, { id: workerId }: any) => await Worker.findById(workerId),

    worksiteEmployeesList: async () => await WorksiteEmployees.find(),

    worksiteEmployees: async (_root: any, { id: employeeId }: any) => await WorksiteEmployees.findById(employeeId),

    workreportList: async () => await SigninSignout.find(),

    workreport: async (_root: any, { id: workreportId }: any) => await SigninSignout.findById(workreportId)
  },

  Mutation: {

    createAgency: async (_root: any, { input: agencyInput }: any) => {
      const newAgency = await Agency.create(agencyInput);
      return newAgency;
    },

    updateAgency: async (_root: any, { input: updateAgency }: any) => {
      const updatedAgency = await Agency.updateOne(
        {
          _id: updateAgency?.id
        },
        {
          $set: {
            updateAgency
          }
        }
      )
      return updatedAgency;
    },

    createChecklist: async (_root: any, { input: checklistInput }: any) => {
      const newChecklist = await new Checklist(checklistInput);
      await newChecklist.save();
      return newChecklist;
    },

    createSI: async (_root: any, { input: createSIInput }: any) => {
      const newSI = new SigninSignout(createSIInput);
      await newSI.save();
      return newSI;
    },

    updateSI: async (_root: any, { input: updateSIInput }: any) => {
      const updatedSI = await SigninSignout.updateOne(
        {
          _id: updateSIInput.id
        },
        {
          $set: {
            updateSIInput,
          }
        },
      )
      return updatedSI;

    },

    createJob: async (_root: any, { input: jobInput }: any) => {
      await Job.create(jobInput)
    },

    updateJob: async (_root: any, { input: jobInput }: any) =>
      await Job.updateOne(
        {
          _id: jobInput.id,
        },
        {
          $set: jobInput,
        }
      ),

    deleteJob: async (_root: any, { input: id }: any) => await Job.deleteOne({ _id: id }),

    createWorker: async (_root: any, { input: createWorkerInput }: any) => {
      console.log('CREATE WORKER INPUT: ', createWorkerInput)
      const newWorker = await Worker.create(createWorkerInput);
      return newWorker;
    },

    updateWorker: async (_root: any, { input: updateWorkerInput }: any) => {
      await Worker.updateOne(
        {
          _id: updateWorkerInput.id,
        },
        {
          $set: updateWorkerInput,
        }
      )
    },

    createWorksiteEmployees: async (_root: any, { input: employees }: any) => await WorksiteEmployees.create(employees),

    updateWorksiteEmployees: async (_root: any, { input: employeeData }: any) => {
      await WorksiteEmployees.updateOne(
        {
          _id: employeeData.id,
        },
        {
          $set: employeeData,
        }
      )
    },

    createWorkReportEmailTemplate: async (_root: any, { input: emailTemplate }: any) => {
      console.log('EMAIL TEMPLATE: ', emailTemplate);
      const mailRes = await sendEmail(emailTemplate);
      return mailRes;
    }

  },

  Job: {
    agency: async (job: any) => await Agency.findById(job.agencyId),
    siteEmployees: async (job: any) => await WorksiteEmployees.findById(job.worksiteId),
  },

  WorksiteEmployees: {
    employees: async (worksiteData: any) => await Worker.find({ _id: { $in: worksiteData.employees } }),

    job: async (worksiteData: any) => await Job.findById(worksiteData.jobId),

    foreman: async (worksiteData: any) => await Worker.findById(worksiteData.foremanId),
  },

  Worker: {
    // jobs: async (data: any) =>
    //   await WorksiteEmployees.find({
    //     foremanId: data._id,
    //   }),
    jobs: async (data: any) => await WorksiteEmployees.find({
      employees: { _id: data._id }
    })
  },

};
