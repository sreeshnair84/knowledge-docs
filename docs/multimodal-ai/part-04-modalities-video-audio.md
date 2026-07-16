---
title: "Part 04 — Video & Audio Intelligence"
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["multimodal-ai", "video-understanding", "audio-intelligence", "asr", "speaker-diarization", "surveillance"]
---

# Part 04 — Video & Audio Intelligence

A comprehensive technical deep dive into video understanding and audio intelligence systems, covering architectures, ASR engines, enterprise use cases, and security-critical deployment patterns.

> **Audience:** Principal AI Architects, ML Engineers, Enterprise Solution Architects
> **Coverage:** Video Understanding · Audio Intelligence · ASR · Speaker Diarization · Surveillance · Predictive Maintenance
> **As of:** July 2026

---

## Video Understanding Capabilities

### Event Detection

Modern video understanding models support three core event detection tasks:

- *Action recognition*: classify human activities — sports gestures, assembly-line motions, security postures
- *Anomaly detection*: identify deviations from learned baseline behaviour — loitering, abandoned objects, unusual crowd flow
- *Pose estimation*: extract skeletal joint coordinates per frame using models such as MediaPipe, OpenPose, or ViTPose

Action recognition has moved from CNN-based two-stream networks (spatial + optical flow) to transformer architectures that model long-range temporal dependencies with self-attention over token sequences of frames.

### Temporal Reasoning

Long video understanding requires the model to maintain narrative coherence across minutes or hours of content. Key capabilities include:

- *Causal chain detection*: identifying the sequence of events that led to an outcome (e.g., equipment failure root cause)
- *Narrative understanding*: tracking objects, identities, and plot threads across scenes
- *Temporal grounding*: answering "what happened at timestamp T?" against a video index

### Surveillance Applications

Surveillance deployments demand low-latency inference on edge hardware:

- *Perimeter monitoring*: line-crossing detection, zone entry/exit alerts
- *Crowd analytics*: density estimation, flow direction, panic detection
- *Vehicle tracking*: license plate recognition, make/model classification, trajectory analysis

### Summarization

Summarization pipelines produce navigable artifacts from long recordings:

- *Key frame extraction*: select representative frames using scene-change detection or semantic clustering
- *Highlight detection*: identify peak-engagement or high-energy segments
- *Chapter generation*: segment video into titled sections for meeting recordings, lectures, or sports broadcasts

### Frame Sampling Strategies

| Strategy | Mechanism | Best For |
|----------|-----------|----------|
| Uniform | Fixed interval (1 fps, 2 fps) | Short clips, budget-constrained inference |
| Scene-change | Detect histogram or optical-flow shift | Narrative content, broadcast |
| Adaptive | Higher density around detected events | Surveillance, anomaly detection |
| Keyframe | I-frames only from video codec | Fast scrubbing, thumbnail generation |

### Clip Embeddings

- *CLIP-based*: frame-level CLIP embeddings averaged or max-pooled over a clip
- *VideoMAE*: masked autoencoder pre-trained on video — strong spatiotemporal features
- *InternVideo*: dual-encoder (video + text) trained on large-scale video-text pairs
- *S3D*: separable 3D convolutions for efficient clip-level embeddings

### Long Video Memory Strategies

Long video (>30 minutes) exceeds the context window of any current VLM. Three approaches manage this:

- *Sliding window*: process overlapping chunks; maintain a summary buffer across windows
- *Hierarchical summarization*: chunk → clip summary → segment summary → video summary
- *StreamingLLM approach*: retain attention sinks (first few tokens) + recent window; evict middle tokens

### Action Recognition Architectures

- *Two-stream networks*: separate spatial (RGB) and temporal (optical flow) CNNs fused at late layers
- *Transformer-based*: Video Swin Transformer, TimeSformer — treat frames as token sequences
- *Video diffusion*: generative models that can interpolate and hallucinate missing frames for data augmentation

---

## Video Processing Architecture

### Ingestion Pipeline

```text
Source → Transcoding → Container Parsing → Frame Extraction → Embedding → Index
```

Key components:

- *Transcoding*: normalise to H.264/H.265 at target resolution and frame rate using FFmpeg
- *Container formats*: MP4 (broadest compatibility), MKV (multiple audio tracks, subtitles), WebM (browser-native)
- *Codec handling*: detect codec (H.264, H.265, AV1, VP9) before decoding; GPU-accelerated decode with NVDEC/VAAPI

### GPU Memory Management

Long video processing requires careful memory scheduling:

- Stream frames in batches; process batch → embed → release GPU memory before next batch
- Use mixed-precision inference (FP16) to double effective GPU memory capacity
- For distributed inference, partition video into segments and route each to a separate worker

### Chunking and Overlap

- Overlap adjacent chunks by 2–5 seconds to avoid boundary artefacts in event detection
- Store chunk metadata (start timestamp, end timestamp, scene ID) alongside embeddings for temporal retrieval

---

## Audio Intelligence Deep Dive

### Speech Categories

| Category | Characteristics | Key Challenges |
|----------|----------------|----------------|
| Conversational | Informal, overlapping speech, filler words | Diarization, spontaneous speech |
| Broadcast | Scripted, high SNR, single speaker | Minimal — well-solved domain |
| Medical | Jargon-heavy, abbreviations, dictation | Domain vocabulary, privacy (HIPAA) |
| Legal | Formal, multi-party, evidentiary | Verbatim accuracy, speaker attribution |
| Call center | Noisy channels, telephony codec artifacts | Telephony ASR, emotion detection |

### Environmental Sounds

- *Industrial machinery*: bearing degradation, imbalance, cavitation — distinctive spectral signatures
- *HVAC*: compressor cycling, refrigerant leaks, filter blockages
- *Vehicle diagnostics*: engine knock, exhaust anomalies, brake squeal

### Music Analysis

- *Genre classification*: CNN or transformer over mel-spectrogram
- *Tempo estimation*: beat tracking with librosa or madmom
- *Instrument separation*: source separation with Demucs or Spleeter

### Machine Sounds for Predictive Maintenance

Normal machine audio establishes a spectral baseline. Anomalies manifest as:

- New frequency components (bearing race defects appear at BPFO/BPFI frequencies)
- Amplitude modulation (imbalance causes once-per-revolution modulation)
- Broadband noise increase (cavitation, turbulence)

---

## ASR (Automatic Speech Recognition) Landscape

### Whisper Family

OpenAI Whisper is an encoder-decoder transformer trained on 680K hours of multilingual audio:

- *Whisper v2*: 1.5B parameters; strong multilingual performance
- *Whisper v3*: improved CER on low-resource languages; better long-form transcription
- *Whisper large-v3-turbo*: 4x inference speedup via pruning; 8-language optimisation
- *Enterprise trade-offs*: open-source flexibility vs. no SLA, no real-time streaming, compute cost at scale

### Cloud ASR Services

- *Azure Speech*: real-time and batch modes; custom acoustic and language models; integrated speaker diarization
- *AWS Transcribe*: call analytics, medical transcription specialty model, custom vocabulary
- *Google Speech-to-Text*: enhanced phone call model, automatic punctuation, word-level confidence

### Speaker Diarization

Diarization answers "who spoke when?" — a prerequisite for call analytics and meeting summarisation:

- *pyannote.audio*: SOTA open-source pipeline; speaker embedding + segmentation + clustering
- *AWS Transcribe*: built-in diarization; up to 10 speakers; returns speaker labels per word
- *Azure Speaker Recognition*: diarization integrated into batch transcription
- *Nvidia NeMo*: MarbleNet VAD + TitaNet speaker embeddings; strong on noisy call center audio

### Speaker Identification vs Verification

- *Identification*: 1:N match — "which enrolled speaker is this?"
- *Verification*: 1:1 match — "is this the claimed speaker?" Returns accept/reject at a threshold

### Language Identification

- Multilingual models (Whisper, MMS) produce a language probability vector before transcription
- Dedicated LangID models (CLD3, fastText) are faster for routing decisions before ASR

### Keyword Spotting

- *Always-on*: low-power embedded model running continuously on edge device (wake word detection)
- *Wake words*: "Hey Siri", "Alexa" — optimised for false-positive minimisation
- *Compliance monitoring*: detect prohibited phrases in call center recordings (price-fixing language, misleading claims)

### Emotion Detection

- *Valence/arousal model*: 2D circumplex model; predict positive/negative valence and high/low arousal from prosody
- *Clinical applications*: depression screening, pain assessment, cognitive decline indicators
- Input features: MFCCs, pitch contour, energy, speaking rate, jitter, shimmer

### Intent Detection from Audio

- *IVR routing*: classify caller intent from first utterance ("pay bill", "cancel service", "speak to agent")
- *Call center routing*: detect frustration → escalate; detect technical query → route to Tier 2
- Architecture: ASR → text → intent classifier; or end-to-end audio → intent (SpeechBrain, wav2vec2)

---

## Call Center Audio Processing Pipeline

```mermaid
flowchart TD
    A[Incoming Call\nRTP/SIP Stream] --> B[Audio Capture\n& Buffering]
    B --> C[VAD\nVoice Activity Detection]
    C --> D[Channel Separation\nAgent vs Customer]
    D --> E1[ASR Engine\nWhisper / Azure Speech]
    D --> E2[Emotion Detection\nValence/Arousal Model]
    D --> E3[Speaker Diarization\npyannote / NeMo]
    E1 --> F[Real-Time Transcript]
    E2 --> G[Emotion Score Stream]
    E3 --> H[Speaker Labels]
    F --> I[Compliance Agent\nKeyword + LLM Analysis]
    G --> I
    H --> I
    I --> J{Violation\nDetected?}
    J -- Yes --> K[Alert & Case Creation\nCRM Integration]
    J -- No --> L[Quality Score Update\nAnalytics Dashboard]
    K --> M[Supervisor Dashboard\nReal-Time Escalation]
    L --> M
```

---

## Video Surveillance Agent Architecture

```mermaid
flowchart TD
    A[Camera Array\nRTSP/ONVIF] --> B[Video Ingest Service\nFFmpeg + GPU Decode]
    B --> C[Frame Sampler\nAdaptive Strategy]
    C --> D[Object Detection\nYOLOv8 / RT-DETR]
    D --> E[Tracking\nByteTrack / DeepSORT]
    E --> F[Behaviour Analysis\nVLM + Rules Engine]
    F --> G{Anomaly\nScore}
    G -- Low --> H[Archive & Index\nVector DB + Metadata]
    G -- High --> I[Alert Agent\nMultimodal LLM]
    I --> J[Evidence Package\nClips + Annotations]
    J --> K[Human Reviewer\nSOC Dashboard]
    K --> L{Confirm\nThreat?}
    L -- Yes --> M[Incident Response\nDispatch / Lock-down]
    L -- No --> N[False Positive\nFeedback Loop]
    N --> F
    H --> O[Forensic Search\nNatural Language Query]
```

---

## ASR Engine Comparison Matrix

| Engine | WER (EN) | Real-Time | Languages | Diarization | Cost | Enterprise SLA |
|--------|----------|-----------|-----------|-------------|------|----------------|
| Whisper large-v3 | ~2.5% | No (batch) | 99 | External | Self-hosted | None |
| Whisper large-v3-turbo | ~3.1% | Near-RT | 8 optimised | External | Self-hosted | None |
| Azure Speech | ~3.5% | Yes | 100+ | Built-in | $1/hr audio | 99.9% |
| AWS Transcribe | ~4.0% | Yes | 100+ | Built-in | $0.024/min | 99.9% |
| Google STT | ~3.8% | Yes | 125+ | Built-in | $0.016/min | 99.9% |
| AssemblyAI | ~3.2% | Yes | 99 | Built-in | $0.012/min | 99.5% |
| Deepgram Nova-2 | ~2.8% | Yes | 35 | Built-in | $0.0043/min | 99.9% |

## Video Understanding Model Comparison

| Model | Context Length | Modalities | Cost | Diarization | Enterprise Ready |
|-------|---------------|------------|------|-------------|-----------------|
| Video-LLaMA 2 | ~256 frames | Video + Text | Open-source | No | Self-hosted |
| InternVideo 2 | ~8 min clips | Video + Text + Audio | Open-source | No | Self-hosted |
| VideoChat 2 | ~128 frames | Video + Text | Open-source | No | Self-hosted |
| GPT-4o Vision | ~50 frames/call | Image + Text | $0.01/img | No | Yes (Azure) |
| Gemini 1.5 Pro | 1 hour video | Video + Audio + Text | $3.5/1M tokens | No | Yes (GCP) |

---

## Enterprise Use Cases

### Call Center Quality Monitoring Agent

A real-time agent processes every call in parallel:

- Transcribe with domain-tuned ASR (telephony acoustic model)
- Classify emotion every 30 seconds; flag if customer arousal exceeds threshold
- Scan transcript for prohibited phrases (compliance keyword list + LLM semantic check)
- Score call quality (0–100) and write to analytics data lake
- Trigger supervisor alert if escalation keywords + high arousal co-occur

### Meeting Transcription and Action Item Extraction

- Diarize speakers → attribute transcript segments by name (integrated with calendar identity)
- Segment by topic using BERTopic or LDA over rolling windows
- Extract action items with structured LLM output (owner, deadline, description)
- Push to task management system (Jira, Asana) via API integration

### Predictive Maintenance via Audio Anomaly Detection

- Establish spectral baseline during normal operation (rolling 7-day mean PSD)
- Continuously compute Mahalanobis distance from baseline in frequency domain
- Alert when distance exceeds 3-sigma threshold; correlate with vibration sensor data
- Generate maintenance work order with detected anomaly frequency band as evidence

### Security Surveillance with Behavioural Analytics

- Detect loitering (person in restricted zone >60 seconds)
- Alert on perimeter breach with clip evidence attached to incident ticket
- Track vehicle trajectories; flag vehicles circling perimeter >3 times
- Feed confirmed incidents back to model as hard negatives to reduce false positives

### Media Content Moderation Pipeline

- Audio: detect hate speech, explicit content, CSAM audio signatures
- Video: detect graphic violence using VLM + rule-based frame classifier
- OCR on frames: detect on-screen text violating policy
- Human review queue: route confidence 0.6–0.9 cases; auto-reject confidence >0.9

---

## Interview Use Cases

**Q: How would you architect a real-time audio monitoring system for a 10,000-seat call center that detects compliance violations, customer emotion, and escalation triggers?**

A: The architecture separates concerns into three parallel inference paths running on every call stream simultaneously. The ingestion layer captures RTP streams per call, applies VAD to strip silence, and splits each stream into agent and customer channels. Path 1 runs ASR (Deepgram Nova-2 for low latency at $0.0043/min, or Azure Speech with custom acoustic model for telephony). Path 2 runs a lightweight emotion model (MFCCs → 3-layer LSTM → valence/arousal) on 5-second rolling windows — this runs on CPU to avoid GPU contention. Path 3 runs keyword spotting for a compliance phrase list. Results from all three paths merge into a stateful per-call aggregator. When compliance keyword + high arousal co-occur within a 30-second window, the aggregator triggers an LLM reanalysis of the last 2 minutes of transcript to reduce false positives before generating a supervisor alert. At 10,000 concurrent calls, partition across a Kafka cluster with one partition per call; each consumer group handles one inference path. Total throughput: ~10,000 audio streams × 3 paths = 30,000 concurrent lightweight inference jobs, served by a fleet of GPU-accelerated ASR workers and CPU-bound emotion workers behind an auto-scaling group.

**Q: What are the trade-offs between uniform frame sampling and adaptive frame sampling for a video surveillance system that needs to detect rare security events?**

A: Uniform sampling (e.g., 1 fps) is simple to implement and provides consistent coverage but wastes compute on static scenes — a camera watching an empty corridor at 1 fps generates 86,400 frames/day regardless of activity. Adaptive sampling uses motion detection (frame difference or optical flow magnitude) to trigger higher sampling rates only when activity occurs. For rare security events (which by definition happen infrequently), adaptive sampling dramatically reduces the baseline compute load — dropping inactive cameras to 0.1 fps — while triggering burst sampling at 5–10 fps when motion exceeds a threshold. The risk is threshold sensitivity: set too high, and a slow-moving intruder is missed; set too low, and wind-blown foliage causes false positives and wastes compute. The recommended architecture uses a two-stage approach: a lightweight motion detector on edge hardware (Frame Difference or background subtraction with MOG2) drives adaptive sampling, and only clips containing motion are forwarded to the GPU cluster for VLM-based behavioural analysis. This reduces cloud egress by 90%+ while maintaining detection sensitivity for true events.

**Q: How do you handle speaker diarization accuracy degradation in noisy environments like factory floors?**

A: Factory floors present three compounding challenges: high ambient SNR (80–100 dB), reverberation from hard surfaces, and overlapping speech in group settings. The mitigation stack is: (1) *Source enhancement*: deploy directional microphone arrays with beamforming (e.g., ReSpeaker 4-mic array or ODAS toolkit) to steer the beam toward a speaker and apply adaptive noise cancellation. (2) *VAD robustness*: replace energy-based VAD with a noise-robust model trained on industrial environments (Silero VAD or MarbleNet fine-tuned on factory audio). (3) *Speaker embedding robustness*: use ECAPA-TDNN embeddings, which are more robust to channel variability than x-vectors. Fine-tune on factory-recorded speech samples. (4) *Clustering*: use agglomerative hierarchical clustering with a conservative distance threshold to avoid over-splitting a single speaker into multiple clusters in noisy conditions. (5) *Post-processing*: apply minimum segment duration filter (1 second) to discard diarization fragments caused by noise bursts. Evaluate with DER (Diarization Error Rate) on a factory-domain dev set; target <15% DER, which is acceptable for occupational safety logging use cases.

**Q: Design a predictive maintenance system that uses audio, vibration sensor data, and video to predict equipment failure 48 hours in advance.**

A: The system fuses three sensor modalities into a unified health index. *Audio*: microphones capture airborne sound from rotating machinery; extract MFCC features + spectral centroid + kurtosis; model normal distribution per frequency band; compute anomaly score as Mahalanobis distance. *Vibration*: accelerometers (MEMS ICP sensors) mounted on bearing housings; compute envelope spectrum (Hilbert transform → FFT); detect BPFO/BPFI harmonics that indicate bearing race defects; track RMS trend with exponential smoothing. *Video*: thermal camera images detect hotspots at bearing locations (>10°C above baseline triggers alert); RGB camera monitors lubrication reservoir level and drive belt condition. Fusion layer: a gradient-boosted tree (XGBoost) takes the three modality anomaly scores + maintenance history + operating hours as features and outputs a failure probability for the next 48 hours. Calibration: use Platt scaling to ensure the probability output is well-calibrated. Deployment: edge inference for audio and vibration (ONNX runtime on industrial PC); cloud inference for thermal image analysis and fusion model. Alert threshold: 70% failure probability triggers a predictive maintenance work order; 90% triggers immediate planned shutdown.

**Q: How would you design the video pipeline to generate per-chapter summaries for a 90-minute recorded board meeting?**

A: Step 1 — scene segmentation: detect scene boundaries using PySceneDetect (histogram difference + content-aware) to identify presentation slide transitions, which correlate with topic changes. Step 2 — transcription: run Whisper large-v3 on the audio track for full verbatim transcript with timestamps. Step 3 — speaker diarization: run pyannote on the audio; align diarization labels with transcript words to produce attributed transcript. Step 4 — topic segmentation: apply BERTopic over sliding 5-minute windows of the attributed transcript to detect topic shifts; align topic boundaries with scene boundaries for chapter creation. Step 5 — chapter summary generation: for each chapter, construct an LLM prompt containing the attributed transcript segment + a description of the primary slide visible (extracted by GPT-4o Vision from the key frame). Generate a 3-sentence summary with speaker attribution. Step 6 — output: produce a structured JSON with chapter titles, timestamps, speaker breakdown, and summary text; render as an interactive transcript viewer with click-to-seek.

---

## Related

- [Part 01 — Foundations & Vision Language Models](./part-01-foundations-vlms.md) — foundational VLM architectures
- [Part 03 — Document AI & OCR](./part-03-document-ai-ocr.md) — document processing modalities
- [Part 05 — Multimodal RAG](./part-05-multimodal-rag.md) — retrieval over video and audio indexes
- [Part 06 — Agentic Workflows](./part-06-agentic-workflows.md) — orchestrating audio/video agents
