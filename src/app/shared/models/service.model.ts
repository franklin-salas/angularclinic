export interface ServiceList {
    id: number;
    name: string;
    description: string;
    price: number;
    specialty_id: number;
    specialty_name: string;
    status: 'Activo' | 'Inactivo' ; 
    created_at: string;
   
  }

  export interface Service {
    id?: number;
    name: string;
    description: string;
    price: number;
    specialty_id: number;
    status: 'ACTIVO' | 'INACTIVO' ; 
  }