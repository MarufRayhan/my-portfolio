---
title: "RAG, CAG, and KV Cache in Large Language Models"
date: "2025-04-17"
excerpt: "RAG, CAG, and KV Cache in Large Language Models"
coverImage: "/blog-logo.png"
tags: ["RAG", "LLM"]
---

# Understanding RAG, CAG, and KV Cache in Large Language Models

Large Language Models (LLMs) have transformed how we interact with AI, enabling applications from chatbots to knowledge-driven systems. Two approaches, **Retrieval-Augmented Generation (RAG)** and **Cache-Augmented Generation (CAG)**, enhance LLMs by integrating external knowledge, while the **Key-Value (KV) Cache** optimizes their efficiency. This blog explores these concepts, their mechanics, and how they interplay, providing a clear understanding for developers and enthusiasts alike.

## What is Retrieval-Augmented Generation (RAG)?

RAG combines a language model with a retrieval system to improve the factual accuracy and relevance of generated responses. It fetches relevant documents from an external knowledge base in real-time to augment the input context before generating a response.

### How RAG Works

1. **Query Encoding**: The user’s query is encoded into a vector using a retriever model (e.g., Dense Passage Retrieval, DPR).
2. **Document Retrieval**: The retriever searches a knowledge base (e.g., a vector database) to fetch relevant documents based on similarity to the query vector.
3. **Context Augmentation**: Retrieved documents are concatenated with the query and fed into the generative LLM.
4. **Response Generation**: The LLM generates a response, leveraging both the query and retrieved documents for context.

### Benefits of RAG

- **Access to External Knowledge**: Ideal for dynamic or domain-specific information not encoded in the model’s parameters.
- **Improved Accuracy**: Reduces hallucinations by grounding responses in retrieved facts.
- **Scalability**: Works with large knowledge bases, such as web-scale datasets.

### Challenges

- **Latency**: Real-time retrieval adds computational overhead.
- **Retrieval Errors**: Incorrect or irrelevant documents can degrade performance.
- **Complexity**: Managing both retrieval and generation components increases system complexity.

## What is Cache-Augmented Generation (CAG)?

CAG is a newer approach that preloads all relevant documents into the LLM’s context window and caches runtime parameters, such as the KV cache, to eliminate real-time retrieval. It’s designed for scenarios where the knowledge base is small enough to fit within the model’s context limits.

### How CAG Works

1. **Preloading Context**: All relevant documents are loaded into the LLM’s extended context window before inference.
2. **KV Cache Precomputation**: The Key-Value (KV) cache, which stores attention mechanism computations (keys and values), is precomputed for the preloaded context.
3. **Direct Generation**: The model generates responses using the cached KV pairs, bypassing retrieval.

### Benefits of CAG

- **Reduced Latency**: No real-time retrieval, making it faster than RAG.
- **Improved Reliability**: Eliminates retrieval errors by ensuring all context is preloaded.
- **Simpler Design**: Streamlines system architecture by removing the retriever component.

### Challenges

- **Context Size Limits**: Only suitable for knowledge bases that fit within the LLM’s context window (e.g., a few thousand tokens).
- **Static Knowledge**: Less effective for frequently updated or large-scale knowledge bases.

## The Role of the KV Cache

The **Key-Value (KV) Cache** is a critical optimization in transformer-based LLMs, used during inference to store intermediate computations from the attention mechanism. It plays a pivotal role in both RAG and CAG by improving efficiency.

### How the KV Cache Works

- In transformers, the attention mechanism computes **keys (K)** and **values (V)** for each token in the input sequence.
- During autoregressive generation (e.g., generating one token at a time), the KV cache stores K and V tensors for all previously processed tokens.
- For each new token, only its K and V are computed and appended to the cache, avoiding redundant computations for the entire sequence.

### KV Cache in RAG

- **Challenge**: RAG’s input (query + retrieved documents) can be long, leading to a large KV cache that consumes significant memory (e.g., ~1 KB per token per layer).
- **Optimization Techniques**:
  - **Quantization**: Store KV cache in lower precision (e.g., 8-bit floats) to reduce memory usage.
  - **Multi-Query Attention (MQA)** or **Grouped-Query Attention (GQA)**: Share keys and values across attention heads, shrinking cache size.
  - **Eviction Policies**: Discard KV pairs for less relevant tokens (e.g., filler text in documents).
  - **Chunking**: Process input in smaller segments, computing KV caches for each segment to lower peak memory usage.

### KV Cache in CAG

- **Advantage**: CAG precomputes the KV cache for the entire preloaded context, enabling faster inference since no new documents are fetched during runtime.
- **Optimization**: Similar techniques (quantization, MQA/GQA, eviction) apply, but CAG’s static context allows for more predictable memory management.
- **Limitation**: The KV cache size is constrained by the model’s context window, so large knowledge bases may require compression or truncation.
  |

## How KV Cache Optimization Enhances RAG and CAG

The KV cache is central to making both RAG and CAG computationally feasible, especially for long contexts. Here’s how optimization helps:

1. **Memory Efficiency**:

   - **RAG**: Long inputs from retrieved documents increase KV cache size. Techniques like quantization and MQA reduce memory by 50–75%.
   - **CAG**: Preloaded contexts are static, so the KV cache can be compressed or precomputed more predictably.

2. **Latency Reduction**:

   - **RAG**: Chunking and sparse attention (e.g., focusing on query tokens) speed up processing of large inputs.
   - **CAG**: Precomputed KV caches eliminate runtime computation for the context, minimizing latency.

## Practical Example

### Imagine Building a Q&A Bot for a Small E-Commerce Website’s Product Catalog

### RAG Approach

- **Query**: “What are the features of Product X?” (8 tokens)
- **Input**: 208 tokens (8 query + 200 retrieved document tokens)
- **KV Cache Size**: ~12.99 MB (208 tokens × 64 KB per token)
- **Optimized (MQA)**: ~1.625 MB (208 tokens × 8 KB per token)
- **Additional Cost**: Retrieval step (e.g., encoding query, searching a vector database) adds computational overhead and latency

---

### CAG Approach

- **Input**: 1,000 tokens (entire preloaded product catalog)
- **KV Cache Size**: ~62.5 MB (1,000 tokens × 64 KB per token)
- **Optimized (Quantization)**: ~15.625 MB (62.5 MB ÷ 4)
- **Additional Cost**: Preloading and precomputing the KV cache for the entire catalog, but no runtime retrieval

---

CAG requires more memory than RAG due to its larger preloaded context (~62.5 MB vs. ~12.99 MB, or ~15.625 MB vs. ~1.625 MB after optimization), which can be costly for resource-limited systems or larger datasets.

However, **CAG’s elimination of retrieval reduces latency and runtime compute costs**, making it more cost-effective for static, small catalogs like this one.

RAG, while more memory-efficient, **incurs ongoing retrieval costs and higher latency**, which may add up in high-query scenarios.

✅ **Use CAG** for **small, fixed datasets** where low latency is critical.  
✅ **Use RAG** for **large, dynamic knowledge bases** where scalability and flexibility matter.

## Conclusion

RAG and CAG are complementary approaches to enhancing LLMs with external knowledge. RAG excels in dynamic, large-scale scenarios but introduces latency and complexity. CAG offers speed and simplicity for smaller, static knowledge bases but is constrained by context size. The KV cache is a linchpin for both, and optimizations like quantization, MQA, and eviction policies make them practical by reducing memory and compute costs. Choosing between RAG and CAG depends on user's application’s knowledge base size, update frequency, and performance requirements.

## References

1. Lewis, P., et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." _Advances in Neural Information Processing Systems (NeurIPS)_. [arXiv:2005.11401](https://arxiv.org/abs/2005.11401).
2. Huang, H., et al. (2024). "Don’t Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks." _ACM Web Conference 2025 (WWW '25)_. [arXiv:2412.15605](https://arxiv.org/abs/2412.15605).
3. "Cache-Augmented Generation: A Simple, Efficient Alternative to RAG." GitHub Repository by hhhuang. [https://github.com/hhhuang/CAG](https://github.com/hhhuang/CAG).
4. "A Deep Dive into Cache Augmented Generation (CAG)." AdaSci. [https://adasci.org/a-deep-dive-into-cache-augmented-generation-cag/](https://adasci.org/a-deep-dive-into-cache-augmented-generation-cag/).
5. Vaswani, A., et al. (2017). "Attention is All You Need." _Advances in Neural Information Processing Systems (NeurIPS)_. [arXiv:1706.03762](https://arxiv.org/abs/1706.03762).
