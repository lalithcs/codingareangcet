import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = 'cpp',
  readOnly = false,
  className = '',
}: CodeEditorProps) {
  return (
    <div className={`h-full rounded-lg overflow-hidden border border-[var(--code-border)] ${className}`}>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={(v) => onChange?.(v ?? '')}
        theme="vs-dark"
        options={{
          readOnly,
          fontFamily: 'JetBrains Mono',
          fontSize: 14,
          lineHeight: 22,
          minimap: { enabled: false },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          padding: { top: 12 },
          tabSize: 4,
          insertSpaces: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'off',
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
      />
    </div>
  );
}
