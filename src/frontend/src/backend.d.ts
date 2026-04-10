import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ReviewEntry {
    id: bigint;
    name: string;
    createdAt: bigint;
    comment: string;
    isVerified: boolean;
    rating: bigint;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    isPublished: boolean;
    publishedAt: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<HttpHeader>;
}
export interface HttpRequestResult {
    status: bigint;
    body: Uint8Array;
    headers: Array<HttpHeader>;
}
export interface ReviewsPage {
    hasMore: boolean;
    reviews: Array<ReviewEntry>;
    totalCount: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: HttpRequestResult;
}
export interface Doctor {
    name: string;
    qualifications: string;
    specialty: string;
    schedule: string;
}
export interface Appointment {
    id: bigint;
    customerName: string;
    status: string;
    createdAt: bigint;
    preferredDate: string;
    preferredTime: string;
    phone: string;
    doctorName: string;
    reason: string;
}
export interface Prescription {
    name: string;
    submittedAt: bigint;
    phone: string;
    medicines: string;
}
export interface Review {
    id: bigint;
    name: string;
    createdAt: bigint;
    comment: string;
    rating: bigint;
}
export interface HttpHeader {
    value: string;
    name: string;
}
export interface backendInterface {
    addAppointment(customerName: string, phone: string, doctorName: string, preferredDate: string, preferredTime: string, reason: string): Promise<bigint>;
    addBlogPost(title: string, content: string): Promise<bigint>;
    addDoctor(doctor: Doctor): Promise<bigint>;
    addPrescription(prescription: Prescription): Promise<bigint>;
    addReview(name: string, rating: bigint, comment: string): Promise<bigint>;
    addUserReview(name: string, rating: bigint, comment: string): Promise<bigint>;
    askGemini(prompt: string): Promise<string>;
    deleteBlogPost(id: bigint): Promise<boolean>;
    getAllBlogPostsAdmin(): Promise<Array<BlogPost>>;
    getAppointments(): Promise<Array<Appointment>>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getBusinessHours(): Promise<string>;
    getDoctor(id: bigint): Promise<Doctor>;
    getDoctors(): Promise<Array<Doctor>>;
    getPhone1(): Promise<string>;
    getPhone2(): Promise<string>;
    getPrescriptions(): Promise<Array<Prescription>>;
    getReviews(): Promise<Array<Review>>;
    getReviewsPaginated(page: bigint, pageSize: bigint): Promise<ReviewsPage>;
    getUpiId(): Promise<string>;
    removeDoctor(id: bigint): Promise<void>;
    setBusinessHours(newBusinessHours: string): Promise<void>;
    setPhone1(newPhone1: string): Promise<void>;
    setPhone2(newPhone2: string): Promise<void>;
    setUpiId(newUpiId: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAppointmentStatus(id: bigint, status: string): Promise<boolean>;
    updateBlogPost(id: bigint, title: string, content: string, isPublished: boolean): Promise<boolean>;
    updateDoctor(id: bigint, doctor: Doctor): Promise<void>;
}
