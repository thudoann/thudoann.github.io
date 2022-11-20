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

* Choice of the variables (Particles smaller than ten μm (PM10), Ground-level Ozone (O3), Nitrogen dioxide (NO2)) are core pollutants based on airqualitynow.eu

* Used the function **auto.arima** from the **forecast** library to generate our prediction model, the output returns an ARIMA model with the best set of hyperparameters to fit the data.

![5years](https://raw.githubusercontent.com/thudoann/Madrid-Air-Quality-Analysis-Forecasting/main/plots/forecast_5years.png)
![monthlyAVG](https://raw.githubusercontent.com/thudoann/Madrid-Air-Quality-Analysis-Forecasting/main/plots/monthly_AVG.png)
![yearly](https://raw.githubusercontent.com/thudoann/Madrid-Air-Quality-Analysis-Forecasting/main/plots/yearly_MA.png)


