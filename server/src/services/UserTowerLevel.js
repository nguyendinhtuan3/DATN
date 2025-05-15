const UserTowerLevel = require("../models/UserTowerLevel");

// Unlock tầng đầu tiên cho người mới
await UserTowerLevel.create({
  userId: someUserId,
  towerLevelId: 1,
  status: "unlocked",
});

// Update kết quả sau khi chơi
await UserTowerLevel.findOneAndUpdate(
  { userId: someUserId, towerLevelId: 3 },
  {
    $set: {
      score: newScore,
      playedAt: new Date(),
      status: newScore >= passScore ? "completed" : "unlocked",
    },
  },
  { upsert: true, new: true }
);
