import React from 'react'

import * as S from './styles'

type Props = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ type, title, to, onClick, children }: Props) => {
  if (type === 'button') {
    return (
      <S.ButtonContainer type="button" title={title} onClick={onClick}>
        {children}
      </S.ButtonContainer>
    )
  }

  return (
    <S.ButtonLink to={to as string} title={title}>
      {children}
    </S.ButtonLink>
  )
}

export default Button
