// components/MonacoEditor.js
import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

const MonacoEditor = ({ value, language, onChange }) => {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && !monacoRef.current) {
            monacoRef.current = monaco.editor.create(editorRef.current, {
                value,
                language,
                automaticLayout: true,
            });
        }

        return () => {
            if (monacoRef.current) {
                monacoRef.current.dispose();
                monacoRef.current = null;
            }
        };
    }, [onChange]);

    useEffect(() => {
        if (monacoRef.current) {
            const model = monacoRef.current.getModel();
            if (model && model.getValue() !== value) {
                model.setValue(value);
            }
        }
    }, [value]);

    return <div ref={editorRef} style={{ height: '500px', width: '100%' }} />;
};

export default MonacoEditor;
