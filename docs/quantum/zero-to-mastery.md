---
title: "Quantum AI — Zero to Mastery"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["quantum"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Quantum AI: Zero to Mastery

**Principal Architect Track · 12-Week Programme · 2026 Edition**

> The quantum era is not coming — it is here. By 2030, quantum advantage will disrupt cryptography, drug discovery, logistics optimisation, financial modelling, and machine learning itself. This guide takes you from first principles to production-grade quantum system design.

---

## Why Quantum Now?

The second quantum revolution is commercial. McKinsey's 2026 Quantum Technology Monitor found **a third of large enterprises allocate >$10M annually to quantum initiatives**. Quantum computing companies collectively crossed **$1B in revenue in 2025**, projected to reach $4.4B by 2028.

For a Principal Architect, this matters on three axes:

| Axis | Classical Limit | Quantum Opportunity |
| ------ | ---------------- | --------------------- |
| **Optimisation** | NP-hard problems scale exponentially | QAOA approximates solutions on NISQ hardware today |
| **ML / AI** | Diminishing returns from model scaling | QNNs & quantum kernels access exponentially larger feature spaces |
| **Security** | RSA-2048 / ECC break under Shor's algorithm (2030–2035) | Post-quantum cryptography is an immediate compliance requirement |

Cross-reference: [AI Foundations](../ai-foundations/index.md) · [Enterprise Architecture Patterns](../enterprise-architecture/ai-architecture/enterprise-ai-architecture-patterns.md)

---

## Programme Map

```
PHASE 1 — Foundations (Weeks 1–4)
  Week 1 → Quantum Mechanics Primer
  Week 2 → Qubits, Gates & Circuits
  Week 3 → Quantum Algorithms
  Week 4 → Hardware & Error Correction

PHASE 2 — Quantum AI (Weeks 5–8)
  Week 5 → Classical ML Through a Quantum Lens
  Week 6 → VQE & QAOA
  Week 7 → QNNs & Quantum Kernel Methods
  Week 8 → QNLP, Agentic AI & LLM Integration

PHASE 3 — Mastery & Architecture (Weeks 9–12)
  Week 9  → Enterprise Quantum Architecture Patterns
  Week 10 → Quantum Cloud Platforms & SDKs
  Week 11 → Post-Quantum Security & Compliance
  Week 12 → Capstone — Full Quantum AI System Design

APPENDICES
  A → Mathematics Reference
  B → Real-World Use Cases & Solution Designs
  C → Quantum × Agentic AI
  D → Career Roadmap & Certifications
  E → Tooling Cheat Sheet
```

---

## Phase 1 — Foundations

### Week 1: Quantum Mechanics Primer for Engineers

You do not need a physics PhD. You need a working engineer's understanding of the four phenomena that make quantum computing possible.

=== "Superposition"

    A qubit can exist in a linear combination of |0⟩ and |1⟩ simultaneously:

    ```
    |ψ⟩ = α|0⟩ + β|1⟩   where  |α|² + |β|² = 1
    ```

    Unlike classical probability, α and β are **complex amplitudes**, enabling interference. This is what gives quantum computers exponential state space.

=== "Entanglement"

    Two or more qubits can share a quantum state that cannot be described independently. Measuring one qubit instantly determines the state of its entangled partner, regardless of distance. This enables quantum teleportation, superdense coding, and distributed quantum computing.

=== "Interference"

    Quantum amplitudes can **constructively reinforce correct answers** and destructively cancel wrong ones — this is how quantum algorithms achieve speedup. It is analogous to wave interference in optics.

=== "Measurement"

    Measuring a qubit collapses the superposition, yielding |0⟩ with probability |α|² or |1⟩ with probability |β|². Quantum algorithms are designed so that correct answers have high probability *before* measurement.

**Week 1 Schedule**

- Days 1–2: Read Nielsen & Chuang Chapters 1–3. Focus on Dirac notation, Bloch sphere, bra-ket algebra.
- Days 3–4: IBM Quantum Learning Module 1 (free). Set up Qiskit. Run your first quantum circuit.
- Day 5: Study the Bloch sphere. Every single-qubit gate is a rotation on it.
- Weekend: Implement superposition and entanglement circuits. Verify with statevector simulator.

---

### Week 2: Qubits, Gates & Quantum Circuits

Quantum gates are reversible and correspond to rotations on the Bloch sphere.

| Gate | Symbol | Action | Matrix |
| ------ | -------- | -------- | -------- |
| Pauli-X (NOT) | X | Flips \|0⟩↔\|1⟩ | `[[0,1],[1,0]]` |
| Hadamard | H | Creates superposition | `[[1,1],[1,-1]]/√2` |
| CNOT | CX | Entangles two qubits | Flips target if control=\|1⟩ |
| Toffoli | CCX | 3-qubit universal | Flips target if both controls=\|1⟩ |
| Phase S, T | S/T | Rotates phase of \|1⟩ | Diagonal `[[1,0],[0,i]]` |
| Rotation | Rx/Ry/Rz | Parameterised rotations | Foundation of variational circuits |

```python
from qiskit import QuantumCircuit

# Bell state — 2-qubit entanglement
qc = QuantumCircuit(2)
qc.h(0)        # superposition
qc.cx(0, 1)   # entangle
qc.measure_all()
print(qc.draw())
```

**Week 2 Schedule**

- Days 1–2: Implement all Pauli gates, H, CNOT. Visualise on Bloch sphere.
- Days 3–4: Build Bell state, GHZ state. Study Quantum Fourier Transform (QFT) circuit.
- Day 5: Circuit transpilation, basis gates, noise-aware optimisation. Run on real IBM hardware vs simulator.
- Weekend: Implement 3-qubit QFT. Compare transpiled output on a real IBM backend.

---

### Week 3: Quantum Algorithms — Grover, Shor, Deutsch-Jozsa

| Algorithm | Problem | Speedup | Architect's Note |
| ----------- | --------- | --------- | ----------------- |
| **Deutsch-Jozsa** | Is a function constant or balanced? | Exponential (1 query vs N/2) | First proof of quantum advantage. Understand the oracle pattern. |
| **Grover's** | Unstructured search in N elements | Quadratic (√N vs N) | Oracle pattern is the ancestor of QNN loss encoding. |
| **Shor's** | Integer factorisation | Exponential | Why RSA will break. Requires QFT + phase estimation. |
| **QAOA** | Combinatorial optimisation | Approximate near-term | Production-relevant today. Builds on Grover's oracle concept. |

```python
from qiskit import QuantumCircuit
from qiskit.circuit.library import GroverOperator, PhaseOracle

# Grover's search — 2-qubit example targeting |11⟩
oracle = PhaseOracle('x0 & x1')
grover_op = GroverOperator(oracle)

qc = QuantumCircuit(2)
qc.h([0, 1])
qc.compose(grover_op, inplace=True)
qc.measure_all()
```

!!! tip "Architect's Note"
    Grover's oracle pattern is the direct ancestor of quantum neural network loss function encoding. Master it — you will use this mental model every week in Phase 2.

---

### Week 4: Quantum Hardware & Error Correction

#### Hardware Modalities

| Platform | Provider | Gate Time | Coherence | Connectivity | Best For |
| ---------- | ---------- | ----------- | ----------- | -------------- | ---------- |
| **Superconducting** | IBM, Google | ~50 ns | ~100 µs | Nearest-neighbour | Large qubit count, fast iteration |
| **Trapped Ion** | IonQ, Quantinuum | ~1 ms | Seconds | All-to-all | High fidelity, near-term algorithms |
| **Photonic** | Xanadu | Room temp | Short | Gaussian boson sampling | QML, continuous-variable QC |
| **Neutral Atom** | QuEra | ~µs | ~seconds | Reconfigurable | Optimisation, simulation |
| **Topological** | Microsoft | TBD | Very long (theoretical) | TBD | Fault-tolerant future |

#### Error Mitigation (NISQ Era)

```python
from mitiq import zne
from mitiq.interface.qiskit import from_qiskit

# Zero-Noise Extrapolation — run at multiple noise levels, extrapolate to zero
mitigated_result = zne.execute_with_zne(
    circuit=qc,
    executor=my_executor,
    factory=zne.RichardsonFactory(scale_factors=[1, 2, 3])
)
```

**Key error mitigation techniques:**

- **ZNE (Zero-Noise Extrapolation):** Run at scaled noise, extrapolate to zero
- **PEC (Probabilistic Error Cancellation):** Model and invert noise channel
- **Twirling:** Convert coherent noise to stochastic (easier to model)
- **QCNN (Quantum Convolutional NN):** Architecture that avoids barren plateaus

**Phase 1 Capstone:** Design a 2-page quantum system architecture for a simple search problem — specify hardware choice, error mitigation strategy, and classical-quantum interface.

---

## Phase 2 — Quantum AI & Machine Learning

### Week 5: Classical ML Through a Quantum Lens

Before building quantum ML models, understand which classical ML operations have quantum analogues.

| Classical Operation | Quantum Analogue | Potential Advantage |
| -------------------- | ----------------- | --------------------- |
| Matrix-vector multiply | Quantum matrix inversion (HHL) | Exponential (with strict caveats) |
| Kernel function | Quantum kernel (Hilbert space inner product) | Exponential feature space |
| Gradient descent | Parameter shift rule | Exact gradients without backprop |
| PCA / SVD | Quantum PCA (qPCA) | Potential speedup for sparse matrices |
| Neural network layer | Variational quantum layer (VQL) | Exponential parameter space |
| Random sampling | Quantum sampling (QMC) | Quadratic via amplitude estimation |

!!! warning "Critical Caveat"
    The HHL algorithm offers exponential speedup **only under strict conditions**: sparse matrices, efficient state preparation, and quantum-readable output. Dequantisation results (Tang 2019) showed many claimed speedups were achievable classically. Real advantage exists but requires careful problem selection.

**Quantum Advantage Decision Flowchart**

```
Is your problem classically intractable at scale?
  └─ No → Use classical ML
  └─ Yes → Is it optimisation, simulation, or kernel-based?
       └─ No → Unclear advantage today; monitor research
       └─ Yes → Is your data efficiently encodable as quantum states?
            └─ No → Quantum-inspired (tensor networks) may help
            └─ Yes → Which type?
                 ├─ Combinatorial optimisation → QAOA
                 ├─ Quantum chemistry / molecular sim → VQE
                 ├─ High-dimensional kernel learning → Quantum kernel SVM
                 └─ Classification / regression → QNN with PennyLane
```

---

### Week 6: Variational Quantum Eigensolvers & QAOA

#### VQE Architecture

The Variational Quantum Eigensolver finds the minimum eigenvalue of a Hamiltonian — the template for all variational quantum ML:

```python
from qiskit_nature.second_q.drivers import PySCFDriver
from qiskit_nature.second_q.mappers import JordanWignerMapper
from qiskit.algorithms.minimum_eigensolvers import VQE
from qiskit.algorithms.optimizers import COBYLA
from qiskit.circuit.library import EfficientSU2

# 1. Encode molecule as Hamiltonian
driver = PySCFDriver(atom="H .0 .0 .0; H .0 .0 0.735")
problem = driver.run()
mapper = JordanWignerMapper()
hamiltonian = mapper.map(problem.second_q_ops()[0])

# 2. Choose ansatz
ansatz = EfficientSU2(hamiltonian.num_qubits, reps=2)

# 3. Run VQE
vqe = VQE(ansatz=ansatz, optimizer=COBYLA(), estimator=estimator)
result = vqe.compute_minimum_eigenvalue(hamiltonian)
print(f"Ground state energy: {result.eigenvalue:.4f} Hartree")
```

#### QAOA for Combinatorial Optimisation

```python
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit.algorithms import QAOA

# MaxCut on a 6-node graph
qaoa = QAOA(sampler=sampler, optimizer=COBYLA(), reps=3)
optimizer = MinimumEigenOptimizer(qaoa)
result = optimizer.solve(max_cut_problem)
```

**VQE vs QAOA decision:**

- **VQE** → quantum chemistry, materials, drug discovery (continuous eigenvalue problem)
- **QAOA** → scheduling, routing, portfolio optimisation, MaxCut (discrete combinatorial)

---

### Week 7: Quantum Neural Networks & Kernel Methods

#### QNN Architecture

A QNN is a parameterised quantum circuit (PQC) used as a trainable model.

```python
import pennylane as qml
import torch

n_qubits = 4
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev, interface="torch")
def qnn_circuit(inputs, weights):
    # Feature encoding
    qml.AngleEmbedding(inputs, wires=range(n_qubits))
    # Trainable layers
    qml.StronglyEntanglingLayers(weights, wires=range(n_qubits))
    # Measurement
    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]

# Wrap as PyTorch layer
weight_shapes = {"weights": (3, n_qubits, 3)}
qlayer = qml.qnn.TorchLayer(qnn_circuit, weight_shapes)
model = torch.nn.Sequential(qlayer, torch.nn.Linear(n_qubits, 1))
```

#### Quantum Kernel SVM

```python
from qiskit.circuit.library import ZZFeatureMap
from qiskit_machine_learning.kernels import FidelityQuantumKernel
from sklearn.svm import SVC

# Quantum kernel: K(x,x') = |⟨ψ(x)|ψ(x')⟩|²
feature_map = ZZFeatureMap(feature_dimension=2, reps=2)
quantum_kernel = FidelityQuantumKernel(feature_map=feature_map)

svc = SVC(kernel=quantum_kernel.evaluate)
svc.fit(X_train, y_train)
```

**Key QNN Architectures:**

| Architecture | Use Case | Advantage |
| ------------- | ---------- | ----------- |
| Data re-uploading | General classification | Expressibility via repeated encoding |
| QCNN | Structured spatial data | Avoids barren plateaus, translationally symmetric |
| Quantum Boltzmann Machine | Generative modelling | Quantum generalisation of RBMs |
| Quantum Kernel SVM | High-dimensional kernels | Classically hard kernel computed on QPU |

---

### Week 8: QNLP, Agentic AI & LLM Integration

#### Quantum Natural Language Processing

```python
import lambeq
from lambeq import BobcatParser, IQPAnsatz, AtomicType

parser = BobcatParser()
ansatz = IQPAnsatz({AtomicType.NOUN: 1, AtomicType.SENTENCE: 1}, n_layers=1)

sentences = ["John likes Mary", "Alice loves Bob"]
diagrams = parser.sentences2diagrams(sentences)
circuits = [ansatz(d) for d in diagrams]
```

#### LLM × Quantum Integration Patterns

| Pattern | Description | Timeline |
| --------- | ------------- | ---------- |
| **LLM as Circuit Designer** | Use Claude/GPT to generate Qiskit from natural language | Available now |
| **Quantum-Enhanced Embeddings** | Replace classical embeddings with quantum feature maps for molecular/graph data | NISQ-era |
| **Quantum RAG** | Quantum approximate nearest-neighbour search for retrieval | 2–3 years |
| **Hybrid Inference** | Quantum attention heads + classical feed-forward on GPU | 3–5 years |
| **Quantum Agent Memory** | Quantum associative memory (Hopfield networks) for agent state | Research stage |

Cross-reference: [Agentic AI Systems](../agentic-systems/index.md) · [Knowledge & RAG](../knowledge-engineering/knowledge/index.md)

```python
# LLM-as-Circuit-Designer pattern
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": "Write a Qiskit circuit implementing Grover's algorithm for a 3-qubit "
                   "search space targeting |101⟩. Include measurements."
    }]
)
# Validate and execute the generated circuit
exec(response.content[0].text)
```

**Phase 2 Capstone:** 10-slide architecture deck for a Quantum-Enhanced ML system — dataset, algorithm selection, hardware platform, and expected timeline to quantum advantage.

---

## Phase 3 — Mastery & Quantum Architecture

### Week 9: Enterprise Quantum Architecture Patterns

#### The Hybrid Quantum-Classical Stack

| Layer | Components | Architect's Responsibility |
| ------- | ------------ | --------------------------- |
| **Application** | Business logic, API, UI | Problem formulation, quantum ROI |
| **Orchestration** | Job scheduler, workflow engine | Circuit queuing, hybrid execution |
| **Quantum Runtime** | Transpiler, error mitigation, sampler | Backend selection, shot budgets |
| **Classical Compute** | GPU cluster, CPU optimiser | Classical-quantum data handoff |
| **Quantum Hardware** | QPU (IBM/Google/IonQ/QuEra) | Hardware benchmarking, topology matching |
| **Network** | Quantum internet (future) | Repeaters, entanglement distribution |

#### Reference Architecture: Hybrid Quantum-Classical ML Pipeline

```
┌─────────────────────────────────────────────────────────┐
│                    API Gateway / Orchestrator            │
│              (FastAPI + LangGraph / LangChain)           │
└──────────────────────────┬──────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
   │  Classical  │  │  Quantum Job │  │  Classical   │
   │  Pre-proc   │  │   Scheduler  │  │  Post-proc   │
   │ (SageMaker) │  │  (Qiskit /   │  │  (sklearn /  │
   └──────┬──────┘  │  Braket SDK) │  │  PyTorch)    │
          │         └──────┬───────┘  └──────┬───────┘
          │                │                  │
          │         ┌──────▼───────┐          │
          │         │  QPU Backend │          │
          │         │ IBM/IonQ/AWS │          │
          │         └──────┬───────┘          │
          │                │                  │
          └────────────────┼──────────────────┘
                           ▼
                   ┌───────────────┐
                   │ Results Store │
                   │  + Monitoring │
                   └───────────────┘
```

Cross-reference: [AI Harness & Orchestration](../enterprise-architecture/ai-architecture/ai-harness-architecture-orchestration.md) · [Agent Interoperability](../enterprise-architecture/ai-architecture/agent-interoperability-orchestration.md)

#### Key Architectural Decisions

**Problem Suitability Checklist**

- [ ] Is the problem classically intractable at target scale?
- [ ] Does it map to optimisation, quantum chemistry, or kernel learning?
- [ ] Can input data be efficiently encoded as quantum states?
- [ ] Is the quantum output classically interpretable?
- [ ] Does the circuit depth fit within hardware coherence time?

**Hardware Selection Matrix**

| Requirement | Best Choice | Why |
| ------------- | ------------ | ----- |
| High gate fidelity | IonQ / Quantinuum | Trapped-ion all-to-all connectivity |
| Large qubit count | IBM (433Q Eagle) | Superconducting scalability |
| QML research | PennyLane + any backend | Hardware-agnostic autodiff |
| Multi-provider comparison | AWS Braket | IonQ + Rigetti + QuEra + OQC |
| Microsoft ecosystem | Azure Quantum | Q# + Qiskit + credits programme |
| Quantum networking | QuEra | Neutral-atom reconfigurable topology |

---

### Week 10: Quantum Cloud Platforms & SDK Deep Dive

| Platform | Qubits | SDK | Pricing Model | Best For |
| ---------- | -------- | ----- | -------------- | ---------- |
| **IBM Quantum** | 127–433Q | Qiskit v1.x | Free tier + Premium | Ecosystem maturity, Qiskit Runtime |
| **Google Quantum AI** | 105Q Willow | Cirq | Partnership only | Error correction research |
| **AWS Braket** | Multi-provider | braket-sdk | Pay-per-shot | Multi-provider, SageMaker integration |
| **Azure Quantum** | Multi-provider | Q# / Qiskit | Credits + PAYG | Microsoft stack, hybrid HPC |
| **PennyLane** | Framework-agnostic | PennyLane | Open source | QML, autodiff, hardware-agnostic design |

```python
# SDK-agnostic design with PennyLane — switch backend in one line
import pennylane as qml

# Local sim
dev = qml.device("default.qubit", wires=4)

# Switch to IBM
# dev = qml.device("qiskit.ibmq", wires=4, backend="ibm_nairobi")

# Switch to AWS Braket
# dev = qml.device("braket.aws.qubit", device_arn="arn:aws:braket:::device/quantum-simulator/amazon/sv1", wires=4)

@qml.qnode(dev)
def circuit(x):
    qml.AngleEmbedding(x, wires=range(4))
    qml.StronglyEntanglingLayers(weights, wires=range(4))
    return qml.expval(qml.PauliZ(0))
```

---

### Week 11: Post-Quantum Security & Compliance

#### The Quantum Threat Timeline

```
2026 ──── NOW ──── Harvest Now, Decrypt Later (HNDL) attacks in progress
                  Any data with >10 year sensitivity needs PQC migration TODAY

2028 ──────────── Quantum supremacy on more problem classes expected

2030–2035 ──────── Cryptographically Relevant Quantum Computer (CRQC) estimated
                  RSA-2048, ECC, Diffie-Hellman break under Shor's algorithm
```

#### NIST Post-Quantum Standards (2024)

| Standard | Algorithm | Use Case | Security Basis |
| ---------- | ----------- | ---------- | --------------- |
| **FIPS 203** | ML-KEM (Kyber) | Key encapsulation | Module lattice |
| **FIPS 204** | ML-DSA (Dilithium) | Digital signatures | Module lattice |
| **FIPS 205** | SLH-DSA (SPHINCS+) | Digital signatures | Hash-based |
| **FIPS 206** | FN-DSA (Falcon) | Digital signatures | NTRU lattice |

```python
# PQC implementation using liboqs (Open Quantum Safe)
import oqs

# ML-KEM key encapsulation
with oqs.KeyEncapsulation("ML-KEM-768") as kem:
    public_key = kem.generate_keypair()
    ciphertext, shared_secret_server = kem.encap_secret(public_key)
    shared_secret_client = kem.decap_secret(ciphertext)

assert shared_secret_server == shared_secret_client
```

**PQC Migration Checklist**

- [ ] Crypto inventory: classify all algorithms (vulnerable: RSA, ECC, DH vs safe: AES-256, SHA-3)
- [ ] Identify data with >10 year sensitivity — prioritise for immediate migration
- [ ] Implement hybrid TLS 1.3 (classical + PQC in parallel)
- [ ] Update certificate infrastructure to Dilithium/Falcon signatures
- [ ] Map compliance: NIST SP 800-208, NSA CNSA 2.0, EU Quantum Flagship

Cross-reference: [AI Security & Governance](../ai-security-governance/index.md) · [Security Architecture & Guardrails](../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails.md)

---

### Week 12: Capstone — Full Quantum AI System Design

Choose one of four tracks for your portfolio capstone:

=== "Option A: Drug Discovery"

    **VQE-Based Molecular Energy Estimation Pipeline**

    - Molecule encoding (Jordan-Wigner / Parity mapping)
    - VQE with UCCSD ansatz for ground state energy
    - Error mitigation with ZNE
    - Classical ML wrapper using quantum energy estimates as features

    **Target metric:** Energy estimate within 5% of classical FCI result on H₂, LiH

=== "Option B: Portfolio Optimisation"

    **QAOA Quantum Portfolio Optimiser**

    - 10-asset Markowitz optimisation via QAOA
    - Quantum covariance estimation for risk modelling
    - Classical solver comparison (CPLEX / Gurobi baseline)
    - REST API deployment with AWS Braket backend

    **Target metric:** QAOA solution within 10% of classical optimal for 10 assets

=== "Option C: Quantum NLP"

    **QNLP Text Classification System**

    - Text preprocessing + DisCoCat parsing with lambeq
    - Quantum circuit generation and training
    - 4-class news classification
    - Quantum vs classical accuracy comparison

    **Target metric:** >75% accuracy on test set

=== "Option D: Custom Domain"

    **Architect's Choice — Your Industry**

    Propose a Quantum AI application in your domain. Must include:
    - Problem formulation with quantum advantage justification
    - Algorithm selection with alternatives considered
    - Hybrid architecture diagram
    - Error mitigation strategy
    - Hardware platform selection with cost model

---

## Appendix A — Mathematics Reference

=== "Complex Numbers"

    Quantum amplitudes are complex. Key identities:
    - `|z|² = probability`
    - `z = a + bi`
    - `e^{iθ} = cosθ + i·sinθ` (Euler's formula)
    - Phase `e^{iθ}` does not affect measurement probability but is critical for interference

=== "Linear Algebra"

    - Quantum states are **unit vectors in complex Hilbert space**
    - Quantum operations are **unitary matrices** (U†U = I — always reversible)
    - Eigenvalues and eigenvectors are the language of measurement
    - Inner product `⟨φ|ψ⟩ = probability amplitude`

=== "Tensor Products"

    Multi-qubit states live in tensor product spaces:
    - `|ψ⟩ ⊗ |φ⟩ = |ψφ⟩`
    - An n-qubit system has a **2ⁿ-dimensional state space**
    - Entangled states **cannot** be written as tensor products

=== "Fourier & Optimisation"

    - QFT: O(n²) vs classical FFT O(n·2ⁿ) — underlies Shor's and phase estimation
    - Gradient-based optimisers: ADAM / SGD via **parameter shift rule**
    - Gradient-free: COBYLA, Nelder-Mead, SPSA (better under hardware noise)

---

## Appendix B — Real-World Use Cases & Solution Designs

### Use Case 1: Pharmaceutical — Drug-Target Binding Prediction

**Problem:** Simulating molecular interactions for drug discovery is classically intractable beyond ~50 atoms.

**Quantum Solution Design:**

```
┌──────────────────────────────────────────────────────────────┐
│  CLASSICAL LAYER                                             │
│  1. PySCF: compute molecular Hamiltonian for drug candidate  │
│  2. Jordan-Wigner mapping → qubit Hamiltonian                │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│  QUANTUM LAYER (IBM / IonQ via Qiskit Runtime)               │
│  3. VQE with UCCSD ansatz → ground state energy              │
│  4. ZNE error mitigation across 3 noise scaling factors      │
│  5. Excited state energies via QEOM                          │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│  CLASSICAL POST-PROCESSING                                   │
│  6. Quantum energy estimates → feature vector                │
│  7. Classical XGBoost → binding affinity prediction          │
│  8. Uncertainty quantification via bootstrap                 │
└──────────────────────────────────────────────────────────────┘
```

**Organisations using this today:** Roche + IBM Quantum, Quantinuum + Mimetica (protein folding), Biogen + Accenture Quantum.

**Expected quantum advantage:** 2027–2030 for molecules >100 atoms requiring >50 logical qubits.

---

### Use Case 2: Financial Services — Portfolio Optimisation at Scale

**Problem:** Markowitz optimisation for 1000+ assets has O(N²) to O(N³) classical complexity. Daily rebalancing for large funds is computationally bottlenecked.

**Quantum Solution Design:**

```python
# Quantum Portfolio Optimiser — QAOA approach
from qiskit_finance.applications.optimization import PortfolioOptimization
from qiskit_optimization.algorithms import MinimumEigenOptimizer
from qiskit.algorithms import QAOA

# 1. Formulate as QUBO (Quadratic Unconstrained Binary Optimisation)
portfolio = PortfolioOptimization(
    expected_returns=mu,
    covariances=sigma,
    risk_factor=0.5,
    budget=10  # select 10 of N assets
)
qp = portfolio.to_quadratic_program()

# 2. QAOA solve
qaoa = QAOA(sampler=sampler, optimizer=COBYLA(), reps=3)
optimizer = MinimumEigenOptimizer(qaoa)
result = optimizer.solve(qp)

# 3. Classical post-processing
optimal_weights = portfolio.interpret(result)
```

**Production reference:** D-Wave powers portfolio optimisation for a 135+ enterprise client base including Forbes Global 2000 firms. IonQ Q1 2026 revenue grew 755% YoY to $64.7M — financial services is the leading sector.

**Architecture for production:**

| Component | Technology | Notes |
| ----------- | ----------- | ------- |
| Data ingestion | AWS Kinesis | Real-time market data |
| Problem formulation | Python + Qiskit Finance | QUBO mapping |
| QPU execution | AWS Braket (IonQ + D-Wave) | Multi-provider hedge |
| Classical solver | Gurobi / CPLEX | Fallback + benchmark |
| Results API | FastAPI + Redis | <200ms SLA for pre-computed |
| Monitoring | Grafana + CloudWatch | Shot budget, fidelity tracking |

---

### Use Case 3: Logistics — Supply Chain Route Optimisation

**Problem:** Combinatorial explosion in vehicle routing: N cities = N! routes. Classical heuristics miss optimal by 5–20% at enterprise scale.

**Quantum Solution Design:**

```
Input: Delivery network (1000 nodes, 50 vehicles, time windows)
         │
         ▼
┌────────────────────┐
│  Graph Reduction   │  Classical: reduce to 50-100 node subgraph
│  (Leiden + PageR.) │  using community detection
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│  QUBO Formulation  │  Encode TSP/VRP constraints as
│  (quadratic obj.)  │  Ising Hamiltonian
└────────┬───────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
┌────────┐  ┌────────┐
│ QAOA   │  │D-Wave  │  Run both; take best result
│(gate)  │  │Anneal  │
└────┬───┘  └───┬────┘
    │          │
    └────┬─────┘
         │
         ▼
┌────────────────────┐
│ Route Decoder +    │  Map binary solution → actual
│ Feasibility Check  │  delivery routes
└────────────────────┘
```

**Reference implementation:** Multiverse Computing's CompactifAI delivers quantum-inspired tensor network solutions for logistics, achieving ~100M EUR ARR by Jan 2026 entirely on classical hardware — proving the market exists before fault-tolerant QPUs arrive.

---

### Use Case 4: Cybersecurity — Post-Quantum Zero Trust Architecture

**Problem:** "Harvest Now, Decrypt Later" (HNDL) attacks require immediate PQC migration for any data with >10 year sensitivity.

**Solution Design: Hybrid PQC Zero Trust Gateway**

```
Client Request
      │
      ▼
┌─────────────────────────────────────────────┐
│  TLS 1.3 Hybrid Handshake                  │
│  Classical:   ECDH P-256 (current compat)   │
│  PQC:        ML-KEM-768 (FIPS 203)          │
│  Combined:   XOR shared secrets             │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  Identity & Auth Layer                      │
│  Signatures: ML-DSA-65 (FIPS 204)           │
│  Certificates: Hybrid X.509 (classical+PQC) │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│  Policy Engine (OPA / Casbin)               │
│  Unchanged — PQC is transport layer only    │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
              Protected Services
```

Cross-reference: [AI Security & Governance](../ai-security-governance/index.md) · [Auth & Identity Standards](../ai-protocols/auth/entra-3lo-agent-auth-standards-architecture.md)

---

### Use Case 5: Energy — Quantum Grid Optimisation

**Problem:** Power grid load balancing with renewable intermittency is a real-time combinatorial problem with safety constraints.

**Quantum Solution Design:**

| Stage | Technology | Output |
| ------- | ----------- | -------- |
| Grid state ingestion | SCADA → Kafka | Real-time sensor stream |
| QUBO formulation | Qiskit Optimisation | Load-balancing Hamiltonian |
| Quantum solve | D-Wave Advantage (annealing) | Optimal switching schedule |
| Constraint validation | Classical (OR-Tools) | Feasibility guarantee |
| Dispatch | SCADA write-back | Grid switching commands |

**Latency budget:** D-Wave anneal time ~20ms. Total pipeline <500ms — viable for near-real-time grid control.

---

### Use Case 6: Agentic AI — Quantum-Enhanced Agent Orchestration

**Problem:** Multi-agent task assignment is NP-hard at scale. Classical orchestrators use greedy heuristics.

**Quantum Solution Design:**

```python
# Quantum agent task allocation via QUBO
# N agents, M tasks → binary assignment matrix x[i,j]

from docplex.mp.model import Model
from qiskit_optimization.translators import from_docplex_mp
from qiskit_optimization.algorithms import GroverOptimizer

# 1. Classical MILP formulation
mdl = Model("agent_task_allocation")
x = mdl.binary_var_matrix(n_agents, n_tasks, name="x")

# Objective: minimise total cost
mdl.minimize(mdl.sum(cost[i][j] * x[i, j]
             for i in range(n_agents)
             for j in range(n_tasks)))

# Constraint: each task assigned to exactly one agent
for j in range(n_tasks):
    mdl.add_constraint(mdl.sum(x[i, j] for i in range(n_agents)) == 1)

# 2. Convert to QUBO → solve with Grover or QAOA
qp = from_docplex_mp(mdl)
optimizer = GroverOptimizer(num_value_qubits=3, sampler=sampler)
result = optimizer.solve(qp)
```

Cross-reference: [Agentic AI Systems](../agentic-systems/index.md) · [Agent Memory & Planning](../enterprise-architecture/ai-architecture/agent-memory-planning-architecture.md) · [Agent Interoperability & Orchestration](../enterprise-architecture/ai-architecture/agent-interoperability-orchestration.md)

---

## Appendix C — Quantum × Agentic AI

The intersection of quantum computing and agentic AI is the most forward-looking part of this field. Here is a structured map of where these two domains converge.

### Integration Architecture

```
Agentic AI Layer                    Quantum Enhancement Layer
─────────────────────               ─────────────────────────
Planning & Reasoning      ──────▶   Quantum optimisation for plan search
                                    (QAOA over action space)

Tool Use & Orchestration  ──────▶   Quantum task allocation
                                    (Grover search over tool combinations)

Memory & Retrieval        ──────▶   Quantum approximate nearest-neighbour
                                    (Quantum RAM / amplitude encoding)

Perception & Embedding    ──────▶   Quantum feature maps for
                                    high-dimensional sensor data

Multi-Agent Coordination  ──────▶   Quantum game theory & mechanism design
                                    (Nash equilibrium via quantum annealing)
```

### Quantum-Enhanced Memory for Agents

The Hopfield network (classical associative memory) has a quantum generalisation that stores exponentially more patterns:

- **Classical Hopfield:** stores ~0.14N patterns for N neurons
- **Quantum Hopfield:** stores ~2^(N/2) patterns — exponential improvement

This matters for agents with large episodic memory stores needing fast pattern recall.

Cross-reference: [Agent Memory & Planning Architecture](../enterprise-architecture/ai-architecture/agent-memory-planning-architecture.md)

### MCP + Quantum: Exposing QPU as a Tool

Quantum computers can be exposed as tools within the Model Context Protocol, making QPU execution available to any MCP-compatible agent:

```python
# Quantum MCP Tool — expose VQE solver as agent-callable tool
from mcp import Server, Tool

@server.tool("quantum_vqe_solve")
async def vqe_solve(molecule_smiles: str, basis_set: str = "sto-3g") -> dict:
    """Compute ground state energy of a molecule using VQE on IBM Quantum."""
    # ... Qiskit Runtime VQE execution
    return {"energy_hartree": result.eigenvalue, "shots_used": shots}
```

Cross-reference: [MCP Deep Guide](../coding-tools/claude/mcp-deep-guide.md) · [MCP & A2A Protocol Deep Dive](../enterprise-architecture/ai-architecture/mcp-a2a-protocol-deep-dive.md)

---

## Appendix D — Career Roadmap & Certifications

### 90-Day Milestone Map

| Milestone | Deliverable | Success Metric |
| ----------- | ------------- | --------------- |
| End of Week 2 | Quantum circuits on real IBM hardware | >95% correct measurement on ibmq backend |
| End of Week 4 | Error mitigation strategy designed | Phase 1 architecture brief peer-reviewed |
| End of Week 6 | VQE or QAOA on a real problem | Energy estimate within 5% of classical |
| End of Week 8 | QNN trained for binary classification | QNN accuracy within 5% of classical NN |
| End of Week 10 | 3-platform comparison on same workload | Platform recommendation doc approved |
| End of Week 11 | PQC migration plan for realistic system | All vulnerable crypto assets catalogued |
| End of Week 12 | Full Quantum AI system capstone | GitHub repo + architecture doc + deck |

### Certifications

| Certification | Provider | Level | Why It Matters |
| -------------- | ---------- | ------- | --------------- |
| IBM Certified Associate Developer — Quantum *(PDF archived)* | IBM | Entry | Best entry-level cert; validates Qiskit proficiency |
| IBM Certified Developer — Quantum *(PDF archived)* | IBM | Professional | Algorithm implementation, Runtime v2, VQE, QAOA, QML |
| MIT 8.370x Quantum Information Science | edX / MIT | Academic | Rigorous physics-based foundations |
| QOSF Mentorship Programme | Quantum Open Source | Structured | 3-month project with researcher mentor |

### Target Roles

| Role | Employers | Requires |
| ------ | ----------- | --------- |
| **Quantum Solutions Architect** | IBM, AWS, Azure Quantum, Quantinuum | Phases 1–3 + business communication |
| **Quantum AI Research Engineer** | Google DeepMind, Quantinuum, national labs | Deep Phase 2 + research publication |
| **Principal Quantum Architect** | Banks, pharma, aerospace | All phases + enterprise delivery track record |
| **Quantum Security Architect** | Gov, defence, finance | Week 11 deep dive + PQC implementation experience |

---

## Appendix E — Tooling Cheat Sheet

| Tool | Category | Install | Primary Use |
| ------ | ---------- | --------- | ------------- |
| **Qiskit** | SDK | `pip install qiskit` | IBM hardware, circuits, simulation |
| **PennyLane** | SDK/ML | `pip install pennylane` | QML, autodiff, hardware-agnostic |
| **Cirq** | SDK | `pip install cirq` | Google hardware, research circuits |
| **lambeq** | NLP | `pip install lambeq` | Quantum NLP, DisCoCat |
| **Qiskit Nature** | Chemistry | `pip install qiskit-nature` | VQE for molecular simulation |
| **Amazon Braket SDK** | Cloud | `pip install amazon-braket-sdk` | AWS multi-provider access |
| **Q#** | Language | `dotnet tool install -g Microsoft.Quantum.IQSharp` | Azure Quantum, algorithm design |
| **Mitiq** | Error Mitigation | `pip install mitiq` | ZNE, PEC, CDR error mitigation |
| **liboqs** | PQC | see openquantumsafe.org | Post-quantum crypto implementation |
| **QuTiP** | Simulation | `pip install qutip` | Quantum system dynamics, open systems |

---

## Industry Landscape Quick Reference

The three industry research reports in this section provide deep dives into each segment:

=== "Tech Giants"

    IBM, Google, Microsoft, AWS, NVIDIA. See [Quantum AI Tech Giants Report](/knowledge-docs/quantum/Quantum_AI_TechGiants_Report.pdf) for problems, solutions, products, wins, and anti-patterns from each.

    **2025–2026 signal:** Every major tech giant converged on hybrid quantum-classical pipelines via cloud APIs, targeting chemistry simulation, optimisation, and quantum-enhanced ML.

=== "Startups"

    IonQ ($64.7M Q1 2026, 755% YoY), D-Wave (179% YoY, 135+ enterprise clients), Quantinuum (QNLP bet), Multiverse Computing (~€100M ARR from quantum-inspired classical hardware). See [Quantum AI Startups Report](/knowledge-docs/quantum/Quantum_AI_Startups_Report.pdf).

    **Key pattern:** Each startup picked a different wedge into the "quantum is theoretical" perception problem. The commercialisation race is happening now.

=== "Consultancies"

    Accenture, McKinsey QuantumBlack (140+ use-case accelerators), BCG X, Deloitte, IBM Consulting. See [Quantum AI Consultancies Report](/knowledge-docs/quantum/Quantum_AI_Consultancies_Report.pdf).

    **Key pattern:** Consultancies sell the bridge (strategy + vendor translation + change management) between enterprise business problems and quantum-native vendors. The $15B+ AI consulting market now includes quantum as a billable practice.

---

## Further Reading & Communities

| Resource | Type | Why |
| ---------- | ------ | ----- |
| Nielsen & Chuang: *Quantum Computation and Quantum Information* | Book | The definitive reference — read Chapters 1–5 and 10 |
| IBM Quantum Learning (learning.quantum.ibm.com) | Online | Free, hands-on, real hardware access |
| PennyLane Tutorials (pennylane.ai/qml) | Tutorial | Best QML tutorials — VQE, QNN, kernels, QNLP |
| Qiskit Textbook (qiskit.org/learn) | Online Book | Comprehensive Qiskit curriculum with notebooks |
| arXiv quant-ph | Research | Follow: Maria Schuld, Nathan Killoran, John Preskill |
| IBM Quantum Network | Community | Real hardware access + enterprise partners |
| Unitary Fund (unitary.fund) | Community | Open-source quantum software grants + Slack |
| IEEE Quantum Week | Conference | Submit your capstone as a poster |

---

*Cross-reference this guide with:*
*[AI Foundations](../ai-foundations/index.md) · [Agentic AI Systems](../agentic-systems/index.md) · [Cloud Platforms](../cloud-platforms/index.md) · [AI Security & Governance](../ai-security-governance/index.md) · [Enterprise Architecture Patterns](../enterprise-architecture/ai-architecture/enterprise-ai-architecture-patterns.md)*
