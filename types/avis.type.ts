import { Medecament } from "./medecament.type";
import { Prescription } from "./prescription.type";

export interface Avis {
    description: string;
    prescription: Prescription;
    medecament: Medecament[];
}