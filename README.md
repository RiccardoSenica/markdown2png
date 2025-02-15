# markdown2png

A web-based tool built with Next.js that converts Markdown files to PNG images with GitHub-style formatting.

## Features

- Browser-based Markdown to PNG conversion
- GitHub-style syntax highlighting
- Live preview
- High-quality PNG output

## Tech Stack

- Next.js 13.5
- React 18
- TypeScript
- TailwindCSS
- marked (for Markdown parsing)
- highlight.js (for syntax highlighting)
- html-to-image (for PNG conversion)

## Requirements

- Node.js
- yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/riccardosenica/markdown2png.git
cd markdown2png
```

2. Install dependencies:
```bash
yarn
```

## Development

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `yarn dev` - Runs the development server
- `yarn build` - Creates a production build
- `yarn start` - Runs the production server
- `yarn lint` - Runs ESLint
- `yarn format` - Formats code with Prettier
- `yarn typecheck` - Runs TypeScript type checking

## Usage

1. Upload your Markdown (.md) file using the file input
2. Preview your formatted Markdown with syntax highlighting
3. Click "Convert to PNG" to download your image
