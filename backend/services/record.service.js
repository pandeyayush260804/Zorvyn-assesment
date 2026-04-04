import Record from "../models/record.model.js";

// 🔹 Create Record
export const createRecordService = async (data, userId) => {
  const record = await Record.create({
    ...data,
    createdBy: userId
  });

  return record;
};

// 🔹 Get Records (with filters 🔥)
export const getRecordsService = async (query, user) => {
  const filter = {};

  // Role-based filtering
  if (user.role !== "admin") {
    filter.createdBy = user.id;
  }

  // 🔍 Filters
  if (query.type) {
    filter.type = query.type;
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.startDate || query.endDate) {
    filter.date = {};

    if (query.startDate) {
      filter.date.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      filter.date.$lte = new Date(query.endDate);
    }
  }

  const records = await Record.find(filter)
    .populate("createdBy", "username email")
    .sort({ date: -1 });

  return records;
};

// 🔹 Update Record
export const updateRecordService = async (id, data, user) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new Error("Record not found");
  }

  // Only admin can update
  if (user.role !== "admin") {
    throw new Error("Not authorized to update record");
  }

  Object.assign(record, data);

  await record.save();

  return record;
};

// 🔹 Delete Record
export const deleteRecordService = async (id, user) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new Error("Record not found");
  }

  // Only admin can delete
  if (user.role !== "admin") {
    throw new Error("Not authorized to delete record");
  }

  await record.deleteOne();

  return record;
};