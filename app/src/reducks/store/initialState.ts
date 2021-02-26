export const initialState = {
  loading: {
    state: false,
    text: '',
  },
  products: {
    list: [],
  },
  users: {
    uid: '',
    customerId: '',
    paymentMethodId: '',
    username: '',
    email: '',
    role: '',
    isSignedIn: false,
    orders: [],
    cart: [],
  },
}
