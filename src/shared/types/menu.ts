export interface Menu {
    id: number;
    name: string;
    path: string;
    icon: string;
    children: Menu[] | null;
}