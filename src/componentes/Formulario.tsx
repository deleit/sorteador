import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hooks/useMensagemDeErro";
import './Formulario.css';

const Formulario = () => {
    const [nome, setNome] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const adicionarNaLista = useAdicionarParticipante();
    const mensagemDeErro = useMensagemDeErro();

    const adicionarParticipante = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        adicionarNaLista(nome);
        setNome('');
        inputRef.current?.focus();
    }
    
    return (
        <form onSubmit={adicionarParticipante}>
            <div className="grupo-input-btn">
                <input 
                    ref={inputRef}
                    value={nome}
                    type="text" 
                    placeholder="Insira os nomes dos participantes"
                    onChange={e => setNome(e.target.value)}
                />
                <button disabled={!nome}>
                    Adicionar
                </button>
            </div>
            {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
        </form>
    );
}

export default Formulario;