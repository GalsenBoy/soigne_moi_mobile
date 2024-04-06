import { Avis } from "./avis.type";
import { Medecin } from "./medecin.type";

export default interface SejourType {
    id: string;
    dateEntree: string;
    dateSortie: string;
    motif: string;
    specialite: string;
    avis: Avis
    medecin: Medecin | null;
}