import { apiFetch } from "./api";

export function getCrossings(){
    return apiFetch("/cruzamentos");
}