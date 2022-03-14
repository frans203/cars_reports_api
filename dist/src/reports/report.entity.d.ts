import { User } from '../users/user.entity';
export declare class Report {
    id: number;
    price: number;
    make: string;
    model: string;
    year: number;
    lng: number;
    lat: number;
    user: User;
    mensuration: string;
    mileage: number;
    approved: boolean;
}
