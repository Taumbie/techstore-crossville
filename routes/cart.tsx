/**
 * Cart page route - renders a client island that reads the cart from
 * localStorage and displays the saved items.
 */
import CartPage from "../islands/CartPage.tsx";
import Header from "../components/Header.tsx";

export default function CartRoute() {
  return (
    <div>
      <Header />
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-2xl font-semibold mb-4">Your Cart</h1>
        <CartPage />
      </main>
    </div>
  );
}
