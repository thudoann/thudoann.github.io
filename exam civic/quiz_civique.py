#!/usr/bin/env python3
"""Quiz interactif pour préparer l'examen civique en français."""

import random
import sys

QUESTIONS = [
    {
        "question": "Quelle est la devise de la République française ?",
        "choices": ["A) Liberté, Égalité, Fraternité", "B) Paix, Justice, Liberté", "C) Unité, Force, Honneur", "D) Travail, Famille, Patrie"],
        "answer": "A",
        "explanation": "La devise 'Liberté, Égalité, Fraternité' est inscrite dans la Constitution de 1958."
    },
    {
        "question": "En quelle année la Cinquième République française a-t-elle été fondée ?",
        "choices": ["A) 1945", "B) 1958", "C) 1968", "D) 1789"],
        "answer": "B",
        "explanation": "La Ve République a été instaurée en 1958 sous l'impulsion du général de Gaulle."
    },
    {
        "question": "Qui est le chef de l'État en France ?",
        "choices": ["A) Le Premier ministre", "B) Le Président de l'Assemblée nationale", "C) Le Président de la République", "D) Le Président du Sénat"],
        "answer": "C",
        "explanation": "Le Président de la République est élu au suffrage universel direct pour 5 ans."
    },
    {
        "question": "Combien de chambres compose le Parlement français ?",
        "choices": ["A) Une", "B) Deux", "C) Trois", "D) Quatre"],
        "answer": "B",
        "explanation": "Le Parlement est composé de l'Assemblée nationale et du Sénat."
    },
    {
        "question": "Quel article de la Déclaration des droits de l'Homme (1789) affirme que les hommes naissent libres et égaux ?",
        "choices": ["A) Article 1", "B) Article 3", "C) Article 7", "D) Article 11"],
        "answer": "A",
        "explanation": "L'article 1er : 'Les hommes naissent et demeurent libres et égaux en droits.'"
    },
    {
        "question": "À quel âge peut-on voter en France ?",
        "choices": ["A) 16 ans", "B) 17 ans", "C) 18 ans", "D) 21 ans"],
        "answer": "C",
        "explanation": "Le droit de vote est accordé à tous les citoyens français âgés d'au moins 18 ans."
    },
    {
        "question": "Quel est le rôle principal du Conseil constitutionnel ?",
        "choices": [
            "A) Voter les lois",
            "B) Vérifier la conformité des lois à la Constitution",
            "C) Juger les crimes graves",
            "D) Gérer le budget de l'État"
        ],
        "answer": "B",
        "explanation": "Le Conseil constitutionnel veille à la constitutionnalité des lois et au bon déroulement des élections."
    },
    {
        "question": "Quelle institution représente les collectivités territoriales en France ?",
        "choices": ["A) L'Assemblée nationale", "B) Le Conseil économique et social", "C) Le Sénat", "D) La Cour des comptes"],
        "answer": "C",
        "explanation": "Le Sénat est constitutionnellement le représentant des collectivités territoriales."
    },
    {
        "question": "Lequel de ces principes N'est PAS un principe fondamental de la République française ?",
        "choices": ["A) Laïcité", "B) Indivisibilité", "C) Monarchie", "D) Démocratie"],
        "answer": "C",
        "explanation": "La France est une République — la monarchie est incompatible avec ses principes fondamentaux."
    },
    {
        "question": "Que signifie le principe de laïcité en France ?",
        "choices": [
            "A) L'État favorise la religion catholique",
            "B) La religion est interdite dans la vie privée",
            "C) L'État est neutre vis-à-vis de toutes les religions",
            "D) Les religions étrangères sont interdites"
        ],
        "answer": "C",
        "explanation": "La laïcité, inscrite dans la loi de 1905, garantit la séparation de l'Église et de l'État."
    },
    {
        "question": "Combien de régions métropolitaines compte la France depuis 2016 ?",
        "choices": ["A) 13", "B) 22", "C) 18", "D) 26"],
        "answer": "A",
        "explanation": "Depuis la réforme territoriale de 2016, la France métropolitaine compte 13 régions."
    },
    {
        "question": "Qu'est-ce que le suffrage universel ?",
        "choices": [
            "A) Seuls les propriétaires votent",
            "B) Tous les citoyens majeurs peuvent voter",
            "C) Seuls les hommes peuvent voter",
            "D) Le vote est obligatoire"
        ],
        "answer": "B",
        "explanation": "Le suffrage universel permet à tout citoyen majeur de participer aux élections, sans distinction de sexe, fortune ou origine."
    },
    {
        "question": "Quelle est la durée du mandat présidentiel en France ?",
        "choices": ["A) 4 ans", "B) 5 ans", "C) 6 ans", "D) 7 ans"],
        "answer": "B",
        "explanation": "Depuis le référendum de 2000, le mandat présidentiel est de 5 ans (quinquennat)."
    },
    {
        "question": "Quel texte est intégré dans le préambule de la Constitution de 1958 ?",
        "choices": [
            "A) La Charte de l'environnement seulement",
            "B) La Déclaration des droits de l'Homme de 1789 et le préambule de 1946",
            "C) Le traité de Maastricht",
            "D) La Charte des Nations Unies"
        ],
        "answer": "B",
        "explanation": "Le bloc de constitutionnalité inclut la DDHC de 1789, le préambule de 1946 et la Charte de l'environnement de 2004."
    },
    {
        "question": "Qui nomme le Premier ministre en France ?",
        "choices": ["A) L'Assemblée nationale", "B) Le Sénat", "C) Le Président de la République", "D) Le Conseil d'État"],
        "answer": "C",
        "explanation": "Selon l'article 8 de la Constitution, le Président de la République nomme le Premier ministre."
    },
]

COLORS = {
    "reset": "\033[0m",
    "bold": "\033[1m",
    "blue": "\033[94m",
    "green": "\033[92m",
    "red": "\033[91m",
    "yellow": "\033[93m",
    "cyan": "\033[96m",
}

def color(text, *codes):
    return "".join(COLORS.get(c, "") for c in codes) + text + COLORS["reset"]

def print_header():
    print()
    print(color("=" * 60, "blue", "bold"))
    print(color("   QUIZ CIVIQUE FRANÇAIS — Préparez votre examen !   ", "blue", "bold"))
    print(color("=" * 60, "blue", "bold"))
    print()

def run_quiz(questions):
    score = 0
    total = len(questions)

    for i, q in enumerate(questions, 1):
        print(color(f"\nQuestion {i}/{total}", "cyan", "bold"))
        print(color(q["question"], "bold"))
        print()
        for choice in q["choices"]:
            print(f"  {choice}")
        print()

        while True:
            raw = input(color("Votre réponse (A/B/C/D) : ", "yellow")).strip().upper()
            if raw in ("A", "B", "C", "D"):
                break
            print(color("  Veuillez entrer A, B, C ou D.", "red"))

        if raw == q["answer"]:
            print(color("  ✔ Correct !", "green", "bold"))
            score += 1
        else:
            print(color(f"  ✘ Incorrect. La bonne réponse était : {q['answer']}", "red", "bold"))

        print(color(f"  → {q['explanation']}", "cyan"))

    return score, total

def print_result(score, total):
    percent = round(score / total * 100)
    print()
    print(color("=" * 60, "blue", "bold"))
    print(color(f"  RÉSULTAT FINAL : {score}/{total}  ({percent}%)", "bold"))
    if percent >= 80:
        mention = color("Excellent ! Vous êtes prêt(e) pour l'examen.", "green", "bold")
    elif percent >= 60:
        mention = color("Bien ! Continuez à réviser les points manqués.", "yellow", "bold")
    else:
        mention = color("Encouragement ! Révisez et réessayez.", "red", "bold")
    print(f"  {mention}")
    print(color("=" * 60, "blue", "bold"))
    print()

def main():
    print_header()
    print("Bienvenue dans le quiz civique !")
    print("Ce quiz couvre les institutions, droits et principes de la République française.\n")

    mode = input(color("Mode : (1) Toutes les questions  (2) 10 questions aléatoires — Entrez 1 ou 2 : ", "yellow")).strip()
    questions = QUESTIONS if mode != "2" else random.sample(QUESTIONS, min(10, len(QUESTIONS)))

    print(color(f"\nDépart ! {len(questions)} questions vous attendent.\n", "cyan"))

    try:
        score, total = run_quiz(questions)
    except KeyboardInterrupt:
        print(color("\n\nQuiz interrompu. À bientôt !", "yellow"))
        sys.exit(0)

    print_result(score, total)

if __name__ == "__main__":
    main()
