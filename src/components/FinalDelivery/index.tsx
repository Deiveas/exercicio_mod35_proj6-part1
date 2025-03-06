import {
  ButtonCart,
  ButtonContainer,
  DeliContainer,
  InputGroup,
  Overlay,
  Row,
  Sidebar,
  CartContainer
} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import {
  closeDeliveryEnd,
  openFinalProject,
  closeDelivery,
  close
} from '../../store/reducers/cart'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FinalDelivery = () => {
  const { isOpenDeliveryEnd } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()
  const closeCartDeliveryEnd = () => {
    dispatch(closeDeliveryEnd()) // Fecha o FinalDelivery
  }

  const form = useFormik({
    initialValues: {
      cardFullName: '',
      cardNumber: '',
      segNumber: '',
      vectoMonth: '',
      vectoYear: ''
    },
    validationSchema: Yup.object({
      cardFullName: Yup.string().required('preenchimento obrigatório'),
      cardNumber: Yup.string()
        .min(19, 'minimo 19 caracteres')
        .max(19, 'máximo 19 caracteres')
        .required('preenchimento obrigatório'),
      segNumber: Yup.string()
        .min(3, 'minimo 3 caracteres')
        .max(3, 'máximo 3 caracteres')
        .required('preenchimento obrigatório'),
      vectoMonth: Yup.string()
        .min(2, 'minimo 2 caracteres')
        .max(2, 'máximo 2 caracteres')
        .required('preenchimento obrigatório'),
      vectoYear: Yup.string()
        .min(4, 'minimo 4 caracteres')
        .max(4, 'máximo 4 caracteres')
        .required('preenchimento obrigatório')
    }),
    onSubmit: (values) => {
      console.log(values) // Isso será executado
    }
  })
  const getErrorMessage = (fildName: string, message?: string) => {
    const isTouched = fildName in form.touched
    const isInvalid = fildName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  // Função modificada para capturar os valores do formulário
  const openFinalProjectPage = () => {
    // Capturar e logar os valores do formulário
    const formValues = form.values
    console.log(formValues)

    // Continuar com o fluxo normal
    dispatch(close()) // Fecha o Cart
    dispatch(closeDelivery()) // Fecha o Delivery
    dispatch(closeDeliveryEnd()) // Fecha o FinalDelivery
    dispatch(openFinalProject()) // Abre o ProjectFinal
  }
  console.log(form)

  return (
    <DeliContainer className={isOpenDeliveryEnd ? 'is-open' : ''}>
      <Overlay onClick={closeCartDeliveryEnd} />
      <Sidebar>
        <h3>Pagamento - Valor a pagar R$ 200,00</h3>
        <form onSubmit={form.handleSubmit}>
          <Row>
            <InputGroup maxWidth="326px">
              <label htmlFor="cardFullName">Nome no cartão</label>
              <input
                id="cardFullName"
                type="text"
                name="cardFullName"
                value={form.values.cardFullName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('cardFullName', form.errors.cardFullName)}
              </small>
            </InputGroup>
            <CartContainer>
              <InputGroup maxWidth="228px">
                <label htmlFor="cardNumber">Número do cartão</label>
                <input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={form.values.cardNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>
                  {getErrorMessage('cardNumber', form.errors.cardNumber)}
                </small>
              </InputGroup>

              <InputGroup maxWidth="88px">
                <label htmlFor="segNumber">CVV</label>
                <input
                  id="segNumber"
                  type="text"
                  name="segNumber"
                  value={form.values.segNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>
                  {getErrorMessage('segNumber', form.errors.segNumber)}
                </small>
              </InputGroup>
            </CartContainer>
            <CartContainer>
              <InputGroup maxWidth="155px">
                <label htmlFor="vectoMonth">Mês de vencimento</label>
                <input
                  id="vectoMonth"
                  type="text"
                  name="vectoMonth"
                  value={form.values.vectoMonth}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>
                  {getErrorMessage('vectoMonth', form.errors.vectoMonth)}
                </small>
              </InputGroup>

              <InputGroup maxWidth="155px">
                <label htmlFor="vectoYear">Ano de vencimento</label>
                <input
                  id="vectoYear"
                  type="text"
                  name="vectoYear"
                  value={form.values.vectoYear}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>
                  {getErrorMessage('vectoYear', form.errors.vectoYear)}
                </small>
              </InputGroup>
            </CartContainer>
          </Row>
          <ButtonContainer>
            <div>
              <ButtonCart
                onClick={openFinalProjectPage} // Mantém o onClick
                title="Clique aqui para finalizar o pagamento"
                type="button" // Alterado para button para evitar dupla submissão
              >
                Finalizar pagamento
              </ButtonCart>
            </div>
            <div>
              <ButtonCart
                onClick={closeCartDeliveryEnd}
                title="Clique aqui para voltar para a edição de endereço"
                type="button"
              >
                Voltar para a edição de endereço
              </ButtonCart>
            </div>
          </ButtonContainer>
        </form>
      </Sidebar>
    </DeliContainer>
  )
}

export default FinalDelivery
