---
title: "Quantum_AI_Zero_to_Mastery"
date_created:
last_reviewed:
status: current
supersedes: ""
source_type: converted-pdf
source_file: "Quantum_AI_Zero_to_Mastery.pdf"
tags: []
---

<!-- converted from Quantum_AI_Zero_to_Mastery.pdf -->

# **QUANTUM COMPUTING & AI IN QUANTUM**

ZERO TO MASTERY

A 3-Month Principal Architect Program

Master qubits, quantum gates, variational algorithms, quantum machine learning, and enterprise quantum architecture in 12 focused weeks.

2026 Edition • Principal Architect Track

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 2**

## **TABLE OF CONTENTS**

#### **PHASE 1 — FOUNDATIONS (Weeks 1–4)**

- Week 1: Quantum Mechanics Primer for Engineers

- Week 2: Qubits, Gates & Quantum Circuits

- Week 3: Quantum Algorithms — Grover, Shor, Deutsch

- Week 4: Quantum Hardware & Error Correction

#### **PHASE 2 — QUANTUM AI (Weeks 5–8)**

- Week 5: Classical ML Refresher Through a Quantum Lens

- Week 6: Variational Quantum Eigensolvers & QAOA

- Week 7: Quantum Machine Learning — QNNs & Kernels

- Week 8: Quantum Natural Language Processing & LLMs

#### **PHASE 3 — MASTERY & ARCHITECTURE (Weeks 9–12)**

- Week 9: Enterprise Quantum Architecture Patterns

- Week 10: Quantum Cloud Platforms & SDKs Deep Dive

- Week 11: Quantum Security, PQC & Compliance

- Week 12: Capstone — Quantum AI System Design

#### **APPENDICES**

- A: Mathematics Reference

- B: Curated Resources & Communities

- C: Career Roadmap & Certifications

- D: Tooling Cheat Sheet

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 3**

###### **INTRODUCTION**

## **Why Quantum Computing + AI is the Next Frontier**

We are entering the second quantum revolution. While the first gave us lasers, semiconductors, and MRI machines, the second is harnessing quantum phenomena — superposition, entanglement, and interference — to process information in ways that are fundamentally impossible for classical computers.

For a Principal Architect, this matters enormously. By 2030, quantum advantage is projected to disrupt cryptography, drug discovery, logistics optimisation, financial modelling, and — most critically for AI practitioners — machine learning itself. The fusion of quantum computing and AI (Quantum AI / QML) is where the most groundbreaking research is happening right now.

### **What You Will Achieve in 90 Days**

- Understand quantum mechanics at a level sufficient to design quantum systems

- Implement quantum circuits using Qiskit, PennyLane, and Cirq

- Build and train Quantum Neural Networks (QNNs) and Quantum Kernel methods

- Architect hybrid classical-quantum pipelines for enterprise use cases

- Evaluate and select quantum cloud platforms (IBM, Google, AWS, Azure Quantum)

- Navigate post-quantum cryptography and compliance requirements

- Deliver a full Quantum AI system design as your capstone project

_Each phase of this guide builds on the last. Phase 1 gives you the physics and mathematics backbone. Phase 2 fuses classical AI expertise with quantum techniques. Phase 3 elevates you to the architectural and strategic level where Principal Architects operate._

### **How to Use This Guide**

This is a structured, week-by-week curriculum. Each week contains: a conceptual overview, hands-on labs with real code, curated readings, and a checkpoint deliverable. Commit 15–20 hours per week — 2 hours daily on weekdays, 3–4 hours on one weekend day. The investment compounds rapidly.

### **Prerequisites**

|Linear Algebra|Vectors, matrices, eigenvalues, inner products|
|---|---|
|Python|Comfortable with NumPy, SciPy, and at least one ML framework|
|Classical ML|Supervised/unsupervised learning, neural networks, optimisation|
|Probability|Probability distributions, Bayes theorem, expectation values|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 4**

###### **PHASE 1**

## **Quantum Foundations**

Before you can architect quantum systems, you must think quantum. Phase 1 rewires your mental models — replacing classical bits with qubits, deterministic logic with probabilistic amplitudes, and sequential execution with quantum parallelism.

###### **WEEK 1**

### **Quantum Mechanics Primer for Engineers**

You do not need a physics PhD. You need a working engineer's understanding of the four phenomena that make quantum computing possible.

#### **Core Concepts**

**Superposition.** A qubit can exist in a linear combination of |0I and |1I simultaneously. Mathematically: |ψI = α|0I + β|1I, where |α|<sup>2</sup> + |β|<sup>2</sup> = 1. Unlike classical probability, α and β are complex amplitudes, enabling interference.

**Entanglement.** Two or more qubits can share a quantum state that cannot be described independently. Measuring one qubit instantly determines the state of its entangled partner, regardless of distance. This is the resource that enables quantum teleportation and superdense coding.

**Interference.** Quantum amplitudes can constructively reinforce correct answers and destructively cancel wrong ones — this is how quantum algorithms achieve speedup. It is analogous to wave interference in optics.

**Measurement.** Measuring a qubit collapses the superposition, yielding |0I with probability |α|<sup>2</sup> or |1I with probability |β|<sup>2</sup> . Quantum algorithms are designed so that correct answers have high probability before measurement.

#### **Week 1 Schedule**

|**Day 1–2**|Read Chapters 1–3 of Nielsen & Chuang. Focus on Dirac notation, the Bloch sphere<br>representation, and bra-ket algebra. Do not memorise — build geometric intuition.|
|---|---|
|**Day 3–4**|Work through IBM Quantum Learning Module 1 (free). Set up Qiskit. Run your first<br>quantum circuit: create a superposition with a Hadamard gate, measure 1000 shots,<br>observe the ~50/50 distribution.|
|**Day 5**|Study the postulates of quantum mechanics: state space, evolution, measurement,<br>and composite systems. Map each postulate to a practical quantum computing<br>implication.|
|**Weekend**|Checkpoint: Write a 500-word technical brief explaining superposition and<br>entanglement to a senior engineering team. Use the Bloch sphere diagram. If you can<br>teach it, you understand it.|



**WEEK 2**

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 5**

### **Qubits, Gates & Quantum Circuits**

Quantum gates are the quantum analogue of logic gates. Unlike classical gates, all single-qubit quantum gates are reversible and correspond to rotations on the Bloch sphere. Multi-qubit gates introduce entanglement.

#### **Essential Gate Vocabulary**

|Pauli-X (NOT)|Flips |0Ito |1I. Matrix: [[0,1],[1,0]]|
|---|---|
|Hadamard (H)|Creates superposition. Maps |0Ito (|0I+|1I)/√2|
|CNOT|Entangles two qubits. Flips target if control is |1I|
|Toffoli (CCNOT)|3-qubit gate. Universal for classical reversible computing|
|Phase (S, T)|Rotates the phase of |1I. Essential for QFT and Grover|
|Rotation (Rx,Ry,Rz)|Parameterised rotations. Foundation of variational circuits|



#### **Week 2 Schedule**

|**Day 1–2**|Implement all Pauli gates, H, and CNOT in Qiskit. Visualise on Bloch sphere using<br>plot_bloch_multivector(). Understand circuit depth and gate fidelity.|
|---|---|
|**Day 3–4**|Build a Bell state circuit (2-qubit entanglement). Verify with statevector_simulator.<br>Extend to 3-qubit GHZ state. Study the Quantum Fourier Transform (QFT) circuit —<br>you will need it for Shor's algorithm.|
|**Day 5**|Circuit transpilation, basis gates, and noise-aware optimisation. Run the same circuit<br>on ibm_nairobi (real hardware) vs simulator. Analyse the difference — this is your first<br>encounter with quantum noise.|
|**Weekend**|Checkpoint: Implement a 3-qubit QFT in Qiskit. Submit circuit diagram and statevector<br>results. Bonus: transpile to native basis gates of a real IBM backend.|



**WEEK 3**

### **Quantum Algorithms — Grover, Shor, Deutsch-Jozsa**

These foundational algorithms demonstrate quantum advantage. As an architect, understanding their structure reveals the design patterns you will reuse in quantum AI applications.

#### **The Three Canonical Algorithms**

**Deutsch-Jozsa.** Exponential speedup for determining if a function is constant or balanced. While not practically useful, it cleanly demonstrates quantum parallelism and interference. Implement it first — it builds every subsequent intuition.

**Grover's Search.** Quadratic speedup (O(√N) vs O(N)) for unstructured search. The oracle and diffusion operator pattern is the template for many quantum ML algorithms. Real-world application: database search, constraint

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 6**

satisfaction.

**Shor's Algorithm.** Exponential speedup for integer factorisation — the reason RSA encryption will eventually break under quantum attack. Requires QFT + phase estimation. Understand the circuit structure; full implementation requires hundreds of logical qubits.

_Architect's Note: Grover's oracle pattern is the direct ancestor of quantum neural network loss function encoding. Master it — you will use this mental model every week in Phase 2._

#### **Week 3 Schedule**

|**Day 1**|Implement Deutsch-Jozsa for 3 qubits. Verify for constant and balanced oracles.|
|---|---|
|**Day 2–3**|Implement Grover's algorithm for a 4-qubit search space. Experiment with different<br>numbers of iterations (the optimal isπ√N/4). Plot amplitude vs iteration to see the<br>sine-wave convergence.|
|**Day 4–5**|Study Shor's algorithm at the circuit level. Implement the 2-qubit toy version (factor<br>15). Understand phase kickback — the mechanism behind most quantum speedups.<br>Read the original Shor 1994 paper abstract.|
|**Weekend**|Checkpoint: Write a technical comparison of Grover vs classical binary search,<br>including complexity analysis and practical gate count estimates for near-term<br>hardware.|



###### **WEEK 4**

### **Quantum Hardware & Error Correction**

Real quantum hardware is noisy, limited in qubit count, and has short coherence times. Understanding this shapes every architectural decision you will make.

#### **Hardware Modalities**

**Superconducting (IBM, Google):** Fast gate times (~50ns). Short T2 (~100µs). Operates near absolute zero (15 mK). Current leader in qubit count (IBM 433Q Eagle).

**Trapped Ion (IonQ, Quantinuum):** Slower but higher fidelity. Longer coherence. All-to-all connectivity. Better for near-term algorithms.

**Photonic (PsiQuantum, Xanadu):** Room temperature possible. Naturally suited for quantum networking. Gaussian Boson Sampling advantage demonstrated.

**Neutral Atom (QuEra, Pasqal):** Highly configurable connectivity. Rapid scaling. Analog quantum simulation capability.

#### **Error Correction Essentials**

NISQ (Noisy Intermediate-Scale Quantum) devices are today's reality — 50–1000 physical qubits with error rates of 0.1–1% per gate. Fault-tolerant quantum computing requires quantum error correction (QEC), where many physical qubits encode one logical qubit. The surface code is the leading approach, requiring ~1000 physical qubits per logical qubit. This is the core reason quantum computers are not yet universally superior to classical

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 7**

##### ones.

|**Day 1–2**|Study the 3-qubit bit-flip code and phase-flip code. Implement in Qiskit. Understand<br>syndrome measurement — detecting errors without collapsing the logical qubit.|
|---|---|
|**Day 3**<br>**Day 4–5**|Read IBM's surface code roadmap. Study the threshold theorem. Understand why<br>error correction is the central unsolved engineering challenge in quantum computing.<br>Noise modelling in Qiskit: depolarising noise, T1/T2 decoherence, readout error. Run<br>noisy simulations. Implement zero-noise extrapolation (ZNE) as a simple error<br>mitigation technique.|
|**Weekend**|Phase 1 Capstone: Design a 2-page quantum system architecture for a simple search<br>problem, specifying hardware choice, error mitigation strategy, and classical-quantum<br>interface.|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 8**

###### **PHASE 2**

## **Quantum AI & Machine Learning**

Phase 2 is where your classical AI expertise meets quantum computing. You will learn to build quantum machine learning models that run on today's NISQ hardware, and explore the frontiers of quantum natural language processing and LLM integration.

###### **WEEK 5**

### **Classical ML Refresher Through a Quantum Lens**

Before building quantum ML models, you must deeply understand which classical ML operations have quantum analogues, and which do not. The quantum advantage is not universal — it is specific, conditional, and nuanced.

#### **Classical-to-Quantum Mapping**

|**Classical Operation**|**Quantum Analogue**|**Potential Advantage**|
|---|---|---|
|Matrix-vector multiply|Quantum matrix inversion (HHL)|Exponential (with caveats)|
|Kernel function evaluation|Quantum kernel (inner product in<br>Hilbert space)|Exponential feature space|
|Gradient descent|Parameter shift rule|Exact gradients without backprop|
|PCA / SVD|Quantum PCA (qPCA)|Potential<br>speedup<br>for<br>sparse<br>matrices|
|Random sampling|Quantum sampling (QMC)|Quadratic<br>via<br>Grover-based<br>amplitude estimation|
|Neural network layer|Variational quantum layer (VQL)|Exponential parameter space|



_Critical Caveat: The HHL algorithm for linear systems offers exponential speedup only under strict conditions: sparse matrices, efficient state preparation, and quantum-readable output. Always interrogate quantum speedup claims — dequantisation results (Tang 2019) showed many claimed speedups were achievable classically. Real advantage exists, but it requires careful problem selection._

|**Day 1–2**<br>**Day 3–4**|Review kernel methods and SVMs. Implement a classical RBF kernel SVM on a<br>synthetic dataset. This is the baseline you will quantum-enhance in Week 7.<br>Study the HHL algorithm conceptually. Implement small-scale (4x4) linear systems on<br>a quantum simulator. Benchmark vs NumPy linalg.solve.|
|---|---|
|**Day 5**|Read: 'Quantum Machine Learning' by Biamonte et al. (Nature 2017). Map every<br>claim to a specific quantum circuit or algorithm. Identify which claims have been<br>dequantised.|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 9**

**Weekend** Checkpoint: Produce a decision framework — a flowchart an architect uses to decide whether a given ML workload benefits from quantum acceleration.

###### **WEEK 6**

### **Variational Quantum Eigensolvers & QAOA**

Variational algorithms are the workhorses of NISQ-era quantum AI. They combine a parameterised quantum circuit (the ansatz) with a classical optimiser, creating a hybrid quantum-classical loop that is robust to noise.

#### **The VQE Architecture**

The Variational Quantum Eigensolver (VQE) finds the minimum eigenvalue of a Hamiltonian — critical for quantum chemistry and materials science. Its architecture is the template for all variational quantum ML:

1. Encode the problem as a Hamiltonian H (a Hermitian operator)

2. Choose an ansatz circuit U(θ) with trainable parameters θ

3. Prepare state |ψ(θ)I = U(θ)|0I on quantum hardware

4. Measure Iψ(θ)|H|ψ(θ)I as the cost function (expectation value)

5. Update θ classically using gradient descent or COBYLA/SPSA

6. Repeat until convergence — the minimum eigenvalue is found

#### **QAOA — Quantum Approximate Optimisation**

The Quantum Approximate Optimisation Algorithm (QAOA) solves combinatorial optimisation problems (MaxCut, TSP, portfolio optimisation) using an alternating cost/mixer layer structure. At depth p=∞, it finds the exact optimum. At finite depth, it provides approximate solutions that may outperform classical heuristics for specific problem instances.

|**Day 1–2**|Implement VQE for H2 molecule using Qiskit Nature. Use ParticleHoleTransformation<br>and UCCSD ansatz. Compare energy estimate with classical FCI result.|
|---|---|
|**Day 3–4**<br>**Day 5**<br>**Weekend**|Implement QAOA for MaxCut on a 6-node graph using PennyLane. Experiment with<br>p=1,2,3 layers. Visualise the energy landscape. Try COBYLA, SPSA, and Adam<br>optimisers — observe convergence differences.<br>Study barren plateaus: the vanishing gradient problem in deep variational circuits.<br>Read McClean et al. 2018. Implement layerwise training as a mitigation strategy.<br>Checkpoint: Solve a small portfolio optimisation problem (5 assets, quadratic<br>objective) using QAOA. Compare solution quality vs classical branch-and-bound.|



###### **WEEK 7**

### **Quantum Machine Learning — QNNs & Quantum Kernels**

This is the core of Quantum AI. Quantum Neural Networks and Quantum Kernel methods are the two primary paradigms for applying quantum computing to ML tasks.

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 10**

#### **Quantum Neural Networks (QNNs)**

A QNN is a parameterised quantum circuit (PQC) used as a trainable model. It encodes classical data into quantum states via a feature map, applies trainable rotation layers, and measures expectation values as outputs. Training uses the parameter shift rule — an exact gradient computation that requires only two circuit evaluations per parameter.

Key QNN Architectures: (1) Data re-uploading circuits — encode input at each layer for expressibility. (2) Quantum convolutional neural networks (QCNN) — exploit translational symmetry, proven to avoid barren plateaus. (3) Quantum Boltzmann Machines — quantum generalisation of RBMs.

#### **Quantum Kernel Methods**

Quantum kernels define an inner product in an exponentially large Hilbert space that is classically hard to compute. The quantum kernel K(x,x') = |Iφ(x)|φ(x')I|<sup>2</sup> can be plugged directly into classical SVMs. This is a compelling near-term advantage: the quantum device computes the kernel; the classical computer trains the SVM.

|**Day 1–2**|Build a binary classification QNN with PennyLane. Use AngleEmbedding for feature<br>encoding, StronglyEntanglingLayers for the ansatz, and PyTorch as the classical<br>optimiser. Train on the moons dataset.|
|---|---|
|**Day 3**|Implement a Quantum Kernel SVM using Qiskit's ZZFeatureMap + QuantumKernel +<br>QSVC. Compare accuracy and training time vs classical RBF SVM on the same<br>dataset.|
|**Day 4–5**|Study quantum advantage conditions for kernel methods (Liu et al. 2021). Design a<br>QCNN for MNIST (4x4 downsampled). Implement and train the 4-qubit version.|
|**Weekend**|Checkpoint: Head-to-head benchmark — QNN vs classical NN vs Quantum Kernel<br>SVM on a real-world tabular dataset. Document findings in a structured experimental<br>report.|



###### **WEEK 8**

### **Quantum NLP, LLM Integration & Generative Quantum AI**

The intersection of quantum computing and large language models is a nascent but rapidly evolving frontier. This week you will study both Quantum NLP (DisCoCat formalism) and practical LLM-quantum integration patterns.

#### **Quantum Natural Language Processing**

Quantinuum's lambeq library implements Quantum NLP using compositional categorical grammar (DisCoCat). Sentences are parsed into syntax trees, then mapped to quantum circuits where words are qubits and grammatical structure determines entanglement patterns. This gives language meaning a quantum geometric structure.

Emerging QNLP Applications: Sentiment analysis circuits (Lorenz et al. 2021, first QNLP experiment on real quantum hardware). Question answering via quantum semantic similarity. Quantum transformers — early theoretical work on quantum attention mechanisms.

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 11**

#### **LLM + Quantum Computing Integration Patterns**

**LLM as Quantum Circuit Designer:** Use GPT/Claude to generate Qiskit code from natural language problem descriptions. The LLM handles translation; the quantum device solves the problem.

**Quantum-Enhanced Embeddings:** Replace classical embedding layers with quantum feature maps for specific domains (molecular fingerprints, graph data).

**Quantum RAG:** Use quantum approximate nearest-neighbour search to retrieve documents for retrieval-augmented generation.

**Hybrid Inference:** Run attention heads on quantum co-processors, classical feed-forward layers on GPUs — theoretical framework exists, near-term realisation within 3–5 years.

|**Day 1–2**|Install lambeq. Parse 10 sentences into DisCoCat diagrams. Convert to quantum<br>circuits. Train a sentiment classifier using the ROTO optimiser on a Quantinuum<br>simulator.|
|---|---|
|**Day 3–4**|Build a proof-of-concept: use an LLM API (OpenAI or Anthropic) to generate Qiskit<br>circuits from problem descriptions. Validate 5 generated circuits. Study failure modes.|
|**Day 5**|Read: 'Quantum Self-Attention' (Li et al. 2023). Study the theoretical framework.<br>Design a quantum attention mechanism for a 4-token sequence — circuit only, no<br>implementation required.|
|**Weekend**|Phase 2 Capstone: Present a 10-slide architecture deck for a Quantum-Enhanced ML<br>system targeting a specific business domain of your choosing. Include dataset,<br>algorithm selection, hardware platform, and expected timeline to quantum advantage.|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 12**

###### **PHASE 3**

## **Mastery & Quantum Architecture**

Phase 3 operates at the Principal Architect level. You will design enterprise quantum systems, evaluate cloud platforms, navigate post-quantum security, and deliver a comprehensive capstone that demonstrates full-stack quantum AI mastery.

###### **WEEK 9**

### **Enterprise Quantum Architecture Patterns**

Quantum computers do not replace classical infrastructure — they augment it. The architect's job is to design the seam between quantum and classical systems correctly, balancing current hardware limitations against future-proofing.

#### **The Hybrid Quantum-Classical Architecture Stack**

|**Layer**|**Components**|**Your Responsibility**|
|---|---|---|
|Application|Business logic, API, UI|Problem formulation, quantum ROI|
|Orchestration|Job scheduler, workflow engine|Circuit queuing, hybrid execution|
|Quantum Runtime|Transpiler, error mitigation, sampler|Backend selection, shot budgets|
|Classical Compute|GPU cluster, CPU optimiser|Classical-quantum data handoff|
|Quantum Hardware|QPU (IBM/Google/IonQ/etc.)|Hardware benchmarking, topology|
|Network|Quantum internet (future)|Quantum<br>repeaters,<br>entanglement<br>distribution|



#### **Key Architectural Decisions**

**Problem Suitability:** Apply the quantum advantage decision framework from Week 5. Not every problem benefits. Start with combinatorial optimisation, quantum chemistry, and quantum simulation — these have the clearest near-term paths to advantage.

**Hardware Selection:** Match algorithm requirements to hardware strengths. High-fidelity gates → trapped ion. Low latency, many qubits → superconducting. Quantum networking → photonic. Always benchmark on your actual workload.

**Latency Budget:** Current cloud quantum access has 100ms–10s latency per circuit execution. Design workflows that batch circuits aggressively. Avoid quantum in the critical path of real-time systems.

**Data Loading Bottleneck:** Quantum RAM (QRAM) is largely theoretical. Classical-to-quantum data loading (state preparation) can negate speedup. Prefer problems where the quantum state has an efficient circuit preparation.

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 13**

|**Day 1–2**|Study IBM Quantum Network case studies. Pick two enterprise use cases (e.g.<br>pharmaceutical + logistics). Map to specific algorithms. Identify the classical-quantum<br>interface for each.|
|---|---|
|**Day 3–4**|Design a reference architecture for a Quantum-Classical ML Pipeline using AWS<br>Braket + SageMaker. Include data flow, circuit execution, model training loop, and<br>deployment.|
|**Day 5**|Cost modelling: estimate quantum vs classical compute costs for your pipeline at 1000<br>inference calls/day. At what problem size does quantum become cost-competitive?|
|**Weekend**|Checkpoint: Publish your reference architecture as a structured architecture decision<br>record (ADR). Include context, decision, rationale, and consequences.|



**WEEK 10**

### **Quantum Cloud Platforms & SDK Deep Dive**

You must be platform-fluent, not platform-locked. Each quantum cloud provider has distinct hardware, pricing, SDK capabilities, and roadmap commitments.

**IBM Quantum / Qiskit:** 127–433 qubit superconducting. Best ecosystem. Qiskit Runtime for hybrid. Free tier + premium. 2029 roadmap: 100K qubit system.

**Google Quantum AI / Cirq:** Willow (105Q, 2024). Focus on error correction research. Cirq SDK. Limited public access. Partnership-first model.

**AWS Braket:** Multi-provider: IonQ, Rigetti, OQC, QuEra. Pay-per-shot pricing. SageMaker integration. Ideal for multi-provider comparison.

**Azure Quantum:** IonQ, Quantinuum, Rigetti. Credits programme. Best Microsoft ecosystem integration. Q# language + Qiskit support.

**PennyLane (Xanadu):** Framework-first, hardware-agnostic. Best for QML research. Photonic hardware access via Borealis. Autodiff through quantum circuits.

|**Day 1**|Set up accounts: IBM Quantum, AWS Braket, Azure Quantum. Run the same Bell<br>state circuit on at least 3 different hardware backends. Compare fidelity, queue wait<br>time, and cost.|
|---|---|
|**Day 2–3**|Deep dive into Qiskit Runtime primitives: Sampler and Estimator. Implement a VQE<br>using Estimator with M3 error mitigation. Benchmark against AerSimulator with noise<br>model.|
|**Day 4**|AWS Braket: run a QAOA job using a hybrid job (managed classical optimiser +<br>quantum circuit execution). Monitor costs per shot.|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 14**

|**Day 5**|PennyLane: implement a QNN with automatic differentiation using torch.interface.<br>Run on the default.qubit simulator, then switch backend to an IBM device with one line<br>change. This is SDK-agnostic design.|
|---|---|
|**Weekend**|Checkpoint: Platform comparison report. 1-page executive summary recommending a<br>primary platform for your organisation's quantum programme, with evidence-based<br>rationale.|



###### **WEEK 11**

### **Quantum Security, Post-Quantum Cryptography & Compliance**

Shor's algorithm will eventually break RSA-2048, ECC, and Diffie-Hellman. NIST finalised the first post-quantum cryptography standards in 2024. As a Principal Architect, quantum security is an immediate compliance concern — not a future consideration.

#### **The Quantum Threat Timeline**

Cryptographically Relevant Quantum Computer (CRQC): estimated 2030–2035. Harvest Now, Decrypt Later (HNDL): adversaries are storing encrypted traffic TODAY to decrypt once CRQCs exist. Any data with >10 year sensitivity must be post-quantum secured NOW.

#### **NIST Post-Quantum Standards (2024)**

|**Standard**|**Algorithm**|**Use Case**<br>**Security Basis**|
|---|---|---|
|FIPS 203|ML-KEM (Kyber)|Key encapsulation<br>Module lattice|
|FIPS 204|ML-DSA (Dilithium)|Digital signatures<br>Module lattice|
|FIPS 205|SLH-DSA (SPHINCS+)|Digital signatures<br>Hash-based|
|FIPS 206|FN-DSA (Falcon)|Digital signatures<br>NTRU lattice|
|**Day 1–2**|Crypto inventory: list e<br>Classify as vulnerable (<br>your PQC migration bac|very cryptographic algorithm in your organisation's stack.<br>RSA, ECC, DH) or quantum-safe (AES-256, SHA-3). This is<br>klog.|
|**Day 3**|Implement ML-KEM key<br>a TLS 1.3 hybrid hand<br>encryption speed vs RSA|encapsulation using liboqs (Open Quantum Safe). Implement<br>shake (classical + PQC). Benchmark key generation and<br>-2048.|
|**Day 4**|Quantum Key Distributi<br>between QKD (physics-<br>each applies.|on (QKD): study BB84 protocol. Understand the difference<br>based key exchange) and PQC (math-based). Know when|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 15**

|**Day 5**|Compliance deep dive: NIST SP 800-208, NSA CNSA 2.0, EU Quantum Flagship<br>PQC guidance. Map compliance requirements to your organisation's regulatory<br>regime (FedRAMP, GDPR, HIPAA).|
|---|---|
|**Weekend**|Checkpoint: Draft a Quantum Security Transition Plan — a board-level document<br>covering threat timeline, asset prioritisation, migration roadmap (2026–2030), and<br>budget estimate.|



###### **WEEK 12**

### **Capstone — Full Quantum AI System Design**

Week 12 is your synthesis week. You will design and partially implement a complete Quantum AI system, demonstrating mastery across all three phases. This is your portfolio piece — the work you show in interviews, present at conferences, and build your quantum reputation on.

#### **Capstone Options (Choose One)**

#### **Option A: Quantum Drug Discovery Pipeline**

Build a VQE-based molecular energy estimation pipeline for a small drug candidate. Include: molecule encoding (Jordan-Wigner/Parity mapping), VQE with UCCSD ansatz, error mitigation, and a classical ML wrapper that uses quantum energy estimates as features for property prediction.

#### **Option B: Quantum-Enhanced Portfolio Optimisation**

Implement QAOA for a 10-asset Markowitz optimisation. Compare against classical solvers. Include a quantum risk model using quantum covariance estimation. Deploy as a REST API with AWS Braket backend.

#### **Option C: Quantum NLP Classification System**

Build a QNLP pipeline using lambeq: text preprocessing, DisCoCat parsing, quantum circuit generation, training, and evaluation. Target 4-class news classification. Include quantum vs classical accuracy comparison.

#### **Option D: Custom Domain (Architect's Choice)**

Propose your own Quantum AI application in your industry domain. Must include: problem formulation, algorithm selection with justification, hardware platform recommendation, hybrid architecture diagram, and working proof-of-concept code.

#### **Capstone Deliverables**

- Architecture Document (8–12 pages): problem statement, solution architecture, algorithm selection rationale, hardware platform choice, deployment model, security considerations

- Working Code Repository: GitHub repo with Qiskit/PennyLane implementation, unit tests, README with setup instructions

- Benchmark Report: quantum vs classical comparison, error analysis, cost estimate at production scale

- Executive Presentation (15 slides): business case, technical approach, results, limitations, roadmap to production

**Day 1–2** Finalise problem selection. Complete architecture document. Set up repository structure. Implement data pipeline and classical baseline.

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 16**

|**Day 3–4**|Implement quantum components. Run on simulator. Benchmark against classical<br>baseline. Iterate on algorithm parameters.|
|---|---|
|**Day 5**|Run on real quantum hardware (at least one backend). Apply error mitigation.<br>Document noise impact. Write benchmark report.|
|**Weekend**|Final: Complete executive presentation. Record 5-minute demo video. Publish to<br>GitHub. Share in IBM Quantum Network / QML community forums.|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 17**

###### **90-DAY MILESTONE MAP**

## **Progress Checkpoints & Success Metrics**

|**Milestone**|**Deliverable**|**Metric**|
|---|---|---|
|End of Week 2|Run<br>quantum<br>circuits<br>on<br>real<br>IBM<br>hardware; explain all single-qubit gates|Circuit<br>on<br>ibmq_manila<br>with<br>>95% correct measurement|
|End of Week 4|Design<br>and<br>explain<br>quantum<br>error<br>mitigation strategy|Phase<br>1<br>architecture<br>brief<br>reviewed by a peer|
|End of Week 6|Implement and train VQE or QAOA on a<br>real problem|Energy estimate within 5% of<br>classical reference|
|End of Week 8|Build<br>and<br>train<br>a<br>QNN<br>for<br>binary<br>classification|QNN accuracy within 5% of<br>classical NN baseline|
|End of Week 10|Compare 3 quantum cloud platforms on<br>same workload|Platform recommendation doc<br>approved by a technical reviewer|
|End of Week 11|Complete PQC migration plan for a realistic<br>system|All<br>vulnerable<br>crypto<br>assets<br>catalogued and prioritised|
|End of Week 12|Deliver full Quantum AI system capstone|GitHub repo + architecture doc +<br>executive presentation|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 18**

###### **APPENDIX A**

## **Mathematics Reference**

#### **Complex Numbers**

Quantum amplitudes are complex. Know: |z|<sup>2</sup> = probability, z = a + bi, Euler's formula e<sup>iθ</sup> = cosθ + i·sinθ. The phase e<sup>iθ</sup> does not affect measurement probability but is critical for interference.

#### **Linear Algebra**

Quantum states are unit vectors in complex Hilbert space. Quantum operations are unitary matrices (U†U = I). Eigenvalues and eigenvectors are the language of measurement. Inner product Iψ|φI = probability amplitude.

#### **Tensor Products**

Multi-qubit states live in tensor product spaces: |ψI ⊗ |φI = |ψφI. An n-qubit system has a 2<sup>n</sup> -dimensional state space. Entangled states cannot be written as tensor products.

#### **Probability Theory**

Born rule: P(outcome) = |Ioutcome|ψI|<sup>2</sup> . Expectation value: IHI = Iψ|H|ψI. This is your cost function in VQE.

#### **Fourier Analysis**

The Quantum Fourier Transform (QFT) is the quantum analogue of the discrete Fourier transform. It is exponentially faster (O(n<sup>2</sup> ) vs O(n·2<sup>n</sup> )) and underlies Shor's algorithm and phase estimation.

#### **Optimisation**

Classical optimisers used in variational algorithms: gradient-based (ADAM, SGD via parameter shift rule), gradient-free (COBYLA, Nelder-Mead, SPSA). Know when to use each based on noise level.

Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 19**

###### **APPENDIX B**

## **Curated Resources & Communities**

### **Textbooks & Courses**

|**Resource**|**Type**|**Why It Matters**|
|---|---|---|
|Nielsen<br>&<br>Chuang:<br>Quantum<br>Computation<br>and<br>Quantum<br>Information|Book|The definitive reference. Read Chapters 1–5 and<br>10 for this programme.|
|IBM<br>Quantum<br>Learning<br>(learning.quantum.ibm.com)|Online<br>Course|Free,<br>hands-on,<br>integrates<br>with<br>real<br>IBM<br>hardware. Start here.|
|PennyLane<br>Tutorials<br>(pennylane.ai/qml)|Tutorial|Best QML tutorials available. Covers VQE, QNN,<br>kernels, QNLP.|
|Qiskit Textbook (qiskit.org/learn)|Online<br>Book|Comprehensive Qiskit-focused curriculum with<br>interactive notebooks.|
|Quantum<br>Machine<br>Learning<br>by<br>Wittek|Book|Bridges classical ML and quantum. Good for ML<br>practitioners.|
|MIT 8.370x: Quantum Information<br>Science|MOOC|Rigorous<br>physics-based<br>treatment.<br>Recommended for deeper foundations.|
|arXiv quant-ph section|Research|New quantum computing papers posted daily.<br>Follow Maria Schuld, Nathan Killoran, John<br>Preskill.|



### **Communities & Networks**

|**Resource**|**Type**|**Why It Matters**|
|---|---|---|
|IBM Quantum Network|Community|Access to real hardware, researchers, and<br>enterprise partners|
|Unitary Fund (unitary.fund)|Community|Open-source quantum software grants and Slack<br>community|
|QML Slack / Discord|Community|Active QML researcher communities, paper<br>discussions|
|Quantum Open Source Foundation|Community|QOSF mentorship programme — structured<br>3-month quantum projects|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 20**

|IEEE Quantum Week|Conference|Annual conference — submit your capstone as a|
|---|---|---|
|||poster|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 21**

###### **APPENDIX C**

## **Career Roadmap & Certifications**

The quantum computing talent market is significantly undersupplied. A Principal Architect with hands-on quantum AI skills commands significant premium and is positioned for roles at the intersection of strategy and implementation.

### **Target Roles After 90 Days**

**Quantum Solutions Architect:** IBM, AWS, Azure Quantum, Quantinuum — advising enterprise clients on quantum strategy and implementation.

**Quantum AI Research Engineer:** National labs (Argonne, Oak Ridge), Google DeepMind Quantum, Quantinuum — developing next-generation QML algorithms.

**Principal Quantum Architect:** Financial institutions, pharmaceutical companies, aerospace — building enterprise quantum programmes from scratch.

**Quantum Security Architect:** Government, defence, finance — designing PQC migration programmes and quantum-safe infrastructure.

### **Certifications**

|**Resource**|**Type**|**Why It Matter**|**s**||
|---|---|---|---|---|
|IBM Certified Associate Developer –<br>Quantum Computation|Cert|Best entry-level quantum certi<br>Qiskit proficiency.|fication.|Validates|
|IBM Certified Developer – Quantum<br>Computation|Cert|Professional<br>level.<br>Valid<br>implementation skills.|ates|algorithm|
|Quantum<br>Computing<br>Foundation<br>(edX/MIT)|Course<br>Cert|Academic<br>credentialing<br>fundamentals.|for|quantum|
|NIST<br>PQC<br>Implementation<br>Credential (emerging)|Cert|Validates<br>post-quantum<br>implementation skills.|cry|ptography|
|QOSF Mentorship Programme|Programme|3-month structured quantum<br>researcher mentor.|projec|t with a|



Principal Architect Edition  •  3-Month Mastery Program  •  2026

**QUANTUM COMPUTING & AI IN QUANTUM — ZERO TO MASTERY**

**Page 22**

###### **APPENDIX D**

## **Tooling Cheat Sheet**

|**Tool**|**Category**|**Install**|**Primary Use**|
|---|---|---|---|
|Qiskit|SDK|pip install qiskit|IBM hardware, circuit building,<br>simulation|
|PennyLane|SDK/ML|pip install pennylane|QML,<br>autodiff,<br>hardware-agnostic|
|Cirq|SDK|pip install cirq|Google hardware, research<br>circuits|
|lambeq|NLP|pip install lambeq|Quantum NLP, DisCoCat|
|Qiskit Nature|Chemistry|pip install qiskit-nature|VQE for molecular simulation|
|Amazon Braket<br>SDK|Cloud|pip install amazon-braket-sdk|AWS multi-provider access|
|Q#|Language|dotnet<br>tool<br>install<br>-g<br>Microsoft.Quantum.IQSharp|Azure<br>Quantum,<br>algorithm<br>design|
|Mitiq|Error Mitigation|pip install mitiq|ZNE,<br>PEC,<br>CDR<br>error<br>mitigation|
|liboqs|PQC|see openquantumsafe.org|Post-quantum<br>crypto<br>implementation|
|QuTiP|Simulation|pip install qutip|Quantum system dynamics,<br>open systems|



_You are now equipped with everything a Principal Architect needs to excel in quantum computing and AI in quantum. The field moves fast — subscribe to the arXiv quant-ph daily digest, follow IBM Quantum and Google Quantum AI updates, and contribute to open-source quantum projects. The quantum era is not coming. It is here. Go build it._

Principal Architect Edition  •  3-Month Mastery Program  •  2026
