const grantReward = async ({
  userId,
  rewardId,
  sourceType,
  sourceId,
  note,
}) => {
  const existed = await UserReward.findOne({
    where: { userId, rewardId, sourceType, sourceId },
  });

  if (!existed) {
    await UserReward.create({ userId, rewardId, sourceType, sourceId, note });
    // Update user's coin/exp if needed
  }
};
