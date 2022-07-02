import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Item, fetchSingleItem } from "../services/itemsService";
import { ReactComponent as HeartIcon } from "../icons/heart.svg";
import { ReactComponent as FlagIcon } from "../icons/flag.svg";
import { ReactComponent as SoldIcon } from "../icons/sold.svg";
import "../App.css";

function ItemPage() {
  let { itemId } = useParams<{ itemId: string }>();

  const [datum, setDatum] = useState<Item | null>(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const doFetch = async () => {
    if (!itemId) return;
    const response = await fetchSingleItem(itemId);
    setDatum(response);
    setLikesCount(response.like_count);
  };

  useEffect(() => {
    doFetch();
  }, []);

  const handleLike = () => {
    console.log(likesCount);
    if (!liked) {
      setLikesCount(likesCount + 1);
      setLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setLiked(false);
    }
  };

  if (!datum) {
    return <div className="loading-screen">Loading ...</div>;
  }

  return (
    <main>
      <div className="product-display">
        <Link to={`/`}>
          <div>Back button</div>
        </Link>
        <h1 className="gutter-padding">{datum.name}</h1>
        <div className="product-image">
          <img src={datum.image} />
          <div className="sold-out">
            {datum.is_sold_out ? <SoldIcon /> : null}
          </div>
        </div>
        <h1 className="gutter-padding">{datum.name}</h1>
        <div className=" gutter-padding">
          <div className="actions-section">
            <div className="engagement">
              <div onClick={() => handleLike()} className="like">
                <div className="button gray-background">
                  <HeartIcon />
                  いいね!
                </div>
                <div className="count">{likesCount}</div>
              </div>
              <div className="button gray-background">コメント</div>
            </div>
            <div className="button report gray-background">
              <div className="flag">
                <FlagIcon />
              </div>
            </div>
          </div>
        </div>
        <div className=" gray-background">
          <div className="sub-heading gutter-padding">商品の説明</div>
        </div>
        <div className="gutter-padding">{datum.description}</div>
        <div className="call-to-action">
          <div className="inner-container">
            <div className="price-details">
              <span className="price">
                ¥{datum.price.toLocaleString("en-US")}
              </span>
              <span className="shipping">{datum.shipping_fee}</span>
            </div>
            <div className="buy-button">購入手続きへ</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemPage;
