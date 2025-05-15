const { uploadFile } = require("../utils/cloudinaryUpload");
const { Audio } = require("../models");

const uploadAudio = async (input) => {
  const { url } = input;

  try {
    const audioData = await uploadFile(url, "audio-toeic", "video");
    const audio = await Audio.create({ url: audioData.url });

    return audio;
  } catch (error) {
    console.error("Error uploading audio:", error);
    throw new Error("Failed to upload audio");
  }
};

const getAllAudios = async () => {
  try {
    const audios = await Audio.findAll();
    return audios;
  } catch (error) {
    console.error("Error fetching audios:", error);
    throw new Error("Failed to fetch audios");
  }
};

module.exports = { uploadAudio, getAllAudios };
