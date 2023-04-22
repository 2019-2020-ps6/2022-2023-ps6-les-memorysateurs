import {Patient} from "../models/patient.models";
import {LISTE_THEME_1, LISTE_THEME_2} from "./liste-theme.moks";
import {LISTE_Stats} from "./stats-patient";

export const LISTE_PATIENT: Patient[] = [
  new Patient('Perroti', 'Marie', 'assets/images/patient-femme.png', 3,LISTE_THEME_1,LISTE_Stats),
  new Patient('Rombolier', 'Bertrand', 'assets/images/patient-homme.png', 4,LISTE_THEME_2),
  new Patient('Dubois', 'Sophie', 'assets/images/patient-femme.png', 5,undefined),
  new Patient('Gato', 'Martin', 'assets/images/patient-homme.png', 4,undefined)
]
