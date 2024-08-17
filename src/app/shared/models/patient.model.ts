export interface PatientList {
    id: number;
    name: string;
    last_name: string;
    email: string;
    document: string;
    mobile: string;
    created_at: string;
    avatar: string;
  }


  export interface Patient {
    id?: number;
    name: string;
    last_name: string;
    document:string;
    email: string;
    mobile: string;
    address: string;
    avatar: string;
    url_avatar: string;
    birth_date: string; 
    created_at: string; 
    antecedent_family: string;
    antecedent_allergy: string;
    gender: 'M' | 'F' ; 
  
  }