'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useRef, useState, useCallback } from 'react';
import EditorToolbar from './EditorToolbar';

const PAGE_HEIGHT_INCHES = 11;
const PAGE_WIDTH_INCHES = 8.5;
const MARGIN_INCHES = 1;
const DPI = 96;

const PAGE_HEIGHT_PX = PAGE_HEIGHT_INCHES * DPI;
const PAGE_WIDTH_PX = PAGE_WIDTH_INCHES * DPI;
const MARGIN_PX = MARGIN_INCHES * DPI;
const CONTENT_HEIGHT_PX = PAGE_HEIGHT_PX - 2 * MARGIN_PX;

export default function DocumentEditor() {
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Start typing your legal document...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none',
      },
    },
    onUpdate: () => {
      calculatePages();
    },
  });

  const calculatePages = useCallback(() => {
    if (!contentRef.current) return;

    const content = contentRef.current.querySelector('.ProseMirror');
    if (!content) return;

    const contentHeight = content.scrollHeight;
    const pageCount = Math.ceil(contentHeight / CONTENT_HEIGHT_PX);
    setPages(Math.max(1, pageCount));
  }, []);

  useEffect(() => {
    if (editor) {
      const timer = setTimeout(() => calculatePages(), 100);
      return () => clearTimeout(timer);
    }
  }, [editor, calculatePages]);

  useEffect(() => {
    const handleScroll = () => {
      if (!editorRef.current) return;
      const rect = editorRef.current.getBoundingClientRect();
      const page = Math.ceil(Math.abs(rect.top) / PAGE_HEIGHT_PX) + 1;
      setCurrentPage(Math.max(1, page));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-[8.5in] mx-auto">
        <EditorToolbar editor={editor} onPrint={handlePrint} currentPage={currentPage} totalPages={pages} />

        <div
          ref={editorRef}
          className="document-container bg-white shadow-xl"
          style={{
            width: `${PAGE_WIDTH_PX}px`,
          }}
        >
          <div
            ref={contentRef}
            className="document-content"
            style={{
              padding: `${MARGIN_PX}px`,
              minHeight: `${PAGE_HEIGHT_PX}px`,
            }}
          >
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Page {currentPage} of {pages}
        </div>
      </div>
    </div>
  );
}
