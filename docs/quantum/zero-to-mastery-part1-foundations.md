---
title: "Quantum AI: Zero to Mastery — Part 1: Foundations"
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
series_part: 1
series_total: 4
series_index: "quantum/zero-to-mastery"
---

# Quantum AI: Zero to Mastery — Part 1: Foundations

**Weeks 1–4 · Principal Architect Track · 2026 Edition**

Starts the series covered by the [Quantum AI: Zero to Mastery index](./zero-to-mastery.md) — read that page first for the full 12-week Programme Map and how this part fits in.

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

**Next:** continue to [Part 2 — Quantum AI (Weeks 5–8)](./zero-to-mastery-part2-quantum-ai.md).
