'use client';

import hljs from 'highlight.js';
import { toPng } from 'html-to-image';
import { AlertCircle, Loader2 } from 'lucide-react';
import { marked } from 'marked';
import React, { useRef, useState } from 'react';
import 'highlight.js/styles/github.css';

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return code;
  },
});

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const htmlContent = marked(content);
      setPreview(htmlContent);
      setFile(file);
      setError(null);
    } catch (err) {
      setError('Failed to read file');
      console.error(err);
    }
  };

  const handleConvert = async () => {
    if (!previewRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        style: { margin: '20px' },
      });

      const link = document.createElement('a');
      link.download = `${file?.name.replace('.md', '')}.png` || 'markdown.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      setError('Failed to convert to image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Markdown to PNG Converter
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Convert your Markdown files into PNG images with GitHub-style
            formatting. Perfect for saving responses from AI assistants like Claude.ai into shareable images 😉
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8 bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-medium text-blue-800 mb-2">
              How to use:
            </h2>
            <ol className="list-decimal ml-4 text-sm text-blue-700 space-y-1">
              <li>Upload your Markdown (.md) file using the button below</li>
              <li>Preview your formatted Markdown</li>
              <li>Click &quot;Convert to PNG&quot; to download your image</li>
            </ol>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Markdown File
              </label>
              <input
                type="file"
                accept=".md"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleConvert}
                disabled={!preview || loading}
                className="btn-primary"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Converting...
                  </>
                ) : (
                  'Convert to PNG'
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {preview && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Preview
              </h2>
              <div className="border border-gray-200 rounded-lg">
                <div ref={previewRef} className="bg-white p-8">
                  <div
                    dangerouslySetInnerHTML={{ __html: preview }}
                    className="prose max-w-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
