// components/CodeEditor.js
"use client";

import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });

const CodeEditor = ({ value, onChange }: {
    value: string;
    onChange: (value: string) => void;
}) => {
    return (
        <MonacoEditor
            width="800"
            height="600"
            language="javascript"
            theme="vs-dark"
            value={value}
            options={{
                selectOnLineNumbers: true
            }}
            onChange={(newValue, e) => onChange(newValue)}
        />
    );
};

export default CodeEditor;
