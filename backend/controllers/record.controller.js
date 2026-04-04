import {
  createRecordService,
  getRecordsService,
  updateRecordService,
  deleteRecordService
} from "../services/record.service.js";

// 🔹 Create Record
export const createRecord = async (req, res) => {
  try {
    const record = await createRecordService(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: "Record created successfully",
      data: record
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Get Records (with filters)
export const getRecords = async (req, res) => {
  try {
    const records = await getRecordsService(req.query, req.user);

    res.status(200).json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Update Record
export const updateRecord = async (req, res) => {
  try {
    const record = await updateRecordService(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: record
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Delete Record
export const deleteRecord = async (req, res) => {
  try {
    await deleteRecordService(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Record deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};