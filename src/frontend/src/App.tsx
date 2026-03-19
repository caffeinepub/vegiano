import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  BadgeDollarSign,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Facebook,
  FlaskConical,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Star,
  Trash2,
  Truck,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  unit: string;
  image: string;
  tag?: "bestseller" | "popular" | null;
  freshTag?: "fresh" | "limited";
}

interface CartItem extends Product {
  qty: number;
}

type CartStep = 1 | 2 | 3 | 4;

// ── Constants ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Products", id: "products" },
  { label: "About", id: "about" },
  { label: "Why Us", id: "why-us" },
  { label: "Order", id: "order" },
  { label: "Contact", id: "contact" },
];

const PRODUCTS: Product[] = [
  {
    id: "tomato",
    name: "Tomato",
    price: "₹30",
    priceNum: 30,
    unit: "kg",
    image: "/assets/generated/tomato.dim_400x400.jpg",
    tag: "bestseller",
    freshTag: "fresh",
  },
  {
    id: "potato",
    name: "Potato",
    price: "₹25",
    priceNum: 25,
    unit: "kg",
    image: "/assets/generated/potato.dim_400x400.jpg",
    tag: null,
    freshTag: "fresh",
  },
  {
    id: "spinach",
    name: "Spinach",
    price: "₹15",
    priceNum: 15,
    unit: "bunch",
    image: "/assets/generated/spinach.dim_400x400.jpg",
    tag: "popular",
    freshTag: "limited",
  },
  {
    id: "carrot",
    name: "Carrot",
    price: "₹40",
    priceNum: 40,
    unit: "kg",
    image: "/assets/generated/carrot.dim_400x400.jpg",
    tag: null,
    freshTag: "fresh",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    price: "₹60",
    priceNum: 60,
    unit: "kg",
    image: "/assets/generated/broccoli.dim_400x400.jpg",
    tag: null,
    freshTag: "fresh",
  },
  {
    id: "cucumber",
    name: "Cucumber",
    price: "₹20",
    priceNum: 20,
    unit: "kg",
    image: "/assets/generated/cucumber.dim_400x400.jpg",
    tag: null,
    freshTag: "fresh",
  },
];

const WHY_ITEMS = [
  {
    icon: Sprout,
    title: "Fresh from Farms",
    desc: "Directly harvested and delivered within 24 hours of picking.",
  },
  {
    icon: FlaskConical,
    title: "No Chemicals",
    desc: "100% organic and chemical-free produce from trusted farmers.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Prices",
    desc: "Fair pricing with no middleman markup — you save more.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Same day or next morning delivery across Kolkata.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    location: "Salt Lake",
    initials: "PS",
    color: "bg-rose-400",
    quote:
      "The vegetables are incredibly fresh! I ordered spinach and tomatoes and they arrived within 3 hours. Highly recommend!",
  },
  {
    name: "Rahul M.",
    location: "New Town",
    initials: "RM",
    color: "bg-blue-400",
    quote:
      "Finally, a service that delivers farm-fresh quality at reasonable prices. VEGIANO has become part of our weekly routine.",
  },
  {
    name: "Anita D.",
    location: "Howrah",
    initials: "AD",
    color: "bg-purple-400",
    quote:
      "Excellent quality and super fast delivery. The broccoli and carrots were so fresh, you could tell they were just harvested!",
  },
];

const DELIVERY_AREAS = [
  "Salt Lake",
  "New Town",
  "Rajarhat",
  "Howrah",
  "Dum Dum",
  "Park Street",
  "Gariahat",
  "Behala",
  "Tollygunge",
];

const WA_URL = "https://wa.me/918293692735";

// ── Hooks ────────────────────────────────────────────────────────────────────
function setupFadeIn() {
  const els = document.querySelectorAll(".fade-in-up, .fade-in");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add("visible");
      }
    },
    { threshold: 0.12 },
  );
  for (const el of els) io.observe(el);
  return io;
}

function useFadeIn() {
  useEffect(() => {
    const io = setupFadeIn();
    return () => io.disconnect();
  }, []);
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  isFloat,
  suffix,
  enabled,
}: {
  target: number;
  isFloat?: boolean;
  suffix?: string;
  enabled: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const duration = 1500;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = eased * target;
      setVal(isFloat ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [enabled, target, isFloat]);

  return (
    <span>
      {isFloat ? val.toFixed(1) : val}
      {suffix}
    </span>
  );
}

// ── Social Proof Section ─────────────────────────────────────────────────────
function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-[#1B5E20] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 fade-in-up">
          Trusted by 500+ Families in Kolkata
        </h2>
        <p className="text-green-200 text-sm mb-12 fade-in-up stagger-1">
          Fresh. Reliable. Loved by thousands.
        </p>
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center fade-in-up stagger-1">
            <div className="text-4xl sm:text-5xl font-bold text-green-300 mb-1">
              <AnimatedCounter target={1200} suffix="+" enabled={visible} />
            </div>
            <div className="text-green-100 text-sm font-medium">
              Orders Delivered
            </div>
          </div>
          <div className="text-center fade-in-up stagger-2">
            <div className="text-4xl sm:text-5xl font-bold text-green-300 mb-1">
              <AnimatedCounter target={500} suffix="+" enabled={visible} />
            </div>
            <div className="text-green-100 text-sm font-medium">
              Happy Families
            </div>
          </div>
          <div className="text-center fade-in-up stagger-3">
            <div className="text-4xl sm:text-5xl font-bold text-green-300 mb-1">
              <AnimatedCounter
                target={4.8}
                isFloat
                suffix=" ⭐"
                enabled={visible}
              />
            </div>
            <div className="text-green-100 text-sm font-medium">
              Average Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WhatsApp Popup ────────────────────────────────────────────────────────────
function WhatsAppPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("vegiano_popup_shown")) return;
    const t = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("vegiano_popup_shown", "1");
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="fixed bottom-24 right-4 z-50 w-72 bg-white rounded-2xl shadow-popup border-l-4 border-[#1B5E20] p-4"
          data-ocid="popup.card"
        >
          <button
            type="button"
            onClick={() => setShow(false)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close popup"
            data-ocid="popup.close_button"
          >
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🥬</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-snug">
                Get fresh vegetables today!
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Farm to doorstep in hours
              </p>
            </div>
          </div>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white rounded-xl py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            data-ocid="popup.primary_button"
          >
            <MessageCircle className="w-4 h-4" /> Order now on WhatsApp →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState<CartStep>(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Standalone order form state
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderItems, setOrderItems] = useState("");

  // Checkout state
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [upiCopied, setUpiCopied] = useState(false);

  useFadeIn();

  const prevCartOpen = useRef(cartOpen);
  useEffect(() => {
    if (prevCartOpen.current && !cartOpen) {
      setTimeout(() => setupFadeIn(), 300);
    }
    prevCartOpen.current = cartOpen;
  }, [cartOpen]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setOrderItems(
        cart
          .map((i) => `${i.name} x${i.qty} (${i.price}/${i.unit})`)
          .join(", "),
      );
    }
  }, [cart]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      return [...prev, { ...product, qty }];
    });
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const buildWhatsAppUrl = (message: string) =>
    `${WA_URL}?text=${encodeURIComponent(message)}`;

  const handleFormOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello VEGIANO! New Order Request:\nName: ${orderName}\nPhone: ${orderPhone}\nAddress: ${orderAddress}\nItems: ${orderItems || "(please specify)"}\nTotal: ₹${cartTotal > 0 ? cartTotal : "as discussed"}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  const handleSendOrderToWhatsApp = () => {
    const items = cart
      .map((i) => `${i.name} x${i.qty} (${i.price}/${i.unit})`)
      .join(", ");
    const msg = `Hello VEGIANO! New Order:\nName: ${checkoutName}\nPhone: ${checkoutPhone}\nAddress: ${checkoutAddress}\nItems: ${items}\nTotal: ₹${cartTotal}\nPayment: ${paymentMethod === "upi" ? "UPI Payment" : "Cash on Delivery"}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  const handleContinueShopping = () => {
    setCartOpen(false);
    setTimeout(() => {
      setCartStep(1);
      setCart([]);
      setCheckoutName("");
      setCheckoutPhone("");
      setCheckoutAddress("");
      setPaymentMethod("upi");
    }, 300);
  };

  const handleCartSheetChange = (open: boolean) => {
    setCartOpen(open);
    if (!open) setTimeout(() => setCartStep(1), 300);
  };

  const copyUPI = () => {
    navigator.clipboard.writeText("vegiano@upi");
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ── Cart Steps Renderer ──────────────────────────────────────────────────────
  const renderCartStep1 = () => (
    <>
      {cart.length === 0 ? (
        <div
          className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground"
          data-ocid="cart.empty_state"
        >
          <ShoppingCart className="w-12 h-12 opacity-30" />
          <p className="font-medium">Your cart is empty</p>
          <p className="text-sm text-center">
            Add some fresh vegetables to get started!
          </p>
          <Button
            type="button"
            onClick={() => {
              setCartOpen(false);
              scrollTo("products");
            }}
            className="bg-vegiano-green hover:bg-vegiano-green-dark text-white rounded-full px-6"
            data-ocid="cart.primary_button"
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {cart.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                data-ocid={`cart.item.${idx + 1}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.price}/{item.unit}
                  </p>
                  <p className="text-xs font-medium text-vegiano-green">
                    ₹{item.priceNum * item.qty}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center hover:bg-vegiano-green-light transition-colors"
                    data-ocid={`cart.secondary_button.${idx + 1}`}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center hover:bg-vegiano-green-light transition-colors"
                    data-ocid={`cart.primary_button.${idx + 1}`}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="ml-1 w-7 h-7 rounded-full bg-white border border-red-200 flex items-center justify-center hover:bg-red-50 transition-colors"
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span className="text-vegiano-green text-lg">₹{cartTotal}</span>
            </div>
            <Button
              type="button"
              onClick={() => setCartStep(2)}
              className="w-full bg-vegiano-green hover:bg-vegiano-green-dark text-white rounded-full h-12 text-base font-semibold flex items-center justify-center gap-2"
              data-ocid="cart.submit_button"
            >
              Proceed to Checkout <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}
    </>
  );

  const renderCartStep2 = () => (
    <>
      <button
        type="button"
        onClick={() => setCartStep(1)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-vegiano-green transition-colors mb-4"
        data-ocid="cart.secondary_button"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Cart
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCartStep(3);
        }}
        className="flex-1 flex flex-col gap-4"
      >
        <div className="space-y-3 flex-1 overflow-y-auto">
          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="checkout-name"
            >
              Full Name
            </label>
            <Input
              id="checkout-name"
              placeholder="Your name"
              value={checkoutName}
              onChange={(e) => setCheckoutName(e.target.value)}
              required
              className="rounded-xl"
              data-ocid="cart.input"
            />
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="checkout-phone"
            >
              Phone Number
            </label>
            <Input
              id="checkout-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={checkoutPhone}
              onChange={(e) => setCheckoutPhone(e.target.value)}
              required
              className="rounded-xl"
              data-ocid="cart.input"
            />
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="checkout-address"
            >
              Delivery Address
            </label>
            <Textarea
              id="checkout-address"
              placeholder="Your full address..."
              value={checkoutAddress}
              onChange={(e) => setCheckoutAddress(e.target.value)}
              required
              rows={3}
              className="rounded-xl resize-none"
              data-ocid="cart.textarea"
            />
          </div>

          {/* Order summary */}
          <div className="bg-vegiano-green-light rounded-xl p-3 space-y-1.5">
            <p className="text-xs font-semibold text-vegiano-green uppercase tracking-wide mb-2">
              Order Summary
            </p>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} x{item.qty}
                </span>
                <span className="font-medium">₹{item.priceNum * item.qty}</span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span className="text-vegiano-green">₹{cartTotal}</span>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-vegiano-green" /> Secure
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-vegiano-green" /> COD Available
            </span>
            <span className="flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-vegiano-green" /> Fresh
              Guarantee
            </span>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-vegiano-green hover:bg-vegiano-green-dark text-white rounded-full h-12 text-base font-semibold mt-2"
          data-ocid="cart.submit_button"
        >
          Choose Payment <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </form>
    </>
  );

  const renderCartStep3 = () => (
    <>
      <button
        type="button"
        onClick={() => setCartStep(2)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-vegiano-green transition-colors mb-4"
        data-ocid="cart.secondary_button"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <div className="flex-1 overflow-y-auto space-y-4">
        <p className="text-sm font-semibold text-gray-700">
          Choose Payment Method
        </p>

        {/* UPI Option */}
        <div
          onKeyDown={(e) => e.key === "Enter" && setPaymentMethod("upi")}
          onClick={() => setPaymentMethod("upi")}
          className={`rounded-2xl p-4 border-2 cursor-pointer transition-all duration-200 ${
            paymentMethod === "upi"
              ? "border-vegiano-green bg-vegiano-green-light"
              : "border-border bg-white hover:border-vegiano-green/40"
          }`}
          data-ocid="cart.radio"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                paymentMethod === "upi"
                  ? "border-vegiano-green"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "upi" && (
                <div className="w-2 h-2 rounded-full bg-vegiano-green" />
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">UPI Payment</p>
              <p className="text-xs text-gray-500">Pay via any UPI app</p>
            </div>
            <span className="ml-auto text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
              Recommended
            </span>
          </div>
          {paymentMethod === "upi" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-border">
                <span className="flex-1 font-mono text-sm text-gray-700">
                  vegiano@upi
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUPI();
                  }}
                  className="flex items-center gap-1 text-xs text-vegiano-green font-medium hover:underline"
                  data-ocid="cart.secondary_button"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {upiCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="flex justify-center">
                <div className="w-40 h-40 border-2 border-dashed border-vegiano-green rounded-2xl flex flex-col items-center justify-center bg-white gap-2">
                  <div className="grid grid-cols-5 gap-0.5 opacity-40">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative QR grid
                        key={i}
                        className={`w-3 h-3 rounded-sm ${
                          [
                            0, 1, 2, 5, 6, 8, 10, 14, 16, 18, 20, 22, 24,
                          ].includes(i)
                            ? "bg-vegiano-green-dark"
                            : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-vegiano-green font-semibold">
                    Scan QR to Pay
                  </p>
                </div>
              </div>
              <p className="text-center text-sm font-semibold text-gray-700">
                Amount: ₹{cartTotal}
              </p>
            </div>
          )}
        </div>

        {/* COD Option */}
        <div
          onKeyDown={(e) => e.key === "Enter" && setPaymentMethod("cod")}
          onClick={() => setPaymentMethod("cod")}
          className={`rounded-2xl p-4 border-2 cursor-pointer transition-all duration-200 ${
            paymentMethod === "cod"
              ? "border-vegiano-green bg-vegiano-green-light"
              : "border-border bg-white hover:border-vegiano-green/40"
          }`}
          data-ocid="cart.radio"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                paymentMethod === "cod"
                  ? "border-vegiano-green"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "cod" && (
                <div className="w-2 h-2 rounded-full bg-vegiano-green" />
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">Cash on Delivery</p>
              <p className="text-xs text-gray-500">
                Pay on Delivery — No payment needed now
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => setCartStep(4)}
        className="w-full bg-vegiano-green hover:bg-vegiano-green-dark text-white rounded-full h-12 text-base font-semibold mt-4 flex items-center justify-center gap-2"
        data-ocid="cart.confirm_button"
      >
        {paymentMethod === "upi"
          ? "✅ I Have Completed Payment"
          : "Place Order"}
      </Button>
    </>
  );

  const renderCartStep4 = () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center px-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <CheckCircle className="w-20 h-20 text-vegiano-green" />
      </motion.div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Order Placed Successfully!
        </h3>
        <p className="text-sm text-gray-500">
          Thank you for your order, {checkoutName}!
        </p>
      </div>

      <div className="w-full bg-vegiano-green-light rounded-2xl p-4 text-left space-y-2">
        <p className="text-xs font-semibold text-vegiano-green uppercase tracking-wide">
          Order Summary
        </p>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-700">
              {item.name} x{item.qty}
            </span>
            <span className="font-medium">₹{item.priceNum * item.qty}</span>
          </div>
        ))}
        <Separator className="my-1" />
        <div className="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span className="text-vegiano-green">₹{cartTotal}</span>
        </div>
        <div className="text-xs text-gray-500 pt-1">
          Payment:{" "}
          {paymentMethod === "upi" ? "UPI Payment" : "Cash on Delivery"}
        </div>
        <div className="text-xs text-gray-500">
          Deliver to: {checkoutAddress}
        </div>
      </div>

      <Button
        type="button"
        onClick={handleSendOrderToWhatsApp}
        className="w-full bg-vegiano-green hover:bg-vegiano-green-dark text-white rounded-full h-12 text-sm font-semibold flex items-center justify-center gap-2"
        data-ocid="cart.primary_button"
      >
        <MessageCircle className="w-5 h-5" /> 📲 Send Order to WhatsApp
      </Button>
      <button
        type="button"
        onClick={handleContinueShopping}
        className="text-sm text-gray-500 hover:text-vegiano-green transition-colors underline"
        data-ocid="cart.secondary_button"
      >
        Continue Shopping
      </button>
    </div>
  );

  const CART_STEP_TITLES: Record<CartStep, string> = {
    1: "Your Cart",
    2: "Checkout",
    3: "Payment",
    4: "Order Confirmed",
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen font-poppins overflow-x-hidden">
      {/* Sticky Header Wrapper */}
      <div className="sticky top-0 z-50">
        {/* Top Announcement Bar */}
        <div className="bg-[#1B5E20] text-white py-2 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs sm:text-sm font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis">
              🚚 Same Day Delivery &nbsp;|&nbsp; 🥬 Fresh from Farms
              &nbsp;|&nbsp; 📞 Order on WhatsApp:{" "}
              <a href="tel:+918293692735" className="underline font-semibold">
                +91 82936 92735
              </a>
            </p>
          </div>
        </div>

        {/* Navbar */}
        <header
          className={`bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2 text-[#1B5E20] font-bold text-xl shrink-0"
              data-ocid="nav.link"
            >
              <Leaf className="w-6 h-6 fill-current" />
              <span className="tracking-wide">VEGIANO</span>
            </button>

            <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(l.id)}
                    className="hover:text-vegiano-green transition-colors"
                    data-ocid={`nav.${l.id}.link`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-vegiano-green-light transition-colors"
                aria-label="Open cart"
                data-ocid="cart.open_modal_button"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-vegiano-green text-white text-xs rounded-full border-2 border-white">
                    {cartCount}
                  </Badge>
                )}
              </button>
              <button
                type="button"
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                data-ocid="nav.toggle"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </nav>

          {menuOpen && (
            <div className="md:hidden bg-white border-t border-border px-4 pb-4 pt-2 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollTo(l.id)}
                  className="text-left py-2 px-3 rounded-lg hover:bg-vegiano-green-light hover:text-vegiano-green text-sm font-medium transition-colors"
                  data-ocid={`nav.mobile.${l.id}.link`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </header>
      </div>

      {/* Cart Drawer */}
      <Sheet open={cartOpen} onOpenChange={handleCartSheetChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md flex flex-col"
          data-ocid="cart.sheet"
        >
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="flex items-center gap-2 text-vegiano-green">
              <ShoppingCart className="w-5 h-5" />
              {CART_STEP_TITLES[cartStep]}
              {cartStep > 1 && cartStep < 4 && (
                <span className="ml-auto text-xs text-muted-foreground font-normal">
                  Step {cartStep} of 3
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto flex flex-col pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={cartStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                {cartStep === 1 && renderCartStep1()}
                {cartStep === 2 && renderCartStep2()}
                {cartStep === 3 && renderCartStep3()}
                {cartStep === 4 && renderCartStep4()}
              </motion.div>
            </AnimatePresence>
          </div>
        </SheetContent>
      </Sheet>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative min-h-[90vh] flex items-center overflow-hidden"
        >
          <img
            src="/assets/generated/hero-farm.dim_1600x900.jpg"
            alt="Fresh farm field"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-vegiano-green/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 fade-in-up">
                <Leaf className="w-4 h-4" /> 100% Organic &amp; Fresh
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 fade-in-up stagger-1">
                Fresh from Farm to
                <br />
                <span className="text-green-300">Your Doorstep</span>
              </h1>
              <p className="text-white/85 text-lg sm:text-xl mb-8 leading-relaxed fade-in-up stagger-2">
                100% fresh vegetables directly from local farms.
                <br className="hidden sm:block" />
                No middleman, no chemicals — just pure goodness.
              </p>
              <div className="flex flex-wrap gap-4 mb-6 fade-in-up stagger-3">
                <Button
                  type="button"
                  onClick={() => window.open(WA_URL, "_blank")}
                  className="bg-vegiano-green hover:bg-vegiano-green-dark text-white rounded-full px-8 py-3 h-auto text-base font-semibold shadow-lg flex items-center gap-2"
                  data-ocid="hero.primary_button"
                >
                  <MessageCircle className="w-5 h-5" /> Order Now on WhatsApp
                </Button>
                <Button
                  type="button"
                  onClick={() => scrollTo("products")}
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-vegiano-green rounded-full px-8 py-3 h-auto text-base font-semibold"
                  data-ocid="hero.secondary_button"
                >
                  View Products
                </Button>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 fade-in-up stagger-4">
                {["✔ 50+ Farmers", "✔ 100% Fresh", "✔ No Middleman"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30"
                    >
                      {badge}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-vegiano-green-light text-vegiano-green px-3 py-1 rounded-full text-sm font-semibold mb-4 fade-in-up">
                  Our Story
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 fade-in-up stagger-1">
                  Farm-Fresh Goodness,
                  <br />
                  <span className="text-vegiano-green">Delivered Daily</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p className="fade-in-up stagger-2">
                    VEGIANO was born from a simple belief: everyone deserves
                    access to truly fresh, healthy vegetables without paying
                    inflated prices. We partner directly with over 50 dedicated
                    farmers in and around Kolkata — from Rajarhat to Howrah —
                    eliminating the middleman entirely.
                  </p>
                  <p className="fade-in-up stagger-3">
                    Every vegetable you order is harvested within 24 hours of
                    delivery. No cold storage for weeks, no chemical
                    preservatives, no compromise — just the freshest produce
                    nature can offer, straight to your kitchen.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {(
                  [
                    { value: "50+", label: "Partner Farmers", icon: "👨‍🌾" },
                    { value: "100%", label: "Organic Quality", icon: "🌿" },
                    { value: "24hr", label: "Same Day Delivery", icon: "🚚" },
                  ] as const
                ).map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`bg-vegiano-green-light rounded-2xl p-6 text-center fade-in-up stagger-${i + 1}`}
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-vegiano-green">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block bg-vegiano-green-light text-vegiano-green px-3 py-1 rounded-full text-sm font-semibold mb-3 fade-in-up">
                Fresh Picks
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide fade-in-up stagger-1">
                Our Fresh Vegetables
              </h2>
              <p className="text-muted-foreground mt-3 fade-in-up stagger-2">
                Harvested fresh every morning, delivered to your door.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {PRODUCTS.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  onAdd={addToCart}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block bg-vegiano-green-light text-vegiano-green px-3 py-1 rounded-full text-sm font-semibold mb-3 fade-in-up">
                Our Promise
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide fade-in-up stagger-1">
                Why Choose VEGIANO?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {WHY_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`text-center p-8 rounded-2xl border border-border hover:shadow-card-hover hover:border-vegiano-green/30 transition-all duration-300 group fade-in-up stagger-${i + 1}`}
                  >
                    <div className="w-16 h-16 bg-vegiano-green-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-vegiano-green transition-colors duration-300">
                      <Icon className="w-8 h-8 text-vegiano-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Order Section */}
        <section id="order" className="py-20 bg-vegiano-green">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 fade-in-up">
                <Zap className="w-4 h-4" /> Takes less than 30 seconds to order
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide fade-in-up stagger-1">
                Place Your Order
              </h2>
              <p className="text-green-100 mt-3 fade-in-up stagger-2">
                Fill in the form below and we&apos;ll connect via WhatsApp
                instantly.
              </p>
            </div>
            <form
              onSubmit={handleFormOrder}
              className="bg-white rounded-3xl p-8 shadow-2xl space-y-5 fade-in-up stagger-2"
              data-ocid="order.panel"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="order-name"
                  >
                    Full Name
                  </label>
                  <Input
                    id="order-name"
                    placeholder="Your name"
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    required
                    className="rounded-xl border-border focus-visible:ring-vegiano-green"
                    data-ocid="order.input"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="order-phone"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="order-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={orderPhone}
                    onChange={(e) => setOrderPhone(e.target.value)}
                    required
                    className="rounded-xl border-border focus-visible:ring-vegiano-green"
                    data-ocid="order.input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-gray-700"
                  htmlFor="order-address"
                >
                  Delivery Address
                </label>
                <Textarea
                  id="order-address"
                  placeholder="Your full address..."
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                  required
                  rows={3}
                  className="rounded-xl border-border focus-visible:ring-vegiano-green resize-none"
                  data-ocid="order.textarea"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-gray-700"
                  htmlFor="order-items"
                >
                  Items to Order
                  {cart.length > 0 && (
                    <span className="ml-2 text-xs text-vegiano-green font-normal">
                      (pre-filled from cart)
                    </span>
                  )}
                </label>
                <Textarea
                  id="order-items"
                  placeholder="e.g. Tomato 2kg, Spinach 1 bunch, Potato 1kg..."
                  value={orderItems}
                  onChange={(e) => setOrderItems(e.target.value)}
                  rows={2}
                  className="rounded-xl border-border focus-visible:ring-vegiano-green resize-none"
                  data-ocid="order.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-vegiano-green hover:bg-vegiano-green-dark text-white rounded-full h-12 text-base font-semibold flex items-center justify-center gap-2"
                data-ocid="order.submit_button"
              >
                <MessageCircle className="w-5 h-5" /> 🚀 Place Order Instantly
                on WhatsApp
              </Button>
            </form>
          </div>
        </section>

        {/* Delivery Info */}
        <section id="delivery" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-vegiano-green-light text-vegiano-green px-3 py-1 rounded-full text-sm font-semibold mb-3 fade-in-up">
                Delivery
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide fade-in-up stagger-1">
                Delivery Information
              </h2>
            </div>

            {/* Urgency banner */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 mb-8 flex items-center gap-3 fade-in-up stagger-2">
              <span className="text-2xl">🕐</span>
              <p className="font-semibold text-amber-800">
                Order before 12 PM → Same Day Delivery guaranteed!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-vegiano-green-light rounded-2xl p-8 fade-in-up stagger-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-vegiano-green rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">
                    Areas We Serve
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {DELIVERY_AREAS.map((area) => (
                    <span
                      key={area}
                      className="bg-white text-vegiano-green text-sm font-medium px-3 py-1 rounded-full border border-vegiano-green/20"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  More areas coming soon.{" "}
                  <a
                    href="tel:+918293692735"
                    className="text-vegiano-green font-semibold"
                  >
                    Call us
                  </a>{" "}
                  to check availability.
                </p>
              </div>
              <div className="bg-vegiano-green-light rounded-2xl p-8 fade-in-up stagger-2">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-vegiano-green rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">
                    Delivery Timing
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 flex items-start gap-3">
                    <span className="text-2xl">🌅</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Same Day Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Place your order before <strong>12:00 PM</strong> and
                        receive it the same day.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex items-start gap-3">
                    <span className="text-2xl">🌄</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Next Morning Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Orders placed after 12:00 PM will be delivered the next
                        morning by 9 AM.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-orange-600 font-medium flex items-center gap-1.5">
                  <span>⚠️</span> Limited delivery slots available each day —
                  Order early!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <SocialProofSection />

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block bg-vegiano-green-light text-vegiano-green px-3 py-1 rounded-full text-sm font-semibold mb-3 fade-in-up">
                Happy Customers
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide fade-in-up stagger-1">
                What Our Customers Say
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 fade-in-up stagger-${i + 1}`}
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-yellow-400 gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative stars
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs bg-green-50 text-vegiano-green font-semibold px-2 py-0.5 rounded-full border border-vegiano-green/20">
                      ✓ Verified Purchase
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.location}, Kolkata
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block bg-vegiano-green-light text-vegiano-green px-3 py-1 rounded-full text-sm font-semibold mb-3 fade-in-up">
                Get in Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide fade-in-up stagger-1">
                Contact Us
              </h2>
            </div>

            {/* Featured WhatsApp Card */}
            <div
              className="bg-[#1B5E20] rounded-3xl p-8 mb-6 fade-in-up stagger-2"
              data-ocid="contact.item.1"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-10 h-10 text-white fill-white" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="text-xs font-semibold text-green-300 uppercase tracking-wider mb-1">
                    WhatsApp
                  </p>
                  <p className="text-2xl font-bold text-white mb-1">
                    +91 82936 92735
                  </p>
                  <p className="text-green-200 text-sm">
                    Instant Reply within minutes
                  </p>
                </div>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-white text-[#1B5E20] hover:bg-green-50 font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 transition-colors text-sm"
                  data-ocid="contact.primary_button"
                >
                  <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat →
                </a>
              </div>
            </div>

            {/* Other contact cards */}
            <div className="grid sm:grid-cols-3 gap-5">
              {(
                [
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 82936 92735",
                    href: "tel:+918293692735",
                    bg: "bg-blue-50",
                    iconColor: "text-blue-600",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Kolkata, West Bengal",
                    href: "#",
                    bg: "bg-orange-50",
                    iconColor: "text-orange-500",
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Mon–Sat, 7AM–8PM",
                    href: "#",
                    bg: "bg-purple-50",
                    iconColor: "text-purple-600",
                  },
                ] as const
              ).map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`${item.bg} rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 fade-in-up stagger-${i + 2}`}
                    data-ocid={`contact.item.${i + 2}`}
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-xs">
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.value}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-vegiano-beige border-t border-vegiano-beige-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 text-vegiano-green font-bold text-xl mb-2">
                <Leaf className="w-6 h-6 fill-current" />
                <span>VEGIANO</span>
              </div>
              <p className="text-xs text-vegiano-green font-semibold mb-3">
                Direct from Farmers | No Storage | No Chemicals
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Farm-fresh vegetables delivered to your doorstep. Pure, organic,
                and affordable.
              </p>
              <div className="flex gap-3 mt-5">
                {(
                  [
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                  ] as const
                ).map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-vegiano-green hover:text-white text-gray-500 transition-colors duration-300 shadow-xs"
                    data-ocid="footer.link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(l.id)}
                      className="text-sm text-gray-600 hover:text-vegiano-green transition-colors"
                      data-ocid="footer.link"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                Our Vegetables
              </h4>
              <ul className="space-y-2">
                {PRODUCTS.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo("products")}
                      className="text-sm text-gray-600 hover:text-vegiano-green transition-colors"
                      data-ocid="footer.link"
                    >
                      {p.name} — {p.price}/{p.unit}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 shrink-0 mt-0.5 text-vegiano-green" />{" "}
                  +91 82936 92735
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 shrink-0 mt-0.5 text-vegiano-green" />{" "}
                  WhatsApp: +91 82936 92735
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-vegiano-green" />{" "}
                  Kolkata, West Bengal
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-vegiano-green" />{" "}
                  Mon–Sat, 7 AM – 8 PM
                </li>
              </ul>
            </div>
          </div>

          {/* Mini CTA */}
          <div className="bg-vegiano-green-light rounded-2xl p-6 text-center mb-8">
            <p className="font-semibold text-gray-800 mb-3">
              Order Fresh Vegetables Now 🥬
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-vegiano-green hover:bg-vegiano-green-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
              data-ocid="footer.primary_button"
            >
              <MessageCircle className="w-4 h-4" /> Order on WhatsApp →
            </a>
          </div>

          <Separator className="bg-vegiano-beige-dark mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} VEGIANO. All rights reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vegiano-green hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 w-14 h-14 bg-vegiano-green rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 whatsapp-pulse"
        aria-label="Chat on WhatsApp"
        data-ocid="nav.link"
      >
        <MessageCircle className="w-7 h-7 text-white fill-current" />
      </a>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-3">
        <button
          type="button"
          onClick={() => scrollTo("order")}
          className="w-full bg-[#1B5E20] hover:bg-vegiano-green text-white rounded-full h-12 flex items-center justify-center gap-2 font-semibold text-sm transition-colors"
          data-ocid="mobile.primary_button"
        >
          <MessageCircle className="w-5 h-5" /> 🚀 Order on WhatsApp
        </button>
      </div>

      {/* WhatsApp Popup */}
      <WhatsAppPopup />
    </div>
  );
}

// ── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: (p: Product, qty: number) => void;
}) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    onAdd(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const decreaseQty = () => setQty((q) => Math.max(1, q - 1));
  const increaseQty = () => setQty((q) => q + 1);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border border-border hover:shadow-card-hover hover:border-vegiano-green/20 transition-all duration-300 group fade-in-up stagger-${Math.min(index + 1, 6)}`}
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          style={{ transformOrigin: "center" }}
        />

        {/* Tag ribbon top-left */}
        {product.tag && (
          <div className="absolute top-0 left-0">
            <div
              className={`badge-ribbon px-2.5 py-1.5 text-xs font-bold text-white rounded-br-xl ${
                product.tag === "bestseller" ? "bg-amber-500" : "bg-red-500"
              }`}
            >
              {product.tag === "bestseller" ? "🏆 Best Seller" : "🔥 Popular"}
            </div>
          </div>
        )}

        {/* Fresh tag top-right */}
        <div className="absolute top-2.5 right-2.5">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              product.freshTag === "limited"
                ? "bg-orange-500 text-white"
                : "bg-vegiano-green text-white"
            }`}
          >
            {product.freshTag === "limited" ? "⚠ Limited Stock" : "Fresh Today"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-0.5">
          {product.name}
        </h3>
        <p className="text-vegiano-green font-bold text-lg mb-3">
          {product.price}
          <span className="text-sm font-normal text-muted-foreground">
            /{product.unit}
          </span>
        </p>

        {/* Quantity selector */}
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={decreaseQty}
            className="w-8 h-8 rounded-full bg-vegiano-green-light border border-vegiano-green/20 flex items-center justify-center hover:bg-vegiano-green hover:text-white transition-colors"
            data-ocid={`products.secondary_button.${index + 1}`}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center font-semibold text-sm">{qty}</span>
          <button
            type="button"
            onClick={increaseQty}
            className="w-8 h-8 rounded-full bg-vegiano-green-light border border-vegiano-green/20 flex items-center justify-center hover:bg-vegiano-green hover:text-white transition-colors"
            data-ocid={`products.primary_button.${index + 1}`}
          >
            <Plus className="w-3 h-3" />
          </button>
          <span className="text-xs text-muted-foreground ml-1">
            {product.unit}
            {qty > 1 ? "s" : ""}
          </span>
        </div>

        <Button
          type="button"
          onClick={handleAdd}
          className={`w-full rounded-full h-9 text-sm font-semibold transition-all duration-300 ${
            added
              ? "bg-vegiano-green-light text-vegiano-green border border-vegiano-green"
              : "bg-vegiano-green hover:bg-vegiano-green-dark text-white"
          }`}
          data-ocid={`products.submit_button.${index + 1}`}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
