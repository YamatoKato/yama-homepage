import React, { FC, useEffect } from 'react';
import Prism, { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import { CodeProps } from '@/types/types';

// import 'prism-themes/themes/prism-nord.min.css'; 気分で変える

/**
 * 言語 string を表示用に変換して返却
 * NOTE: 言語の表示形式で気になるところがあったら case 追加する
 */
const getLanguageLabel = (language: string) => {
  let languageLabel = '';

  switch (language) {
    case 'javascript':
      languageLabel = 'JavaScript';
      break;
    case 'typescript':
      languageLabel = 'TypeScript';
      break;
    case 'go':
      languageLabel = 'Go';
      break;
    case 'bash':
      languageLabel = 'Bash';
      break;
    case 'python':
      languageLabel = 'Python';
      break;
    case 'php':
      languageLabel = 'PHP';
      break;
    case 'java':
      languageLabel = 'Java';
      break;
    case 'json':
      languageLabel = 'JSON';
      break;
    case 'yaml':
      languageLabel = 'YAML';
      break;
    case 'html':
      languageLabel = 'HTML';
      break;
    case 'css':
      languageLabel = 'CSS';
      break;
    case 'sql':
      languageLabel = 'SQL';
      break;
    case 'graphql':
      languageLabel = 'GraphQL';
      break;
    case 'scala':
      languageLabel = 'Scala';
      break;

    default:
      languageLabel = language;
      break;
  }

  return languageLabel;
};

const Code: FC<CodeProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const highlightedCode = highlight(code, languages[language], language);

  return (
    <pre className='relative'>
      <p className='bg-inherit text-xs text-neutral-600 inline-block absolute -top-0.8 left-1 bg-slate-200 px-1'>
        {getLanguageLabel(language)}
      </p>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />

      <style jsx>{`
        code {
          vertical-align: middle;
          white-space: pre;
          word-break: break-all;
          max-width: 100%;
          display: block;
          font-size: 0.8rem;
          line-height: 1.4;
          padding: 1.25rem 1.5rem;
          margin: 0.85rem 0;
          background-color: #282c34;
          color: #ccc;
          border-radius: 6px;
          overflow: auto;
        }
      `}</style>
    </pre>
  );
};

export default Code;
