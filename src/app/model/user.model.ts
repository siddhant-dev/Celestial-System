export interface User {
    id: number,
    name: string,
    email: string,
    address: Address,
    company: string
}

interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string
}