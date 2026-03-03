export default function CartPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Cart</h1>
        <p className="text-sm text-foreground/70">
          Your cart is empty for now. Hook this up to your products/checkout
          flow next.
        </p>
      </div>
    </main>
  );
}

