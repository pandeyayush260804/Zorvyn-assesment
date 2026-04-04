import Record from "../models/record.model.js";

// 🔹 Common match filter
const getMatchFilter = (user) => {
  return user.role === "admin" ? {} : { createdBy: user.id };
};

// 🔹 1. Summary
export const getSummaryService = async (user) => {
  const match = getMatchFilter(user);

  const result = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((r) => {
    if (r._id === "income") income = r.total;
    if (r._id === "expense") expense = r.total;
  });

  return {
    income,
    expense,
    balance: income - expense
  };
};

// 🔹 2. Category-wise totals
export const getCategoryTotalsService = async (user) => {
  const match = getMatchFilter(user);

  return await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },
    { $sort: { total: -1 } }
  ]);
};

// 🔹 3. Recent activity
export const getRecentActivityService = async (user) => {
  const match = getMatchFilter(user);

  return await Record.find(match)
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("createdBy", "username");
};

// 🔹 4. Monthly trends
export const getMonthlyTrendsService = async (user) => {
  const match = getMatchFilter(user);

  return await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" }
        },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
          }
        }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);
};

// 🔹 5. Weekly trends
export const getWeeklyTrendsService = async (user) => {
  const match = getMatchFilter(user);

  return await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          week: { $week: "$date" }
        },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { "_id.year": 1, "_id.week": 1 } }
  ]);
};