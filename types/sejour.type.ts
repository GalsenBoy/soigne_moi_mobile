import { Medecin } from "./medecin.type";

export default interface SejourType {
    id: string;
    dateEntree: string;
    dateSortie: string;
    motif: string;
    specialite: string;
    medecin: Medecin | null;
}