export interface Product {
    id: string
    name: string
    category: string
    rating: number
    originalPrice: number
    discountPercent?: number
    views: number
    createdAt: Date
}