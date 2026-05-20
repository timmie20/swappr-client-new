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
    image: "/assets/images/swappr-andriod.webp",
  },
  {
    id: "MacBooks",
    badge: "power and performance",
    title: "Sleek, high-performance MacBooks ",
    description:
      "MacBooks are designed for the modern professional, offering powerful performance in a sleek, portable package.",
    image: "/assets/images/macbook_PNG7.png",
  },
  {
    id: "iPads",
    badge: "versatile and portable",
    title: "iPads for Every Need",
    description:
      "From the powerful iPad Pro to the budget-friendly iPad, discover versatile tablets for work, creativity, and entertainment.",
    image: "/assets/images/swappr-ipad.webp",
  },
  {
    id: "Apple Watch",
    badge: "smart and stylish",
    title: "Smart Wearables for Every Lifestyle",
    description:
      "From fitness trackers to smartwatches, explore wearables that blend style with functionality to keep you connected and healthy.",
    image: "/assets/images/swappr-watch.webp",
  },
  {
    id: "Audio Devices",
    badge: "immersive sound",
    title: "Audio Devices for Every Audiophile",
    description:
      "From wireless earbuds to high-fidelity headphones, discover audio devices that deliver immersive sound quality for music lovers everywhere.",
    image: "/assets/images/swappr-audio.webp",
  },
];
