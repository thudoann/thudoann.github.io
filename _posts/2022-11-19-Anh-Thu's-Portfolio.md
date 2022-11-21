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

My name is Anh Thu, I am currently preparing a bachelor's degree in data sciences at CY Tech (Ex EISTI). I am actively looking for a five months internship in Data Science starting from April to September 2023 with the possibility of extending it to an apprenticeship for one year after that. Here are some projects I have worked on.


---

# [1. Text Classification for Restaurant Reviews using Machine Learning models:](https://github.com/thudoann/Text-Classification-for-Restaurant-Reviews-using-Machine-Learning-models)

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


# [2. Credict Card Fraud Detection](https://github.com/thudoann/CreditCardFraudDetection)

* The data was collected from over 285,000 anonymized transactions made by credit cards in September 2013 by European cardholders
![pie](https://raw.githubusercontent.com/thudoann/CreditCardFraudDetection/main/CreditCardFraud_files/figure-html/unnamed-chunk-10-1.png)

* Explored the interactions and correlations between features then visualize them.

![amount](https://raw.githubusercontent.com/thudoann/CreditCardFraudDetection/main/CreditCardFraud_files/figure-html/unnamed-chunk-13-1.png)

![hours](https://raw.githubusercontent.com/thudoann/CreditCardFraudDetection/main/CreditCardFraud_files/figure-html/unnamed-chunk-15-1.png)

* Used Pipeline and GridearchCV to find the best hyperparameters for different models.

* Evaluted the best model as result.

![Confusion](https://raw.githubusercontent.com/thudoann/CreditCardFraudDetection/main/CreditCardFraud_files/figure-html/Screenshot%202022-11-20%20at%2017.24.04.png)


# [3. Madrid's Air Quality Analysis & Forecasting](https://github.com/thudoann/Madrid-Air-Quality-Analysis-Forecasting)

* This dataset is created in the Madrid's City Council Open Data website. It contains in a practical format 18 years (2001-2018) of daily and hourly data.

* Reformatted the structure of the dataset using forecast, tidyverse, ggplot2, and xts libraries from R

* Choice of the variables (Particles smaller than ten μm (PM10), Ground-level Ozone (O3), Nitrogen dioxide (NO2)) which are core pollutants based on airqualitynow.eu

* Used the function **auto.arima** from the **forecast** library to generate our prediction model, the output returns an ARIMA model with the best set of hyperparameters to fit the data.

![5years](https://raw.githubusercontent.com/thudoann/Madrid-Air-Quality-Analysis-Forecasting/main/plots/forecast_5years.png)
![monthlyAVG](https://raw.githubusercontent.com/thudoann/Madrid-Air-Quality-Analysis-Forecasting/main/plots/monthly_AVG.png)
![yearly](https://raw.githubusercontent.com/thudoann/Madrid-Air-Quality-Analysis-Forecasting/main/plots/yearly_MA.png)

# [4. Social Network Analysis of the juries of Maître de Conferences (MCF)](https://github.com/thudoann/SocialNetworkAnalysis)


* The data is constituted of each member of the jure of Maître de Conferences (MCF) from 2017 to 2020.

* To understand a community by mapping the relationships that connect them as a network and then drawing out key individuals, groups, or associations between the individuals.

![h1](https://raw.githubusercontent.com/thudoann/SocialNetworkAnalysis/main/Screenshot%202022-11-20%20at%2023.27.02.png)
![h2](https://raw.githubusercontent.com/thudoann/SocialNetworkAnalysis/main/Screenshot%202022-11-20%20at%2023.28.49.png)
![h3](https://raw.githubusercontent.com/thudoann/SocialNetworkAnalysis/main/Screenshot%202022-11-20%20at%2023.29.56.png)
![h4](https://raw.githubusercontent.com/thudoann/SocialNetworkAnalysis/main/Screenshot%202022-11-20%20at%2023.30.08.png)


# [5. Clustering the phi and psi angle combinations in protein](https://github.com/thudoann/Clustering-the-phi-and-psi-angle-combinations-in-protein)

* The distribution of phi and psi combinations.
*
![distrition](https://raw.githubusercontent.com/thudoann/Clustering-the-phi-and-psi-angle-combinations-in-protein/main/Plots/distribution.png)

* Used the K-means clustering method to cluster the phi and psi angle combinations with the value of k is based on the histogram of the distribution and by using **elbow** method. 
![kmeans](https://raw.githubusercontent.com/thudoann/Clustering-the-phi-and-psi-angle-combinations-in-protein/main/Plots/kmeans.png)

* Because of the periodic attributes of phi and psi, we shifted the data for better clustering.
![shifted](https://raw.githubusercontent.com/thudoann/Clustering-the-phi-and-psi-angle-combinations-in-protein/main/Plots/kmeansf.png)

* Compare the clusters found by DBSCAN with those found using K-means.
![dbscan](https://raw.githubusercontent.com/thudoann/Clustering-the-phi-and-psi-angle-combinations-in-protein/main/Plots/DBscan.png)

# [6. Email spam classification using Naive Bayes](https://github.com/thudoann/Emails-spam-classification-using-Naive-Bayes/edit/main/README.md)


* The main purpose of this project is to implement a Na ̈ıve Bayes classifier that will classify emails into spam and non-spam (“ham”) classes. Na ̈ıve Bayes Classifier is one of the simplest and most efficient classification algorithms that helps to build fast predictive speed machine learning models. It is a probabilistic classifier, which means it predicts on the basis of the probability of an object.

![spam](https://raw.githubusercontent.com/thudoann/Emails-spam-classification-using-Naive-Bayes/main/easy_spam_mnb_4.png)



