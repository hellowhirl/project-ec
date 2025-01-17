import { Item } from "../services/itemsService";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="item-card">
      <div className="product-image">
        <img src={item.image} />
        <div className="sold-out">
          {item.is_sold_out ? (
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              stroke="null"
            >
              <g stroke="null" id="Layer_1">
                <title>Layer 1</title>
                <line
                  stroke="null"
                  id="svg_2"
                  y2="47.3913"
                  x2="158.69565"
                  y1="195.21739"
                  x1="2.6087"
                  fill="none"
                />
                <line
                  stroke="null"
                  id="svg_3"
                  y2="0"
                  x2="200.43478"
                  y1="48.69565"
                  x1="157.3913"
                  fill="none"
                />
                <line
                  stroke="null"
                  id="svg_5"
                  y2="204.34783"
                  x2="-2.17391"
                  y1="203.91304"
                  x1="-2.17391"
                  fill="none"
                />
                <line
                  stroke="null"
                  id="svg_6"
                  y2="98.69565"
                  x2="77.82609"
                  y1="98.69565"
                  x1="78.26087"
                  fill="none"
                />
                <rect
                  transform="rotate(-45 13.655 20.5098)"
                  id="svg_10"
                  height="234.92823"
                  width="349.00995"
                  y="-96.95433"
                  x="-160.84995"
                  fill="#e03a33"
                />
                <text
                  transform="rotate(-45 73.9445 73.788) matrix(2.02572 0 0 2.02572 -84.7564 -42.8368)"
                  stroke="null"
                  fontWeight="bold"
                  textAnchor="start"
                  fontFamily="'Sora'"
                  fontSize="24"
                  strokeWidth="0"
                  id="svg_12"
                  y="65.73831"
                  x="43.67461"
                  fill="#ffffff"
                >
                  SOLD
                </text>
              </g>
            </svg>
          ) : null}
        </div>
      </div>
      <div className="name">{item.name}</div>
      <div className="bottom-info">
        <div className="price">¥{item.price.toLocaleString("en-US")}</div>
        <div className="likes">
          <HeartIcon />
          <p className="count">{item.like_count}</p>
        </div>
      </div>
    </div>
  );
}
