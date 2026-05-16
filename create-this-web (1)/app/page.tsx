"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ShoppingCart, X, Trash2, Plus, Minus, Cake, Coffee, UtensilsCrossed, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Category = "sweets" | "pudding" | "juice" | "food";

interface MenuItem {
  id: string;
  name: string;
  nameAr?: string;
  category: Category;
  price: number;
  image?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  // Juice
  { id: "j1", name: "Orange Juice", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-6718-fqitiRGBg6LWtLaJn0Yqu41IvJCu2S.jpg" },
  { id: "j2", name: "Lemonade Juice", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-6724-8B6fUUD29n0C078fIcQ9T55oVIKzRU.jpg" },
  { id: "j3", name: "Pomegranate Juice", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-6725-VNma0ZVilvPI9WX8McgbI2oX9YBWqT.jpg" },
  { id: "j4", name: "Pomegranate Lemonade", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-6727-OlRMm4z3df4bZhj0grUdEMUMFFc4dU.jpg" },
  { id: "j5", name: "Strawberry Juice", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-6728-ceG5oeAYe4f74Nl6z067pkLKieEvnj.jpg" },
  { id: "j6", name: "Strawberry Lemonade", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-6730-axQpQ76QS2Mt0f3MQlbtMBXH6XpDYq.jpg" },
  { id: "j7", name: "Tut Chami Juice", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-6731-fflOQTOaR9tgaT7rWkkVQBNgIUy8pt.jpg" },
  { id: "j8", name: "Jellab Juice", category: "juice", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-7084-NqRwR4u1Ut0fnF3kiA0D8FyMYv3p9y.jpg" },
  // Sweets
  { id: "s1", name: "Brownie Jar", category: "sweets", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-7098-7E8TcnbpGwhMHWmsI2VWhgCkYcdFQO.jpg" },
  { id: "s2", name: "Oreo Mini Cake", category: "sweets", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-7097-jcuRklJzL8xp7VoJufxNdoIYjsDXqS.jpg" },
  { id: "s3", name: "Dubai Chocolate Mini Cake", category: "sweets", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-7096-eq6wRmNCpBftuIrRRMRJNvnaVS2Z62.jpg" },
  { id: "s4", name: "Bounty Mini Cake", category: "sweets", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-7094-WNkct2pNaKpeBLZWz347vKS8hOpuq0.jpg" },
  { id: "s5", name: "Ferero Mini Cake", category: "sweets", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-7093-0TNAv7TVfgjk18lryR8DNPD9u8DBrx.jpg" },
  { id: "s6", name: "Mango Tiramisu", category: "sweets", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-7095-skpEtbbGweoJslgR6uMTZl3Lq8IbCG.jpg" },
  { id: "s7", name: "Mini Black Forest Cake", category: "sweets", price: 0, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-9466-vPsD9PhrMQRAfClA8NdltI8YgDn4tZ.png" },
  // Pudding
  { id: "p1", name: "Meghli", nameAr: "المغلي", category: "pudding", price: 0 },
  // Food
  { id: "f1", name: "Grape Leaves with Oil", nameAr: "ورق عنب بزيت", category: "food", price: 0 },
  { id: "f2", name: "Lebanese Mansaf", nameAr: "منسف لبناني", category: "food", price: 0 },
];

const categories: { id: Category; name: string; icon: React.ReactNode }[] = [
  { id: "sweets", name: "Sweets", icon: <Cake className="h-4 w-4" /> },
  { id: "pudding", name: "Pudding", icon: <Coffee className="h-4 w-4" /> },
  { id: "juice", name: "Juice", icon: <GlassWater className="h-4 w-4" /> },
  { id: "food", name: "Food", icon: <UtensilsCrossed className="h-4 w-4" /> },
];

const categoryColors: Record<Category, string> = {
  sweets: "bg-destructive",
  pudding: "bg-accent",
  juice: "bg-primary",
  food: "bg-destructive",
};

export default function SweetLabMenu() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("sweets");
  const sectionRefs = useRef<Record<Category, HTMLDivElement | null>>({
    sweets: null,
    pudding: null,
    juice: null,
    food: null,
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === itemId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const scrollToCategory = (category: Category) => {
    setActiveCategory(category);
    sectionRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getItemsByCategory = (category: Category) =>
    menuItems.filter((item) => item.category === category);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm py-1">
        <div className="container mx-auto px-2 flex items-center justify-between">
          {/* Mobile: logo and wordmark side by side, compact */}
          <div className="flex md:hidden items-center gap-2">
            <Image
              src="/logo.png"
              alt="Sweet Lab Logo"
              width={50}
              height={50}
              className="object-contain"
              priority
            />
            <Image
              src="/wordmark.png"
              alt="Sweet Lab"
              width={100}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          {/* Desktop: side by side */}
          <div className="hidden md:flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Sweet Lab Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
            <Image
              src="/wordmark.png"
              alt="Sweet Lab"
              width={200}
              height={60}
              className="object-contain"
              priority
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {categories.map((cat) => (
          <section
            key={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id] = el;
            }}
            className="mb-12 scroll-mt-36"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${categoryColors[cat.id]}`}>
                <span className="text-white">{cat.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{cat.name}</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getItemsByCategory(cat.id).map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onAddToCart={() => addToCart(item)}
                  categoryColor={categoryColors[cat.id]}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Your Cart
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingCart className="h-16 w-16 mb-4 opacity-30" />
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm">Add some delicious items!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        {item.nameAr && (
                          <p className="text-sm text-muted-foreground" dir="rtl">
                            {item.nameAr}
                          </p>
                        )}
                        <p className="text-sm text-primary font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  item,
  onAddToCart,
  categoryColor,
}: {
  item: MenuItem;
  onAddToCart: () => void;
  categoryColor: string;
}) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border">
      <div className={`h-40 ${categoryColor} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {item.category === "juice" && <GlassWater className="h-10 w-10 text-white" />}
              {item.category === "sweets" && <Cake className="h-10 w-10 text-white" />}
              {item.category === "pudding" && <Coffee className="h-10 w-10 text-white" />}
              {item.category === "food" && <UtensilsCrossed className="h-10 w-10 text-white" />}
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-1">{item.name}</h3>
        {item.nameAr && (
          <p className="text-muted-foreground text-sm mb-2" dir="rtl">
            {item.nameAr}
          </p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-primary">
            ${item.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 hover:scale-105"
            onClick={onAddToCart}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
