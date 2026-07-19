import type { CategoryTreeNode } from "@/types/categories";

export interface CategoryNavItem {
  name: string;
  href?: string;
  description?: string;
  subItems?: CategoryNavItem[];
}

export function productsHref(params: {
  categorySlug?: string;
  subcategorySlug?: string;
}) {
  const search = new URLSearchParams();
  if (params.categorySlug) search.set("categories", params.categorySlug);
  if (params.subcategorySlug)
    search.set("subcategories", params.subcategorySlug);
  return `/products?${search.toString()}`;
}

export function categoryToNavItem(category: CategoryTreeNode): CategoryNavItem {
  const allHref = productsHref({ categorySlug: category.slug });

  if (!category.sub_categories.length) {
    return { name: category.name, href: allHref };
  }

  return {
    name: category.name,
    href: "#",
    subItems: [
      {
        name: `All ${category.name}`,
        href: allHref,
        description: `Browse all products in ${category.name}`,
      },
      ...category.sub_categories.map((sub) => ({
        name: sub.name,
        href: productsHref({
          categorySlug: category.slug,
          subcategorySlug: sub.slug,
        }),
      })),
    ],
  };
}
