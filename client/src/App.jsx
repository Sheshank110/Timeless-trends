import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import LoadingScreen from './components/ui/LoadingScreen';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const ShopPage = lazy(() => import('./pages/Shop/ShopPage'));
const ProductDetailsPage = lazy(() => import('./pages/Product/ProductDetailsPage'));
const CategoryPage = lazy(() => import('./pages/Category/CategoryPage'));
const SearchResultsPage = lazy(() => import('./pages/Search/SearchResultsPage'));
const CartPage = lazy(() => import('./pages/Cart/CartPage'));
const WishlistPage = lazy(() => import('./pages/Wishlist/WishlistPage'));
const CheckoutPage = lazy(() => import('./pages/Checkout/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/Order/OrderSuccessPage'));
const OrderTrackingPage = lazy(() => import('./pages/Order/OrderTrackingPage'));
const AboutPage = lazy(() => import('./pages/Static/AboutPage'));
const ContactPage = lazy(() => import('./pages/Static/ContactPage'));
const FAQPage = lazy(() => import('./pages/Static/FAQPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/Static/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/Static/TermsPage'));
const ShippingPolicyPage = lazy(() => import('./pages/Static/ShippingPolicyPage'));
const ReturnPolicyPage = lazy(() => import('./pages/Static/ReturnPolicyPage'));
const AIAssistantPage = lazy(() => import('./pages/AI/AIAssistantPage'));
const CustomizerPage = lazy(() => import('./pages/Customizer/CustomizerPage'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));

// Auth pages
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/Auth/ResetPasswordPage'));
const EmailVerificationPage = lazy(() => import('./pages/Auth/EmailVerificationPage'));

// Account pages
const AccountPage = lazy(() => import('./pages/Account/AccountPage'));
const MyOrdersPage = lazy(() => import('./pages/Account/MyOrdersPage'));
const OrderDetailPage = lazy(() => import('./pages/Account/OrderDetailPage'));
const AddressesPage = lazy(() => import('./pages/Account/AddressesPage'));
const ProfileSettingsPage = lazy(() => import('./pages/Account/ProfileSettingsPage'));

// Admin pages
const AdminLoginPage = lazy(() => import('./pages/Admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/Admin/AdminProducts'));
const AdminAddProduct = lazy(() => import('./pages/Admin/AdminAddProduct'));
const AdminEditProduct = lazy(() => import('./pages/Admin/AdminEditProduct'));
const AdminCategories = lazy(() => import('./pages/Admin/AdminCategories'));
const AdminOrders = lazy(() => import('./pages/Admin/AdminOrders'));
const AdminUsers = lazy(() => import('./pages/Admin/AdminUsers'));
const AdminInventory = lazy(() => import('./pages/Admin/AdminInventory'));
const AdminCoupons = lazy(() => import('./pages/Admin/AdminCoupons'));
const AdminReviews = lazy(() => import('./pages/Admin/AdminReviews'));
const AdminSalesAnalytics = lazy(() => import('./pages/Admin/AdminSalesAnalytics'));
const AdminCustomerAnalytics = lazy(() => import('./pages/Admin/AdminCustomerAnalytics'));
const AdminSettings = lazy(() => import('./pages/Admin/AdminSettings'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Homepage — with Footer */}
          <Route element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* Public Pages — no Footer */}
          <Route element={<MainLayout />}>
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/:gender" element={<CategoryPage />} />
            <Route path="shop/:gender/:category" element={<CategoryPage />} />
            <Route path="product/:slug" element={<ProductDetailsPage />} />
            <Route path="new-arrivals" element={<ShopPage filter="new-arrivals" />} />
            <Route path="trending" element={<ShopPage filter="trending" />} />
            <Route path="men" element={<CategoryPage gender="men" />} />
            <Route path="women" element={<CategoryPage gender="women" />} />
            <Route path="teen" element={<Navigate to="/shop" replace />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
            <Route path="order-tracking/:orderId" element={<OrderTrackingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="return-policy" element={<ReturnPolicyPage />} />
            <Route path="ai-stylist" element={<AIAssistantPage />} />
            <Route path="customize" element={<CustomizerPage />} />

            {/* Account */}
            <Route path="account" element={<AccountPage />} />
            <Route path="account/orders" element={<MyOrdersPage />} />
            <Route path="account/orders/:orderId" element={<OrderDetailPage />} />
            <Route path="account/addresses" element={<AddressesPage />} />
            <Route path="account/settings" element={<ProfileSettingsPage />} />
          </Route>

          {/* Auth Pages */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="verify-email/:token" element={<EmailVerificationPage />} />
          </Route>

          {/* Admin */}
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AdminAddProduct />} />
            <Route path="products/edit/:id" element={<AdminEditProduct />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="analytics/sales" element={<AdminSalesAnalytics />} />
            <Route path="analytics/customers" element={<AdminCustomerAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
