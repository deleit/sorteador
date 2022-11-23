import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Formulario from './Formulario';
import { RecoilRoot } from 'recoil';

describe('o comportamento do componente Formulario.tsx', () => {
    test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );

        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

        // encontrar o botão
        const botao = screen.getByRole('button');

        // garantir que o input esteja no documento
        expect(input).toBeInTheDocument();

        // garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled();
    });

    test('adicionar um participante caso exista um nome preenchido', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );

        // encontrar no DOM o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

        // encontrar o botão
        const botao = screen.getByRole('button');

        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });

        // clicar no botão de submeter
        fireEvent.click(botao);

        // garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus();

        // garantir que o input não tenha um valor
        expect(input).toHaveValue('');
    });

    test('nomes duplicados não podem ser adicionados na lista', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const botao = screen.getByRole('button');

        // adiciona o mesmo nome duas vezes
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);

        // encontra o alerta
        const mensagemDeErrro = screen.getByRole('alert');

        // checa a funcionalidade da mensagem de erro
        expect(mensagemDeErrro.textContent).toBe('Nomes duplicados não são permitidos');
    });

    test('a mensagem de erro deve sumir após os timers', () => {
        jest.useFakeTimers();

        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>
        );

        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const botao = screen.getByRole('button');

        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });
        fireEvent.click(botao);
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        });

        fireEvent.click(botao);

        let mensagemDeErrro = screen.queryByRole('alert');
        expect(mensagemDeErrro).toBeInTheDocument();

        // espera N segundos
        act(() => {
            jest.runAllTimers();
        });

        mensagemDeErrro = screen.queryByRole('alert');
        expect(mensagemDeErrro).toBeNull();
    });
})