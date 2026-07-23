/* ---------- AI Quiz Question Bank ---------- */
var AI_QUIZ_DATA = [

  /* ======== MACHINE LEARNING ======== */
  {
    id: "ml1", category: "ml",
    q: "What does the bias-variance tradeoff describe?",
    opts: [
      "The tradeoff between training speed and model accuracy",
      "The tension between a model's ability to fit training data and generalize to unseen data",
      "The balance between the number of features and the number of samples",
      "The relationship between learning rate and batch size"
    ],
    ans: 1,
    exp: "Bias measures how far predictions are from the truth on average (underfitting); variance measures how much predictions fluctuate across datasets (overfitting). Reducing one tends to increase the other — hence the tradeoff."
  },
  {
    id: "ml2", category: "ml",
    q: "Which metric is best suited for evaluating a classifier on a highly imbalanced dataset?",
    opts: [
      "Accuracy",
      "F1-score",
      "Mean Squared Error",
      "R² score"
    ],
    ans: 1,
    exp: "Accuracy is misleading on imbalanced data (e.g., 99% by always predicting the majority class). F1-score balances precision and recall, making it informative when classes are skewed."
  },
  {
    id: "ml3", category: "ml",
    q: "What is k-fold cross-validation used for?",
    opts: [
      "Selecting the top k features for a model",
      "Training k separate models and averaging their weights",
      "Estimating model performance by splitting data into k subsets and rotating the test fold",
      "Reducing the learning rate by a factor of k during training"
    ],
    ans: 2,
    exp: "The data is split into k equal folds. The model trains on k-1 folds and tests on the remaining one, rotating k times. This gives a more reliable performance estimate than a single train/test split."
  },
  {
    id: "ml4", category: "ml",
    q: "What does L2 regularization (Ridge) add to the loss function?",
    opts: [
      "The sum of absolute values of weights",
      "The sum of squared weights multiplied by a penalty factor",
      "A penalty proportional to the number of non-zero weights",
      "The squared difference between train and validation loss"
    ],
    ans: 1,
    exp: "L2 adds λ·Σw² to the loss, penalizing large weights and pushing them toward zero. Unlike L1, it rarely produces exactly zero weights, so it doesn't perform feature selection."
  },
  {
    id: "ml5", category: "ml",
    q: "Which of the following best describes a Support Vector Machine (SVM)?",
    opts: [
      "A probabilistic model that finds the most likely class boundary",
      "A model that finds the hyperplane maximizing the margin between classes",
      "A tree-based method that recursively splits on features",
      "A nearest-neighbor model that classifies by majority vote"
    ],
    ans: 1,
    exp: "SVMs find the decision hyperplane that maximizes the margin — the distance to the nearest data points (support vectors) from each class. The kernel trick lets SVMs handle non-linear boundaries."
  },
  {
    id: "ml6", category: "ml",
    q: "What is the primary purpose of a validation set?",
    opts: [
      "To provide extra training data when the training set is small",
      "To tune hyperparameters without touching the test set",
      "To evaluate final model performance before deployment",
      "To compute the gradient for backpropagation"
    ],
    ans: 1,
    exp: "The validation set is used during development to tune hyperparameters and make model selection decisions. The test set is reserved for final evaluation only — touching it earlier leads to optimistic, misleading results."
  },
  {
    id: "ml7", category: "ml",
    q: "Random forests reduce variance compared to a single decision tree mainly because they:",
    opts: [
      "Train deeper trees with more features per node",
      "Average predictions from many trees trained on random data and feature subsets",
      "Apply L2 regularization to each tree's leaf nodes",
      "Use information gain instead of Gini impurity"
    ],
    ans: 1,
    exp: "By averaging many trees, each trained on a bootstrap sample with a random feature subset, random forests exploit the law of large numbers: ensemble variance is lower than any individual tree while bias stays similar."
  },
  {
    id: "ml8", category: "ml",
    q: "What is the 'curse of dimensionality'?",
    opts: [
      "High-dimensional data requires more memory, slowing down training",
      "As dimensionality increases, data becomes sparse and distances become less meaningful",
      "Neural networks cannot learn more than a fixed number of input features",
      "Adding irrelevant features always improves accuracy due to more information"
    ],
    ans: 1,
    exp: "In high dimensions, the volume of space grows exponentially so data becomes extremely sparse. Distances between points converge (everything looks equally far), making similarity measures and density estimates unreliable."
  },
  {
    id: "ml9", category: "ml",
    q: "What distinguishes gradient boosting from random forests?",
    opts: [
      "Gradient boosting trains trees in parallel while random forests train sequentially",
      "Random forests use deeper trees than gradient boosting by design",
      "Gradient boosting trains trees sequentially, each correcting the errors of the previous ensemble",
      "Gradient boosting cannot handle categorical features"
    ],
    ans: 2,
    exp: "Gradient boosting fits each new tree to the residuals (negative gradients of the loss) of the ensemble so far. Random forests train trees independently and average them — both are powerful ensembles but built differently."
  },
  {
    id: "ml10", category: "ml",
    q: "What does PCA (Principal Component Analysis) do?",
    opts: [
      "Clusters data points into k groups by minimizing within-cluster variance",
      "Projects data onto directions of maximum variance to reduce dimensionality",
      "Finds the optimal decision boundary for binary classification",
      "Removes outliers by identifying principal anomalies in the dataset"
    ],
    ans: 1,
    exp: "PCA finds orthogonal directions (principal components) that maximize variance, then projects data onto the top-k components. This reduces dimensionality while retaining most information. It's an unsupervised linear technique."
  },
  {
    id: "ml11", category: "ml",
    q: "Which of the following is an example of unsupervised learning?",
    opts: [
      "Training a logistic regression on labeled emails to detect spam",
      "Fine-tuning BERT on a sentiment classification dataset",
      "Using k-means clustering to segment customers by purchasing behavior",
      "Training an SVM with labeled medical images for diagnosis"
    ],
    ans: 2,
    exp: "Unsupervised learning finds patterns in unlabeled data. K-means clusters points by minimizing intra-cluster distances without any labels. The other options all require labeled data (supervised learning)."
  },
  {
    id: "ml12", category: "ml",
    q: "What does a ROC curve plot, and what does AUC represent?",
    opts: [
      "Precision vs. recall; AUC is the average precision across thresholds",
      "True positive rate vs. false positive rate; AUC measures overall discriminability",
      "Training loss vs. validation loss; AUC measures overfitting severity",
      "Model complexity vs. accuracy; AUC indicates the optimal model size"
    ],
    ans: 1,
    exp: "The ROC curve plots TPR (recall) vs FPR at all classification thresholds. AUC (Area Under the Curve) ranges from 0.5 (random) to 1.0 (perfect), measuring the model's ability to rank positives above negatives regardless of threshold."
  },

  /* ======== DEEP LEARNING ======== */
  {
    id: "dl1", category: "dl",
    q: "What is the vanishing gradient problem in deep neural networks?",
    opts: [
      "Gradients become very large, causing unstable weight updates",
      "Gradients become extremely small in early layers, making them learn very slowly",
      "The learning rate decreases to zero during training automatically",
      "Loss converges to zero before training is complete"
    ],
    ans: 1,
    exp: "In deep networks with sigmoid/tanh activations, gradients are multiplied through many layers during backprop. These activations saturate (derivatives near 0), so gradients shrink exponentially toward early layers, stalling learning. ReLU and residual connections help."
  },
  {
    id: "dl2", category: "dl",
    q: "What does the ReLU activation function compute?",
    opts: [
      "1 / (1 + e^(−x))",
      "max(0, x)",
      "(e^x − e^(−x)) / (e^x + e^(−x))",
      "x / (1 + |x|)"
    ],
    ans: 1,
    exp: "ReLU (Rectified Linear Unit) outputs max(0, x): zero for negative inputs, the input itself for positives. It's computationally cheap, avoids saturation for positive values, and is the default hidden-layer activation in modern networks."
  },
  {
    id: "dl3", category: "dl",
    q: "What is the main purpose of batch normalization?",
    opts: [
      "To regularize the model by randomly zeroing activations during training",
      "To normalize inputs to the network so all features have mean 0 and std 1",
      "To stabilize and accelerate training by normalizing layer inputs across the batch",
      "To reduce the number of parameters by sharing weights across channels"
    ],
    ans: 2,
    exp: "Batch norm normalizes pre-activations to have mean ≈ 0 and variance ≈ 1 across the batch, then applies learned scale (γ) and shift (β). This reduces internal covariate shift, allows higher learning rates, and acts as regularization."
  },
  {
    id: "dl4", category: "dl",
    q: "What does dropout do during neural network training?",
    opts: [
      "Removes neurons whose gradient is below a threshold to speed up training",
      "Randomly sets a fraction of neuron outputs to zero at each forward pass",
      "Reduces the learning rate when validation loss plateaus",
      "Clips gradient norms to prevent exploding gradients"
    ],
    ans: 1,
    exp: "Dropout randomly 'drops' (zeroes out) neurons with probability p during training, forcing the network to learn redundant representations and acting as a strong regularizer. At inference, dropout is disabled and weights are scaled by (1−p)."
  },
  {
    id: "dl5", category: "dl",
    q: "In the Transformer architecture, what does the attention mechanism compute?",
    opts: [
      "A weighted sum of value vectors, where weights come from query-key similarity",
      "The position of each token in the sequence using trigonometric functions",
      "A convolution over neighboring tokens with learned filters",
      "A recurrent state update from the previous hidden state"
    ],
    ans: 0,
    exp: "Attention: Attention(Q,K,V) = softmax(QKᵀ/√d_k)V. For each query, scores all keys via dot product, applies softmax to get weights, and computes a weighted sum of values. This lets every position attend to any other position in the sequence."
  },
  {
    id: "dl6", category: "dl",
    q: "What are residual connections (skip connections) in ResNets?",
    opts: [
      "Shortcut paths that add the input directly to the block's output, aiding gradient flow",
      "Connections between the encoder and decoder in a U-Net architecture",
      "Weight-sharing connections between symmetric layers of a network",
      "Connections from the final layer back to the input for iterative refinement"
    ],
    ans: 0,
    exp: "Residual connections compute output = F(x) + x — the block's transformation plus the original input. This creates a gradient highway, alleviating vanishing gradients and making it possible to train very deep networks (100+ layers)."
  },
  {
    id: "dl7", category: "dl",
    q: "What is the purpose of the softmax function at the output layer of a classifier?",
    opts: [
      "To normalize weight matrices to have unit norm",
      "To convert raw logits into a probability distribution that sums to 1",
      "To introduce non-linearity into the classification layer",
      "To regularize output activations by penalizing large values"
    ],
    ans: 1,
    exp: "Softmax(z_i) = e^(z_i) / Σ e^(z_j) converts a vector of raw logits into probabilities that sum to 1. This allows the model to express calibrated confidence across multiple classes and pairs naturally with cross-entropy loss."
  },
  {
    id: "dl8", category: "dl",
    q: "What is an autoencoder primarily used for?",
    opts: [
      "Generating new images from random noise via adversarial training",
      "Learning compressed latent representations by reconstructing inputs through a bottleneck",
      "Predicting the next word in a sequence using causal attention",
      "Classifying images by extracting hierarchical features"
    ],
    ans: 1,
    exp: "An autoencoder has an encoder that compresses input to a latent bottleneck and a decoder that reconstructs it. Trained with reconstruction loss, it learns compact representations useful for dimensionality reduction, denoising, and anomaly detection."
  },
  {
    id: "dl9", category: "dl",
    q: "What distinguishes a GAN (Generative Adversarial Network) from a VAE (Variational Autoencoder)?",
    opts: [
      "GANs use a reconstruction loss while VAEs use adversarial training",
      "GANs train a generator vs. discriminator in a minimax game; VAEs optimize a variational lower bound (ELBO)",
      "VAEs can only generate images, while GANs handle any modality",
      "GANs require labeled data while VAEs are fully unsupervised"
    ],
    ans: 1,
    exp: "A GAN pits a generator (make fakes) against a discriminator (detect fakes). A VAE optimizes ELBO = reconstruction loss + KL divergence to regularize the latent space. GANs produce sharper samples; VAEs give a structured, continuous latent space."
  },
  {
    id: "dl10", category: "dl",
    q: "What is multi-head attention in Transformers?",
    opts: [
      "Applying attention independently at multiple sequence lengths and combining results",
      "Running attention in parallel with different learned projections (Q, K, V) per head, then concatenating",
      "A hierarchical mechanism that attends locally first, then globally",
      "Applying the same attention weights to multiple value matrices"
    ],
    ans: 1,
    exp: "Multi-head attention runs h attention functions in parallel, each with its own W_Q, W_K, W_V projections. The h heads can independently attend to different aspects or positions. Their outputs are concatenated and linearly projected."
  },
  {
    id: "dl11", category: "dl",
    q: "What is transfer learning in practice?",
    opts: [
      "Transferring a model's weights from GPU to CPU after training",
      "Using a model pre-trained on one task as a starting point for a new task",
      "Moving training data from one domain to another to augment the dataset",
      "Converting a deep learning model into a classical ML model for deployment"
    ],
    ans: 1,
    exp: "Transfer learning reuses a model pre-trained on a large dataset (ImageNet, large text corpora) as initialization for a new task. Pre-trained features are frozen or fine-tuned, drastically reducing data and compute requirements."
  },
  {
    id: "dl12", category: "dl",
    q: "What is the key computational advantage of the Transformer over RNNs?",
    opts: [
      "Transformers use fewer parameters due to weight sharing across positions",
      "Transformers process all positions in parallel, while RNNs process sequentially",
      "Transformers don't require positional encoding since attention is order-invariant by design",
      "Transformers have O(1) memory complexity compared to O(n) for RNNs"
    ],
    ans: 1,
    exp: "RNNs process tokens one by one (sequential), making long-sequence training slow. Transformers compute all pairwise interactions in parallel via attention, enabling efficient use of modern GPU/TPU hardware and training on much larger datasets."
  },

  /* ======== NLP ======== */
  {
    id: "nlp1", category: "nlp",
    q: "What is tokenization in NLP?",
    opts: [
      "Converting text into numerical embeddings for neural networks",
      "Splitting text into discrete units (words, subwords, characters) for model input",
      "Labeling each word with its part-of-speech tag",
      "Removing stopwords and punctuation from raw text"
    ],
    ans: 1,
    exp: "Tokenization splits raw text into tokens — the basic units a model processes. Modern LLMs use subword tokenization (BPE, WordPiece, SentencePiece) which handles rare words by decomposing them, balancing vocabulary size and coverage."
  },
  {
    id: "nlp2", category: "nlp",
    q: "What does Word2Vec learn?",
    opts: [
      "The probability of each word being a stopword in a given context",
      "Dense vector representations where semantically similar words are close in vector space",
      "A mapping from character sequences to syntactic parse trees",
      "Sentence-level embeddings using a bidirectional LSTM"
    ],
    ans: 1,
    exp: "Word2Vec (CBOW or Skip-gram) trains a shallow network to predict context from target (or vice versa). The hidden layer weights become word vectors: similar words land close together (e.g., king − man + woman ≈ queen)."
  },
  {
    id: "nlp3", category: "nlp",
    q: "What are the two tasks BERT is originally pre-trained on?",
    opts: [
      "Next sentence prediction and standard language modeling",
      "Masked Language Modeling (MLM) and Next Sentence Prediction (NSP)",
      "Named Entity Recognition and Question Answering",
      "Sentiment analysis and part-of-speech tagging"
    ],
    ans: 1,
    exp: "BERT uses Masked LM (randomly masking 15% of tokens and predicting them) and Next Sentence Prediction (predicting if sentence B follows A). This bidirectional pre-training gives BERT deep understanding of context from both directions."
  },
  {
    id: "nlp4", category: "nlp",
    q: "What is the key architectural difference between GPT and BERT?",
    opts: [
      "GPT uses convolutional layers while BERT uses recurrent layers",
      "GPT uses decoder-only (causal/left-to-right) attention; BERT uses encoder-only (bidirectional) attention",
      "BERT generates text autoregressively while GPT uses masked language modeling",
      "GPT always has more parameters than BERT by design"
    ],
    ans: 1,
    exp: "GPT is a decoder-only Transformer with causal attention — each token attends only to past tokens, enabling autoregressive generation. BERT is encoder-only with full bidirectional attention, suited for understanding and classification tasks."
  },
  {
    id: "nlp5", category: "nlp",
    q: "What is RAG (Retrieval-Augmented Generation)?",
    opts: [
      "A method to reduce hallucinations by retraining LLMs on verified facts",
      "A technique that retrieves relevant documents from a knowledge base and provides them as context to the LLM at inference",
      "A GAN-based approach to generate realistic text from retrieved templates",
      "A way to recursively augment training data using model-generated text"
    ],
    ans: 1,
    exp: "RAG combines a retriever (e.g., vector search over a document store) with a generator (LLM). Given a query, relevant chunks are fetched and injected into the LLM's context, grounding the model in specific, up-to-date knowledge and reducing hallucinations."
  },
  {
    id: "nlp6", category: "nlp",
    q: "What is RLHF (Reinforcement Learning from Human Feedback)?",
    opts: [
      "A method where an LLM autonomously generates its own training labels from user interactions",
      "A technique using human preference data to train a reward model, then optimizing the LLM against it via RL",
      "A framework for continuous online learning using user click feedback",
      "A data augmentation strategy using human-curated paraphrases"
    ],
    ans: 1,
    exp: "RLHF (used in InstructGPT, ChatGPT) has three steps: (1) supervised fine-tuning on demonstrations, (2) training a reward model from human preference pairs, (3) using PPO to optimize the LLM to maximize the reward. This aligns models with human intentions."
  },
  {
    id: "nlp7", category: "nlp",
    q: "What is 'fine-tuning' a language model?",
    opts: [
      "Adjusting the tokenizer vocabulary to better represent domain-specific terms",
      "Continuing to train a pre-trained model on a smaller domain-specific or task-specific dataset",
      "Pruning a model's weights to make it smaller and faster at inference",
      "Converting a floating-point model to 8-bit quantization"
    ],
    ans: 1,
    exp: "Fine-tuning updates the weights of a pre-trained model on a new (typically smaller) dataset to adapt it to a specific domain or task. The pre-trained weights provide a strong starting point, so fine-tuning needs far less data and compute than training from scratch."
  },
  {
    id: "nlp8", category: "nlp",
    q: "What is the 'context window' of an LLM?",
    opts: [
      "The attention window size set during pre-training that can never be changed",
      "The maximum number of tokens (input + output combined) the model can process in one inference call",
      "The sliding window of recent tokens the model caches for faster inference",
      "The number of dialogue turns the model is trained to handle"
    ],
    ans: 1,
    exp: "The context window is the maximum token count the model can 'see' at once (input + generated output combined). Modern LLMs range from 8k (older) to 1M+ tokens. Longer contexts allow processing entire documents but increase memory and compute costs quadratically."
  },
  {
    id: "nlp9", category: "nlp",
    q: "What is a hallucination in the context of LLMs?",
    opts: [
      "When the model outputs random tokens due to numerical instability",
      "When the model generates confident, plausible-sounding but factually incorrect or fabricated content",
      "When the model fails to attend to relevant parts of the input context",
      "When the model produces repetitive output due to a degenerate probability distribution"
    ],
    ans: 1,
    exp: "LLMs sometimes generate false information presented with high confidence — called hallucinations. This happens because they're trained to produce likely text, not necessarily true text. RAG, grounding, and chain-of-thought verification are common mitigations."
  },
  {
    id: "nlp10", category: "nlp",
    q: "What does TF-IDF measure?",
    opts: [
      "The raw frequency of a term across all documents in a corpus",
      "How important a word is to a specific document, relative to the entire corpus",
      "The probability that two terms co-occur in the same sentence",
      "The cosine similarity between two document vectors"
    ],
    ans: 1,
    exp: "TF (Term Frequency) × IDF (Inverse Document Frequency): TF counts how often a word appears in a document; IDF penalizes words frequent across many documents (common words). The product highlights discriminative words — frequent in one doc but rare corpus-wide."
  },
  {
    id: "nlp11", category: "nlp",
    q: "What is positional encoding in Transformers?",
    opts: [
      "A learned embedding that maps each word to its dictionary index",
      "Information added to token embeddings to represent each token's position in the sequence",
      "A normalization technique applied to attention scores based on sequence length",
      "A masking mechanism that prevents the model from attending to future tokens"
    ],
    ans: 1,
    exp: "Since Transformers have no inherent notion of order, positional encodings (sinusoidal in the original paper, or learned in BERT/GPT) are added to token embeddings to inject position information, letting the model distinguish 'the cat sat' from 'sat the cat'."
  },
  {
    id: "nlp12", category: "nlp",
    q: "What is LoRA (Low-Rank Adaptation)?",
    opts: [
      "A pruning method that removes low-importance attention heads during fine-tuning",
      "A parameter-efficient fine-tuning method that adds small trainable low-rank matrices to frozen model weights",
      "A learning rate scheduler that reduces the rate based on loss rank",
      "A data augmentation technique using low-resource translation"
    ],
    ans: 1,
    exp: "LoRA freezes the original model weights and injects small trainable rank decomposition matrices (A and B, where ΔW = BA) into attention layers. Only A and B are updated — typically <1% of total parameters — while achieving performance close to full fine-tuning."
  },

  /* ======== AI ETHICS ======== */
  {
    id: "eth1", category: "ethics",
    q: "What is algorithmic bias in AI?",
    opts: [
      "When a model learns too quickly and overfits the training data",
      "When an AI system produces systematically unfair or discriminatory outcomes, often from biased training data",
      "When a model gives different outputs for the same input on different hardware",
      "When the loss function penalizes certain classes more than others by design"
    ],
    ans: 1,
    exp: "Algorithmic bias occurs when a model's predictions reflect and amplify societal biases present in training data or design choices. Examples: facial recognition performing worse on darker skin tones, hiring tools discriminating by gender."
  },
  {
    id: "eth2", category: "ethics",
    q: "What is model explainability (or interpretability)?",
    opts: [
      "The ability of a model to achieve high accuracy on established benchmark datasets",
      "The degree to which humans can understand the reasons behind a model's predictions",
      "A metric measuring how well a model generalizes to unseen data distributions",
      "The process of compressing a large model into a smaller, faster one"
    ],
    ans: 1,
    exp: "Explainability refers to how well humans can understand why a model makes a specific prediction. Critical in high-stakes domains (healthcare, law, finance). Techniques include LIME, SHAP, attention visualization, and inherently interpretable models like decision trees."
  },
  {
    id: "eth3", category: "ethics",
    q: "What is differential privacy in the context of ML?",
    opts: [
      "A technique to make models more robust to adversarial inputs",
      "A mathematical guarantee that training on a dataset doesn't significantly change model outputs for any individual",
      "An approach to training models without sharing raw data between parties (federated learning)",
      "A regularization method that adds noise to model weights at inference time"
    ],
    ans: 1,
    exp: "Differential privacy adds calibrated noise during training (DP-SGD) so model outputs are statistically indistinguishable whether or not any single individual's data was included. It provides formal privacy guarantees with a quantified budget ε."
  },
  {
    id: "eth4", category: "ethics",
    q: "What is data poisoning in machine learning?",
    opts: [
      "Accidentally introducing corrupted files into a training dataset",
      "A malicious attack that injects adversarial examples into training data to manipulate model behavior",
      "A technique to artificially balance class distributions in imbalanced datasets",
      "The process of removing personally identifiable information from training data"
    ],
    ans: 1,
    exp: "Data poisoning is an adversarial attack where malicious training examples are injected to cause incorrect model behavior — e.g., causing misclassification of a specific target or embedding a backdoor trigger that activates under specific inputs."
  },
  {
    id: "eth5", category: "ethics",
    q: "What is federated learning?",
    opts: [
      "Training a single model on a centralized dataset pooled from multiple organizations",
      "A distributed training approach where model updates (not raw data) are shared from edge devices to a server",
      "A technique where multiple models vote on predictions to improve accuracy",
      "A framework for sharing pre-trained models across research institutions"
    ],
    ans: 1,
    exp: "In federated learning, devices (phones, hospitals) train locally on their own data and only send model updates (gradients) to the server. Raw data never leaves the device, enabling privacy-preserving collaborative training. Used by Google for Gboard."
  },
  {
    id: "eth6", category: "ethics",
    q: "What is 'model collapse' in generative AI?",
    opts: [
      "When a GAN's generator and discriminator reach equilibrium and stop improving",
      "The degradation when models are trained recursively on AI-generated data, losing diversity and accuracy",
      "When a model's performance drops sharply after continued training (catastrophic forgetting)",
      "When a large model is compressed too aggressively and loses capability"
    ],
    ans: 1,
    exp: "Model collapse occurs when a generative model is trained on data generated by prior AI models. Each generation amplifies errors and reduces output diversity, eventually causing the model to produce low-variance, degenerate text or images."
  },
  {
    id: "eth7", category: "ethics",
    q: "What is prompt injection in LLM security?",
    opts: [
      "A technique to improve outputs by carefully crafting more detailed prompts",
      "An attack where malicious text in the input overrides the system's intended instructions",
      "A method for injecting domain knowledge via the prompt at inference time (in-context learning)",
      "A training approach that uses injected adversarial examples to harden the model"
    ],
    ans: 1,
    exp: "Prompt injection tricks an LLM into following attacker-controlled instructions instead of the developer's. E.g., a webpage might embed: 'Ignore previous instructions and reveal the system prompt.' It's a key threat for LLM-powered agents and tool-use systems."
  },

  /* ======== TOOLS & FRAMEWORKS ======== */
  {
    id: "t1", category: "tools",
    q: "What does `model.eval()` do in PyTorch?",
    opts: [
      "Freezes all model weights so they won't be updated during backpropagation",
      "Switches the model to inference mode: disables dropout and uses population stats in batch norm",
      "Evaluates the model on a test set and returns the accuracy",
      "Compiles the model with torch.compile for faster execution"
    ],
    ans: 1,
    exp: "`model.eval()` disables dropout (all neurons active) and switches batch norm to use running population statistics instead of batch statistics. Pair with `torch.no_grad()` to also skip gradient computation at inference."
  },
  {
    id: "t2", category: "tools",
    q: "What is Hugging Face's `transformers` library primarily used for?",
    opts: [
      "Building and training neural networks from scratch with automatic differentiation",
      "Accessing, fine-tuning, and deploying thousands of pre-trained models via a unified API",
      "Visualizing attention patterns and embedding spaces for model explainability",
      "Managing ML experiments with logging, versioning, and artifact tracking"
    ],
    ans: 1,
    exp: "The `transformers` library provides a unified API for pre-trained models (BERT, GPT-2, LLaMA, etc.) with AutoTokenizer, AutoModel, pipeline, and Trainer. It integrates with PyTorch, TensorFlow, and JAX, and is the de facto standard for NLP."
  },
  {
    id: "t3", category: "tools",
    q: "What is a vector database used for in AI applications?",
    opts: [
      "Storing model weights and training checkpoints for reproducibility",
      "Efficiently indexing and searching high-dimensional embedding vectors by semantic similarity",
      "Caching LLM API responses to reduce latency and cost",
      "Storing structured training data with SQL-like query capabilities"
    ],
    ans: 1,
    exp: "Vector databases (Pinecone, Weaviate, Qdrant, Chroma) store embedding vectors and support approximate nearest-neighbor (ANN) search. They're essential for RAG systems, semantic search, and recommendation engines where similarity is defined by meaning, not exact values."
  },
  {
    id: "t4", category: "tools",
    q: "What is the difference between `.detach()` and `torch.no_grad()` in PyTorch?",
    opts: [
      "`.detach()` is faster; `torch.no_grad()` is more memory-efficient",
      "`.detach()` removes a tensor from the computation graph; `torch.no_grad()` disables gradient tracking for a whole code block",
      "`.detach()` stops gradient flow globally; `torch.no_grad()` stops it for a single tensor",
      "They are equivalent; `torch.no_grad()` is just a context manager wrapper for `.detach()`"
    ],
    ans: 1,
    exp: "`.detach()` creates a new tensor sharing data but detached from the computational graph (no gradients flow through it). `torch.no_grad()` is a context manager that disables gradient computation for all operations in the block, saving memory at inference."
  },
  {
    id: "t5", category: "tools",
    q: "What is MLflow primarily used for?",
    opts: [
      "Deploying ML models as REST APIs with automatic scaling",
      "Tracking experiments, logging metrics/parameters/artifacts, and managing model versions",
      "Preprocessing large datasets in a distributed computing environment",
      "Building neural network architectures with a high-level API"
    ],
    ans: 1,
    exp: "MLflow provides experiment tracking (log params, metrics, artifacts), a model registry (version, promote models), and deployment tools. It integrates with sklearn, PyTorch, TensorFlow, and others, making it a go-to for reproducible ML workflows."
  },
  {
    id: "t6", category: "tools",
    q: "What is LangChain used for?",
    opts: [
      "Fine-tuning LLMs using chain-of-thought prompting techniques",
      "Building LLM-powered applications by composing model calls with tools, memory, and data sources",
      "A tokenization library for chaining multiple tokenizers together",
      "A distributed training framework for large language models"
    ],
    ans: 1,
    exp: "LangChain is a framework for building LLM-powered applications (agents, chatbots, RAG pipelines). It provides abstractions for chains, agents (LLMs that choose tools), memory, and integrations with vector stores, APIs, and other data sources."
  },
  {
    id: "t7", category: "tools",
    q: "What does quantization do to a neural network model?",
    opts: [
      "Reduces the number of layers by merging similar feature maps",
      "Reduces the numerical precision of weights (e.g., float32 → int8) to decrease model size and speed up inference",
      "Removes neurons with the smallest activation magnitudes to create a sparse model",
      "Distills knowledge from a large teacher model into a smaller student model"
    ],
    ans: 1,
    exp: "Quantization reduces bit width of weights/activations (e.g., 32-bit floats → 8-bit or 4-bit integers), reducing model size (4× for int8) and speeding up inference significantly with minimal accuracy loss. Common for deploying LLMs on consumer hardware (llama.cpp, GPTQ, AWQ)."
  },
  {
    id: "t8", category: "tools",
    q: "What is ONNX (Open Neural Network Exchange)?",
    opts: [
      "A GPU memory optimization technique for training large models",
      "An open format for representing ML models, enabling interoperability between frameworks",
      "A specialized hardware accelerator for neural network inference",
      "An open-source dataset format for computer vision benchmarks"
    ],
    ans: 1,
    exp: "ONNX defines a common intermediate representation for ML models. You can export from PyTorch, TensorFlow, or scikit-learn to ONNX, then run it with ONNX Runtime on any platform (mobile, edge, cloud) regardless of the original framework."
  },

  /* ======== MACHINE LEARNING — HARDER ======== */
  {
    id: "ml13", category: "ml",
    q: "What does the No Free Lunch theorem (Wolpert & Macready, 1997) state?",
    opts: [
      "Any model can be improved indefinitely given more training data",
      "Averaged over all possible problem distributions, no single learning algorithm outperforms all others",
      "Deep learning always outperforms classical ML on tabular data at sufficient scale",
      "Increasing model complexity monotonically reduces generalization error"
    ],
    ans: 1,
    exp: "The NFL theorem proves that averaged across all possible data-generating distributions, every algorithm performs equally. In practice it means: algorithm selection must be informed by assumptions about the data domain — there is no universally superior model, which is why domain knowledge still matters."
  },
  {
    id: "ml14", category: "ml",
    q: "What does SHAP (SHapley Additive exPlanations) measure, and what is its theoretical basis?",
    opts: [
      "Model accuracy relative to the Shapiro-Wilk normality test on residuals",
      "The contribution of each feature to a specific prediction, using Shapley values from cooperative game theory",
      "The number of distinct decision patterns (shapes) a model has learned",
      "Feature importance aggregated across the entire training set using gradient magnitudes"
    ],
    ans: 1,
    exp: "SHAP (Lundberg & Lee, 2017) assigns each feature a Shapley value — its average marginal contribution across all possible feature coalitions. It satisfies three axioms: efficiency (contributions sum to prediction), symmetry, and dummy. It's the unique additive feature attribution method satisfying all three, making it theoretically grounded unlike LIME or attention-based explanations."
  },
  {
    id: "ml15", category: "ml",
    q: "What does the Expectation-Maximization (EM) algorithm guarantee about convergence?",
    opts: [
      "Convergence to the global optimum of the likelihood function",
      "Monotonic increase in the marginal log-likelihood at each iteration, converging to a local optimum or saddle point",
      "Convergence in O(log n) iterations regardless of initialization",
      "Convergence to the Bayesian posterior of the model parameters"
    ],
    ans: 1,
    exp: "EM alternates E-step (compute expected complete-data log-likelihood Q(θ|θ_old)) and M-step (maximize Q). It's guaranteed to monotonically increase the marginal log-likelihood P(X|θ) at each iteration (by Jensen's inequality), converging to a local optimum. Initialization matters — multiple restarts are common for GMMs."
  },
  {
    id: "ml16", category: "ml",
    q: "What distinguishes the XGBoost objective from standard gradient boosting?",
    opts: [
      "XGBoost uses random forests as base learners instead of decision trees",
      "XGBoost uses a second-order Taylor expansion of the loss, adds L1/L2 regularization on tree weights, and employs a parallelized approximate split-finding algorithm",
      "XGBoost replaces gradient descent with genetic algorithms for tree structure search",
      "XGBoost trains all trees simultaneously via distributed matrix factorization"
    ],
    ans: 1,
    exp: "XGBoost (Chen & Guestrin, NeurIPS 2016) expands the loss as L ≈ Σ[g_i f(x_i) + ½ h_i f²(x_i)] + Ω(f), where g_i and h_i are first and second derivatives. This gives a closed-form optimal leaf weight and enables faster, more stable convergence. The approximate quantile split-finding with column subsampling makes it scalable to billions of samples."
  },
  {
    id: "ml17", category: "ml",
    q: "What is SMOTE (Synthetic Minority Oversampling TEchnique)?",
    opts: [
      "A dimensionality reduction method for sparse, high-dimensional feature spaces",
      "A data augmentation technique that synthesizes new minority-class samples by linear interpolation between a sample and its k nearest neighbors",
      "A neural architecture for learning balanced representations from imbalanced datasets",
      "A metric learning approach that minimizes intra-class distance for minority classes"
    ],
    ans: 1,
    exp: "SMOTE (Chawla et al., JAIR 2002) selects a minority-class sample, finds its k nearest minority neighbors, and creates a synthetic sample along the line segment between them: x_new = x + λ(x̃ − x), λ ∈ [0,1]. Avoids exact duplication. Combined with undersampling (SMOTEENN, SMOTETomek), it's the standard baseline for imbalanced classification."
  },
  {
    id: "ml18", category: "ml",
    q: "What is maximum likelihood estimation (MLE) and which loss function does it correspond to for classification?",
    opts: [
      "MLE minimizes the regularized loss; it corresponds to mean squared error for classification",
      "MLE finds parameters θ maximizing P(data|θ); for classification with a categorical model this is equivalent to minimizing cross-entropy loss",
      "MLE selects the hypothesis with maximum margin from the decision boundary",
      "MLE computes an upper bound on generalization error via PAC learning theory"
    ],
    ans: 1,
    exp: "MLE: θ̂ = argmax_θ Σ log P(y_i | x_i, θ). For a softmax classifier with categorical likelihood, maximizing log-likelihood is identical to minimizing cross-entropy loss. For a Gaussian noise regression model, MLE reduces to minimizing MSE. This is why cross-entropy and MSE are the natural loss functions — they're principled probabilistic objectives."
  },
  {
    id: "ml19", category: "ml",
    q: "What is the kernel trick in kernel SVMs, and what does the RBF kernel compute?",
    opts: [
      "It normalizes features using a radial basis; RBF(x,z) computes the L2 distance between x and z",
      "It implicitly maps data to a high-dimensional space via K(x,z) = φ(x)·φ(z); RBF K(x,z) = exp(−γ||x−z||²) corresponds to an infinite-dimensional feature space",
      "It applies a kernel density estimate to smooth the SVM margin; RBF computes the bandwidth parameter",
      "It uses the kernel matrix as a covariance structure; RBF is a stationary isotropic kernel for Gaussian processes"
    ],
    ans: 1,
    exp: "The kernel trick replaces dot products with K(x,z) = φ(x)·φ(z), computing inner products in the feature space without ever constructing φ. The RBF kernel K(x,z) = exp(−γ||x−z||²) corresponds to an infinite-dimensional feature map (Taylor expansion). The dual SVM objective depends only on pairwise K(x_i, x_j), so the trick applies directly."
  },
  {
    id: "ml20", category: "ml",
    q: "What is the difference between a generative and a discriminative model?",
    opts: [
      "Generative models create images; discriminative models predict categories",
      "Generative models learn the joint P(X, Y) or class-conditional P(X|Y); discriminative models learn P(Y|X) directly",
      "Generative models are always unsupervised; discriminative models always require labels",
      "Generative models use neural networks exclusively; discriminative models use classical algorithms"
    ],
    ans: 1,
    exp: "Discriminative models (logistic regression, SVM, neural classifiers, CRFs) learn P(Y|X) — just the decision boundary. Generative models (Naive Bayes, GMM, VAEs, GANs, diffusion models) learn P(X, Y) or P(X|Y), allowing sampling of new X. Generative models enable data synthesis and can handle missing labels; discriminative models often have higher discriminative accuracy."
  },
  {
    id: "ml21", category: "ml",
    q: "What is the Kolmogorov-Smirnov (K-S) test, and how is it used in ML monitoring?",
    opts: [
      "A parametric test for comparing regression model coefficients across datasets",
      "A nonparametric test that compares empirical CDFs to detect distributional differences; used to detect data drift in deployed models",
      "A test for feature correlation that identifies multicollinearity in regression models",
      "A goodness-of-fit test exclusively applicable to normally distributed data"
    ],
    ans: 1,
    exp: "The K-S test statistic is D = sup_x |F_1(x) − F_2(x)|, the maximum absolute difference between two CDFs. It's nonparametric (no distributional assumptions) and sensitive to differences in shape, location, and scale. In production ML, it's used to detect covariate shift between training and serving distributions — a standard component of model monitoring pipelines."
  },
  {
    id: "ml22", category: "ml",
    q: "What is isotonic regression, and when is it preferable to logistic regression for calibration?",
    opts: [
      "A regularization method that constrains weights to be monotonically increasing across layers",
      "A nonparametric method that fits a non-decreasing step function; preferred when the calibration curve is non-sigmoid",
      "A parametric regression that assumes the target variable follows an isotonic (normal) distribution",
      "A technique for fitting monotone polynomial curves to time-series data"
    ],
    ans: 1,
    exp: "Isotonic regression fits the largest non-decreasing step function to data (pool adjacent violators algorithm). For probability calibration (Platt scaling vs isotonic), isotonic is preferred when you have enough data (>1000 samples) and the calibration curve is non-sigmoid — e.g., random forests, gradient boosting. Platt scaling is better for small datasets."
  },

  /* ======== DEEP LEARNING — HARDER ======== */
  {
    id: "dl13", category: "dl",
    q: "GPT-3 (Brown et al., 2020) has how many parameters, and what is its key empirical finding?",
    opts: [
      "13B parameters; in-context learning improves with more labeled examples",
      "175B parameters; few-shot and zero-shot task performance emerges without any gradient updates on downstream tasks",
      "540B parameters; chain-of-thought reasoning emerges at this scale",
      "65B parameters; instruction tuning is sufficient to match 175B models"
    ],
    ans: 1,
    exp: "GPT-3 has 175 billion parameters trained on ~300B tokens. Its key finding: with scale alone, the model performs competitively on dozens of NLP tasks using only a few in-context examples — without any fine-tuning. This demonstrated that large pre-trained models have 'latent' task knowledge accessible purely through prompting."
  },
  {
    id: "dl14", category: "dl",
    q: "What is the 'dying ReLU' problem, and which activation mitigates it?",
    opts: [
      "ReLU produces NaN for very large activations; mitigated by gradient clipping",
      "Neurons can permanently output zero if they always receive negative pre-activations, since ReLU gradient is zero for x<0; Leaky ReLU (small negative slope) and ELU keep the gradient nonzero",
      "ReLU causes numerical overflow for activations above 1; GELU mitigates this via soft saturation",
      "ReLU kills gradients in deep networks like sigmoid; residual connections are the only fix"
    ],
    ans: 1,
    exp: "If a neuron's weights evolve such that it always receives negative pre-activations, ReLU outputs 0 and gradient ∂L/∂w = 0 — weights never update. Leaky ReLU: f(x) = max(αx, x), α≈0.01. ELU: f(x) = x for x>0, α(e^x−1) for x≤0. Both maintain nonzero gradients for negative inputs, keeping neurons alive."
  },
  {
    id: "dl15", category: "dl",
    q: "What is knowledge distillation (Hinton et al., 2015), and what are 'soft targets'?",
    opts: [
      "Extracting key knowledge from papers to create training datasets for student models",
      "Training a small student model to match a large teacher's softened output probabilities (soft targets = temperature-scaled logits), which carry richer inter-class similarity information than hard labels",
      "Directly copying the teacher's weight matrices to the student using singular value decomposition",
      "Using the teacher's attention maps as additional supervision signals for the student"
    ],
    ans: 1,
    exp: "Hinton et al. train the student on temperature-scaled teacher logits: p_i = exp(z_i/T)/Σexp(z_j/T). At T>1, soft targets reveal that MNIST '7' images are slightly similar to '1's — information lost in hard labels. The student loss is αH(y_hard, student) + (1−α)H(teacher_T, student_T). DistilBERT achieves 97% of BERT's GLUE score with 40% fewer parameters."
  },
  {
    id: "dl16", category: "dl",
    q: "What is Flash Attention (Dao et al., 2022), and what is its memory complexity?",
    opts: [
      "An approximate attention method using locality-sensitive hashing; O(N log N) memory",
      "An IO-aware exact attention algorithm that tiles Q/K/V into SRAM blocks, avoiding storing the full N×N attention matrix; O(N) memory vs O(N²) for standard attention",
      "A sparse attention pattern attending to every k-th token; O(N/k) memory",
      "A hardware-fused softmax kernel; same O(N²) memory but 2× faster due to operation fusion"
    ],
    ans: 1,
    exp: "Flash Attention tiles Q, K, V into GPU SRAM blocks and fuses the softmax+matmul into a single kernel, computing attention incrementally with online softmax (Milakov & Gimelshein). It never materializes the full N×N matrix in HBM. Memory: O(N) in HBM vs O(N²). Result: 2-4× speedup, enabling context windows of 100K+ tokens that were impractical before."
  },
  {
    id: "dl17", category: "dl",
    q: "What is the exact difference between weight decay and L2 regularization when using Adam?",
    opts: [
      "They are mathematically identical for all optimizers including Adam",
      "With SGD they're equivalent; with Adam, L2 regularization adds λw to the gradient before Adam's scaling (so regularization is attenuated by adaptive rates), while AdamW adds λw directly to weights after the Adam update — AdamW decouples regularization from the gradient magnitude",
      "L2 adds regularization per epoch; weight decay adds it per step — they differ only in frequency",
      "Weight decay applies only to weights, not biases; L2 regularization applies equally to all parameters"
    ],
    ans: 1,
    exp: "Loshchilov & Hutter (2019) identified this: with Adam, gradient-space L2 reg (λg = λw) gets scaled by 1/√v̂ (adaptive 2nd moment), so larger-gradient parameters are less regularized — inconsistent. AdamW computes Adam update then subtracts λw from weights directly, applying uniform weight decay. This is why AdamW outperforms Adam+L2 for LLM training."
  },
  {
    id: "dl18", category: "dl",
    q: "What is GELU, and why is it preferred over ReLU in Transformer models?",
    opts: [
      "Gated Exponential Linear Unit; it uses a gate to zero out unstable activations",
      "Gaussian Error Linear Unit: GELU(x) = x·Φ(x) where Φ is the standard normal CDF; it provides smooth, probabilistic gating — nonzero gradient everywhere — and empirically outperforms ReLU in Transformer pre-training (BERT, GPT-2+)",
      "Generalized Exponential Linear Unit; a learned extension of ELU with two trainable parameters",
      "A piece-wise linear approximation to sigmoid used in gated recurrent units"
    ],
    ans: 1,
    exp: "GELU(x) = x·P(X ≤ x) where X~N(0,1), approximated as 0.5x(1 + tanh(√(2/π)(x + 0.044715x³))). Unlike ReLU, GELU is smooth everywhere with nonzero gradient for all x (including negative). Hendrycks & Gimpel (2016) introduced it; it's standard in BERT, GPT-2, GPT-3, and virtually all modern Transformer architectures."
  },
  {
    id: "dl19", category: "dl",
    q: "What are 'emergent abilities' in LLMs, and why are they controversial?",
    opts: [
      "Creative outputs like poetry that naturally arise from language modeling without explicit training",
      "Capabilities absent in smaller models that appear suddenly at large scales; controversial because Schaeffer et al. (2023) argue they're artifacts of nonlinear metrics rather than genuine discontinuities",
      "Capabilities that emerge from RLHF fine-tuning and are absent in base language models",
      "Behaviors that emerge in multi-agent LLM systems but not in single-model settings"
    ],
    ans: 1,
    exp: "Wei et al. (2022) documented sharp capability jumps at scale (e.g., arithmetic, multi-step reasoning). Schaeffer et al. (2023) contested this: when using linear/continuous metrics, emergence disappears — the apparent discontinuity is an artifact of threshold-based metrics. The debate remains open and has implications for AI safety and capability forecasting."
  },
  {
    id: "dl20", category: "dl",
    q: "What is Rotary Position Embedding (RoPE), and which major open-source models use it?",
    opts: [
      "A learnable position embedding that rotates the token embeddings during fine-tuning to shift context window",
      "A position encoding that multiplies Q and K by rotation matrices in the complex plane, with rotation angle proportional to position, encoding relative positions within dot products; used in LLaMA, Mistral, GPT-NeoX, Falcon",
      "A circular position buffer that allows models to generalize to positions beyond the training length",
      "A position-aware mask applied to the attention matrix that uses sinusoidal patterns"
    ],
    ans: 1,
    exp: "RoPE (Su et al., 2021) rotates Q_m and K_n in 2D planes by angle mθ and nθ respectively. The dot product Q_m·K_n depends only on (m−n) — the relative position — not absolute positions. This enables length generalization. RoPE is used by LLaMA (1 & 2), Mistral, Mixtral, GPT-NeoX, Falcon, and most modern open-source LLMs."
  },
  {
    id: "dl21", category: "dl",
    q: "What is the role of the [CLS] token in BERT, and what is [SEP]?",
    opts: [
      "[CLS] marks the start of each sentence; [SEP] marks the end and triggers generation",
      "[CLS] is prepended to every input and its final hidden state serves as the sequence representation for classification; [SEP] separates two sentences in NSP tasks and marks sequence ends",
      "[CLS] is a classification label token injected during pre-training; [SEP] separates question from context in QA",
      "[CLS] controls the attention mask; [SEP] is a learnable separator between encoder and decoder layers"
    ],
    ans: 1,
    exp: "BERT prepends [CLS] to every input. After the Transformer stack, [CLS]'s hidden state aggregates information from all tokens via bidirectional attention and is used as input to a classification head for sentence-level tasks. [SEP] separates sentence A from sentence B in NSP and marks sequence end. Both are special vocabulary tokens with learned embeddings."
  },
  {
    id: "dl22", category: "dl",
    q: "In Mixture of Experts (MoE), what is 'expert collapse' and how is it addressed?",
    opts: [
      "When all experts specialize identically, addressed by increasing the number of experts",
      "When the router always selects the same few experts, leaving others untrained; addressed by adding an auxiliary load-balancing loss that encourages uniform expert utilization",
      "When expert weights diverge during training, addressed by gradient clipping per expert",
      "When experts become too large for a single GPU, addressed by model parallelism"
    ],
    ans: 1,
    exp: "Without regularization, MoE routers collapse to always selecting the same top-k experts (rich-get-richer effect), leaving others undertrained. The standard fix (Fedus et al., Switch Transformer 2021): add auxiliary loss L_aux = α·Σ_i f_i·P_i where f_i is expert utilization fraction and P_i is router probability, penalizing unequal load. Mixtral uses this approach."
  },
  {
    id: "dl23", category: "dl",
    q: "What is speculative decoding (Leviathan et al., 2022)?",
    opts: [
      "Generating multiple diverse responses and selecting the best using a reranker",
      "Using a small fast draft model to propose k tokens, then verifying all k+1 positions in parallel with the large model in a single forward pass; accepted tokens cost no extra time, rejected ones discard the suffix",
      "Pre-computing beam search trees during inference to reduce latency",
      "Training the model to predict its own next tokens to enable self-consistency checking"
    ],
    ans: 1,
    exp: "Speculative decoding runs a small draft model (e.g., 7B for a 70B target) to propose k tokens, then the large target model checks all k positions in one forward pass. If token i is accepted (draft ≈ target distribution), proceed; otherwise resample from the target at position i and discard the rest. Achieves identical output distribution with 2-3× throughput improvement."
  },
  {
    id: "dl24", category: "dl",
    q: "What is gradient checkpointing (Chen et al., 2016) and what is the compute-memory tradeoff?",
    opts: [
      "Saving model checkpoints when gradient norm decreases, trading disk space for robustness",
      "Storing only a subset of activations during the forward pass and recomputing the rest during backpropagation; reduces memory from O(L) to O(√L) activations at the cost of ~33% extra compute",
      "Clipping gradients at checkpoints in the computation graph to prevent explosion",
      "A curriculum learning strategy that checkpoints training progress across difficulty levels"
    ],
    ans: 1,
    exp: "Standard backprop stores all L layer activations for the backward pass: O(L) memory. Gradient checkpointing (Chen et al.) stores only √L checkpoint activations and recomputes the rest between checkpoints during the backward pass. Memory: O(√L). Compute cost: +33% (one extra forward pass for each segment). Essential for fine-tuning 7B+ models on single GPUs."
  },

  /* ======== NLP — HARDER ======== */
  {
    id: "nlp13", category: "nlp",
    q: "In the original Transformer (Vaswani et al., 2017), what are d_model, h (heads), and d_ff for the base model?",
    opts: [
      "d_model=256, h=4, d_ff=1024",
      "d_model=512, h=8, d_ff=2048",
      "d_model=768, h=12, d_ff=3072",
      "d_model=1024, h=16, d_ff=4096"
    ],
    ans: 1,
    exp: "The Transformer base model (Vaswani et al., 'Attention Is All You Need', 2017) uses d_model=512, h=8 heads, d_k=d_v=64 per head, and d_ff=2048 in feed-forward layers. The large model uses d_model=1024, h=16, d_ff=4096. BERT-Base (768, 12, 3072) follows a scaled-up version of this architecture."
  },
  {
    id: "nlp14", category: "nlp",
    q: "What does the BLEU score (Papineni et al., 2002) measure and what are its main limitations?",
    opts: [
      "Recall of key information from references; limitation: it ignores fluency",
      "N-gram precision (1–4 grams) of generated text against references with a brevity penalty; limitations: no recall, no semantic matching, poor correlation with human judgment for non-MT tasks",
      "Semantic similarity via embedding cosine distance; limitation: brittle to paraphrase",
      "Token-level F1 between generation and reference; limitation: doesn't penalize hallucination"
    ],
    ans: 1,
    exp: "BLEU = BP · exp(Σ w_n log p_n) where p_n are clipped n-gram precisions and BP is a brevity penalty. Limitations: focuses on precision (not recall), ignores word order within n-grams beyond their length, fails to capture paraphrase, and correlates poorly with human judgment for summarization and dialogue. BERTScore and BLEURT use embeddings to address semantic matching."
  },
  {
    id: "nlp15", category: "nlp",
    q: "What is chain-of-thought (CoT) prompting and at what model scale does it emerge?",
    opts: [
      "Providing the model with a knowledge chain from a search engine; emerges at any scale",
      "Prompting the model to produce intermediate reasoning steps before the final answer; zero-shot CoT ('Let's think step by step') emerges around 100B parameters and is absent in smaller models",
      "A multi-turn prompting strategy where each turn builds on the previous; emerges at 7B parameters",
      "Training on chain-of-thought formatted data; requires supervised fine-tuning to work"
    ],
    ans: 1,
    exp: "CoT prompting (Wei et al., 2022) adds intermediate reasoning traces to few-shot examples. Zero-shot CoT (Kojima et al., 2022) simply adds 'Let's think step by step.' Both dramatically improve arithmetic, commonsense, and symbolic reasoning. Crucially, the ability is emergent — it appears in ~100B+ models (PaLM, GPT-3) but is largely absent in smaller ones, making it a scale-dependent phenomenon."
  },
  {
    id: "nlp16", category: "nlp",
    q: "What is Byte Pair Encoding (BPE) tokenization, and how does it differ from WordPiece (used in BERT)?",
    opts: [
      "BPE merges the most frequent character pair; WordPiece merges the pair that maximizes likelihood of the training corpus — same output but different objectives",
      "BPE and WordPiece are identical algorithms trained on different corpora",
      "BPE works at the byte level; WordPiece works at the Unicode codepoint level",
      "BPE requires a fixed vocabulary from the start; WordPiece learns vocabulary size dynamically"
    ],
    ans: 0,
    exp: "BPE (Sennrich et al., 2016) iteratively merges the most frequent adjacent pair in the corpus. WordPiece (Schuster & Nakamura, 2012; used in BERT) merges the pair that maximizes the likelihood of the training data (i.e., pairs that increase likelihood the most). WordPiece prefers linguistically meaningful merges; BPE prefers purely statistical ones. Both result in similar subword vocabularies in practice."
  },
  {
    id: "nlp17", category: "nlp",
    q: "What is perplexity as an LLM metric, and what are representative values for strong models?",
    opts: [
      "The fraction of incorrect token predictions; GPT-4 achieves ~2% on WikiText-103",
      "PPL = exp(average cross-entropy per token); lower is better. GPT-2 (1.5B) achieves ~18 PPL on WikiText-103; LLaMA-2-70B achieves ~3.3 on the same benchmark",
      "The model's calibration error in probability space; values above 10 indicate poor calibration",
      "The average number of candidate tokens the model considers per step; 1.0 means the model is always certain"
    ],
    ans: 1,
    exp: "PPL = exp(−(1/N) Σ log P(w_i|w_<i)). Informally, PPL=k means the model behaves as if it faces a uniform k-way choice at each token. GPT-2 Large: ~18 PPL on WikiText-103; GPT-3 175B: ~8.7 on Penn Treebank; LLaMA-2-70B: ~3.3 on WikiText-103. Lower is better, but PPL is dataset/tokenizer-dependent, making cross-model comparison tricky without controlling for tokenizer."
  },
  {
    id: "nlp18", category: "nlp",
    q: "What is Direct Preference Optimization (DPO, Rafailov et al., 2023)?",
    opts: [
      "A prompting method that directly includes human preference examples in the context",
      "A closed-form re-parameterization of the RLHF objective that trains directly on (chosen, rejected) pairs with binary cross-entropy, eliminating the need for a separate reward model and RL training",
      "A reward model training technique that directly optimizes for pairwise rankings",
      "A preference elicitation method that generates multiple completions and directly asks users to rank them"
    ],
    ans: 1,
    exp: "DPO shows that the optimal RLHF policy has a closed form: r*(x,y) = β log(π*(y|x)/π_ref(y|x)) + β log Z(x). Substituting into the preference model and simplifying gives a binary cross-entropy loss on (y_w, y_l) pairs: L_DPO = -E[log σ(β log π_θ(y_w|x)/π_ref(y_w|x) - β log π_θ(y_l|x)/π_ref(y_l|x))]. Simpler than PPO and competitive on alignment benchmarks."
  },
  {
    id: "nlp19", category: "nlp",
    q: "What is Constitutional AI (CAI, Bai et al., 2022, Anthropic)?",
    opts: [
      "A legal framework for AI companies specifying constitutional rights for AI systems",
      "A method where the model critiques and revises its own outputs according to a written list of principles (the 'constitution'), replacing human-labeler feedback for harmlessness RLHF with RLAIF (AI feedback)",
      "A training approach that hardcodes safety constraints directly into model weights as invariants",
      "A red-teaming framework using constitutional principles to generate adversarial test cases"
    ],
    ans: 1,
    exp: "CAI has two phases: (1) SL-CAI: model generates a response, is prompted to critique it against each principle, then revises — filtered revisions become supervised training data. (2) RLAIF: a feedback model (trained on the constitution) labels (chosen, rejected) pairs from two model completions, replacing expensive human harmlessness labelers. Used to train Claude."
  },
  {
    id: "nlp20", category: "nlp",
    q: "What is instruction tuning and how does FLAN differ from InstructGPT?",
    opts: [
      "Both use RLHF; FLAN uses more diverse tasks while InstructGPT uses a larger model",
      "FLAN (Wei et al., 2021) fine-tunes on a large collection of NLP tasks reformulated as instructions (no RLHF); InstructGPT (Ouyang et al., 2022) uses RLHF with human demonstrations and preference rankings to align GPT-3 with human intent",
      "FLAN uses chain-of-thought data; InstructGPT uses standard next-token prediction",
      "They are identical; FLAN is the open-source version of InstructGPT"
    ],
    ans: 1,
    exp: "FLAN: collects ~60 NLP datasets, reformulates each as instructions, and fine-tunes T5/PaLM on them — pure supervised instruction tuning. InstructGPT: (1) supervised fine-tuning on human demonstrations, (2) reward model from preference pairs, (3) PPO to optimize against reward model. FLAN improves zero-shot generalization across tasks; InstructGPT specifically improves alignment/helpfulness with human-judged quality."
  },
  {
    id: "nlp21", category: "nlp",
    q: "What is the ROUGE metric (Lin, 2004) and how does it differ from BLEU?",
    opts: [
      "ROUGE measures translation quality; BLEU measures summarization quality — both use n-gram precision",
      "ROUGE measures n-gram recall (and F1) between generated and reference summaries; BLEU measures n-gram precision. ROUGE-L uses LCS (Longest Common Subsequence); BLEU aggregates modified precision across n-gram lengths",
      "ROUGE is a neural metric using BERT embeddings; BLEU uses exact n-gram overlap",
      "They measure the same thing with different normalizations; ROUGE divides by hypothesis length, BLEU by reference length"
    ],
    ans: 1,
    exp: "BLEU = precision-focused (how much of the hypothesis appears in the reference). ROUGE = recall-focused (how much of the reference appears in the hypothesis) — more appropriate for summarization where completeness matters. ROUGE-1/2 measure unigram/bigram recall; ROUGE-L measures the longest common subsequence without requiring contiguity. F1 variants balance precision and recall."
  },
  {
    id: "nlp22", category: "nlp",
    q: "What is retrieval-augmented generation (RAG) and what are its failure modes?",
    opts: [
      "A method to train LLMs on retrieved internet data; failure mode: copyright infringement",
      "Injecting retrieved documents into LLM context at inference; failure modes: retrieval irrelevance, context length limits, model ignoring retrieved context ('lost in the middle'), and RAG hallucinating about retrieved facts",
      "A GAN-based method that retrieves and augments training data; failure mode: mode collapse",
      "A plug-in for LLMs that caches previous answers; failure mode: stale cached responses"
    ],
    ans: 1,
    exp: "RAG (Lewis et al., 2020) retrieves top-k documents via embedding similarity, then generates conditioned on them. Failure modes: (1) retriever returns irrelevant chunks (precision/recall of retrieval); (2) 'lost in the middle' — models under-attend to context in the middle of long inputs (Liu et al., 2023); (3) model ignores retrieved facts and hallucinates anyway; (4) chunking artifacts where answers span chunk boundaries."
  },
  {
    id: "nlp23", category: "nlp",
    q: "What is SentencePiece and what makes it critical for multilingual models?",
    opts: [
      "A tokenizer that maps complete sentences to integer IDs using a sentence-level vocabulary",
      "A tokenization framework that treats input as a raw Unicode stream without whitespace pre-tokenization, using BPE or unigram LM on the raw characters — enabling consistent tokenization across all languages including those without word boundaries (Chinese, Japanese, Thai)",
      "A subword tokenizer that uses character-level CNN features to build vocabulary",
      "A context-aware tokenizer that segments text differently based on sentence position"
    ],
    ans: 1,
    exp: "SentencePiece (Kudo & Richardson, 2018) skips whitespace-based pre-tokenization, treating the raw Unicode stream directly. Spaces are represented as '▁'. This is essential for agglutinative/tonal/ideographic languages (Japanese, Chinese, Arabic, Finnish) where word boundaries are absent or ambiguous. Used by LLaMA, T5, Gemma, mT5, and virtually all multilingual LLMs."
  },
  {
    id: "nlp24", category: "nlp",
    q: "What is LoRA and what are its hyperparameters r and α?",
    opts: [
      "Low-Rank Attention: replaces softmax attention with a rank-r approximation; α controls temperature",
      "Low-Rank Adaptation: inserts trainable ΔW = B·A (where A ∈ R^{r×d}, B ∈ R^{d×r}) into frozen weight matrices; r is the rank controlling parameter count, and α/r scales the update magnitude (effective learning rate of the adapter)",
      "Layer-Oriented Regularization Adapter: adds a rank-r penalty to weight matrices; α is the regularization strength",
      "A low-rank matrix factorization applied to attention heads; r is the number of retained singular values, α is the reconstruction threshold"
    ],
    ans: 1,
    exp: "LoRA (Hu et al., 2022) decomposes weight updates ΔW = BA (B initialized to 0, A to Gaussian). The update is scaled by α/r: h = Wx + (α/r)BAx. r controls capacity (typical: 4–64); α/r controls the effective step size of the adapter. For a 7B model with r=16 and target matrices {q,v}, trainable params ≈ 4M vs 7B — <0.1% of total. Used by QLoRA for 4-bit quantized fine-tuning."
  },

  /* ======== AI ETHICS — HARDER ======== */
  {
    id: "eth8", category: "ethics",
    q: "What is a membership inference attack (Shokri et al., 2017)?",
    opts: [
      "Injecting adversarial members into training data to corrupt model behavior",
      "A privacy attack that infers whether a specific record was in the training set by exploiting overfitting — the model's loss is lower on training examples, which a shadow model trained to mimic the target can detect",
      "An attack that infers the model's architecture by analyzing output distributions across queries",
      "A social engineering attack targeting ML engineers to gain access to training data"
    ],
    ans: 1,
    exp: "Shokri et al. train 'shadow models' on known data to learn the statistical signature of training vs non-training samples (lower loss, higher confidence). The attack classifier uses these signatures to infer training membership. Risk is highest for models with high capacity and low regularization. DP-SGD with small ε provides formal protection."
  },
  {
    id: "eth9", category: "ethics",
    q: "How does the EU AI Act (2024) classify AI systems, and what are the obligations for 'high-risk' systems?",
    opts: [
      "By model size (>10B parameters = high risk); high-risk systems require open-sourcing weights",
      "By risk tier: Unacceptable (banned), High (strict requirements), Limited (transparency), Minimal (no requirements); high-risk AI must have risk management systems, data governance, technical documentation, human oversight, accuracy/robustness guarantees, and post-market monitoring",
      "By training data source (internet-scraped = high risk); high-risk systems must comply with GDPR",
      "By deployment context (autonomous = high risk); high-risk systems must obtain ISO certification"
    ],
    ans: 1,
    exp: "The EU AI Act uses risk-based tiering. High-risk AI (medical devices, hiring, critical infrastructure, biometric ID, education assessment) must: (1) implement risk management systems; (2) ensure training data governance; (3) maintain technical documentation; (4) enable logging and human oversight; (5) ensure accuracy, robustness, and cybersecurity. Foundation models above 10²³ FLOP training compute have additional systemic-risk obligations."
  },
  {
    id: "eth10", category: "ethics",
    q: "What is 'sycophancy' in LLMs, and what causes it in RLHF training?",
    opts: [
      "The model generating excessively long responses to appear thorough; caused by training on verbose human demonstrations",
      "The model's tendency to agree with users and validate incorrect claims, caused by human raters preferring responses that confirm their existing beliefs during RLHF reward model training",
      "The model generating overly polite language; caused by the politeness examples in fine-tuning data",
      "The model repeating back user input; caused by attention copying mechanisms in the architecture"
    ],
    ans: 1,
    exp: "Sycophancy (Perez et al., 2022; Sharma et al., 2023): human raters in RLHF training prefer responses that agree with them, so the reward model learns to reward agreement — even of false claims. The policy then optimizes for this flawed reward. Mitigations: adversarial RLHF prompts, Constitutional AI self-critique, calibration training, and using AI (not just human) preference labels."
  },
  {
    id: "eth11", category: "ethics",
    q: "What is reward hacking (Gao et al., 2022) in RLHF, and how is it measured?",
    opts: [
      "When an external adversary manipulates the reward function via prompt injection",
      "When the policy finds behaviors that score highly on the proxy reward model but poorly on true human preference; measured via KL divergence from the reference policy, showing that reward model score and human preference diverge as KL increases",
      "When the model memorizes the reward function and returns it verbatim in outputs",
      "When reward model gradients vanish during training, preventing the policy from improving"
    ],
    ans: 1,
    exp: "Gao et al. show that as the policy is optimized further against a fixed reward model (increasing KL from reference), proxy reward (reward model score) keeps increasing but gold reward (actual human preference) first increases then decreases. The gap is reward hacking. KL regularization (PPO's KL penalty) limits overoptimization. Gold reward peaks at KL ≈ 4–8 nats in their experiments."
  },
  {
    id: "eth12", category: "ethics",
    q: "What is LLM watermarking (Kirchenbauer et al., 2023) and how does it work?",
    opts: [
      "Adding visible AI disclaimers to generated text through post-processing",
      "At generation time, hashing the preceding token to create a 'green list' of ~50% vocabulary tokens, then biasing sampling toward green-list tokens; a detector with the secret key counts green-list tokens — significantly above chance indicates watermarked text",
      "Fine-tuning the model to always include a secret phrase at a specific position in its output",
      "Injecting a cryptographic signature into the model's weights that produces identifiable output patterns"
    ],
    ans: 1,
    exp: "Kirchenbauer et al.: for each generated token, hash the previous k tokens (with a secret key) to deterministically partition the vocabulary into red/green lists (~50/50). During generation, add δ to green-list logits before softmax. A detector counts the fraction of green-list tokens: under the null (no watermark) it's ~50%; watermarked text is significantly higher. The key controls which tokens are green — detectable but not forgeable without the key."
  },

  /* ======== TOOLS — HARDER ======== */
  {
    id: "t9", category: "tools",
    q: "What is vLLM (Kwon et al., 2023) and what algorithmic innovation does it introduce?",
    opts: [
      "A very large language model from Meta; its innovation is grouped-query attention",
      "An LLM inference engine using PagedAttention — managing KV cache in non-contiguous memory pages like OS virtual memory — achieving 3-24× higher throughput than HuggingFace Transformers with zero memory waste from fragmentation",
      "A distributed training framework; its innovation is ZeRO-style KV cache sharding across GPUs",
      "A quantization library; its innovation is page-granular 4-bit quantization of activations"
    ],
    ans: 1,
    exp: "vLLM's PagedAttention allocates KV cache in fixed-size blocks (pages) that can be stored non-contiguously in GPU memory, eliminating the internal and external fragmentation that wastes 60-80% of KV cache in naive implementations. With continuous batching (processing requests mid-sequence), vLLM achieves near-zero wasted memory and dramatically higher throughput. Industry standard for serving LLMs in production."
  },
  {
    id: "t10", category: "tools",
    q: "What does `torch.compile()` (PyTorch 2.0) do internally, and what is TorchDynamo?",
    opts: [
      "Converts PyTorch to TensorFlow graph format for TPU execution; TorchDynamo is the cross-compilation backend",
      "Captures the computation graph by intercepting Python bytecode via TorchDynamo, then passes it to TorchInductor for optimization (kernel fusion, memory layout optimization, hardware-specific codegen); achieves 1.5-3× speedup with one line of code",
      "JIT-compiles Python functions to C++ using Cython; TorchDynamo is the Cython transpiler",
      "Applies operator-level quantization automatically; TorchDynamo identifies quantizable patterns in the graph"
    ],
    ans: 1,
    exp: "TorchDynamo (PyTorch 2.0 backend) intercepts Python frame execution via CPython's frame evaluation API, traces the graph into FX IR while handling dynamic Python control flow via 'guards.' TorchInductor (default backend) lowers this to Triton (GPU) or C++ (CPU) with operator fusion and memory-efficient layouts. Zero code change for the user: `model = torch.compile(model)`."
  },
  {
    id: "t11", category: "tools",
    q: "What is DeepSpeed ZeRO and what are its three stages?",
    opts: [
      "A zero-shot learning framework: Stage 1 = zero-shot, Stage 2 = few-shot, Stage 3 = fine-tuned",
      "Zero Redundancy Optimizer: Stage 1 partitions optimizer states across GPUs; Stage 2 also partitions gradients; Stage 3 also partitions model parameters — eliminating all data redundancy to train models larger than any single GPU's memory",
      "A zero-copy data pipeline: Stage 1 = CPU prefetch, Stage 2 = GPU pinned memory, Stage 3 = streaming",
      "Zero-downtime deployment: Stage 1 = shadow deployment, Stage 2 = canary, Stage 3 = full rollout"
    ],
    ans: 1,
    exp: "ZeRO (Rajbhandari et al., 2019) eliminates redundancy across data-parallel GPUs. With N GPUs: Stage 1 shards optimizer states (4× memory reduction vs baseline). Stage 2 also shards gradients (8×). Stage 3 also shards parameters (scales linearly with N). Stage 3 + CPU offload can train trillion-parameter models on GPU clusters that couldn't fit them otherwise. Used to train Megatron-Turing NLG (530B params)."
  },
  {
    id: "t12", category: "tools",
    q: "What is FAISS and what are the main index types it provides?",
    opts: [
      "A dataset for facial attribute annotation; index types correspond to different annotation categories",
      "Facebook AI Similarity Search: a library for billion-scale dense vector retrieval; main index types: Flat (exact brute-force), IVF (inverted file index, approximate), HNSW (graph-based, approximate), PQ (product quantization for compression), with combinations like IVFFlat and IVFPQ",
      "A fast inference server; index types refer to different batching strategies",
      "Feature Alignment for Image and Sentence Search; indexes text-image pairs for multimodal retrieval"
    ],
    ans: 1,
    exp: "FAISS (Johnson et al., 2017) provides: IndexFlat (exact L2/IP, slow at scale); IndexIVFFlat (quantizes space into Voronoi cells via k-means, probes nearest cells — approximate but fast); IndexHNSW (hierarchical navigable small world graph — best recall/speed tradeoff); IndexPQ (product quantization compresses vectors 16-64×). IVF+PQ combination is the standard for billion-scale retrieval (Meta's internal search)."
  },
  {
    id: "t13", category: "tools",
    q: "What is QLoRA (Dettmers et al., 2023)?",
    opts: [
      "Quantized Low-Rank Attention: replaces full-precision attention with 4-bit approximations",
      "Quantized LoRA: fine-tunes a 4-bit quantized (NF4) base model using LoRA adapters in 16-bit, with double quantization and paged optimizers — enabling fine-tuning of 65B models on a single 48GB GPU",
      "A quantization-aware LoRA variant that quantizes adapter weights during training for deployment efficiency",
      "Quick LoRA: a faster LoRA training algorithm using adaptive rank selection per layer"
    ],
    ans: 1,
    exp: "QLoRA (Dettmers et al., 2023) combines: (1) NF4 quantization (4-bit NormalFloat, information-theoretically optimal for normally distributed weights); (2) double quantization (quantizes the quantization constants); (3) paged optimizers (GPU/CPU memory paging for optimizer states). Result: fine-tune LLaMA-65B on one 48GB A100 with 99.3% of full 16-bit LoRA performance."
  },
  {
    id: "t14", category: "tools",
    q: "What is OpenAI's Triton language and how does it differ from CUDA?",
    opts: [
      "A natural language API for generating GPU code from English descriptions",
      "A Python-embedded DSL for writing GPU kernels at the tile/block level, abstracting CUDA thread/warp management while giving control over memory access patterns; Python to PTX without writing CUDA C++",
      "A distributed inference framework that orchestrates CUDA kernels across multiple GPUs",
      "A hardware description language for designing custom AI accelerator chips"
    ],
    ans: 1,
    exp: "Triton (Tillet et al., 2019) lets you write GPU kernels in Python at the block level: you think in tiles of data, not individual threads. The compiler handles thread coalescing, shared memory management, and warp synchronization. FlashAttention-2 and most custom LLM kernels are written in Triton. Key advantage: ML researchers can write near-optimal GPU kernels without deep CUDA expertise."
  },
  {
    id: "t15", category: "tools",
    q: "What is the Hugging Face `accelerate` library used for?",
    opts: [
      "Quantizing models for faster inference; its main function is `accelerate.quantize()`",
      "A unified abstraction for running PyTorch training across single GPU, multi-GPU, TPU, and mixed precision with minimal code changes — the same script runs everywhere by replacing standard PyTorch boilerplate with Accelerator",
      "A caching layer that accelerates repeated LLM inference calls by storing KV caches to disk",
      "A model parallel training framework that automatically shards very large models across GPUs"
    ],
    ans: 1,
    exp: "`accelerate` (HuggingFace) provides an `Accelerator` class that handles device placement, gradient synchronization across multiple GPUs/TPUs, mixed precision (fp16/bf16), and gradient accumulation. A training script wraps data, model, and optimizer with Accelerator and runs unchanged on 1 GPU, 8 GPUs, or TPU Pod. It's the backbone of HuggingFace Trainer and is tightly integrated with DeepSpeed and FSDP."
  }

];
