import Agency from "./models/agency.ts";
import Job from "./models/job.ts";
import Worker from "./models/worker.ts";
import WorksiteEmployees from "./models/worksiteEmployees.ts";
import SigninSignout from "./models/signinSignout.ts";
import Checklist from "./models/checklist.ts";
export const resolvers = {
    Query: {
        agency: async (_root, { id: agencyId }) => await Agency.findOne({ id: agencyId }),
        agencies: async () => await Agency.find(),
        job: async (_root, { id: jobId }) => await Job.findById(jobId),
        jobs: async () => await Job.find(),
        workers: async () => await Worker.find(),
        worker: async (_root, { id: workerId }) => await Worker.findById(workerId),
        worksiteEmployeesList: async () => await WorksiteEmployees.find(),
        worksiteEmployees: async (_root, { id: employeeId }) => await WorksiteEmployees.findById(employeeId),
    },
    Mutation: {
        createAgency: async (_root, { input: agencyInput }) => {
            const newAgency = await Agency.create(agencyInput);
            return newAgency;
        },
        updateAgency: async (_root, { input: updateAgency }) => {
            const updatedAgency = await Agency.updateOne({
                _id: updateAgency?.id
            }, {
                $set: {
                    agencyName: updateAgency?.agencyName
                }
            });
            console.log('UPDATED AGENCY: ', updatedAgency);
            return updatedAgency;
        },
        createChecklist: async (_root, { input: checklistInput }) => {
            console.log('CHECKLIST INPUT: ', checklistInput);
            const newChecklist = await new Checklist(checklistInput);
            await newChecklist.save();
            console.log('NEW CHECKLIST: ', newChecklist);
            return newChecklist;
        },
        createSI: async (_root, { input: createSIInput }) => {
            console.log(createSIInput);
            const newSI = new SigninSignout(createSIInput);
            await newSI.save();
            console.log(newSI);
            return newSI;
        },
        updateSI: async (_root, { input: updateSIInput }) => {
            const updatedSI = await SigninSignout.updateOne({
                _id: updateSIInput.id
            }, {
                $set: {
                    updateSIInput,
                }
            });
            console.log(updatedSI);
            return updateSIInput;
        },
        createJob: async (_root, { input: jobInput }) => await Job.create(jobInput),
        updateJob: async (_root, { input: jobInput }) => await Job.updateOne({
            _id: jobInput.id,
        }, {
            $set: jobInput,
        }),
        deleteJob: async (_root, { input: id }) => await Job.deleteOne({ _id: id }),
        createWorker: async (_root, { input: createWorkerInput }) => {
            const newWorker = await Worker.create(createWorkerInput);
            return newWorker;
        },
        updateWorker: async (_root, { input: updateWorkerInput }) => await Worker.updateOne({
            _id: updateWorkerInput.id,
        }, {
            $set: updateWorkerInput,
        }),
        createWorksiteEmployees: async (_root, { input: employees }) => await WorksiteEmployees.create(employees),
        updateWorksiteEmployees: async (_root, { input: employeeData }) => await WorksiteEmployees.updateOne({
            _id: employeeData.id,
        }, {
            $set: employeeData,
        }),
    },
    Job: {
        agency: async (job) => await Agency.findById(job.agencyId.toString()),
        siteEmployees: async (job) => await WorksiteEmployees.findById(job.worksiteId),
    },
    WorksiteEmployees: {
        employees: async (worksiteData) => await Worker.find({ _id: { $in: worksiteData.employees } }),
        job: async (worksiteData) => await Job.findById(worksiteData.jobId),
        foreman: async (worksiteData) => await Worker.findById(worksiteData.foremanId),
    },
    Worker: {
        // jobs: async (data: any) =>
        //   await WorksiteEmployees.find({
        //     foremanId: data._id,
        //   }),
        jobs: async (data) => await WorksiteEmployees.find({
            employees: { _id: data._id }
        })
    },
};
