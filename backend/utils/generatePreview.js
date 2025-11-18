const generatePreview = (html, maxLength = 120) => {
  const plainText = html.replace(/<[^>]+>/g, "").trim();

  return plainText.length <= maxLength
    ? plainText
    : plainText.substring(0, maxLength) + "...";
};

export default generatePreview;