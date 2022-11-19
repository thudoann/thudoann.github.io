---
layout: post
title: Text Classification for Restaurant Reviews using Machine Learning models
gh-repo: thudoann/Text-Classification-for-Restaurant-Reviews-using-Machine-Learning-models
gh-badge: [star, fork, follow]
cover-img: /assets/img/SENTIMENT.jpg
thumbnail-img: /assets/img/market-sentiment.png
share-img: /assets/img/lsvctuning.png
tags: [TF-IDF , C-Support Vector Classification, Confusion matrix, Feature importance]
---

Online customer feedback has been recognised as an economic value for consumers and restaurants. With the expansion of the internet and social networks, customer reviews significantly influence business growth and gain new consumers. Therefore, the classification between negative and positive reviews contributes a massive benefit for the business to provide better quality services and minimise the harmful effects of bad reviews.
This project aims to use Supervised Learning Text Classification to predict whether given feedback(s) is(are) positive or negative.

#### The data we used in this project were annotated two times by two differents annotators, calculated the percentage of misannotated reviews led to a difference in the annotations between the annotators.

#### Used sentiment analysis on the rows with annotation disagreement.

#### Chose the baseline classifier based on the most-frequent class in the training dataset.

#### Created machine pipeline to evaluate the performance of several models and tuned hyperparameter on the highest accuracy model (SVC & LSVC)

<p align="center">
  <img src="assets/img/feature_importance.png" alt="" width="600"/>
</p>

![Crepe](https://github.com/thudoann/thudoann.github.io/assets/img/lsvctuning.png)

#### Evaluated the model (with model's accuracy, confusion matrix, precision and recall table)

#### Feature importance and model interpretability

![FeatureImportance](https://github.com/thudoann/thudoann.github.io/blob/master/assets/img/feature_importance.png)
