import Agency from "./models/agency.ts";
import Job from "./models/job.ts";
import Worker from "./models/worker.ts";
import WorksiteEmployees from "./models/worksiteEmployees.ts";
import SigninSignout from "./models/signinSignout.ts";
import Checklist from "./models/checklist.ts";
import CostCodes from "./models/costcodes.ts";
import Timesheet from "./models/timesheet.ts";
import EmployeeRates from "./models/employeeRates.ts";
import ChecklistCreator from "./models/checklistCreator.ts";
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
            return await WorksiteEmployees.find({ foremanId: employeeId });
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
        checklists: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Checklist.find();
        },
        checklist: async (_root, { id: checklistId }, contextValue) => {
            // if (!contextValue.userToken) {
            //   throw new Error("Not Authorized");
            // }
            return await Checklist.findById(checklistId);
        },
        checklistCreators: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await ChecklistCreator.find();
        },
        checklistCreator: async (_root, { id: checklistCreatorId }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await ChecklistCreator.findById(checklistCreatorId);
        },
        costCodes: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await CostCodes.find();
        },
        employeeRates: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const rates = await EmployeeRates.find();
            return await rates;
        },
        timesheets: async (_root, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Timesheet.find();
        },
        jobTimesheets: async (_root, { id: jobId }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const jobs = await Timesheet.find({ jobId });
            console.log("JOBS: ", jobs);
            return jobs;
        },
        costSummaries: async (_root, args, contextValue) => {
            let summaries = [];
            let tempTimesheets = [];
            let tempLaborCodes = [];
            let start, end, count = 0;
            let timesheets = await Timesheet.find({ jobId: "657b2c4a4ac907edbadd0a6e" });
            if (timesheets) {
                tempTimesheets = [...timesheets];
                for (let i = 0; i < tempTimesheets.length; i++) {
                    const hours = tempTimesheets[i].reportHours.reduce((acc, val) => acc + (val.wagesTotalRT + val.wagesTotalOT), 0);
                    console.log("TIMESHEET HOURS: ", hours);
                    for (let j = 0; j < tempTimesheets[i].reportHours.length; j++) {
                        // console.log("REPORT HOURS: ", tempTimesheets[i].reportHours);
                    }
                }
            }
            const arr1 = [
                { id: 11, num: 1 },
                { id: 11, num: 2 },
                { id: 11, num: 3 },
                { id: 12, num: 4 },
                { id: 12, num: 5 },
                { id: 12, num: 6 },
                { id: 13, num: 7 },
                { id: 13, num: 8 },
                { id: 14, num: 9 },
                { id: 14, num: 10 },
            ];
            const removeDupes = arr1.reduce((acc, val) => {
                if (acc.indexOf(val.id) < 0)
                    acc.push(val.id);
                return acc;
            }, []);
            const initVal = 0;
            const arrSum = arr1.reduce((a, b) => a + b.num, initVal);
            console.log("REMOVE DUPES: ", removeDupes, "SUM: ", arrSum);
        },
    },
    Mutation: {
        createAgency: async (_root, { input: agencyInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newAgency = new Agency(agencyInput);
            await newAgency.save();
            return newAgency;
        },
        createEmployeeRates: async (_root, { input: EmployeeRatesInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const existingRates = await EmployeeRates.findOne({
                employeeId: EmployeeRatesInput.employeeId,
            });
            if (existingRates) {
                throw new Error("Employee already exists");
            }
            else {
                const newRates = new EmployeeRates(EmployeeRatesInput);
                await newRates.save();
                return newRates;
            }
        },
        updateEmployeeRates: async (_root, { input: EmployeeRatesUpdate }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const updatedRates = await EmployeeRates.updateOne({
                _id: EmployeeRatesUpdate.id,
            }, {
                $set: {
                    employee: EmployeeRatesUpdate.employee,
                    employeeId: EmployeeRatesUpdate.employeeId,
                    stPay: EmployeeRatesUpdate.stPay,
                    dtPay: EmployeeRatesUpdate.dtPay,
                },
            });
            return updatedRates;
        },
        deleteJobRates: async (_root, { input: id }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const deletedJobRates = await EmployeeRates.deleteOne({ _id: id });
            return deletedJobRates;
        },
        createTimesheet: async (_root, { input: TimesheetInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newTimesheet = new Timesheet(TimesheetInput);
            return await newTimesheet.save();
        },
        createCostCodes: async (_root, { input: CostCodeInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newCostCode = new CostCodes(CostCodeInput);
            await newCostCode.save();
            return newCostCode;
        },
        updateCostCode: async (_root, { input: UpdateCostCodeInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            await CostCodes.updateOne({
                _id: UpdateCostCodeInput.id,
            }, {
                $set: {
                    budget: UpdateCostCodeInput.budget,
                    laborCode: UpdateCostCodeInput.laborCode,
                    costCode: UpdateCostCodeInput.costCode,
                    description: UpdateCostCodeInput.description,
                },
            });
        },
        deleteCostCodes: async (_root, { input: DeleteCostCodesInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await CostCodes.deleteMany({ _id: { $in: [...DeleteCostCodesInput.id] } });
        },
        updateAgency: async (_root, { input: updateAgency }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Agency.updateOne({
                _id: updateAgency.id,
            }, {
                $set: {
                    agencyName: updateAgency.agencyName,
                },
            });
        },
        deleteAgency: async (_root, { input: id }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await Agency.deleteOne({ _id: id });
        },
        createChecklist: async (_root, { input: checklistInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newChecklist = await new Checklist(checklistInput);
            await newChecklist.save();
            return newChecklist;
        },
        createChecklistCreator: async (_root, { input: ChecklistCreatorInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newChecklistCreator = await new ChecklistCreator(ChecklistCreatorInput);
            await newChecklistCreator.save();
            return newChecklistCreator;
        },
        updateChecklist: async (_root, { input: CreateChecklistInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            let updatedSIWR = await Checklist.updateOne({
                _id: CreateChecklistInput.id,
            }, {
                $set: {
                    fieldTasks: CreateChecklistInput.fieldTasks,
                },
            });
            return updatedSIWR;
        },
        createSI: async (_root, { input: createSIInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const job = await Job.findOne({
                jobName: createSIInput.jobName,
            });
            const employeeJobRates = await EmployeeRates.find();
            const employeeRatesArr = employeeJobRates;
            const percentage = createSIInput.percentage / 100;
            console.log("EMPLOYEE RATES: ", employeeJobRates);
            const workerHrsArr = [];
            createSIInput.siteEmployees.forEach(async (employee) => {
                const empRates = employeeRatesArr?.find((emp) => emp.employee === `${employee.firstName} ${employee.lastName}`);
                const employeeRT = employee?.regularTime;
                const employeeDT = employee?.doubleTime;
                const regRate = empRates?.stPay;
                const otRate = empRates?.dtPay;
                const regWages = employeeRT * regRate;
                const otWages = otRate ? employeeDT * otRate : 0;
                const wagesOAndPRT = regWages * percentage;
                const wagesOAndPOT = otWages * percentage;
                const wagesTotalRT = regWages + wagesOAndPRT;
                const wagesTotalOT = otWages + wagesOAndPOT;
                const total = wagesTotalRT + wagesTotalOT;
                workerHrsArr.push({
                    name: `${employee.firstName} ${employee.lastName}`,
                    id: employee.id,
                    workerClass: employee.class,
                    regHours: employeeRT,
                    otHours: employeeDT,
                    laborCode: employee.laborCode,
                    costCode: employee.costcode,
                    regRate,
                    otRate,
                    regWages,
                    otWages,
                    percentage,
                    wagesOAndPRT,
                    wagesOAndPOT,
                    wagesTotalRT,
                    wagesTotalOT,
                    total,
                });
            });
            console.log("WORKERS HOURS: ", workerHrsArr);
            const newTimesheet = new Timesheet({
                jobName: createSIInput.jobName,
                jobId: job?._id,
                reportDate: createSIInput.taskCompletionDate,
                reportNumber: createSIInput.reportNo,
                reportHours: workerHrsArr,
            });
            await newTimesheet.save();
            const newSI = new SigninSignout(createSIInput);
            // console.log("NEW SI: ", newSI);
            await newSI.save();
            return newSI;
        },
        updateSI: async (_root, { input: updateSIInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            let updatedSIWR = await SigninSignout.updateOne({
                _id: updateSIInput.id,
            }, {
                $set: {
                    canRecall: updateSIInput.canRecall,
                    titleOfChangeOrder: updateSIInput.titleOfChangeOrder,
                    workDescription: updateSIInput.workDescription,
                    materialsDesc: updateSIInput.materialsDesc,
                    incidentReport: updateSIInput.incidentReport,
                    workLocation: updateSIInput.workLocation,
                    incidentReportText: updateSIInput.incidentReportText,
                    tasks: updateSIInput.tasks,
                    remarks: updateSIInput.remarks,
                    hasBeenRecalled: updateSIInput.hasBeenRecalled,
                    costcode: updateSIInput.costcode,
                },
            });
            return updatedSIWR;
        },
        createJob: async (_root, { input: jobInput }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newJob = new Job(jobInput);
            await newJob.save();
            return newJob;
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
            const newWorker = new Worker(createWorkerInput);
            await newWorker.save();
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
        deleteWorker: async (_root, { input: id }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return Worker.deleteOne({
                _id: id,
            });
        },
        createWorksiteEmployees: async (_root, { input: employees }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const newWorksiteEmployees = new WorksiteEmployees(employees);
            await newWorksiteEmployees.save();
            return newWorksiteEmployees;
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
        deleteWorksiteEmployees: async (_root, { input: id }, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            return await WorksiteEmployees.deleteOne({ _id: id });
        },
        createWorkReportEmailTemplate: async (_root, { input: emailTemplate }, args, contextValue) => {
            if (!contextValue.userToken) {
                throw new Error("Not Authorized");
            }
            const mailRes = await sendEmail(emailTemplate);
            return mailRes;
        },
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
                employees: { _id: data._id },
            });
        },
    },
};
