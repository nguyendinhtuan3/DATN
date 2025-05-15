const streamToBase64 = async (stream, mimetype) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return `data:${mimetype};base64,${buffer.toString("base64")}`;
};

module.exports = streamToBase64;
