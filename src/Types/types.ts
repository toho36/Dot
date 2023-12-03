export interface DataSource {
  id: number;
  name: string;
  archived: boolean;
  createdAt: Date;
  lastImport: Date | string | null;
  [key: string]: any;
}
export interface ColumnVisibility {
  [key: string]: boolean;
}



