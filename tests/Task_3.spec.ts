import {expect, test} from "@playwright/test";
import { describe } from "node:test";

describe('Home work 13', () => {

    test('Task_1', async ( {request} ) => {

        const response = await request.get('https://reqres.in/api/users/2');

        const responseBody = await response.json();

        expect(response).toBeOK();
        expect(responseBody.data).toEqual(
            expect.objectContaining({
                first_name: "Janet",
                last_name: "Weaver",
                email: "janet.weaver@reqres.in"
            })
        );

    });

    test('Task_2', async ( {request} ) => {

        const response = await request.post('https://dummyjson.com/posts/add', {
            data: {
                title: "Awesome title",
                userId: 10
            }
        });

        const responseBody = await response.json();

        expect(response).toBeOK();
        expect(responseBody).toEqual(
            expect.objectContaining({
                title: "Awesome title",
                userId: 10
            })
        );

    });

    test('Task_3', async ( {request} ) => {

        interface Product {
            id: number,
            title: string,
            description: string,
            category: string,
            price: number,
            discountPercentage: number,
            rating: number,
            stock: number,
            tags: [],
            brand: string,
            sku: string,
            weight: number,
            dimensions: Object[],
            warrantyInformation: string,
            shippingInformation: string,
            availabilityStatus: string,
            reviews: [],
            returnPolicy: string,
            minimumOrderQuantity: number,
            meta: Object[],
            images: [],
            thumbnail: string
        }

        const response = await request.get('https://dummyjson.com/products', {
            params: {
                skip: 10,
                limit: 5
            }
        });

        const responseBody = await response.json();
        let products: Product[] = [];
        
        for(let product of responseBody.products) {
            products.push(product);
        };

        expect(products.length).toEqual(5);
        expect(products[0].price).toEqual(1899.99);
        expect(products[1].rating).toBeLessThan(4);
        expect(products[products.length - 1].stock).toBeGreaterThan(10);
        expect(products[0]).toHaveProperty('returnPolicy');

    });
})