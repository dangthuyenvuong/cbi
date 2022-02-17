import { Order } from "@types";


// const orderItem = {
//     product: products[Math.round(Math.random() * products.length)],
//     originalPrice: 100,
//     price: 80,
//     purchaseDate: 'Feb 05, 2021 08:28:36 AM',
//     quantity: 1
// }


// products: [
//     ...[
//         product,
//         product,
//         product,
//         product,
//         product,
//     ].filter((e, i) => Math.floor(Math.random() * 100) % 2 === 0)
// ],
// const order: Order = {
//     id: 'A2106130287',
//     orderItems: [
//         {
//             product: products[Math.round(Math.random() * products.length)],
//             originalPrice: 100,
//             price: 80,
//             purchaseDate: 'Feb 05, 2021 08:28:36 AM',
//             quantity: 1
//         }
//     ],
//     purchaseDate: 'Feb 05, 2021 08:28:36 AM',
//     total: 100.89,
//     itemQuantity: 5,
//     paymentMethod: 'Master Card'
// }


// export const order: Order = {
//     id: `A${generateNumber(1000000, 10000000000)}`,
//     orderItems:generateMock(5, () => ({
//         id: generateNumber(1000000, 10000000000) + '',
//         product,
//         subTotal: generateNumber(100, 500, true),
//         purchaseDate: 'Feb 05, 2021 08:28:36 AM',
//         originalPrice: generateNumber(50, 200, true),
//         price: generateNumber(50, 200, true),
//         quantity: generateNumber(1, 10)
//     })),
//     purchaseDate: 'Feb 05, 2021 08:28:36 AM',
//     total: 100.89,
//     itemQuantity: 5,
//     paymentMethod: 'Master Card'
// }

// export const orders: Order[] = [
//     ...[...Array(15)].map(e => ({
//         id: `A${generateNumber(1000000, 10000000000)}`,
//         orderItems: generateMock(5, () => ({
//             id: generateNumber(1000000, 10000000000) + '',
//             product,
//             subTotal: generateNumber(1000000, 10000000000, true),
//             purchaseDate: 'Feb 05, 2021 08:28:36 AM',
//             originalPrice: generateNumber(50, 200, true),
//             price: generateNumber(50, 200, true),
//             quantity: generateNumber(1, 10)
//         }), true),
//         purchaseDate: 'Feb 05, 2021 08:28:36 AM',
//         total:  generateNumber(100, 300),
//         itemQuantity: 5,
//         paymentMethod: 'Master Card'
//     }))
// ]



export const orders: Order[] = []