import React, { useState, useEffect } from "react";

const PRODUCTS = [
  {
    id: "ebook-1",
    type: "digital",
    title_en: "Healthy Eating - Beginner's Guide",
    title_ar: "الدليل المبتدئ للأكل الصحي",
    price: 9.99,
    description_en: "A short ebook about balanced diet and healthy cooking.",
    description_ar: "كتاب إلكتروني قصير عن النظام الغذائي المتوازن والطهي الصحي.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "ebook-2",
    type: "digital",
    title_en: "Mindfulness for Busy People",
    title_ar: "اليقظة الذهنية للمشغولين",
    price: 7.5,
    description_en: "Short practices to reduce stress and improve focus.",
    description_ar: "ممارسات قصيرة لتقليل التوتر وتحسين التركيز.",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "prod-1",
    type: "physical",
    title_en: "Reusable Water Bottle (750ml)",
    title_ar: "قارورة ماء قابلة لإعادة الاستخدام (750 مل)",
    price: 14.99,
    description_en: "Stainless-steel insulated bottle.",
    description_ar: "قارورة معزولة من الفولاذ المقاوم للصدأ.",
    image: "https://images.unsplash.com/photo-1526403224741-8c6f7a5f59d6?auto=format&fit=crop&w=800&q=60",
    shipping: 3.5,
  },
  {
    id: "prod-2",
    type: "physical",
    title_en: "Herbal Tea Pack (20 bags)",
    title_ar: "عبوة شاي أعشاب (20 كيس)",
    price: 6.99,
    description_en: "Calming herbal blend.",
    description_ar: "خليط أعشاب مهدئ.",
    image: "https://images.unsplash.com/photo-1514361892638-1a1c5a0b0b1b?auto=format&fit=crop&w=800&q=60",
    shipping: 2.0,
  },
];

export default function App() {
  const [lang, setLang] = useState("ar"); // default Arabic RTL
  const [cart, setCart] = useState([]);
  const [currency] = useState("MAD");
  const [showCart, setShowCart] = useState(false);
  const [checkoutMethod, setCheckoutMethod] = useState("bank"); // 'bank' or 'cod'
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(null);

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function t(en, ar) {
    return lang === "ar" ? ar : en;
  }

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...product, qty: 1 }];
    });
    setShowCart(true);
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQty(id, qty) {
    if (qty < 1) return;
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  }

  function subtotal() {
    return cart.reduce((s, p) => s + p.price * p.qty + (p.type === "physical" ? (p.shipping || 0) * p.qty : 0), 0);
  }

  function placeOrder() {
    const order = {
      id: "ORD" + Math.floor(Math.random() * 1000000),
      items: cart,
      total: subtotal(),
      method: checkoutMethod,
      customer: customerInfo,
      date: new Date().toISOString(),
    };
    setOrderPlaced(order);
    setCart([]);
    setShowCart(false);
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">SS</div>
            <div>
              <h1 className="text-lg font-bold">SRIFI SHOP</h1>
              <p className="text-xs text-gray-500">{t("Healthy & Simple Store", "متجر صحي وبسيط")}</p>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <button
              onClick={() => setLang((l) => (l === "ar" ? "en" : "ar"))}
              className="px-3 py-1 border rounded-md text-sm"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>

            <button
              onClick={() => setShowCart((s) => !s)}
              className="px-3 py-1 bg-purple-600 text-white rounded-md flex items-center gap-2"
            >
              🛒 {t("Cart", "السلة")} ({cart.reduce((a, b) => a + b.qty, 0)})
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="grid md:grid-cols-2 gap-6 items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold mb-3">{t("Welcome to SRIFI SHOP", "مرحبا بكم في SRIFI SHOP")}</h2>
            <p className="text-gray-600 mb-4">{t("Quality products, simple checkout.", "منتجات عالية الجودة وبدلات دفع بسيطة.")}</p>

            <div className="flex gap-3">
              <a href="#shop" className="px-4 py-2 bg-purple-600 text-white rounded-md">{t("Shop Now", "تسوق الآن")}</a>
              <a href="#about" className="px-4 py-2 border rounded-md">{t("Learn More", "اكتشف المزيد")}</a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-2">{t("Featured eBook", "كتاب إلكتروني مميز")}</h3>
            <div className="flex gap-4 items-center">
              <img src={PRODUCTS[0].image} alt="ebook" className="w-28 h-20 object-cover rounded-md" />
              <div>
                <div className="font-medium">{t(PRODUCTS[0].title_en, PRODUCTS[0].title_ar)}</div>
                <div className="text-sm text-gray-500">{t(PRODUCTS[0].description_en, PRODUCTS[0].description_ar)}</div>
                <div className="mt-2 font-semibold">{PRODUCTS[0].price} {currency}</div>
              </div>
              <div className="ml-auto">
                <button onClick={() => addToCart(PRODUCTS[0])} className="px-3 py-1 bg-green-600 text-white rounded-md text-sm">{t("Buy", "اشترِ")}</button>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{t("Our Products", "منتجاتنا")}</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                <img src={p.image} alt={p.title_en} className="w-full h-40 object-cover" />
                <div className="p-3 flex-1 flex flex-col">
                  <h4 className="font-semibold">{t(p.title_en, p.title_ar)}</h4>
                  <p className="text-sm text-gray-500 flex-1">{t(p.description_en, p.description_ar)}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-bold">{p.price} {currency}</div>
                    <div className="flex gap-2">
                      <button onClick={() => addToCart(p)} className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm">{t("Add", "أضف")}</button>
                      <button onClick={() => { navigator.clipboard?.writeText(window.location.href + '#product-' + p.id); alert(t('Link copied', 'تم نسخ الرابط')); }} className="px-3 py-1 border rounded-md text-sm">{t("Share", "مشاركة")}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-2xl font-bold mb-2">{t("About SRIFI SHOP", "عن SRIFI SHOP")}</h3>
          <p className="text-gray-600 mb-3">{t("A small store selling helpful eBooks and healthy products.", "متجر صغير يبيع كتب إلكترونية ومنتجات صحية.")}</p>

          <h4 className="font-semibold mb-1">{t("Contact Us", "تواصل معنا")}</h4>
          <p className="text-sm text-gray-500">{t("Email", "البريد الإلكتروني")}: contact@srifi.shop</p>
          <p className="text-sm text-gray-500">{t("Phone", "الهاتف")}: +212 6X XXX XXXX</p>
        </section>

        <footer className="mt-8 text-center text-gray-500 text-sm">© SRIFI SHOP</footer>
      </main>

      {showCart && (
        <div className={`fixed ${lang === 'ar' ? 'left-0' : 'right-0'} top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 overflow-auto`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h4 className="font-bold">{t('Your Cart', 'سلة مشترياتك')}</h4>
            <button onClick={() => setShowCart(false)} className="px-2 py-1">✖</button>
          </div>

          <div className="p-4">
            {cart.length === 0 ? (
              <div className="text-gray-500">{t('Cart is empty', 'السلة فارغة')}</div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.title_en} className="w-16 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{t(item.title_en, item.title_ar)}</div>
                      <div className="text-sm text-gray-500">{item.price} {currency} x {item.qty}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <button className="px-2 py-1 border rounded" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                        <div className="px-2">{item.qty}</div>
                        <button className="px-3 py-1 border rounded" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                        <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 text-red-600">{t('Remove','حذف')}</button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">{t('Subtotal', 'المجموع المرحلي')}</div>
                    <div className="font-bold">{subtotal().toFixed(2)} {currency}</div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="method" checked={checkoutMethod === 'bank'} onChange={() => setCheckoutMethod('bank')} />
                      <span>{t('Bank Transfer', 'تحويل بنكي')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="method" checked={checkoutMethod === 'cod'} onChange={() => setCheckoutMethod('cod')} />
                      <span>{t('Cash on Delivery (COD)', 'الدفع عند الاستلام')}</span>
                    </label>

                    <div className="mt-2">
                      <input value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} placeholder={t('Full name', 'الاسم الكامل')} className="w-full px-3 py-2 border rounded mb-2" />
                      <input value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} placeholder={t('Phone', 'الهاتف')} className="w-full px-3 py-2 border rounded mb-2" />
                      {checkoutMethod === 'cod' && (
                        <textarea value={customerInfo.address} onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })} placeholder={t('Delivery address', 'عنوان التوصيل')} className="w-full px-3 py-2 border rounded mb-2" />
                      )}

                      <div className="flex gap-2">
                        {checkoutMethod === 'bank' ? (
                          <div className="p-3 bg-gray-100 rounded"> 
                            <div className="font-semibold mb-1">{t('Bank Details', 'تفاصيل الحساب البنكي')}</div>
                            <div className="text-sm">{t('Bank: ABC Bank', 'البنك: ABC Bank')}</div>
                            <div className="text-sm">{t('IBAN: XX00 0000 0000 0000', 'IBAN: XX00 0000 0000 0000')}</div>
                            <div className="text-sm">{t('Name: SRIFI SHOP', 'الاسم: SRIFI SHOP')}</div>
                          </div>
                        ) : (
                          <div className="p-3 bg-gray-100 rounded">{t('You will pay in cash when the courier delivers your order.', 'ستدفع نقدًا عند توصيل الطلب.')}</div>
                        )}
                      </div>

                      <button onClick={placeOrder} className="mt-3 w-full px-3 py-2 bg-green-600 text-white rounded-md">{t('Place Order', 'أرسل الطلب')}</button>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {orderPlaced && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-semibold">{t('Order placed!', 'تم إرسال الطلب!')}</div>
                <div className="text-sm text-gray-600">{t('Order ID', 'رقم الطلب')}: {orderPlaced.id}</div>
                <div className="text-sm text-gray-600">{t('Total', 'الإجمالي')}: {orderPlaced.total.toFixed(2)} {currency}</div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
