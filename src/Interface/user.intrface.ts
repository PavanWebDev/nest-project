import { Document } from "mongoose";

export interface NewUser extends Document {
    name: string;
    email: string;
    password: string;
}