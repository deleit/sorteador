import React, { useState } from 'react';
import { useListaDeParticipantes } from '../../state/hooks/useListaDeParticipantes';
import { useResultadoSorteio } from '../../state/hooks/useResultadoSorteio';

const Sorteio = () => {
    const participantes = useListaDeParticipantes();
    const [participanteDaVez, setParticipanteDaVez] = useState('');
    const [amigoSecreto, setAmigoSecreto] = useState('');
    const resultado = useResultadoSorteio();

    const sortear = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!);
        };
    }
    
    return (
        <section>
            <form onSubmit={sortear}>
                <select 
                    required name="participanteDaVez" 
                    id="participanteDaVez" 
                    placeholder="Selecione o seu nome"
                    value={participanteDaVez}
                    onChange={e => setParticipanteDaVez(e.target.value)}
                >
                    {participantes.map(participante => (
                        <option value="" key={participante}>
                            {participante}
                        </option>
                    ))}
                </select>
                <button>Sortear</button>
            </form>
            {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
        </section>
    )
}

export default Sorteio;