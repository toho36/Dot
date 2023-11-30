export interface DataSource {
  id: number;
  name: string;
  [key: string]: string | boolean | number;
}
export interface ColumnVisibility {
  [key: string]: boolean;
}



