import { ParsedUrlQuery } from 'querystring';
import { ReactNode } from 'react';
import { BlockType } from 'notion-block-renderer';

export type MenuPage = {
  label: string;
  to: string;
};

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

export type ZennProps = {
  posts: ZennArticleType[];
};
export type CardProps = {
  article: ArticleType;
};
export type ArticleProps = {
  article: ArticleType;
  blocks: BlockType[];
};

export type ArticleMetaProps = {
  meta: ArticleType;
};

export type IndexProps = {
  articles: ArticleType[];
  zennArticles: ZennArticleType[];
};
export type TagProps = IndexProps & {
  tag: string;
};
export type BlockProps = { block: BlockType; headerBlocks: BlockType[] };

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
  slug: { formula: { string: string; type: string } };
  published: { date: { start: string } };
  isPublic: { checkbox: boolean };
  tags: { multi_select: [{ name: string }] };
};

export type ArticleType = {
  id: string;
  cover: FileType | null;
  properties: PropertyType;
};

export type ZennArticleType = {
  id: number;
  path: string;
  emoji: string;
  title: string;
  published_at: string;
};

export type CodeProps = {
  language: string;
  code: string;
};
