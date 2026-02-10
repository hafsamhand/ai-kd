# 🧠 AI Knowledge Base

A SaaS-style AI-powered knowledge system that transforms private documents into an intelligent, searchable assistant.

Upload your content. Ask questions in natural language. Get precise answers grounded strictly in your data.

---

## ✨ What This Product Does

AI Knowledge Base enables individuals and teams to:

* Upload documents (PDF, text, markdown)
* Automatically index content using semantic embeddings
* Ask questions in natural language
* Receive accurate, sourced answers based only on their documents

No hallucinations. No external knowledge leakage.

---

## 🎯 Product Vision

Knowledge is scattered across files, notes, and documents. This product centralizes that knowledge and makes it conversational.

The system is designed to be:

* **Reliable** – answers are grounded in your data
* **Secure** – strict user-level isolation
* **Extensible** – clean architecture, easy evolution
* **AI-native** – built around Retrieval-Augmented Generation (RAG)

---

## 🏗️ System Architecture (Visual Overview)

### High-Level Architecture

```
┌──────────────┐
│   Browser    │
│ (React UI)   │
└──────┬───────┘
       │
       ▼
┌────────────────────────┐
│        Next.js         │
│  Frontend + BFF Layer  │
│                        │
│  - Server Actions      │
│  - API Routes          │
│  - Auth                │
└──────┬─────────┬───────┘
       │         │
       ▼         ▼
┌────────────┐  ┌──────────────┐
│ PostgreSQL │  │   Chroma     │
│ Relational │  │ Vector DB    │
│ Data       │  │ (Embeddings) │
└────────────┘  └──────────────┘
       │
       ▼
┌────────────────────────┐
│       OpenAI API       │
│  Embeddings + Answers  │
└────────────────────────┘
```

---

### Data Responsibility Split

```
PostgreSQL:
- Users
- Documents (metadata)
- Chat messages

Chroma:
- Text chunks
- Embeddings
- Semantic similarity search
```

This separation keeps structured data reliable and semantic data flexible.

---

## 🧠 How Question Answering Works (RAG Flow)

```
User Question
      │
      ▼
Question Embedding
      │
      ▼
Semantic Search (Chroma)
      │
      ▼
Relevant Chunks
      │
      ▼
Prompt Construction
      │
      ▼
AI Answer (Grounded)
```

The AI never answers without retrieved context.

---

## 🧱 Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend (BFF)

* Next.js Server Actions & Route Handlers
* Prisma ORM

### Databases

* PostgreSQL (relational data)
* Chroma (vector embeddings)

### AI Layer

* OpenAI API

### Infrastructure (Local Dev)

* Docker
* Docker Compose

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* Docker & Docker Compose
* OpenAI API key

### Installation

```bash
git clone <repository-url>
cd ai-knowledge-base
npm install
```

### Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_kb"
OPENAI_API_KEY="your_openai_key"
CHROMA_URL="http://localhost:8000"
```

### Start Services

```bash
docker compose up -d
npx prisma migrate dev --name init
npm run dev
```

---

## 🩺 Health Check

```
GET /api/health
```

Expected response:

```json
{
  "status": "ok",
  "postgres": "connected",
  "chroma": "connected"
}
```

---

## 🛣️ Roadmap

* Authentication & users
* Document ingestion
* Semantic indexing
* Question answering (RAG)
* Chat interface
* Performance & security hardening

---

## 📜 License

MIT
