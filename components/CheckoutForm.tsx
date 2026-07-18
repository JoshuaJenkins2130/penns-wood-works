"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";

type FormData = {
  firstName: string; lastName: string; email: string; phone: string;
  deliveryMethod: "pickup" | "delivery" | "shipping";
  address: string; city: string; state: string; zip: string; notes: string;
  payment: "paypal" | "venmo" | "cashapp";
};

const initialForm: FormData = {
  firstName: "", lastName: "", email: "", phone: "", deliveryMethod: "pickup",
  address: "", city: "", state: "", zip: "", notes: "", payment: "paypal"
};

export default function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormData>(initialForm);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const deliveryFee = form.deliveryMethod === "delivery" ? 20 : form.deliveryMethod === "shipping" ? 35 : 0;
  const total = subtotal + deliveryFee;
  const update = (field: keyof FormData, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submitReview = (event: React.FormEvent) => {
    event.preventDefault();
    if (!items.length) return;
    setReviewOpen(true);
  };

  const confirmPayment = () => {
    // Placeholder until PayPal/Venmo and Cash App Pay business credentials are provided.
    setReviewOpen(false);
    setComplete(true);
    clearCart();
  };

  if (complete) {
    return <main className="checkoutShell"><section className="successCard"><h1>Thank you!</h1><p>Your demo order has been recorded successfully.</p><p className="notice">Live payment processing will replace this demo confirmation after the business payment accounts are connected.</p><Link href="/" className="primaryButton">Return Home</Link></section></main>;
  }

  return (
    <main className="checkoutShell">
      <div className="checkoutTop"><Link href="/">← Continue shopping</Link><h1>Checkout</h1></div>
      <form className="checkoutGrid" onSubmit={submitReview}>
        <div className="checkoutFormCard">
          <h2>Contact Information</h2>
          <div className="fieldGrid twoCol">
            <label>First Name<input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} /></label>
            <label>Last Name<input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} /></label>
          </div>
          <div className="fieldGrid twoCol">
            <label>Email Address<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
            <label>Phone Number<input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label>
          </div>

          <h2>Delivery Method</h2>
          <div className="choiceGroup">
            {(["pickup", "delivery", "shipping"] as const).map((method) => (
              <label className="choiceCard" key={method}><input type="radio" name="delivery" checked={form.deliveryMethod === method} onChange={() => update("deliveryMethod", method)} /><span>{method === "pickup" ? "Local Pickup" : method === "delivery" ? "Local Delivery (+$20)" : "Shipping (+$35)"}</span></label>
            ))}
          </div>

          {form.deliveryMethod !== "pickup" && <div className="addressFields">
            <label>Street Address<input required value={form.address} onChange={(e) => update("address", e.target.value)} /></label>
            <div className="fieldGrid threeCol">
              <label>City<input required value={form.city} onChange={(e) => update("city", e.target.value)} /></label>
              <label>State<input required maxLength={2} value={form.state} onChange={(e) => update("state", e.target.value.toUpperCase())} /></label>
              <label>ZIP Code<input required value={form.zip} onChange={(e) => update("zip", e.target.value)} /></label>
            </div>
          </div>}

          <label>Order Notes<textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Optional special instructions" /></label>

          <h2>Payment Method</h2>
          <p className="notice">Penn&apos;s Wood Works will not collect card details. Payment will be completed through the selected provider.</p>
          <div className="choiceGroup paymentChoices">
            {(["paypal", "venmo", "cashapp"] as const).map((method) => (
              <label className="choiceCard" key={method}><input type="radio" name="payment" checked={form.payment === method} onChange={() => update("payment", method)} /><span>{method === "cashapp" ? "Cash App Pay" : method[0].toUpperCase() + method.slice(1)}</span></label>
            ))}
          </div>
          <button className="primaryButton fullWidth" type="submit" disabled={!items.length}>Review Order</button>
        </div>

        <aside className="orderSummaryCard">
          <h2>Your Order</h2>
          {items.length === 0 ? <p>Your cart is empty.</p> : items.map((item) => (
            <div className="checkoutItem" key={item.id}>
              <div className="checkoutItemText"><strong>{item.name}</strong><span>{item.size}</span><span>Quantity: {item.quantity}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>
              <Image src={item.image} alt={item.name} width={88} height={88} className="checkoutThumb" />
            </div>
          ))}
          <div className="totals"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div><span>Delivery/Shipping</span><strong>${deliveryFee.toFixed(2)}</strong></div><div className="grandTotal"><span>Total</span><strong>${total.toFixed(2)}</strong></div></div>
        </aside>
      </form>

      {reviewOpen && <div className="modalBackdrop"><div className="reviewModal">
        <button className="closeButton" onClick={() => setReviewOpen(false)}>×</button>
        <h2>Confirm Your Order</h2>
        <div className="reviewSection"><strong>{form.firstName} {form.lastName}</strong><span>{form.email}</span><span>{form.phone}</span></div>
        <div className="reviewSection"><strong>Fulfillment</strong><span>{form.deliveryMethod === "pickup" ? "Local Pickup" : form.deliveryMethod === "delivery" ? "Local Delivery" : "Shipping"}</span>{form.deliveryMethod !== "pickup" && <span>{form.address}, {form.city}, {form.state} {form.zip}</span>}</div>
        <div className="reviewProducts">{items.map((item) => <div key={item.id}><Image src={item.image} alt={item.name} width={60} height={60} /><span>{item.name} × {item.quantity}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}</div>
        <div className="reviewSection"><strong>Payment</strong><span>{form.payment === "cashapp" ? "Cash App Pay" : form.payment[0].toUpperCase() + form.payment.slice(1)}</span></div>
        <div className="grandTotal"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        <p className="notice">Demo mode: this button currently confirms the test order. Live provider redirection will be connected later.</p>
        <div className="reviewActions"><button type="button" className="secondaryButton" onClick={() => setReviewOpen(false)}>Go Back</button><button type="button" className="primaryButton" onClick={confirmPayment}>Confirm and Pay</button></div>
      </div></div>}
    </main>
  );
}
