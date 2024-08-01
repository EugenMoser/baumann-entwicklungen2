export interface Product {
  product_id: number;
  category: string;
  product_name: string;
  product_description1?: string;
  product_description2?: string;
  product_description3?: string;
  product_description4?: string;
  product_material: string;
  product_imagepath_small: string;
  product_imagepath_big1: string;
  product_imagepath_big2?: string;
  product_imagepath_big3?: string;
  article: Article[];
  colors: Color[];
}

export interface Article {
  article_id: number;
  article_number: string;
  article_prio: number;
  article_name: string;
  article_description: string;
  article_description1?: string;
  article_description2?: string;
  article_description3?: string;
  vpe1: string;
  vpe2?: string;
  vpe3?: string;
  vpe4?: string;
}

export interface Color {
  color_id: string;
  color_name: string;
  color_code: string;
  color_suffix: number;
}

export interface CategoryProps {
  product_id: number;
  category: string;
  product_name: string;
  product_description1: string;
  product_imagepath_small: string;
}
