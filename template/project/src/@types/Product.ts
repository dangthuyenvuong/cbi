import { Media } from "./Media";

export interface Product {
  id: string;
  sku: string | null;
  name: string;
  shortDesc: string | null;
  desc: {
    id: string;
    itemId: string;
    title: string;
    content: string;
    sortOrder: number;
    visibility: boolean;
    createdAt: string | number;
    updatedAt: string | null;
  }[];
  slug?: string;
  featureType?: string;
  regularPrice: number;
  finalPrice: number;
  currency: string;
  thumbnailUrl: string;
  type: string;
  status: string;
  visibility: boolean;
  createdAt: string | number;
  updatedAt: string | null;

  deletedAt: string | null;
  categoryId: string;
  parentId: string | null;
  category?: Record<string, unknown>;
  parent: null;
  children: [];
  attributeValues?: [];
  media: Media[];
  rate?: number;
  rateCount?: number;
  discountPercent?: number;
}

export interface ProductSearch {
  page: string;
  "filter[title][contains]": string;
  "sort[finalPrice]": string;
}
export type ProductQueryURL = {
    search: string
    sort: string
    page: string
};
export type ProductSearchMapURL = Partial<{
  search: "filter[title][contains]";
  sort: "sort[finalPrice]";
  page: string;
}>;

export interface ProductAttribute {
  code: string;
  label: string;
  type: 'string' | 'number' | 'array' | 'datetime';
  status: "enabled" | "disabled";
  sortOrder: number;
  visibility: boolean;
  systemDefined: boolean;
  isRequired: boolean;
  editable: boolean;
  createdAt: number | null;
  updatedAt: number | null;
}
