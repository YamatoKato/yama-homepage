import React, { FC } from 'react';
import styles from '../../styles/post.module.css';

const Text: FC<any> = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value: any, index: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <React.Fragment key={index}>
        <span
          className={[
            bold ? styles.bold : '',
            code ? styles.code : '',
            italic ? styles.italic : '',
            strikethrough ? styles.strikethrough : '',
            underline ? styles.underline : '',
            styles.whitespace,
          ].join(' ')}
          style={color !== 'default' ? { color } : {}}
        >
          {text.link ? (
            <a
              className="text-sky-400 after:content-['_↗']"
              href={text.link.url}
            >
              {text.content}
            </a>
          ) : (
            text.content
          )}
        </span>
      </React.Fragment>
    );
  });
};

export default Text;
