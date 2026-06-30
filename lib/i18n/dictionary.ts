import type { Language } from "@/types/auth";

export const dictionary = {
  fr: {
    brand: "Cyberambassadeurs",
    mission:
      "Former des jeunes capables d'utiliser internet pour se proteger, apprendre et guider leur communaute.",
    login: "Connexion",
    logout: "Deconnexion",
    email: "Email",
    password: "Mot de passe",
    fullName: "Nom complet",
    city: "Ville",
    school: "Etablissement",
    gradeLevel: "Classe",
    age: "Age",
    phone: "Telephone",
    studentRegistration: "Inscription eleve",
    parentRegistration: "Inscription parent",
    createStudentAccount: "Creer les comptes eleve et parent",
    createParentAccount: "Creer mon compte parent",
    parentConsent:
      "Je confirme etre le parent ou tuteur legal et j'autorise l'acces de l'enfant a la plateforme.",
    studentDashboard: "Tableau de bord eleve",
    parentDashboard: "Tableau de bord parent",
    adminDashboard: "Tableau de bord admin",
    nextStep: "Prochaine etape",
    authRequired: "Votre session est protegee par Supabase et votre profil par MongoDB."
  },
  en: {
    brand: "Cyberambassadeurs",
    mission:
      "Training young people to use the internet to stay safe, learn, and guide their community.",
    login: "Log in",
    logout: "Log out",
    email: "Email",
    password: "Password",
    fullName: "Full name",
    city: "City",
    school: "School",
    gradeLevel: "Grade level",
    age: "Age",
    phone: "Phone",
    studentRegistration: "Student registration",
    parentRegistration: "Parent registration",
    createStudentAccount: "Create student and parent accounts",
    createParentAccount: "Create my parent account",
    parentConsent:
      "I confirm I am the parent or legal guardian and consent to the child's platform access.",
    studentDashboard: "Student dashboard",
    parentDashboard: "Parent dashboard",
    adminDashboard: "Admin dashboard",
    nextStep: "Next step",
    authRequired: "Your session is protected by Supabase and your profile by MongoDB."
  }
} satisfies Record<Language, Record<string, string>>;

export function getDictionary(language: Language) {
  return dictionary[language];
}
