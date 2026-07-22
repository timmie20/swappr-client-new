export interface Category {
  id: string;
  name: string;
  type?: string;
  slug?: string;
  is_active?: boolean;
  sub_categories?: Category[];
}

export interface SubCategoryTreeNode {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

export interface CategoryTreeNode {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  sub_categories: SubCategoryTreeNode[];
}
