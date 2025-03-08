import {
  ButtonCart,
  ButtonContainer,
  DeliContainer,
  InputGroup,
  NuCepContainer,
  Overlay,
  Row,
  Sidebar
} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import {
  closeDelivery,
  openDeliveryEnd,
  setDeliveryData
} from '../../store/reducers/cart'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'

const Delivery = () => {
  const { isOpenDelivery } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()
  const closeCartDelivery = () => {
    dispatch(closeDelivery()) // Fecha o Delivery
  }

  const openCartDeliveryEnd = () => {
    dispatch(openDeliveryEnd()) // Abre o FinalDelivery
  }

  const [purchase, { isLoading, isError, data }] = usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      fullName: '',
      end: '',
      city: '',
      cep: '',
      numero: '',
      complement: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('preenchimento obrigatório'),
      end: Yup.string().required('preenchimento obrigatório'),
      city: Yup.string().required('preenchimento obrigatório'),
      cep: Yup.string()
        .min(9, 'minimo 9 caracteres')
        .max(9, 'máximo 9 caracteres')
        .required('preenchimento obrigatório'),
      numero: Yup.string().required('preenchimento obrigatório')
    }),

    onSubmit: async (values) => {
      // Atualizando os dados no Redux
      dispatch(setDeliveryData(values))

      try {
        const response = await purchase({
          delivery: {
            receiver: values.fullName,
            address: {
              description: values.end,
              city: values.city,
              zipCode: values.cep.replace('-', ''), // Remove traço do CEP
              number: Number(values.numero),
              complement: values.complement || 'N/A'
            }
          },
          products: [
            {
              id: 1,
              price: 0
            }
          ],
          payment: {
            card: {
              name: 'Teste',
              number: '1111222233334444',
              code: 123,
              expires: {
                month: 12,
                year: 2030
              }
            }
          }
        }).unwrap()

        console.log('Resposta da API:', response) // Verifique o que a API retorna
      } catch (error) {
        console.error('Erro na API:', error) // Captura o erro detalhado
      }
    }
  })

  const getErrorMessage = (fildName: string, message?: string) => {
    const isTouched = fildName in form.touched
    const isInvalid = fildName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }
  console.log('Formik em Delivery:', form)

  return (
    <DeliContainer className={isOpenDelivery ? 'is-open' : ''}>
      <Overlay onClick={closeCartDelivery} />{' '}
      {/* Fecha o Delivery ao clicar no overlay */}
      <Sidebar>
        <h3>Entrega</h3>
        <form onSubmit={form.handleSubmit}>
          <Row>
            <InputGroup>
              <label htmlFor="fullName">Quem irá receber</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.values.fullName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('fullName', form.errors.fullName)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="end">Endereço</label>
              <input
                id="end"
                type="text"
                name="end"
                value={form.values.end}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('end', form.errors.end)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                type="text"
                name="city"
                value={form.values.city}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('city', form.errors.city)}</small>
            </InputGroup>
            <NuCepContainer>
              <InputGroup>
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  type="text"
                  name="cep"
                  value={form.values.cep}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('cep', form.errors.cep)}</small>
              </InputGroup>

              <InputGroup>
                <label htmlFor="numero">Número</label>
                <input
                  id="numero"
                  type="text"
                  name="numero"
                  value={form.values.numero}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                <small>{getErrorMessage('numero', form.errors.numero)}</small>
              </InputGroup>
            </NuCepContainer>
            <InputGroup>
              <label htmlFor="complement">Complemento (opcional)</label>
              <input
                id="complement"
                type="text"
                name="complement"
                value={form.values.complement}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </InputGroup>
          </Row>
          <ButtonContainer>
            <div>
              <ButtonCart
                onClick={openCartDeliveryEnd} // Abre o FinalDelivery
                title="Clique aqui para continuar com o pagamento"
                type="submit"
              >
                Continuar com o pagamento
              </ButtonCart>
            </div>
            <div>
              <ButtonCart
                onClick={closeCartDelivery} // Fecha o Delivery
                title="Clique aqui para voltar ao carrinho"
                type="button"
              >
                Voltar ao carrinho
              </ButtonCart>
            </div>
          </ButtonContainer>
        </form>
      </Sidebar>
    </DeliContainer>
  )
}

export default Delivery
