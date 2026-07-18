"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart, X } from "lucide-react";
import { useRef, useState } from "react";
import { categories, products, type Product } from "@/lib/products";
import { useCart } from "./CartContext";
import { cinzel } from "@/app/fonts";

export default function Storefront() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQuantity, itemCount, subtotal } = useCart();
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

const scroll = (category: string, direction: number) => {
  const row = rowRefs.current[category];

  if (!row) return;

  const firstCard = row.querySelector<HTMLElement>(".productCard");
  const cardWidth = firstCard?.offsetWidth ?? 320;

  const styles = window.getComputedStyle(row);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

  row.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: "smooth",
  });
};

  return (
    <main>
      <header className="hero">
        <div className="heroOverlay" />
        <button className="cartButton" onClick={() => setCartOpen(true)} aria-label="Open cart">
          <ShoppingCart size={22} /> <span>Cart ({itemCount})</span>
        </button>
        <div className="brandCard">
         
         <Image
            src="/products/logo/logo.png"
            alt="Penn's Wood Works logo"
            width={320}
            height={200}
            className="brandLogo"
            priority
          />

          <p className={`${cinzel.className} tagline`}>
    Built to Last
  </p>

</div>
      </header>

<section className="storeContent">
  {categories.map((category) => {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );

    const isScrollable = categoryProducts.length > 4;
    const hasMultipleProducts = categoryProducts.length > 1;

    return (
      <section className="categorySection" key={category}>
        <div className="sectionHeading">
          <h2>{category}</h2>

          {hasMultipleProducts && (
            <div
              className={`rowControls ${
                isScrollable ? "desktopControls" : "mobileControls"
              }`}
          >
              <button
                onClick={() => scroll(category, -1)}
                aria-label={`Scroll ${category} left`}
              >
                <ChevronLeft />
              </button>

              <button
                onClick={() => scroll(category, 1)}
                aria-label={`Scroll ${category} right`}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>

        <div
          className={`productRow ${isScrollable ? "scrollable" : "centered"}`}
          ref={(node) => {
            rowRefs.current[category] = node;
          }}
        >
          {categoryProducts.map((product) => (
            <button
              className="productCard"
              key={product.id}
              onClick={() => setSelected(product)}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={320}
                height={240}
              />

              <div className="productCardBody">
                <h3>{product.name}</h3>
                <p>{product.size}</p>
                <strong>${product.price.toFixed(2)}</strong>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  })}
</section>

      <footer>
        <strong>Joshua Jenkins Production</strong>
      </footer>

      {selected && (
        <div className="modalBackdrop" onMouseDown={() => setSelected(null)}>
          <div className="productModal" onMouseDown={(event) => event.stopPropagation()}>
            <button className="closeButton" onClick={() => setSelected(null)} aria-label="Close product"><X /></button>
            <Image src={selected.image} alt={selected.name} width={640} height={480} className="modalImage" />
            <div className="modalDetails">
              <p className="eyebrow">{selected.category}</p>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              <div className="detailLine"><span>Size</span><strong>{selected.size}</strong></div>
              <div className="detailLine"><span>Price</span><strong>${selected.price.toFixed(2)}</strong></div>
              <button className="primaryButton" onClick={() => { addItem(selected); setSelected(null); setCartOpen(true); }}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="drawerBackdrop" onMouseDown={() => setCartOpen(false)}>
          <aside className="cartDrawer" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawerHeader">
              <h2>Your Cart</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button>
            </div>
            <div className="drawerItems">
              {items.length === 0 ? <p>Your cart is empty.</p> : items.map((item) => (
                <div className="drawerItem" key={item.id}>
                  <Image src={item.image} alt={item.name} width={72} height={72} />
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.size}</small>
                    <div className="quantityRow">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="drawerPrice">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawerFooter">
              <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <Link className={`primaryButton ${items.length === 0 ? "disabled" : ""}`} href={items.length ? "/checkout" : "#"}>Proceed to Checkout</Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
