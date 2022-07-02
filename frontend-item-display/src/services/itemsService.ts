const apiEndpoint = "http://localhost:8000";

export interface Item {
  id: number;
  name: string;
  description: string;
  like_count: number;
  comment_count: number;
  price: number;
  is_sold_out: boolean;
  shipping_fee: string;
  image: string;
  category_id: number;
}

export interface ItemResponse {
  data: Item[];
}

export interface CategoryResponse {
  data: Category[];
}

export interface Category {
  id: string;
  name: string;
}

const fetchItems = async () => {
  const response = await fetch(`${apiEndpoint}/items`);
  const data: ItemResponse = await response.json();

  return data;
};

const fetchSingleItem = async (id: string) => {
  const response = await fetch(`${apiEndpoint}/items/${id}`);
  const itemData: Item = await response.json();

  return itemData;
};

const fetchCategories = async () => {
  const response = await fetch(`${apiEndpoint}/categories`);
  const categoryData: CategoryResponse = await response.json();

  return categoryData;
};

export { fetchItems, fetchSingleItem, fetchCategories };
