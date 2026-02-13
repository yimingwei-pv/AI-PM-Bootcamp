---
title: "Large Language Models (LLMs)"
module: 1
lesson: 1
description: "An introduction to the architecture and learning paradigms behind large language models, covering embeddings, transformers, neural networks, and their product implications."
objectives:
  - "Explain the key components of LLMs: embeddings, transformers, and neural networks"
  - "Understand the differences between supervised learning, unsupervised learning, deep learning, and reinforcement learning"
  - "Apply this knowledge to make informed product decisions about AI-powered features"
resources:
  - title: "Brendan Bycroft's LLM Visualization"
    url: "https://bbycroft.net/llm"
    type: "docs"
  - title: "Transformer Explainer (Georgia Tech)"
    url: "https://poloclub.github.io/transformer-explainer/"
    type: "docs"
  - title: "OpenAI Tokenizer"
    url: "https://platform.openai.com/tokenizer"
    type: "docs"
  - title: "TensorFlow Playground"
    url: "https://playground.tensorflow.org/"
    type: "docs"
quiz:
  - question: "What is the primary mechanism that allows transformers to understand relationships between all tokens in a sequence simultaneously?"
    options:
      - "Backpropagation"
      - "Self-attention"
      - "Tokenisation"
      - "Embedding lookup"
    answer: 1
  - question: "Which learning paradigm is used to align LLM outputs with human preferences, making models like Claude feel conversational rather than like raw text predictors?"
    options:
      - "Supervised learning"
      - "Unsupervised learning"
      - "Reinforcement Learning from Human Feedback (RLHF)"
      - "Deep learning"
    answer: 2
---

## Where LLMs Fit: The AI Landscape

Before we dive into components, let's orient ourselves. People use the terms "AI," "machine learning," "deep learning," and "LLM" interchangeably, but they describe different layers of the same technology stack. Understanding the hierarchy helps you speak precisely with engineering teams and evaluate vendor claims.

<img src="/AI-PM-Bootcamp/images/modules/ai-hierarchy.png" alt="AI hierarchy - from AI to Machine Learning to Deep Learning to Transformers to LLMs" style="max-width: 600px; margin: 2rem auto; display: block;" />

**AI** is the broadest umbrella — any system that performs tasks typically requiring human intelligence (seeing, reasoning, deciding, creating). **Machine learning** is the dominant approach within AI: instead of programming explicit rules, you feed data to algorithms that discover patterns on their own. **Deep learning** is a subset of ML that uses neural networks with many layers to handle complex, unstructured data like images, audio, and text. **Transformers** are a specific deep learning architecture, introduced in 2017, that fundamentally changed how models process sequential data. And **LLMs** are transformer-based models trained on enormous text datasets — they are the technology powering ChatGPT (GPT-5), Claude, Gemini, and the AI features you're building into products today.

**Why this hierarchy matters for PMs:** When a vendor says "our product uses AI," that tells you almost nothing. When they say "we fine-tuned a transformer-based LLM on your domain data," you know exactly what you're evaluating. This vocabulary helps you cut through marketing, ask the right questions, and make informed build-vs-buy decisions.

---

## What Is an LLM? The Thirty-Second Version

An LLM is a machine learning model trained to predict the next word in a sequence — billions to trillions of times — using massive amounts of text data. Through this simple task — repeated at enormous scale — these models develop remarkable abilities to write, reason, code, summarise, translate, and answer questions.

That's it. The magic isn't in a secret algorithm. It's in the architecture (transformers), the data (billions of words), and the training approach (self-supervised learning). Let's unpack each piece.

---

## Part 1: The Building Blocks of LLMs

### Neural Networks: The Foundation

Imagine you're building a system to decide whether to approve a loan application. You'd need to weigh multiple factors: credit score, income, debt level, employment history. You'd create a formula that combines these inputs, adjusts weights for different factors based on historical success, and outputs a decision.

A **neural network** does exactly this, but with extraordinary complexity. It's a system of interconnected "neurons" that take inputs, weight them, combine them, and pass the result to the next layer. Each neuron is just a simple mathematical function — what makes it powerful is having thousands of these functions connected together.

Here's the structure:

<img src="/AI-PM-Bootcamp/images/modules/neural-network-structure.png" alt="Neural Network Structure - Input Layer, Hidden Layers, Output Layer" style="max-width: 600px; margin: 2rem auto; display: block;" />

For an LLM processing text, the input is your prompt, the hidden layers are where semantic understanding happens, and the output is the next predicted word.

**Why this matters for PMs:** Neural networks can learn patterns from data without being explicitly programmed. If your training data has 10,000 customer reviews labelled as "positive" or "negative," the network learns what signals predict sentiment — without you listing rules.

### How Neural Networks Learn: The Training Loop

Understanding how neural networks learn is essential for PMs because it explains why training is expensive, why more data usually helps, and why fine-tuning works. The process follows a cycle:

1. **Forward pass:** The network receives input data and produces a prediction by passing it through all its layers. On the first attempt, the prediction is essentially random — the weights haven't been tuned yet.

2. **Loss calculation:** A **loss function** measures how wrong the prediction was compared to the correct answer. Think of it as a score: high loss means the model is far off, low loss means it's getting close.

3. **Backpropagation:** This is the key insight that makes neural networks trainable. The algorithm works backward through the network, calculating how much each weight contributed to the error. It's like tracing back through a chain of decisions to find which ones led to a bad outcome.

4. **Weight update:** Each weight gets adjusted slightly in the direction that reduces the error. The **learning rate** controls the size of each adjustment — too large and the model overshoots, too small and training takes forever.

5. **Repeat:** This cycle runs millions of times across the training data. Over many iterations — called **epochs**, where each epoch is one full pass through the training data — the network's predictions improve as weights converge toward values that minimise loss.

**Why this matters for PMs:** This is why training LLMs costs millions of dollars — it requires running this loop across billions of text examples on thousands of GPUs. It's also why **fine-tuning** is cheaper than training from scratch: you start with weights that already encode general language understanding, then adjust them slightly for your specific domain.

> **Hands-on exploration:** If you want to see this training loop in action, visit [TensorFlow Playground](https://playground.tensorflow.org/). It's a free, interactive tool where you can watch a neural network learn in real time — adjusting features, layers, and neurons to see how they affect the model's ability to classify data points. Spend 10 minutes with it and the concepts above will click.

### Embeddings: Translating Words into Math

Here's a problem: computers don't understand words. They understand numbers. So how do we feed "What is the capital of France?" into an LLM?

The answer is **embeddings** — a technique that converts words (discrete, categorical data) into vectors (lists of numbers). Think of it as a coordinate system where words with similar meanings live close together.

For example, in an embedding space:
- "king" and "queen" might be near each other (both royalty)
- "Paris" and "France" might be near each other (related concepts)
- "dog" and "cat" might be relatively close (both animals)

More formally: an embedding is a learned mapping that represents a word as a vector of numbers (typically 100–4,000 numbers per word in modern LLMs). These vectors capture semantic meaning in a way mathematical operations can manipulate.

**How embeddings get created:**

When text enters an LLM, it first gets broken into **tokens** (words or subwords). The model then converts each token to an embedding using a lookup table it learned during training. The model learns this mapping by figuring out which embeddings make good predictions when passed through the transformer.

**Why this matters for PMs:** Embeddings power some of your most valuable features — semantic search, recommendation engines, and similarity matching all depend on embeddings. When Spotify recommends a song similar to one you like, or when your search engine finds relevant documents despite different wording, embeddings are working behind the scenes.

### Tokenisation: How LLMs Actually Read Text

Before text becomes embeddings, it must be split into tokens. This seems trivial but has significant product implications.

Many people assume each word is one token. In practice, **tokens are often subwords** — parts of words, or sometimes individual characters. Tokenisers break text into pieces based on frequency patterns in training data. Common words like "the" become single tokens, while rare words get split. For example, "unhappiness" might become ["un", "happiness"], and the name "Jonathan" might become ["John", "athan"].

This design exists because models can't have an infinitely large vocabulary. Subword tokenisation gives them a manageable vocabulary (typically 30,000–100,000 tokens) while still being able to represent any text.

**Product implications of tokenisation:**

- **Cost calculations:** API pricing is per-token, not per-word. A 1,000-word document might be 1,300+ tokens. Languages with complex scripts (Chinese, Japanese, Korean) can use 2-3x more tokens per character than English — directly affecting your international pricing.

- **Context window budgets:** When your model has a 128k token context window, that doesn't translate neatly into "pages of text." Understanding the actual token count matters when you're designing features that process long documents.

- **Known failure modes:** Because LLMs operate on tokens — not characters — they struggle with character-level tasks. Ask an LLM to count the letter "r" in "strawberry," and it may get it wrong, because "strawberry" is tokenised into subword chunks like ["straw", "berry"]. The model literally can't "see" individual characters the way you do. This matters when you're designing features that involve spelling, character manipulation, or precise text analysis.

### Exercise: Understand embeddings
Play around with OpenAI's tokeniser below. Explore how text is broken into tokens, and notice these tokens do not necessarily match with the entire word.

[OpenAI Tokenizer](https://platform.openai.com/tokenizer) — Paste any text to see how it gets tokenised. Essential for understanding token counts and costs.

### The Transformer: The Architecture That Changed Everything

If neural networks are the building blocks, transformers are the blueprint. Before transformers (pre-2017), language models used recurrent neural networks (RNNs), which processed text sequentially — one word at a time. This was slow and poor at capturing long-range relationships.

**Transformers solve this with three innovations:**

#### 1. Parallel Processing

Transformers process all tokens in a sequence at once, not sequentially. This is vastly faster and lets the model see long-range dependencies (how words far apart relate to each other).

#### 2. Self-Attention Mechanism

This is the heartbeat of transformers. Self-attention allows each token to "look at" every other token in the input and understand their relationships.

Here's a concrete example: in the sentence "The bank executive wouldn't authorise the **loan** because the **bank** was flooded," the transformer needs to understand that the second "bank" refers to a river bank, not a financial institution.

Self-attention does this by computing three things for each token:
- **Query (Q):** "What am I looking for?"
- **Key (K):** "What information do I contain?"
- **Value (V):** "What should I contribute to other tokens?"

The model compares queries to keys across all tokens, finds strong matches, and pulls in the corresponding values. All of this happens in parallel, letting context flow through the entire sequence instantly.

**Multiple heads, multiple perspectives:** Transformers use "multi-head attention," meaning they run this process multiple times (typically 8–16 times) simultaneously. One attention head might capture grammar relationships, another captures semantic meaning, another captures discourse structure. This diversity makes the model more robust.

<img src="/AI-PM-Bootcamp/images/modules/transformer-attention.png" alt="Transformer Attention Process - Input Tokens, Queries/Keys/Values, Self-Attention, Output" style="max-width: 600px; margin: 2rem auto; display: block;" />

#### 3. Feed-Forward Layers

Between attention blocks, transformers use feed-forward neural networks that operate independently on each token. While attention routes information *between* tokens, feed-forward layers refine and deepen each token's internal representation.

Think of it as a two-step dance:
1. **Attention:** Tokens share information with each other (contextual awareness)
2. **Feed-Forward:** Each token independently processes what it learned (deeper understanding)

This dance repeats across many layers (GPT-3 has 96 such layers; modern frontier models have even more). Each layer gradually refines understanding.

#### A Note on Architecture Variants

The original 2017 "Attention Is All You Need" paper introduced a transformer with both an **encoder** (which reads and understands the input) and a **decoder** (which generates the output). This encoder-decoder design was built for translation tasks — the encoder processes "My name is John" and the decoder generates "Je m'appelle John."

Since then, the field has diverged into three architecture families:

| Architecture | How It Works | Examples | Best For |
|---|---|---|---|
| **Encoder-only** | Reads and understands text bidirectionally | BERT, RoBERTa | Classification, search, understanding tasks |
| **Decoder-only** | Generates text one token at a time, left to right | GPT-4, Claude, Llama | Text generation, conversation, reasoning |
| **Encoder-decoder** | Reads input fully, then generates output | T5, BART | Translation, summarisation |

**Why this matters for PMs:** The models you're most likely building with — GPT-4, Claude, Gemini — are **decoder-only** transformers. They generate text autoregressively (one token at a time, each conditioned on all previous tokens). But if your use case is primarily about *understanding* text (classification, semantic search, entity extraction), an encoder-based model like BERT might be cheaper, faster, and more appropriate. Knowing this distinction prevents you from defaulting to the most expensive option.

### Putting It Together: A Token's Journey

Let's follow what happens when you prompt Claude with "Why is the sky blue?"

1. **Tokenisation:** Text breaks into tokens: ["Why", "is", "the", "sky", "blue", "?"]
2. **Embedding:** Each token becomes a vector (e.g., "sky" = [0.2, -0.5, 0.8, ...])
3. **Positional encoding:** Position information is added (token 0, token 1, etc.) so the model knows word order — critical since transformers process all tokens in parallel
4. **Transformer layers:**
   - Layer 1: Attention heads notice that "sky" relates to "blue"
   - Layer 2: Feed-forward refines understanding of colour and light
   - Layer 3: Attention notices "Why" indicates the model should explain causation
   - ...and so on through dozens of layers
5. **Prediction:** Final layer outputs probabilities for next tokens. Model picks "The" as most likely, then "sky", "appears", "blue"...
6. **Autoregressive generation:** Each generated token becomes part of the context, and the entire process repeats for the next token

<img src="/AI-PM-Bootcamp/images/modules/llm-transformer-flowchart.png" alt="LLM Transformer Flowchart - from prompt through tokenisation, embedding, transformer blocks to output" style="max-width: 400px; margin: 2rem auto; display: block;" />

**Why this matters for PMs:** The transformer architecture is why LLMs are so good at language. The attention mechanism lets the model understand context — what words mean in relation to other words. This is why an LLM can write coherent essays, not just string together statistically common word pairs.

> **Go deeper:** For a stunning interactive 3D visualisation of this entire process, visit [Brendan Bycroft's LLM Visualization](https://bbycroft.net/llm). You can watch tokens flow through embedding, attention, and feed-forward layers in real time. It's the single best visual explanation of how LLMs work.

---

## Part 2: Learning Paradigms

Now that you understand LLM architecture, let's talk about how they learn. There are fundamentally different ways to train machine learning models, each with distinct tradeoffs and applications. You'll encounter all of these in conversations with your ML team.

### Supervised Learning: Learning from Labelled Examples

In supervised learning, you provide the model with pairs of inputs and correct outputs (labels), and the model learns to map from input to output.

**Example:** To build a spam detector:
- Input: Email text ("Congratulations, you've won $1 million!")
- Label: "Spam"

You collect 10,000 emails labelled as spam or not-spam. The model learns patterns that distinguish them. Once trained, it predicts labels for new emails.

**Characteristics:**
- Requires labelled training data (expensive and time-consuming to create)
- Extremely accurate when you have good labels
- Can't learn patterns beyond what's explicitly labelled
- Used for: classification, regression, detection tasks

**Product examples:** Fraud detection, sentiment analysis, content moderation, spam filtering

### Unsupervised Learning: Finding Hidden Patterns

In unsupervised learning, you provide data without labels. The model discovers hidden structure, patterns, or relationships on its own.

**Example:** Customer segmentation
- Input: Customer purchase history, browsing behaviour, demographics
- No label telling you which customers are "high-value" or "churn-risk"
- The model clusters similar customers together

**Characteristics:**
- No labelled data needed
- Discovers unexpected patterns
- Harder to evaluate (no ground truth to compare against)
- Used for: clustering, dimensionality reduction, anomaly detection

**Product examples:** Customer segmentation, recommendation systems, data exploration

### Reinforcement Learning: Learning Through Trial and Error

In reinforcement learning (RL), an agent learns by taking actions in an environment, receiving rewards or penalties, and optimising to maximise cumulative reward over time.

**Example:** Training a chess-playing AI
- The agent makes moves (actions)
- Wins earn +1, losses earn -1 (rewards)
- Over millions of games, it learns which moves lead to victory

**Characteristics:**
- Learns from interaction, not from a static dataset
- Powerful for sequential decision-making
- Can discover surprising strategies humans haven't considered
- Computationally expensive
- Used for: game-playing, robotics, resource optimisation, autonomous systems

**Product examples:** Recommendation ranking (which content maximises engagement), autonomous driving, game AI, resource allocation algorithms

**The LLM connection:** Standard LLMs are pre-trained with self-supervised learning (predicting next tokens from unlabeled text). But they are then fine-tuned with **Reinforcement Learning from Human Feedback (RLHF)** to align outputs with human preferences — this is what makes Claude helpful, harmless, and honest rather than just a raw text predictor. RLHF is why modern LLMs feel conversational rather than like autocomplete on steroids.

### Deep Learning: A Paradigm Across All Approaches

**Deep learning** is distinct from the above three — it's not a learning paradigm but an architecture paradigm. Deep learning means using neural networks with multiple layers (hence "deep").

Key insight: Deep learning can operate under any of the above paradigms:
- **Supervised deep learning:** Convolutional neural networks for image classification, transformers for language tasks
- **Unsupervised deep learning:** Autoencoders for compression, clustering with neural networks
- **Reinforcement learning with deep learning:** Deep Q-Learning, AlphaGo, policy gradients

Deep learning excels with unstructured data (images, audio, raw text) because neural networks can learn feature representations automatically rather than requiring hand-crafted features.

### Which Approach Is Right? A Decision Framework

| Learning Type | When to Use | Data Requirement | Accuracy | Cost |
|---|---|---|---|---|
| **Supervised** | You have clear input-output pairs; accuracy is critical | Labelled data (expensive) | Very high | High upfront, low ongoing |
| **Unsupervised** | You want to explore patterns; labels don't exist or are expensive | Raw data (cheap) | Medium | Low |
| **Reinforcement** | Sequential decisions; learning from interaction is natural | Simulation or live environment | Varies | Very high (compute-intensive) |
| **Deep Learning** | Unstructured data (images, text, audio); complex patterns | Large datasets | Very high | High (requires GPUs) |

**For your product:**
- Building a content moderation system? → Supervised learning (label examples of bad content)
- Building recommendations? → Unsupervised (cluster users) + supervised (predict clicks)
- Building autonomous agents? → Reinforcement learning
- Building an LLM-based feature? → The LLM is already trained; you fine-tune with supervised learning or use prompting

---

## Part 3: Putting It Together — Why This Matters for Product

Now you understand the pieces. Let's connect this to your job as a PM.

### Constraint 1: Context Window

Every transformer has a **context window** — a maximum number of tokens it can process at once. GPT-5 supports up to 1M tokens; Claude has 200k. This determines:
- How much context the model can "see" when generating responses
- Whether you can feed an entire book or just 20 pages
- Cost per API call (longer context = higher cost)

**Product implication:** If your feature involves summarising documents, customers with long documents need a high-context model (expensive) or a chunking strategy. Always estimate your real-world token requirements before choosing a model.

### Constraint 2: Training Data Cutoff

LLMs are trained on data up to a certain date — this is called the model's **knowledge cutoff**. For example, a model released in early 2026 might have training data through late 2025. They can't learn new information without retraining or being given fresh context.

**Product implication:** If your users need real-time information (stock prices, weather, news), you need to augment the LLM with retrieval systems or external APIs, not just rely on the model's training data. We'll cover this in detail in the Context Engineering lesson.

### Constraint 3: Accuracy vs. Creativity Tradeoff

LLMs generate tokens probabilistically. You control this with **temperature** (a parameter):
- Low temperature → More deterministic, repetitive, accurate
- High temperature → More creative, diverse, sometimes inaccurate

**Product implication:** For customer service chatbots, use low temperature. For creative writing, use high temperature. Your choice of temperature is a product decision, not a technical one.

### Constraint 4: Architectural Limitations

Because LLMs operate on tokens (not characters or pixels), they have inherent blind spots:
- **Character-level reasoning** is unreliable (counting letters, anagram solving) because the model can't "see" individual characters within subword tokens
- **Precise arithmetic** breaks down for large numbers because numbers get tokenised unpredictably
- **Spatial reasoning** is limited because transformers process sequential text, not visual layouts

**Product implication:** Don't design features that rely on LLMs for tasks they're architecturally bad at. If your feature needs precise character manipulation or math, handle that in code and use the LLM for what it's good at — language understanding, reasoning, and generation.

### Opportunity 1: Few-Shot Learning

Because transformers excel at understanding context, you can show an LLM a few examples of what you want (few-shot prompting) and it often generalises well, without any retraining.

**Product implication:** You don't always need to fine-tune or retrain. Smart prompting can achieve 80% of what fine-tuning achieves, much faster and at a fraction of the cost.

### Opportunity 2: Embeddings for Similarity

The embeddings that power transformers also encode semantic similarity. You can use embeddings to:
- Find similar products
- Match customers to relevant content
- Detect duplicate support tickets or user requests

**Product implication:** If you have embeddings from your LLM, you get semantic search "for free" — it's just finding nearby vectors. This is one of the highest-ROI AI features you can ship.

### Opportunity 3: Multimodal Extensibility

Modern LLMs aren't just text. Vision transformers can process images; today's frontier models routinely process text, images, and audio together.

**Product implication:** You're no longer limited to text-only features. Let users upload screenshots for support, analyse charts and diagrams, or describe images. Multimodal inputs open product possibilities that were impossible even two years ago.

---

## Key Takeaways

1. **LLMs sit within a hierarchy:** AI → Machine Learning → Deep Learning → Transformers → LLMs. Knowing where your technology sits helps you evaluate vendors, communicate with engineering, and make architecture decisions.

2. **LLMs work by predicting the next token, using a transformer architecture.**
   - Embeddings convert words to vectors that encode meaning
   - Attention mechanisms let tokens understand relationships with every other token
   - Feed-forward layers deepen each token's representation
   - This repeats across dozens of layers, building up understanding

3. **Learning paradigms differ fundamentally:**
   - Supervised learning: labelled data, high accuracy, high cost
   - Unsupervised learning: unlabeled data, pattern discovery, lower cost
   - Reinforcement learning: learning from interaction, complex decision-making
   - Deep learning: using neural networks for any of the above

4. **For product decisions, what matters most:**
   - Context window limits determine what information the model can see
   - Training cutoff means real-time data needs external integration
   - Tokenisation affects pricing, multilingual performance, and feature feasibility
   - Architecture choice (encoder vs. decoder) should match your use case
   - Few-shot prompting is often sufficient; expensive fine-tuning isn't always needed
