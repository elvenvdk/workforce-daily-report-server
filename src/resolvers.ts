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
import { IUserContext } from "./types";

export const resolvers = {
  Query: {
    agency: async (_root: any, { id: agencyId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.findOne({ id: agencyId });
    },

    agencies: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.find();
    },

    job: async (_root: any, { id: jobId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const job = await Job.findById(jobId);
      return job;
    },

    jobs: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Job.find();
    },

    workers: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.find({ role: "FIELD" });
    },

    worker: async (_root: any, { id: workerId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.findById(workerId);
    },

    worksiteEmployeesList: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.find();
    },

    worksiteEmployees: async (_root: any, { id: employeeId }: any, contextValue: IUserContext) => {
      // if (!contextValue.userToken) {
      //   throw new Error("Not Authorized");
      // }
      return await WorksiteEmployees.find({ foremanId: employeeId });
    },

    workreportList: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await SigninSignout.find();
    },

    workreport: async (_root: any, { id: workreportId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await SigninSignout.findById(workreportId);
    },

    checklists: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Checklist.find();
    },

    checklist: async (_root: any, { id: checklistId }: any, contextValue: IUserContext) => {
      // if (!contextValue.userToken) {
      //   throw new Error("Not Authorized");
      // }
      return await Checklist.findById(checklistId);
    },

    checklistCreators: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await ChecklistCreator.find();
    },

    checklistCreator: async (_root: any, { id: checklistCreatorId }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await ChecklistCreator.findById(checklistCreatorId);
    },

    costCodes: async (_root: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await CostCodes.find();
    },

    employeeRates: async (_root: any, args: any, contextValue: IUserContext) => {
      // if (!contextValue.userToken) {
      //   throw new Error("Not Authorized");
      // }
      return await EmployeeRates.find();
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

    createEmployeeRates: async (_root: any, { input: EmployeeRatesInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const existingRates = await EmployeeRates.findOne({
        jobId: EmployeeRatesInput.jobId,
      });
      if (existingRates) {
        const updatedRates = await EmployeeRates.updateOne(
          {
            jobId: EmployeeRatesInput.jobId,
          },
          {
            $set: {
              employeeRates: [EmployeeRatesInput.employeeRates],
            },
          }
        );
        return updatedRates;
      } else {
        const newRates = new EmployeeRates(EmployeeRatesInput);
        await newRates.save();
        return newRates;
      }
    },

    updateEmployeeRates: async (_root: any, { input: EmployeeRatesUpdate }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const updatedRates = await EmployeeRates.updateOne(
        {
          _id: EmployeeRatesUpdate.id,
        },
        {
          $set: {
            jobName: EmployeeRatesUpdate.jobName,
            jobId: EmployeeRatesUpdate.jobId,
            employeeRates: EmployeeRatesUpdate.employeeRates,
          },
        }
      );
      return updatedRates;
    },

    deleteJobRates: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const deletedJobRates = await EmployeeRates.deleteOne({ _id: id });
      return deletedJobRates;
    },

    createTimesheet: async (_root: any, { input: TimesheetInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }

      const newTimesheet = new Timesheet(TimesheetInput);
      return await newTimesheet.save();
    },

    createCostCodes: async (_root: any, { input: CostCodeInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newCostCode = new CostCodes(CostCodeInput);
      await newCostCode.save();
      return newCostCode;
    },

    updateCostCode: async (_root: any, { input: UpdateCostCodeInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      await CostCodes.updateOne(
        {
          _id: UpdateCostCodeInput.id,
        },
        {
          $set: {
            laborCode: UpdateCostCodeInput.laborCode,
            costCode: UpdateCostCodeInput.costCode,
            description: UpdateCostCodeInput.description,
          },
        }
      );
    },

    deleteCostCodes: async (_root: any, { input: DeleteCostCodesInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await CostCodes.deleteMany({ _id: { $in: [...DeleteCostCodesInput.id] } });
    },

    updateAgency: async (_root: any, { input: updateAgency }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.updateOne(
        {
          _id: updateAgency.id,
        },
        {
          $set: {
            agencyName: updateAgency.agencyName,
          },
        }
      );
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

    createChecklistCreator: async (_root: any, { input: ChecklistCreatorInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newChecklistCreator = await new ChecklistCreator(ChecklistCreatorInput);
      await newChecklistCreator.save();
      return newChecklistCreator;
    },

    updateChecklist: async (_root: any, { input: CreateChecklistInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      let updatedSIWR = await Checklist.updateOne(
        {
          _id: CreateChecklistInput.id,
        },
        {
          $set: {
            fieldTasks: CreateChecklistInput.fieldTasks,
          },
        }
      );
      return updatedSIWR;
    },

    createSI: async (_root: any, { input: createSIInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }

      const job = await Job.findOne({
        jobName: createSIInput.jobName,
      });

      const employeeJobRates = await EmployeeRates.findOne({
        jobId: job?._id,
      });
      const employeeRatesArr = employeeJobRates?.employeeRates;
      const percentage = 0.08;

      const workerHrsArr: any[] = [];
      createSIInput.siteEmployees.forEach(async (employee: any) => {
        const empRates = employeeRatesArr?.find((emp: any) => emp.employee === `${employee.firstName} ${employee.lastName}`);
        const employeeRT = Number.isNaN(employee.regularTime) ? 0 : employee?.regularTime;
        const employeeDT = Number.isNaN(employee.doubleTime) ? 0.5 : employee?.doubleTime;
        const regRate = empRates?.stPay;
        const otRate = empRates?.dtPay;
        const regWages = employeeRT * regRate!;
        const otWages = otRate ? employeeDT * otRate! : 0;
        const wagesOAndPRT = employeeRT * percentage;
        const wagesOAndPOT = employeeDT * percentage;
        const wagesTotalRT = regWages + wagesOAndPRT;
        const wagesTotalOT = otWages + wagesOAndPOT;

        workerHrsArr.push({
          name: `${employee.firstName} ${employee.lastName}`,
          id: employee.id,
          workerClass: employee.class,
          regHours: employeeRT,
          otHours: employeeDT && employeeRT === 7 ? 0.5 : employeeDT,
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
      console.log("NEW SI: ", newSI);
      await newSI.save();
      return newSI;
    },

    updateSI: async (_root: any, { input: updateSIInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      let updatedSIWR = await SigninSignout.updateOne(
        {
          _id: updateSIInput.id,
        },
        {
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
        }
      );
      return updatedSIWR;
    },

    createJob: async (_root: any, { input: jobInput }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newJob = new Job(jobInput);
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
      );
    },

    deleteJob: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Job.deleteOne({ _id: id });
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
      );
    },

    deleteWorker: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return Worker.deleteOne({
        _id: id,
      });
    },

    createWorksiteEmployees: async (_root: any, { input: employees }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const newWorksiteEmployees = new WorksiteEmployees(employees);
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
      );
    },

    deleteWorksiteEmployees: async (_root: any, { input: id }: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.deleteOne({ _id: id });
    },

    createWorkReportEmailTemplate: async (_root: any, { input: emailTemplate }: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      const mailRes = await sendEmail(emailTemplate);
      return mailRes;
    },
  },

  Job: {
    agency: async (job: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Agency.findById(job.agencyId);
    },
    siteEmployees: async (job: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.findById(job.worksiteId);
    },
  },

  WorksiteEmployees: {
    employees: async (worksiteData: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.find({ _id: { $in: worksiteData.employees } });
    },

    job: async (worksiteData: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Job.findById(worksiteData.jobId);
    },

    foreman: async (worksiteData: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await Worker.findById(worksiteData.foremanId);
    },
  },

  Worker: {
    jobs: async (data: any, args: any, contextValue: IUserContext) => {
      if (!contextValue.userToken) {
        throw new Error("Not Authorized");
      }
      return await WorksiteEmployees.find({
        employees: { _id: data._id },
      });
    },
  },
};
