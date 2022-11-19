---
layout: post
title: Anh Thu's Portfolio
subtitle: A glimpse of the projects I've been working on
gh-repo: thudoann
gh-badge: [star, fork, follow]
cover-img: /assets/img/computer-typing.gif
thumbnail-img: /assets/img/cat-computer.gif
share-img: /assets/img/lsvctuning.png
tags: [Data Wrangling, Data Processing, Sentiment Analysis, Social Network Analysis, Machine Learning, Data Visualization, Dimensionality reduction, Time Series]
---


# [1.Text Classification for Restaurant Reviews using Machine Learning models:](https://github.com/thudoann/Text-Classification-for-Restaurant-Reviews-using-Machine-Learning-models)
Online customer feedback has been recognised as an economic value for consumers and restaurants. With the expansion of the internet and social networks, customer reviews significantly influence business growth and gain new consumers. Therefore, the classification between negative and positive reviews contributes a massive benefit for the business to provide better quality services and minimise the harmful effects of bad reviews.
This project aims to use Supervised Learning Text Classification to predict whether given feedback(s) is(are) positive or negative.

* The data we used in this project were annotated two times by two differents annotators, calculated the percentage of misannotated reviews led to a difference in the annotations between the annotators.

* Used sentiment analysis on the rows with annotation disagreement.

* Chose the baseline classifier based on the most-frequent class in the training dataset.

* Created machine pipeline to evaluate the performance of several models and tuned hyperparameter on the highest accuracy model (SVC & LSVC)


![lsvc](https://raw.githubusercontent.com/thudoann/thudoann.github.io/master/assets/img/lsvctuning.png)



* Evaluated the model (with model's accuracy, confusion matrix, precision and recall table)


![lsvcconfusion](https://raw.githubusercontent.com/thudoann/thudoann.github.io/master/assets/img/lsvcconfusion.png)



![precision](https://raw.githubusercontent.com/thudoann/thudoann.github.io/master/assets/img/precisionrecall.png)

* Identify the top 20 features contributing to LinearSVC classification performance to distinguish whether a review was negative or positive.

![FeatureImportance](https://raw.githubusercontent.com/thudoann/thudoann.github.io/master/assets/img/feature_importance.png)
