---
title: "Quantum AI: Zero to Mastery — Part 2: Quantum AI"
date_created: 2026-07-09
last_reviewed: 2026-07-17
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["quantum", "quantum-computing", "quantum-ai", "enterprise-architecture"]
doc_type: multi-part-series
covers_version: "2026 Edition"
series_name: "Quantum AI: Zero to Mastery"
series_part: 2
series_total: 4
series_index: "quantum/zero-to-mastery"
---

# Quantum AI: Zero to Mastery — Part 2: Quantum AI

**Weeks 5–8 · Principal Architect Track · 2026 Edition**

Continues from [Part 1: Foundations](./zero-to-mastery-part1-foundations.md).

---

## Phase 2 — Quantum AI & Machine Learning

### Week 5: Classical ML Through a Quantum Lens

Before building quantum ML models, understand which classical ML operations have quantum analogues.

| Classical Operation | Quantum Analogue | Potential Advantage |
| -------------------- | ----------------- | --------------------- |
| Matrix-vector multiply | Quantum matrix inversion (HHL) | Exponential (with strict caveats) |
| Kernel function | Quantum kernel (Hilbert space inner product) | Exponential feature space |
| Gradient descent | Parameter shift rule | Exact gradients without backprop |
| PCA / SVD | Quantum PCA (qPCA) | Potential speedup for sparse, low-rank matrices via phase estimation on a density-matrix exponential |
| Neural network layer | Variational quantum layer (VQL) | Exponential parameter space |
| Random sampling | Quantum sampling via amplitude estimation | Quadratic speedup over classical Monte Carlo for estimating an expectation value |

:::warning Critical Caveat
The HHL algorithm offers exponential speedup **only under strict conditions**: sparse matrices, efficient state preparation, and quantum-readable output. Dequantisation results (Tang 2019) showed many claimed speedups were achievable classically. Real advantage exists but requires careful problem selection. The same caveat applies to qPCA — it inherits HHL's state-preparation and readout bottlenecks.
:::

**Quantum Advantage Decision Flowchart**

```mermaid
flowchart TD
    A["Is your problem classically<br/>intractable at scale?"] -->|No| B["Use classical ML"]
    A -->|Yes| C["Is it optimisation, simulation,<br/>or kernel-based?"]
    C -->|No| D["Unclear advantage today —<br/>monitor research"]
    C -->|Yes| E["Can input data be efficiently<br/>encoded as quantum states?"]
    E -->|No| F["Quantum-inspired methods<br/>(tensor networks) may help"]
    E -->|Yes| G{"Which type?"}
    G --> H["Combinatorial optimisation<br/>→ QAOA (Week 6)"]
    G --> I["Quantum chemistry /<br/>molecular sim → VQE (Week 6)"]
    G --> J["High-dimensional kernel<br/>learning → Quantum kernel SVM (Week 7)"]
    G --> K["Classification / regression<br/>→ QNN with PennyLane (Week 7)"]
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

A QNN is a parameterised quantum circuit (PQC) used as a trainable model. Feature encoding matters as much as the trainable layers — the three standard schemes are **basis encoding** (map classical bits directly to computational basis states — simple, but uses one qubit per bit), **angle encoding** (map each classical feature to a rotation angle — used below, linear in qubit count), and **amplitude encoding** (pack 2ⁿ classical values into the amplitudes of n qubits — exponentially qubit-efficient, but state preparation cost usually erases the advantage in practice).

```python
import pennylane as qml
import torch

n_qubits = 4
dev = qml.device("default.qubit", wires=n_qubits)

@qml.qnode(dev, interface="torch")
def qnn_circuit(inputs, weights):
    # Feature encoding (angle encoding)
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
| Quantum GAN (QGAN) | Generative modelling, distribution learning | Quantum generator and/or discriminator; benchmarked mainly on small synthetic and financial-return distributions today |
| Quantum Kernel SVM | High-dimensional kernels | Classically hard kernel computed on QPU |

Benchmarking note: as of 2026, QNNs and quantum kernels beat classical baselines only on small, hand-picked synthetic datasets designed to have quantum-friendly structure — there is no published result showing a QNN outperforming a well-tuned classical model on a standard, unstructured real-world benchmark. Treat every "quantum ML beats classical ML" headline the same way you'd treat a vendor's own benchmark: ask for the dataset, the classical baseline's tuning effort, and whether it replicates on a different dataset.

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

:::warning Never exec() untrusted model output in production
The snippet above validates the *pattern*, not production practice. Treat any LLM-generated circuit the way you'd treat any LLM-generated shell command: review it, run it in a sandboxed simulator first, and never `exec()` raw model output against real QPU credentials or billing.
:::

**Phase 2 Capstone:** 10-slide architecture deck for a Quantum-Enhanced ML system — dataset, algorithm selection, hardware platform, and expected timeline to quantum advantage.

---

**Next:** continue to [Part 3 — Mastery & Architecture (Weeks 9–12)](./zero-to-mastery-part3-architecture.md).
