export const mockMetrics = {
    total_revenue: 250000,
    active_members: 1200,
    retention_rate: 85,
    net_promoter_score: 72,
    new_signups: 120,
    avg_daily_visits: 345,
  };
  
  export const mockInsights = [
    { id: 1, text: "Revenue increased by 12%", category: "revenue", positive: true },
    { id: 2, text: "15 members at risk of churning", category: "retention", positive: false },
    { id: 3, text: "Gym class attendance up by 20%", category: "engagement", positive: true },
  ];
  
  export const mockPerformance = {
    revenue_growth: "8.2%",
    member_retention: "85%",
    avg_revenue_per_member: "$208",
    customer_satisfaction: "4.5/5",
  };
  
  export const mockRevenue = [
    { month: 'Jan', revenue: 4000, lastYear: 3500 },
    { month: 'Feb', revenue: 3000, lastYear: 2800 },
    { month: 'Mar', revenue: 5000, lastYear: 4200 },
    { month: 'Apr', revenue: 4500, lastYear: 3900 },
    { month: 'May', revenue: 6000, lastYear: 5100 },
    { month: 'Jun', revenue: 5500, lastYear: 4800 },
  ];

  export const mockMemberInsights = [
    { id: 1, insight: "20% of members haven't visited in the last 30 days", category: "attendance" },
    { id: 2, insight: "Members who attend classes are 30% less likely to churn", category: "retention" },
    { id: 3, insight: "Weekend attendance has increased by 15% this month", category: "attendance" }
  ];
  
  export const mockChurnDistribution = [
    { risk: "Low", count: 500 },
    { risk: "Medium", count: 300 },
    { risk: "High", count: 200 }
  ];
  
  export const mockMemberSegments = [
    { name: "Frequent Visitors", percentage: 40 },
    { name: "Class Enthusiasts", percentage: 30 },
    { name: "Occasional Users", percentage: 20 },
    { name: "At Risk", percentage: 10 }
  ];

  export const mockCampaignSuggestions = [
    {
      id: 1,
      title: "Re-engage Inactive Members",
      description: "Target members who haven't visited in 30 days with a special offer.",
      predictedImpact: "15% increase in revisits"
    },
    {
      id: 2,
      title: "Promote New Yoga Classes",
      description: "Highlight our new yoga classes to members interested in mindfulness.",
      predictedImpact: "20% increase in class attendance"
    },
    {
      id: 3,
      title: "Referral Program Boost",
      description: "Offer a discount to members who refer a friend during the next month.",
      predictedImpact: "10% increase in new member signups"
    }
  ];
  
  export const mockCampaignPerformance = [
    {
      id: 1,
      name: "Summer Fitness Challenge",
      status: "Active",
      sent: 1000,
      opened: 650,
      clicked: 300,
      converted: 75
    },
    {
      id: 2,
      name: "Personal Training Promotion",
      status: "Completed",
      sent: 800,
      opened: 600,
      clicked: 250,
      converted: 50
    },
    {
      id: 3,
      name: "Membership Renewal Reminder",
      status: "Active",
      sent: 500,
      opened: 450,
      clicked: 200,
      converted: 180
    }
  ];