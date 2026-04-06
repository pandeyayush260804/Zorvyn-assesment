import {
  getSummaryService,
  getCategoryTotalsService,
  getRecentActivityService,
  getMonthlyTrendsService,
  getWeeklyTrendsService
} from "../services/dashboard.service.js";

//Full dashboard
export const getDashboard = async (req, res) => {
  try {
    const user = req.user;

    const [
      summary,
      categoryTotals,
      recentActivity,
      monthlyTrends,
      weeklyTrends
    ] = await Promise.all([
      getSummaryService(user),
      getCategoryTotalsService(user),
      getRecentActivityService(user),
      getMonthlyTrendsService(user),
      getWeeklyTrendsService(user)
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary,
        categoryTotals,
        recentActivity,
        monthlyTrends,
        weeklyTrends
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};