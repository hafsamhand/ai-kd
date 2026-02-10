# 📘 Learning Notes – AI Knowledge Base

This document is **teaching-oriented**. It explains *why* decisions were made and *what you are meant to learn* at each step.

---

## 🧠 Mental Model of the System

Think of the application as a brain:

```
PostgreSQL  → factual memory
Chroma      → semantic memory
Next.js     → reasoning layer
AI Model    → language interface
```

Each component has a single responsibility.

---

## Why Next.js for Frontend + Backend

Next.js is used as a **Backend-for-Frontend (BFF)**:

* Keeps UI and server logic in one codebase
* Secures API keys server-side
* Enables streaming AI responses

This mirrors how modern AI SaaS products are built.

---

## Why PostgreSQL

PostgreSQL stores:

* Users
* Documents
* Chat history

Reasons:

* Strong consistency
* Mature ecosystem
* Excellent Prisma support

You do not write SQL directly. Prisma handles it.

---

## Why Chroma for Vectors

Chroma is used for:

* Storing embeddings
* Semantic similarity search

It is:

* Easy to start
* Perfect for learning RAG
* Swappable later (pgvector, Pinecone)

---

## Phase-by-Phase Learning Objectives

### Phase 1 – Foundation

Learn how modern apps wire services together.

### Phase 2 – Authentication

Understand user isolation and data ownership.

### Phase 3 – Document Ingestion

Learn file handling and text extraction.

### Phase 4 – Chunking & Embeddings

Understand how text becomes vectors.

### Phase 5 – Semantic Search

Learn similarity search and ranking.

### Phase 6 – RAG

Understand grounded AI answers.

### Phase 7 – Chat UX

Learn streaming, state, and persistence.

---

## RAG Prompt Discipline

The AI is instructed to:

* Answer only from provided context
* Say "I don’t know" when context is missing

This is a critical safety principle.

---

## Teaching Advice

* Build one phase at a time
* Use Prisma Studio to visualize data
* Log intermediate results (chunks, embeddings)
* Treat migrations as learning artifacts

---

## Common Beginner Pitfalls

* Mixing relational and vector data
* Overloading the prompt
* Skipping abstractions
* Premature optimization

---

## Final Note

If you can explain this system without slides, you understand it.
That is the real learning goal.
