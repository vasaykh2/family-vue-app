export interface Member {
  id: string;
  name: string;
  type: string; // "Родители" или "Дети"
}

export interface Family {
  idFamily: string;
  members: Member[];
}
