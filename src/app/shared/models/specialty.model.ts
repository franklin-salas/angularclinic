export interface SpecialtyList {
    id: number;
    name: string;
    status: 'Activo' | 'Inactivo' ; 
    created_at: string;
   
  }

  export interface Specialty {
    id?: number;
    name: string;
    status: 'ACTIVO' | 'INACTIVO' ; 
  }