export interface Category {
  _id: string;
  name: string;
}

export interface Staff {
  _id: string;
  name: string;
  services: Array<Service>;
}

export interface Service {
  _id: string;
  name: string;
  price?: string;
  category?: Category;
}

export interface Selection {
  service: Service;
  staff: Staff;
}

export interface Booking {
  clientName: string;
  clientPhone: string;
  selections: Selection[];
  date: Date;
}
