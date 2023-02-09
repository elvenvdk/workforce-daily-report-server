import Agency from "./models/agency.ts";
import Job from "./models/job.ts";
import Worker from "./models/worker.ts";
import WorksiteEmployees from "./models/worksiteEmployees.ts";
import SigninSignout from "./models/signinSignout.ts";
import Checklist from "./models/checklist.ts";
import { sendEmail } from "./aws/emailService.ts"
import { IUserContext } from './types';


export const resolvers = {
  Query: {
    agency: async (_root: any, { id: agencyId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.findOne({ id: agencyId })
    },

    agencies: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.find()
    },

    job: async (_root: any, { id: jobId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const job = await Job.findById(jobId)
      return job;
    },

    jobs: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Job.find()
    },

    workers: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.find({ role: "FIELD" })
    },

    worker: async (_root: any, { id: workerId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.findById(workerId)
    },

    worksiteEmployeesList: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.find()
    },

    worksiteEmployees: async (_root: any, { id: employeeId }: any, contextValue: IUserContext) => {
      // if (!contextValue.userToken) {
      //   throw new Error("Not Authorized");
      // }
      return await WorksiteEmployees.find({ foremanId: employeeId })
    },

    workreportList: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await SigninSignout.find()
    },

    workreport: async (_root: any, { id: workreportId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await SigninSignout.findById(workreportId)
    },

    checklists: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Checklist.find();
    },

    checklist: async (_root: any, { id: checklistId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Checklist.findById(checklistId)
    },
  },

  Mutation: {
    createAgency: async (_root: any, { input: agencyInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newAgency = new Agency(agencyInput);
      await newAgency.save();
      return newAgency;
    },

    updateAgency: async (_root: any, { input: updateAgency }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.updateOne(
        {
          _id: updateAgency.id
        },
        {
          $set: {
            agencyName: updateAgency.agencyName
          }
        }
      )
    },

    deleteAgency: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.deleteOne({ _id: id });
    },

    createChecklist: async (_root: any, { input: checklistInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newChecklist = await new Checklist(checklistInput);
      await newChecklist.save();
      return newChecklist;
    },

    createSI: async (_root: any, { input: createSIInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newSI = new SigninSignout(createSIInput);
      await newSI.save();
      return newSI;
    },

    updateSI: async (_root: any, { input: updateSIInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await SigninSignout.updateOne(
        {
          _id: updateSIInput.id
        },
        {
          $set: {
            updateSIInput,
          }
        },
      )
    },

    createJob: async (_root: any, { input: jobInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newJob = new Job(jobInput)
      await newJob.save();
      return newJob;
    },

    updateJob: async (_root: any, { input: jobInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Job.updateOne(
        {
          _id: jobInput.id,
        },
        {
          $set: jobInput,
        }
      )
    },

    deleteJob: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Job.deleteOne({ _id: id })
    },

    createWorker: async (_root: any, { input: createWorkerInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newWorker = new Worker(createWorkerInput);
      await newWorker.save();
      return newWorker;
    },

    updateWorker: async (_root: any, { input: updateWorkerInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.updateOne(
        {
          _id: updateWorkerInput.id,
        },
        {
          $set: updateWorkerInput,
        }
      )
    },

    deleteWorker: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return Worker.deleteOne({
        _id: id
      })
    },

    createWorksiteEmployees: async (_root: any, { input: employees }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newWorksiteEmployees = new WorksiteEmployees(employees)
      await newWorksiteEmployees.save();
      return newWorksiteEmployees;
    },

    updateWorksiteEmployees: async (_root: any, { input: employeeData }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      await WorksiteEmployees.updateOne(
        {
          _id: employeeData.id,
        },
        {
          $set: employeeData,
        }
      )
    },

    deleteWorksiteEmployees: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.deleteOne({ _id: id })
    },

    createWorkReportEmailTemplate: async (_root: any, { input: emailTemplate }: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const mailRes = await sendEmail(emailTemplate);
      return mailRes;
    }

  },

  Job: {
    agency: async (job: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.findById(job.agencyId)
    },
    siteEmployees: async (job: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.findById(job.worksiteId)
    },
  },

  WorksiteEmployees: {
    employees: async (worksiteData: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.find({ _id: { $in: worksiteData.employees } })
    },

    job: async (worksiteData: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Job.findById(worksiteData.jobId)
    },

    foreman: async (worksiteData: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.findById(worksiteData.foremanId)
    },
  },

  Worker: {
    jobs: async (data: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.find({
        employees: { _id: data._id }
      })
    }
  },

};
