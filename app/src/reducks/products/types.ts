export interface productTypes {
  id: string
  category: string
  description: string
  gender: string
  images: Array<{ id: string; path: string }>
  name: string
  price: string
  sizes: Array<{ size: string; quantity: number }>
}
