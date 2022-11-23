import { useSetRecoilState } from "recoil";
import { resultadoAmigoSecreto } from "../atom";
import { realizarSorteio } from "../helperes/realizarSorteio";
import { useListaDeParticipantes } from "./useListaDeParticipantes"

export const useSorteador = () => {
    const participantes = useListaDeParticipantes();
    const setResultado = useSetRecoilState(resultadoAmigoSecreto);
    return () => {
        const resultado = realizarSorteio(participantes);
        setResultado(resultado);
    }
}