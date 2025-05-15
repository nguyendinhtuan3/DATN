const getColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-400";
    case "unlocked":
      return "bg-yellow-400";
    case "locked":
      return "bg-gray-400";
    default:
      return "bg-white";
  }
};

export default getColor;
