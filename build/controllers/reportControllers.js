import SigninSignout from "../models/signinSignout.ts";
import Checklist from "../models/checklist.ts";
export const getReportCount = async (req, res) => {
    try {
        const count = await SigninSignout.estimatedDocumentCount();
        res.send({ reportCount: count });
    }
    catch (error) {
        res.send(error);
    }
};
export const getChecklistCount = async (req, res) => {
    try {
        const count = await Checklist.estimatedDocumentCount();
        res.send({ checklistCount: count });
    }
    catch (error) {
        res.send(error);
    }
};
