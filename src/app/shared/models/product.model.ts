import { SafeResourceUrl } from "@angular/platform-browser";

export type TProducts = {
    id?: number;
    photo: string | SafeResourceUrl;
    name: string;
    description: string;
    date?: string;
    price: string;
    tags: string[];
}

export type THeader = {
    canSort: boolean;
    isSorted: boolean;
    isAsc: boolean;
    label: string;
    property: string;
}