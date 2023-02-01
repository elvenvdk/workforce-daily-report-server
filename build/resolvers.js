import Agency from "./models/agency.ts";
import Job from "./models/job.ts";
import Worker from "./models/worker.ts";
import WorksiteEmployees from "./models/worksiteEmployees.ts";
import SigninSignout from "./models/signinSignout.ts";
import Checklist from "./models/checklist.ts";
import { sendEmail } from "./aws/emailService.ts";
export const resolvers = {
    Query: {
        agency: async (_root, { id: agencyId }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Agency.findOne({ id: agencyId });
        },
        agencies: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Agency.find();
        },
        job: async (_root, { id: jobId }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const job = await Job.findById(jobId);
            return job;
        },
        jobs: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Job.find();
        },
        workers: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Worker.find({ role: "FIELD" });
        },
        worker: async (_root, { id: workerId }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Worker.findById(workerId);
        },
        worksiteEmployeesList: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await WorksiteEmployees.find();
        },
        worksiteEmployees: async (_root, { id: employeeId }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await WorksiteEmployees.findById(employeeId);
        },
        workreportList: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await SigninSignout.find();
        },
        workreport: async (_root, { id: workreportId }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await SigninSignout.findById(workreportId);
        },
    },
    Mutation: {
        createAgency: async (_root, { input: agencyInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newAgency = await Agency.create(agencyInput);
            return newAgency;
        },
        updateAgency: async (_root, { input: updateAgency }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const updatedAgency = await Agency.updateOne({
                _id: updateAgency?.id
            }, {
                $set: {
                    updateAgency
                }
            });
            return updatedAgency;
        },
        deleteAgency: async (_root, { input: id }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const removedAgency = await Agency.deleteOne({ _id: id });
            return removedAgency;
        },
        createChecklist: async (_root, { input: checklistInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newChecklist = await new Checklist(checklistInput);
            await newChecklist.save();
            return newChecklist;
        },
        createSI: async (_root, { input: createSIInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newSI = new SigninSignout(createSIInput);
            await newSI.save();
            return newSI;
        },
        updateSI: async (_root, { input: updateSIInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const updatedSI = await SigninSignout.updateOne({
                _id: updateSIInput.id
            }, {
                $set: {
                    updateSIInput,
                }
            });
            return updatedSI;
        },
        createJob: async (_root, { input: jobInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Job.create(jobInput);
        },
        updateJob: async (_root, { input: jobInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Job.updateOne({
                _id: jobInput.id,
            }, {
                $set: jobInput,
            });
        },
        deleteJob: async (_root, { input: id }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Job.deleteOne({ _id: id });
        },
        createWorker: async (_root, { input: createWorkerInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newWorker = await Worker.create(createWorkerInput);
            return newWorker;
        },
        updateWorker: async (_root, { input: updateWorkerInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Worker.updateOne({
                _id: updateWorkerInput.id,
            }, {
                $set: updateWorkerInput,
            });
        },
        createWorksiteEmployees: async (_root, { input: employees }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            await WorksiteEmployees.create(employees);
        },
        updateWorksiteEmployees: async (_root, { input: employeeData }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            await WorksiteEmployees.updateOne({
                _id: employeeData.id,
            }, {
                $set: employeeData,
            });
        },
        createWorkReportEmailTemplate: async (_root, { input: emailTemplate }, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const mailRes = await sendEmail(emailTemplate);
            return mailRes;
        }
    },
    Job: {
        agency: async (job, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Agency.findById(job.agencyId);
        },
        siteEmployees: async (job, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await WorksiteEmployees.findById(job.worksiteId);
        },
    },
    WorksiteEmployees: {
        employees: async (worksiteData, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Worker.find({ _id: { $in: worksiteData.employees } });
        },
        job: async (worksiteData, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Job.findById(worksiteData.jobId);
        },
        foreman: async (worksiteData, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Worker.findById(worksiteData.foremanId);
        },
    },
    Worker: {
        jobs: async (data, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await WorksiteEmployees.find({
                employees: { _id: data._id }
            });
        }
    },
};
