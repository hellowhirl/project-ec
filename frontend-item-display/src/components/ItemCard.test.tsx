import React from "react";
import { render, screen } from "@testing-library/react";
import ItemCard from "./ItemCard";
import renderer from "react-test-renderer";

const fakeItem = {
  id: 2,
  name: "Vegan leather bag",
  description:
    'Black tote in excellent condition.\n\nFabric:Vegan leather\n Measurement: 17"L 0.5" W 11.75"H\n Handles about 8.5',
  like_count: 0,
  comment_count: 0,
  price: 10000,
  is_sold_out: true,
  shipping_fee: "送料込み",
  image: "images/image_2.png",
  category_id: 2,
};

// renders correct JSON
// catch some logic (true/false flag)

test("renders item name", () => {
  render(<ItemCard item={fakeItem} />);
  const titleElement = screen.getByText(/Vegan leather bag/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders formatted price", () => {
  render(<ItemCard item={fakeItem} />);
  const priceElement = screen.getByText(/10,000/i);
  expect(priceElement).toBeInTheDocument();
});

it("renders correctly", () => {
  const tree = renderer.create(<ItemCard item={fakeItem} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// like button -> simulate click -> expect like count increases/decreases
