import { ArticleType, RichTextType } from "../types/types";
 
export const getRichText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map((richText) => richText.plain_text);
    return textArr.join("");
  } catch (err) {
    // console.error(err)
  }
  return "";
};
 
export const getCover = (cover: ArticleType["cover"]) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  return "/noimage.png";
};
 
export const getDate = (date: { start: string }) => {
  try {
    return date.start;
  } catch (err) {
    // console.error(err)
  }
  return "-";
};
 
export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {
    // console.error(err)
  }
  return [];
};
