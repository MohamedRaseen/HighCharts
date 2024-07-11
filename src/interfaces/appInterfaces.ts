export interface ICategory {
    slug: string | null | undefined,
    name: string | null | undefined,
    url: string | null | undefined
}

export interface IProduct {
    availabilityStatus: string | null | undefined,
    brand: string | null | undefined,
    category: string | null | undefined,
    description: string | null | undefined,
    dimensions: object | null | undefined,
    discountPercentage: number | null | undefined,
    id: number,
    images: Array<string>,
    meta: object | null | undefined,
    minimumOrderQuantity: number,
    price: number,
    rating: number,
    returnPolicy: string | null | undefined,
    reviews: Array<object>,
    shippingInformation: string | null | undefined,
    sku: string | null | undefined,
    stock: number | null | undefined,
    tag: Array<string> | null | undefined,
    thumbnail: string | null | undefined,
    title: string | null | undefined,
    warrantyInformation: string | null | undefined,
    weight: number | null | undefined
}

export interface IChartData {
    name: string | null| undefined,
    y: number| null | undefined,
}