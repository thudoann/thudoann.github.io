/* ---------- Projects page config ----------
   Edit this file to control what appears on the Projects page.

   pinned       : shown first, in this order, with a "Featured" badge
   exclude      : hidden entirely
   descriptions : override the GitHub description for any repo
   tags         : tech-stack tag pills shown on the card (array of strings)
   demos        : live demo URL for a repo — shows a "Demo →" button
*/
const PROJECTS_CONFIG = {
  user: "thudoann",

  pinned: [
    "clinical-trials-rag-platform",
    "medrag_eval",
    "ppo-llm-alignment",
    "neural-morphogenesis",
    "Fine-tuning-Image-Captioning-Models-for-Chest-X-ray-Interpretation",
    "Fine-tuned-Retrieval-Augmented-Generation-RAG-Chatbot",
    "Fine-tuning-SAM-for-Cellular-Images-Segmentation",
    "Mapify_My_Travels",
  ],

  exclude: [
    "thudoann.github.io",
    "thudoann",
    "test",
    "NAB",
    "Command-Cheatsheet",
  ],

  descriptions: {
    "clinical-trials-rag-platform":
      "RAG platform for querying and analysing clinical trial data — document parsing, embedding, and retrieval evaluation.",
    "medrag_eval":
      "Evaluation suite for medical retrieval-augmented generation systems across multiple QA benchmarks.",
    "ppo-llm-alignment":
      "LLM alignment via PPO reinforcement learning from human feedback (RLHF).",
    "neural-morphogenesis":
      "Neural ODE model for simulating and generating cellular morphogenesis patterns.",
    "Fine-tuning-Image-Captioning-Models-for-Chest-X-ray-Interpretation":
      "Fine-tuned vision-language model for automated chest X-ray report generation.",
    "Fine-tuned-Retrieval-Augmented-Generation-RAG-Chatbot":
      "Domain-specific RAG chatbot with fine-tuned retrieval and generation components.",
    "Fine-tuning-SAM-for-Cellular-Images-Segmentation":
      "Segment Anything Model (SAM) adapted for cellular microscopy image segmentation.",
    "Mapify_My_Travels":
      "Interactive travel map built with Python and Folium — visualise visited places on a world map.",
    "gp-bayesopt":
      "Gaussian process Bayesian optimisation experiments and benchmarks.",
    "rnaseq-pipeline-interface":
      "Interface for RNA-seq bioinformatics pipelines — streamlines preprocessing and analysis steps.",
    "rna-seq-stapp":
      "Streamlit app for RNA-seq analysis, differential expression, and visualisation.",
    "Machine-Learning-Pipeline-with-Real-Time-Data-Scoring":
      "End-to-end ML pipeline with a real-time scoring API.",
    "ML-Model-Data-Drift-Investigation":
      "Monitoring and statistical analysis of data drift in production ML models.",
    "IMDB-Classification-with-BERT":
      "Sentiment classification on IMDB reviews using fine-tuned BERT.",
    "Text-Mining-and-NLP-on-French-doctoral-dissertations":
      "NLP analysis — topic modelling, keyword extraction, and trends — on French PhD dissertation metadata.",
    "Madrid-Air-Quality-Analysis-Forecasting":
      "Air quality analysis and time series forecasting for Madrid using ARIMA and ML models.",
    "CreditCardFraudDetection":
      "Credit card fraud detection with imbalanced learning techniques (SMOTE, ensemble methods).",
    "Data_Visualization_GDP_HDI_LifeExpectancy":
      "Interactive visualisation of GDP, HDI, and life expectancy trends across countries.",
    "Time-Series":
      "Time series forecasting experiments — ARIMA, LSTM, and Prophet models.",
    "Pattern-Mining":
      "Frequent pattern mining with Apriori and FP-Growth algorithms.",
    "Clustering-the-phi-and-psi-angle-combinations-in-protein":
      "Protein structure analysis via clustering of backbone torsion angles (Ramachandran plot).",
    "Text-Classification-for-Restaurant-Reviews-using-Machine-Learning-models":
      "Restaurant review sentiment classification comparing multiple ML models.",
    "Pokemon_Project_MachineLearning":
      "ML exploration — classification and clustering on the Pokémon dataset.",
    "SocialNetworkAnalysis":
      "Graph-based social network analysis — centrality, community detection, and visualisation.",
    "DimensionalityReduction-Clustering":
      "Dimensionality reduction (PCA, t-SNE, UMAP) combined with clustering algorithms.",
    "Learning-Analytics-of-MOOCs-using-statistical-models-with-R":
      "Statistical analysis of MOOC learner behaviour and completion rates using R.",
  },

  tags: {
    "clinical-trials-rag-platform":       ["RAG", "LLM", "Clinical NLP", "Python"],
    "medrag_eval":                         ["Benchmarking", "RAG", "Medical AI", "Python"],
    "ppo-llm-alignment":                   ["RLHF", "PPO", "LLM", "Alignment"],
    "neural-morphogenesis":                ["Neural ODE", "Biology", "PyTorch"],
    "Fine-tuning-Image-Captioning-Models-for-Chest-X-ray-Interpretation": ["Vision-Language", "Chest X-Ray", "Fine-tuning"],
    "Fine-tuned-Retrieval-Augmented-Generation-RAG-Chatbot": ["RAG", "Chatbot", "Fine-tuning"],
    "Fine-tuning-SAM-for-Cellular-Images-Segmentation":      ["SAM", "Segmentation", "Microscopy"],
    "Mapify_My_Travels":                   ["Streamlit", "Folium", "Geospatial"],
    "rna-seq-stapp":                       ["Streamlit", "RNA-seq", "Bioinformatics"],
    "rnaseq-pipeline-interface":           ["RNA-seq", "Pipeline", "Bioinformatics"],
    "gp-bayesopt":                         ["Bayesian Optimisation", "Gaussian Process"],
    "IMDB-Classification-with-BERT":       ["NLP", "BERT", "Fine-tuning"],
    "Text-Mining-and-NLP-on-French-doctoral-dissertations": ["NLP", "Topic Modelling", "French"],
    "CreditCardFraudDetection":            ["Imbalanced Learning", "SMOTE", "Classification"],
    "Madrid-Air-Quality-Analysis-Forecasting": ["Time Series", "ARIMA", "Forecasting"],
    "Machine-Learning-Pipeline-with-Real-Time-Data-Scoring": ["ML Pipeline", "Real-Time Scoring"],
    "ML-Model-Data-Drift-Investigation":   ["MLOps", "Data Drift", "Monitoring"],
    "SocialNetworkAnalysis":               ["Graph", "Community Detection", "NetworkX"],
    "DimensionalityReduction-Clustering":  ["PCA", "t-SNE", "UMAP", "Clustering"],
  },

  demos: {
    // Add demo URLs here once deployed, e.g.:
    // "Mapify_My_Travels": "https://mapify-my-travels.streamlit.app",
    // "rna-seq-stapp":     "https://rna-seq.streamlit.app",
  },
};
