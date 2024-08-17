export interface DoctorList {
    id: number;
    name: string;
    last_name: string;
    email: string;
    birth_date: string | null;
    gender: string;
    education: string;
    designation: string;
    address: string;
    mobile: string;
    created_at: string;
    role_name: string;
    avatar: string;
  }


  export interface Doctor {
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
    designation: string;
    education: string;
    gender: 'M' | 'F' ; 
    role_id: number;
    specialty_id: number;
    schedule_day_hours?: any
  }