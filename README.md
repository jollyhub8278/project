# 📄 LegalFlow – Real-time Paginated Document Editor

**LegalFlow** is a professional-grade document editor built on Tiptap, specifically designed for legal professionals and immigration specialists. It provides a "What You See Is What You Get" (WYSIWYG) experience, ensuring that complex legal documents match USCIS printing standards in real-time. Key features include:

- 📏 Real-time Pagination: Visual page breaks that update dynamically as you type
- 🖨️ Print-Ready Layout: Strict A4 letter size (210mm x 297mm) with 1-inch margins
- 📑 Legal Formatting: Seamless handling of headings, multi-page tables, and lists
- 🔄 Dynamic Reflow: Intelligent content shifting across pages to prevent orphaned text
- 📄 Export Fidelity: Matches editor visuals exactly to PDF/DOCX outputs


Built with Next.js, Tailwind CSS, and Tiptap (ProseMirror).

---

## 🧩 Tech Stack

| Layer       | Tech Stack                                  |
|-------------|----------------------------------------------|
| Frontend    | Next.js (App Router), React                 |
| Editor   | Tiptap, ProseMirror                          |
| Styling  | Tailwind CSS                                    |


---

## ✨ Features

- ✅ Visual Page Breaks: Clear gutters between pages for a true word-processor feel
- ✅ Standard A4/Letter Support: Fixed-width containers ensuring print-perfect formatting
- ✅ Complex Content Handling: Support for tables, bullet points, and varying line heights
- ✅ Dynamic Measurement: Real-time height calculation to manage content flow
- ✅ Page Numbers: Automatic footer numbering (Optional Enhancement)
- ✅ USCIS Compliance: Formatting optimized for official legal submissions


---

## 🚀 Getting Started

Follow these steps to set up the project locally.

---

### 🧾 Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jollyhub8278/project.git
```


### 2️⃣ Install Root Dependencies 

```bash
npm install
```

### 3️⃣ Development Setup

```bash
npm run dev
```


### 4️⃣ Production Build

```bash
npm run build
npm start
```
---
### 🧠 Approach & Trade-offs
Calculation Logic
To achieve real-time pagination, the editor uses a Height-Based Measurement approach. As content is entered, the editor monitors the pixel height of the document nodes. When the height exceeds the A4 page threshold (calculated at 96 DPI), the content is reflowed into the next page container.
Trade-offs
Performance: Heavy DOM recalculation on every keystroke can impact performance on very long documents. I implemented a debounced calculation listener to maintain 60fps typing speed.
Table Splitting: Splitting table rows across pages is complex in web browsers; the current implementation moves the entire row to the next page if it doesn't fit.





