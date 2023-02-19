export interface Prefecture_Volumes_Interface {
  prefCode: number;
  prefName: string;
  data: number[][];
}

export interface Prefceture_Interface {
  prefCode: number;
  prefName: string;
}

export interface Single_Prefceture_Volumes_data_Interface {
  data: Single_Prefceture_Volumes_data_Interface_data[];
  label: string;
}

export interface Single_Prefceture_Volumes_data_Interface_data {
  year: number;
  value: number;
}
