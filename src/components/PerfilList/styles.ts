// ProductsList/styles.ts

import styled from 'styled-components'

export const SectionContainer = styled.div`
  max-width: 100%;
  padding: 0 15px; /* Padding horizontal para evitar o overflow */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 10px; /* Ajuste para telas menores */
  }
`

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Centralizar a lista de produtos */
`