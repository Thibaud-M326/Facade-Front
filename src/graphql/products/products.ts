import { gql } from '@apollo/client/core'

/*
 * Product
 */
export const GET_PRODUCTS = gql`
query MyQuery {
    products(first: 10, size: "XL") {
      data {
        price
        id
        is_available
      }
    }
  }
`