import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    customerName: string;
    totalAmount: number;
    address: string;
    items: Array<Item>;
    phoneNumber: string;
}
export interface Item {
    name: string;
    quantity: bigint;
    price: number;
}
export interface backendInterface {
    getAllOrders(): Promise<Array<Order>>;
    submitOrder(customerName: string, phoneNumber: string, address: string, items: Array<Item>, totalAmount: number): Promise<void>;
}
