import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  max-width: 318px;
  background-color: ${cores.corVermelha};
  margin-top: 50px;
  margin-bottom: 50px;
  color: ${cores.corClara};
  display: flex;
  flex-direction: column; /* Garantir que os elementos internos sejam empilhados */
  align-items: stretch; /* Esticar os elementos para ocupar a largura total */
  padding: 0; /* Remover padding para evitar espaçamento extra */

  img {
    max-height: 190px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    max-width: 90%; // Ajustar largura dos cards em dispositivos móveis
    margin: 20px auto; // Centralizar os cards e ajustar margens
  }
`

export const Titulo = styled.h3`
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  color: ${cores.corFooter};

  @media (max-width: 768px) {
    font-size: 14px; // Ajustar tamanho da fonte em dispositivos móveis
  }
`

export const EnLinha = styled.div`
  width: 100%; /* Garantir que o EnLinha ocupe toda a largura do Card */
  display: flex;
  justify-content: space-between; /* Espaçamento entre os itens */
  align-items: center; /* Alinhar verticalmente os itens no centro */
  padding: 0 10px; /* Espaçamento horizontal interno */
`

export const Descricao = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin: 10px; /* Espaçamento ao redor da descrição */
  text-align: justify;
  flex-grow: 1; /* Faz a descrição crescer para ocupar espaço disponível */
  color: ${cores.corFooter};

  @media (max-width: 768px) {
    font-size: 12px; // Ajustar tamanho da fonte em dispositivos móveis
  }
`
