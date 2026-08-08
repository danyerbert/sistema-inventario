// resources/js/types/inventory.ts
export interface TypeOfEquipment {
    id_type_of_equipment: number;
    type_of_equipment: string;
}

export interface Brand {
    id_brand: number;
    name_brand: string;
}

export interface DeviceModel {
    id_model: number;
    name_model: string;
    id_brand: number;
    id_type_of_equipment: number;
    brand: Brand;
    type_of_equipment: TypeOfEquipment;
}

export interface Workstation {
    id_workstation: number;
    number_workstation: string;
}

export interface OperationalStatus {
    id_operational_status: number;
    operational_status: string;
}

export interface EquipmentDetail {
    id_equipment_details: number;
    property_number: string;
    serial: string;
    observaciones: string | null;
    id_type_of_equipment: number;
    id_brand: number;
    id_workstation: number | null;
    id_operational_status: number;
    type_of_equipment: TypeOfEquipment;
    brand: Brand;
    workstation: Workstation | null;
    operational_status: OperationalStatus;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}
