"use client"

import React from 'react';
import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = 'javascript' }: CodeBlockProps) => {


  return (
    <div className="relative text-sm text-card-foreground rounded-lg bg-[#1e1e1e] overflow-auto p-2 max-w-[88%]">
      <Highlight theme={themes.vsDark} code={code} language={language as any}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`${className} overflow-x-auto py-2 `}
            style={{
              ...style,
              backgroundColor: 'transparent',
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;