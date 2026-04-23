export type CollectionCards = {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
};

export const COLLECTION_CARDS: CollectionCards[] = [
  {
    id: "iPhones",
    badge: "smart picks",
    title: "Discover the Best of Apple",
    description:
      "Experience cutting-edge technology with the latest iPhones. From Pro models to budget-friendly SE editions, there’s an iPhone for everyone.",
    image: "/assets/images/iphone17_PNG41.png",
  },
  {
    id: "Android Devices",
    badge: "fast and reliable",
    title: "Top Android Phones You Can Trust",
    description:
      "From Samsung to Pixel, discover fast, flexible Androids backed by Plug Tech’s certified quality.",
    image: "/assets/images/macbook_PNG7.png",
  },
];
