import styled from 'styled-components'
import HeaderBackImage from '../../assets/image/header_fundo.png'

export const HeaderBar = styled.header`
  background-image: url(${HeaderBackImage});
  background-size: cover;
  background-position: center;
  height: 384px;
  display: block;
  text-align: center;
  padding-top: 40px;
`

export const HeaderTitulo = styled.h1`
  padding-top: 196px;
`
