import { User } from "./user";

export interface Guarantor extends User {
    role: "guarantor"
}