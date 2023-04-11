import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";
import { BlockType } from "notion-block-renderer";


export type MenuPage = {
  label: string;
  to: string;
}

export type LayoutProps = {
  children: ReactNode;
};
 
export type PageProps = {
  slug: string;
  name: string;
  author: string;
  cover: string;
  published: string;
  tags: string[];
  content: string;
};
 
export type CardProps = {
  article: ArticleType;
};
export type ArticleProps = {
  article: ArticleType;
  blocks: BlockType[];
};

export type ArticleMetaProps = {
  meta: ArticleType
};

export type IndexProps = { articles: ArticleType[] }
export type TagProps = IndexProps & {
  tag: string
};
export type BlockProps = { block: BlockType, headerBlocks: BlockType[] };

 
export type Params = ParsedUrlQuery & {
  slug?: string;
  tag?: string;
};
 
export type FileType = {
  file?: { url: string };
  external?: { url: string };
};
 
export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};
 
export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};
 
export type PropertyType = {
  name: { title: RichTextType[] };
  author: { rich_text: RichTextType[] };
  slug: { rich_text: RichTextType[] };
  published: { date: { start: string } };
  isPublic: { checkbox: boolean };
  tags: { multi_select: [{ name: string }] };
};
 
export type ArticleType = {
  id: string;
  cover: FileType | null;
  // properties: Record<string, any>;
  properties: PropertyType;
};

// export type BlockType = {
//   type: string;
//   heading_1: { rich_text: RichTextType[] };
//   heading_2: { rich_text: RichTextType[] };
//   paragraph: { rich_text: RichTextType[] };
// };
