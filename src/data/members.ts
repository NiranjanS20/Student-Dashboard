export const members = {
  niranjan: {
    name: "Niranjan",
    role: "Field Mapper",
    csv: "/data/Walkability Survey (Niranjan).csv",
    skywalk: { 
      location: "Mahim East", 
      photos: [
        "/skywalk/niranjan/20251003_114854AMByGPSMapCamera.jpg",
        "/skywalk/niranjan/20251003_114953AMByGPSMapCamera.jpg",
        "/skywalk/niranjan/20251003_115042AMByGPSMapCamera.jpg",
        "/skywalk/niranjan/20251003_115050AMByGPSMapCamera.jpg",
        "/skywalk/niranjan/20251003_115143AMByGPSMapCamera.jpg",
        "/skywalk/niranjan/20251003_115236AMByGPSMapCamera.jpg"
      ]
    },
    mapillary: [
      "https://mapillary.com/map/im/647572587915776",
      "https://mapillary.com/map/im/1880608246136267",
      "https://mapillary.com/map/im/1063792962636018"
    ],
    wardMap: "https://www.google.com/maps/d/edit?mid=1_YoIB1mH7pgxZMFTVNseVWm9VNNrspE&usp=sharing",
    charts: [
      { type: "bar", metric: "footpath_condition", title: "Footpath Condition Distribution (1–5)" },
      { type: "pie", metric: "obstacles", title: "Top Obstacles Encountered" }
    ],
    streetInterviews: [
      { name: "Local Resident", summary: "Needs better lighting and wider footpaths", date: "2025-09-10" },
      { name: "Shop Owner", summary: "Parking on footpaths is a major issue", date: "2025-09-11" },
      { name: "Daily Commuter", summary: "Broken paving makes walking difficult", date: "2025-09-12" }
    ]
  },
  aarna: {
    name: "Aarna",
    role: "Survey Coordinator",
    csv: "/data/Walkability Survey (Aarna).csv",
    skywalk: { 
      location: "Goregaon West", 
      photos: [
        "/skywalk/aarna/IMG_3955.JPG",
        "/skywalk/aarna/IMG_3956.JPG",
        "/skywalk/aarna/IMG_3957.JPG",
        "/skywalk/aarna/IMG_3958.JPG",
        "/skywalk/aarna/IMG_3959.JPG",
        "/skywalk/aarna/IMG_3960.JPG"
      ]
    },
    mapillary: [
      "https://www.mapillary.com/app/?pKey=4375816732652468",
      "https://www.mapillary.com/app/?pKey=639365212122666",
      "https://www.mapillary.com/app/?pKey=75675353711118"
    ],
    wardMap: "https://www.google.com/maps/d/edit?mid=1abMA2-fTLjuJy7VOe2R0JqDXbD1jTuY&usp=sharing",
    charts: [
      { type: "pie", metric: "walking_frequency", title: "Walking Frequency Distribution" },
      { type: "bar", metric: "improvements", title: "Top Requested Improvements" }
    ],
    streetInterviews: [
      { name: "Student", summary: "Wants safer crossings near schools", date: "2025-09-08" },
      { name: "Elderly Resident", summary: "Needs more benches and rest areas", date: "2025-09-09" },
      { name: "Working Professional", summary: "Better connectivity to metro stations", date: "2025-09-10" }
    ]
  },
  disha: {
    name: "Disha",
    role: "Data Analyst",
    csv: "/data/Walkability Survey (Disha).csv",
    skywalk: { 
      location: "Virar", 
      photos: [
        "/skywalk/disha/20251004_53506PMByGPSMapCamera.jpg",
        "/skywalk/disha/20251004_53515PMByGPSMapCamera.jpg",
        "/skywalk/disha/20251004_53548PMByGPSMapCamera.jpg",
        "/skywalk/disha/20251004_53559PMByGPSMapCamera.jpg",
        "/skywalk/disha/20251004_53603PMByGPSMapCamera.jpg",
        "/skywalk/disha/20251004_53626PMByGPSMapCamera.jpg"
      ]
    },
    mapillary: ["https://mapillary.com/map/im/1158045939477828"],
    wardMap: "https://www.google.com/maps/d/u/0/edit?mid=1FXlbA6B1fxyk6MkxcmJYO9PU-IPdqoY&usp=sharing",
    charts: [
      { type: "bar", metric: "road_condition", title: "Road Condition Assessment (1–5)" },
      { type: "pie", metric: "reasons_not_walking", title: "Why People Avoid Walking" }
    ],
    streetInterviews: [
      { name: "Auto Driver", summary: "Road conditions affect pedestrian safety", date: "2025-09-07" },
      { name: "Market Vendor", summary: "Footpath encroachment is common", date: "2025-09-08" },
      { name: "Mother with Child", summary: "Unsafe for children due to traffic", date: "2025-09-09" }
    ]
  },
  crisann: {
    name: "Crisann",
    role: "Community Liaison",
    csv: "/data/Walkability Survey (Crisann).csv",
    skywalk: { 
      location: "Kandivali", 
      photos: [
        "/skywalk/crisann/20251009_41737PMByGPSMapCamera.jpg",
        "/skywalk/crisann/20251009_41752PMByGPSMapCamera.jpg",
        "/skywalk/crisann/20251009_41807PMByGPSMapCamera.jpg",
        "/skywalk/crisann/20251009_41904PMByGPSMapCamera.jpg",
        "/skywalk/crisann/20251009_41955PMByGPSMapCamera.jpg",
        "/skywalk/crisann/20251009_42116PMByGPSMapCamera.jpg"
      ]
    },
    mapillary: [
      "https://mapillary.com/map/im/142010767573787676",
      "https://mapillary.com/map/im/652579527875101",
      "https://mapillary.com/map/im/1430948828118182"
    ],
    wardMap: "https://www.google.com/maps/d/u/0/edit?mid=1VAsdOW-Zx0b01E30Uwi6xi4dZ8syOvA&ll=19.203233358625383%2C72.84361475000001&z=17",
    charts: [
      { type: "barByWardAvg", metric: "footpath_condition", title: "Average Footpath Condition by Ward" },
      { type: "pie", metric: "obstacles", title: "Most Common Obstacles" }
    ],
    streetInterviews: [
      { name: "Local Leader", summary: "Community wants better infrastructure", date: "2025-09-06" },
      { name: "Shopkeeper", summary: "Business affected by poor walkability", date: "2025-09-07" },
      { name: "Teenager", summary: "Prefers cycling but roads are unsafe", date: "2025-09-08" },
      { name: "Senior Citizen", summary: "Difficulty navigating broken footpaths", date: "2025-09-09" }
    ]
  }
} as const;

export type MemberKey = keyof typeof members;
export type Member = typeof members[MemberKey];
