import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Prescription {
    name: string;
    submittedAt: bigint;
    phone: string;
    medicines: string;
}
export interface Doctor {
    name: string;
    qualifications: string;
    specialty: string;
    schedule: string;
}
export interface BackendReview {
    id: bigint;
    name: string;
    rating: bigint;
    comment: string;
    createdAt: bigint;
}
export interface backendInterface {
    addDoctor(doctor: Doctor): Promise<bigint>;
    addPrescription(prescription: Prescription): Promise<bigint>;
    addReview(name: string, rating: bigint, comment: string): Promise<bigint>;
    getBusinessHours(): Promise<string>;
    getDoctor(id: bigint): Promise<Doctor>;
    getDoctors(): Promise<Array<Doctor>>;
    getPhone1(): Promise<string>;
    getPhone2(): Promise<string>;
    getPrescriptions(): Promise<Array<Prescription>>;
    getReviews(): Promise<Array<BackendReview>>;
    getUpiId(): Promise<string>;
    removeDoctor(id: bigint): Promise<void>;
    setBusinessHours(newBusinessHours: string): Promise<void>;
    setPhone1(newPhone1: string): Promise<void>;
    setPhone2(newPhone2: string): Promise<void>;
    setUpiId(newUpiId: string): Promise<void>;
    updateDoctor(id: bigint, doctor: Doctor): Promise<void>;
}
