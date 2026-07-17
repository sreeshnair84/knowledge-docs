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

You do not need a physics PhD. You need a working engineer's understanding of the four phenomena that make quantum computing possible, plus enough of the Bloch sphere and entanglement's two headline protocols to stop treating them as buzzwords.

**You'll be able to:** explain superposition/entanglement/interference/measurement in your own words, plot a qubit state on the Bloch sphere, and walk through a teleportation circuit line by line.

<details>
<summary><strong>Superposition</strong></summary>

A qubit can exist in a linear combination of |0⟩ and |1⟩ simultaneously:

```
|ψ⟩ = α|0⟩ + β|1⟩   where  |α|² + |β|² = 1
```

Unlike classical probability, α and β are **complex amplitudes**, enabling interference. This is what gives quantum computers exponential state space.

</details>

<details>
<summary><strong>Entanglement</strong></summary>

Two or more qubits can share a quantum state that cannot be described independently. Measuring one qubit instantly determines the state of its entangled partner, regardless of distance. This enables quantum teleportation, superdense coding, and distributed quantum computing — see the worked circuits below.

</details>

<details>
<summary><strong>Interference</strong></summary>

Quantum amplitudes can **constructively reinforce correct answers** and destructively cancel wrong ones — this is how quantum algorithms achieve speedup. It is analogous to wave interference in optics.

</details>

<details>
<summary><strong>Measurement</strong></summary>

Measuring a qubit collapses the superposition, yielding |0⟩ with probability |α|² or |1⟩ with probability |β|². Quantum algorithms are designed so that correct answers have high probability *before* measurement.

</details>

#### The Bloch Sphere: Visualising a Qubit

Every single-qubit pure state can be written with two real parameters, θ and φ, instead of two complex amplitudes:

```
|ψ⟩ = cos(θ/2)|0⟩ + e^{iφ} sin(θ/2)|1⟩
```

θ is the polar angle (0 to π) and φ is the azimuthal angle (0 to 2π) — exactly like latitude and longitude on a globe. This is the Bloch sphere: every valid single-qubit state is a point on its surface (mixed states live inside it).

| State | θ | φ | Bloch position |
| --- | --- | --- | --- |
| \|0⟩ | 0 | — | North pole |
| \|1⟩ | π | — | South pole |
| \|+⟩ = (\|0⟩+\|1⟩)/√2 | π/2 | 0 | +X equator |
| \|−⟩ = (\|0⟩−\|1⟩)/√2 | π/2 | π | −X equator |
| \|+i⟩ = (\|0⟩+i\|1⟩)/√2 | π/2 | π/2 | +Y equator |
| \|−i⟩ = (\|0⟩−i\|1⟩)/√2 | π/2 | 3π/2 | −Y equator |

Single-qubit gates are rotations of this point about an axis:

- **X gate** — π rotation about the X axis (flips north/south pole: \|0⟩↔\|1⟩)
- **Z gate** — π rotation about the Z axis (flips the equator's +X/−X points, leaves poles fixed)
- **H (Hadamard)** — π rotation about the diagonal axis (X+Z)/√2 — this is exactly why H maps \|0⟩ (north pole) to \|+⟩ (equator)
- **Rx(θ), Ry(θ), Rz(θ)** — parameterised rotations by angle θ about each axis; these are the building blocks of every variational circuit in Part 2 onward

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_bloch_multivector

qc = QuantumCircuit(1)
qc.h(0)  # rotates |0⟩ (north pole) to |+⟩ (+X equator)

state = Statevector.from_instruction(qc)
plot_bloch_multivector(state)  # renders the point described in the table above
```

#### Quantum Teleportation & Superdense Coding: Entanglement's Payoff

These are the two protocols this section promises entanglement "enables" — here is what they actually do.

**Teleportation** moves an unknown qubit state from Alice to Bob using one shared entangled pair and two classical bits — no physical particle travels, and the **no-cloning theorem** (a consequence of quantum mechanics being linear: no unitary can copy an arbitrary unknown state) guarantees Alice's original is destroyed in the process, so this never violates relativity or lets you clone information.

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 2)

# Step 1 — prepare the unknown state to teleport on qubit 0 (example: |+>)
qc.h(0)

# Step 2 — create a Bell pair: qubit 1 (Alice's half), qubit 2 (Bob's half)
qc.h(1)
qc.cx(1, 2)

# Step 3 — Alice entangles her data qubit with her half of the pair, then measures both
qc.cx(0, 1)
qc.h(0)
qc.measure([0, 1], [0, 1])

# Step 4 — Bob applies corrections conditioned on Alice's 2 classical bits
qc.x(2).c_if(qc.clbits[1], 1)
qc.z(2).c_if(qc.clbits[0], 1)
# Qubit 2 now holds the original |+> state — Alice's copy is gone
```

**Superdense coding** is teleportation's mirror image: instead of sending a qubit using entanglement plus 2 classical bits, it sends **2 classical bits of information using only 1 qubit**, again spent from a pre-shared entangled pair. Alice encodes 2 bits by applying I, X, Z, or XZ to her half of the pair before sending it; Bob recovers both bits with a single Bell-basis measurement. The two protocols together are why entanglement is described as a resource that can be traded between quantum and classical bits in either direction.

**Week 1 Schedule**

- Days 1–2: Read Nielsen & Chuang Chapters 1–3. Focus on Dirac notation, Bloch sphere, bra-ket algebra.
- Days 3–4: IBM Quantum Learning Module 1 (free). Set up Qiskit. Run your first quantum circuit.
- Day 5: Implement the Bloch sphere code above for `|0⟩`, `|1⟩`, `|+⟩`, `|-⟩` and confirm the four positions match the table.
- Weekend: Implement the teleportation circuit above. Verify with the statevector simulator that qubit 2 ends in `|+⟩` after the corrections.

---

### Week 2: Qubits, Gates & Quantum Circuits

Quantum gates are reversible and correspond to rotations on the Bloch sphere (see Week 1).

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

#### The Quantum Fourier Transform (QFT)

The QFT is the subroutine that both this week's phase estimation section and Shor's algorithm are built on — it's introduced here, not there, because it's a circuit-construction technique, not an algorithm in its own right. It maps computational basis states to a Fourier-transformed superposition:

```
QFT|x⟩ = (1/√N) Σ_y e^{2πixy/N} |y⟩ ,  N = 2ⁿ for n qubits
```

Structurally it's a layer of Hadamards interleaved with controlled phase rotations, followed by a qubit-order swap — built from gates you already know from the table above:

```python
from qiskit import QuantumCircuit
from qiskit.circuit.library import QFT

qc = QuantumCircuit(3)
qc.h(0)
qc.x(1)  # prepare an example input state |011>... (superposed on qubit 0)

qc.append(QFT(num_qubits=3, do_swaps=True), [0, 1, 2])
print(qc.decompose().draw())
```

Classically, computing a Fourier transform of N points costs O(N log N) (FFT); the QFT does the analogous transform on amplitudes encoded across n = log₂N qubits in O(n²) gates — exponentially fewer operations, though reading out all N amplitudes still costs a measurement per shot. This asymmetry — cheap to prepare, expensive to fully read out — is the recurring theme behind every "quantum speedup, with caveats" result in this series.

**Week 2 Schedule**

- Days 1–2: Implement all Pauli gates, H, CNOT. Visualise on Bloch sphere (reuse Week 1's `plot_bloch_multivector` snippet).
- Days 3–4: Build Bell state, GHZ state. Study the QFT circuit above.
- Day 5: Circuit transpilation, basis gates, noise-aware optimisation. Run on real IBM hardware vs simulator.
- Weekend: Implement the 3-qubit QFT above. Compare transpiled output on a real IBM backend.

---

### Week 3: Quantum Algorithms — Grover, Shor, Deutsch-Jozsa

| Algorithm | Problem | Speedup | Architect's Note |
| ----------- | --------- | --------- | ----------------- |
| **Deutsch-Jozsa** | Is a function constant or balanced? | Exponential (1 query vs N/2) | First proof of quantum advantage. Understand the oracle pattern. |
| **Grover's** | Unstructured search in N elements | Quadratic (√N vs N) | Oracle pattern is the ancestor of QNN loss encoding. |
| **Shor's** | Integer factorisation | Exponential | Why RSA will break. Requires QFT + phase estimation, both below. |
| **QAOA** | Combinatorial optimisation | Approximate near-term | Production-relevant today. Builds on Grover's oracle concept. |

#### Deutsch-Jozsa: Circuit & Code

Given a black-box function f that's either constant (same output for every input) or balanced (output is 0 for exactly half the inputs), Deutsch-Jozsa determines which in **one** query — classically this needs up to 2ⁿ⁻¹+1 queries in the worst case.

```python
from qiskit import QuantumCircuit

def balanced_oracle(n):
    """f(x) = x0 — flips the ancilla based on the first input bit."""
    qc = QuantumCircuit(n + 1)
    qc.cx(0, n)
    return qc

n = 3
qc = QuantumCircuit(n + 1, n)
qc.x(n)
qc.h(n)                 # ancilla prepared in |-> via X then H
qc.h(range(n))          # input register in equal superposition
qc.compose(balanced_oracle(n), inplace=True)
qc.h(range(n))
qc.measure(range(n), range(n))
# Measuring all-zeros → f is constant. Any other result → f is balanced.
```

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

:::tip Architect's Note
Grover's oracle pattern is the direct ancestor of quantum neural network loss function encoding. Master it — you will use this mental model throughout Part 2.
:::

#### Phase Estimation: The Engine Behind Shor's Algorithm

Phase estimation answers a narrower question than Shor's or Grover's: given a unitary U with eigenstate |u⟩ and eigenvalue e^{2πiθ}, find θ. It does this by applying controlled powers of U (U, U², U⁴, ... U^(2^(k-1))) onto an ancilla register prepared in superposition, then running the **inverse QFT** on that register — the same QFT built above — to read θ out as a binary fraction in the classical register.

```python
from qiskit.circuit.library import PhaseEstimation
from qiskit.circuit.library import PhaseGate
from qiskit import QuantumCircuit
import numpy as np

# Estimate the phase of a simple PhaseGate(theta) unitary, theta = 2*pi*0.375
unitary = QuantumCircuit(1)
unitary.append(PhaseGate(2 * np.pi * 0.375), [0])

pe = PhaseEstimation(num_evaluation_qubits=3, unitary=unitary)
# pe's evaluation register measures out a 3-bit estimate of 0.375 = 0.011 in binary
```

This is precisely the subroutine Shor's algorithm calls to extract the period of a modular exponentiation function, and the same subroutine VQE's excited-state variant (QEOM, used in Part 4's drug-discovery pipeline) calls to read out energy levels beyond the ground state.

---

### Week 4: Quantum Hardware, Error Mitigation & Error Correction

#### Hardware Modalities

| Platform | Provider | Gate Time | Coherence | Connectivity | Best For |
| ---------- | ---------- | ----------- | ----------- | -------------- | ---------- |
| **Superconducting** | IBM, Google | ~50 ns | ~100 µs | Nearest-neighbour | Large qubit count, fast iteration |
| **Trapped Ion** | IonQ, Quantinuum | ~1 ms | Seconds | All-to-all | High fidelity, near-term algorithms |
| **Photonic** | Xanadu | Room temp | Short | Gaussian boson sampling | QML, continuous-variable QC |
| **Neutral Atom** | QuEra, Pasqal | ~µs | ~seconds | Reconfigurable | Optimisation, simulation |
| **Topological** | Microsoft | TBD | Very long (theoretical) | TBD | Fault-tolerant future |

Noise on all of these platforms is characterised by two numbers an architect should always ask a vendor for: **decoherence time** (how long a qubit holds its state before environmental noise scrambles it — the coherence column above) and **gate fidelity** (the probability a single gate executes correctly, typically 99.0–99.9% today). Calibration is the recurring process of re-measuring both and re-tuning control pulses, usually daily on cloud-hosted hardware — ask any vendor how often, and how they expose that data, before committing a production workload to a specific device.

Error mitigation and error correction are frequently conflated. They are not the same discipline, they don't run on the same hardware timeline, and an architect who pitches one when the stakeholder means the other will lose credibility fast:

| | Error Mitigation | Error Correction |
| --- | --- | --- |
| **Approach** | Statistical extrapolation applied to noisy raw results | Redundant physical qubits encode one logical qubit; syndrome measurements detect and fix errors |
| **Hardware overhead** | None — runs on today's NISQ devices as-is | High — current surface-code demonstrations use ~100s of physical qubits per logical qubit |
| **Availability** | Production-usable today | Emerging — Google's Willow chip (2024) demonstrated below-threshold exponential error suppression as code distance increases |
| **What it fixes** | Approximates the noise-free expectation value after the fact | Actively detects and corrects bit-flip/phase-flip errors during computation |
| **Architect's takeaway** | Use for near-term production pilots on 2026-era hardware | Budget for as a 2029–2032 capability, once fault-tolerant logical qubits are commercially available |

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

#### Error Correction & Fault Tolerance

Error correction encodes one **logical qubit** — the noise-free abstraction your algorithm actually reasons about — across many **physical qubits**, using a **stabilizer code**: a set of parity-check measurements that reveal *where* an error occurred without ever measuring (and therefore destroying) the encoded quantum information itself.

The **surface code** is the leading practical construction: physical qubits are arranged on a 2D lattice, alternating "data" qubits (which hold the encoded information) with "measurement" qubits (which repeatedly check parity across their neighbours). Its **code distance d** — roughly, the lattice size — determines how many physical errors can occur before the logical qubit's state is corrupted; the **threshold theorem** guarantees that if the physical error rate is below a hardware-dependent threshold (empirically around 1% for superconducting qubits), increasing d suppresses the logical error rate *exponentially*, making arbitrarily long fault-tolerant computation possible in principle.

**Architect's takeaway:** when a vendor claims "N qubits," ask whether those are physical or logical — the ratio between them (currently ~100–1000:1 for a useful logical error rate) is the single biggest number separating a NISQ pilot from a fault-tolerant production system, and it's the reason Part 4's use cases all specify mitigation strategies (available now) rather than correction strategies (not yet commercially deployable at the qubit counts most enterprises can access).

**Phase 1 Capstone:** Design a 2-page quantum system architecture for a simple search problem — specify hardware choice, error mitigation strategy, and classical-quantum interface. State explicitly whether your design assumes NISQ-era mitigation or a future fault-tolerant logical-qubit budget, and why.

---

**Next:** continue to [Part 2 — Quantum AI (Weeks 5–8)](./zero-to-mastery-part2-quantum-ai.md).
