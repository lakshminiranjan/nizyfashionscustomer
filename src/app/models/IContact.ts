export interface IContact {
    id? : string;
    name : string;
    email : string;
    photo : File | string | null;
    mobile : number;
    company : string;
    title : string;
    groupId : string;
}
