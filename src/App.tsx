import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { PomodoroTimer } from './components/PomodoroTimer';

import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { CoursesView } from './views/CoursesView';
import { PlacementPrepView } from './views/PlacementPrepView';
import { CodingPracticeView } from './views/CodingPracticeView';
import { AIMentorView } from './views/AIMentorView';
import { MockTestsView } from './views/MockTestsView';
import { ResumeView } from './views/ResumeView';
import { ProfileView } from './views/ProfileView';
import { LearningPathView } from './views/LearningPathView';
import { StoreView } from './views/StoreView';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';

import { ViewMode, UserProfile, Course, TestResult, CartItem, StoreProduct, StoreOrder } from './types';
import { initialUser, coursesData, codingProblemsData, mockTestsData } from './data/mockData';
import { STORE_PRODUCTS } from './data/storeData';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [completedResults, setCompletedResults] = useState<TestResult[]>([]);
  const [aiPromptForMentor, setAiPromptForMentor] = useState<string>('');
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot' | null>(null);

  // Store & Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('skillsphere_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default starter item for instant interactivity
    return [
      {
        product: STORE_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Space Gray',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscounts, setCheckoutDiscounts] = useState({
    couponCode: 'STUDENT20',
    couponDiscount: 300,
    xpCoinsUsed: 0,
    xpDiscount: 0,
  });
  const [userOrders, setUserOrders] = useState<StoreOrder[]>([]);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('skillsphere_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const handleAddToCart = (
    product: StoreProduct,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });
  };

  const handleUpdateCartQuantity = (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, color, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (
    productId: string,
    color?: string,
    size?: string
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const handleProceedToCheckout = (discounts: {
    couponCode: string;
    couponDiscount: number;
    xpCoinsUsed: number;
    xpDiscount: number;
  }) => {
    setCheckoutDiscounts(discounts);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBuyNow = (
    product: StoreProduct,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    handleAddToCart(product, quantity, color, size);
    setCheckoutDiscounts({
      couponCode: 'STUDENT20',
      couponDiscount: Math.round(product.price * 0.2 * quantity),
      xpCoinsUsed: 0,
      xpDiscount: 0,
    });
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (order: StoreOrder) => {
    setUserOrders((prev) => [order, ...prev]);
    // Clear cart after successful checkout
    setCartItems([]);
    // Deduct redeemed XP coins if any, and award 50 XP bonus for purchase!
    setUser((prev) => ({
      ...prev,
      xpPoints: Math.max(0, prev.xpPoints - checkoutDiscounts.xpCoinsUsed) + 50,
    }));
  };

  // Theme Mode State (Default dark for modern premium feel, toggleable to light)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleEnrollCourse = (courseId: string) => {
    if (!user.enrolledCourseIds.includes(courseId)) {
      setUser((prev) => ({
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
      }));
    }
  };

  const handleOpenAiWithPrompt = (promptText: string) => {
    setAiPromptForMentor(promptText);
    setCurrentView('ai-mentor');
  };

  const handleSaveResult = (res: TestResult) => {
    setCompletedResults((prev) => [res, ...prev]);
    // Award XP
    setUser((prev) => ({
      ...prev,
      xpPoints: prev.xpPoints + 150,
    }));
  };

  const handleAwardXp = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      xpPoints: prev.xpPoints + amount,
    }));
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUser((prev) => ({ ...prev, email, name: email.split('@')[0] }));
    setAuthModalMode(null);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view !== 'courses') setSelectedCourse(null);
          setCurrentView(view);
        }}
        isLoggedIn={isLoggedIn}
        user={user}
        onOpenAuth={(mode) => setAuthModalMode(mode)}
        onLogout={handleLogout}
        theme={isDarkMode ? 'dark' : 'light'}
        onToggleTheme={handleToggleTheme}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main View Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <LandingPage
            onNavigate={(view) => setCurrentView(view)}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setCurrentView('courses');
            }}
            onOpenAuth={(mode) => setAuthModalMode(mode)}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            user={user}
            onNavigate={(view) => setCurrentView(view)}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setCurrentView('courses');
            }}
          />
        )}

        {currentView === 'pathways' && (
          <LearningPathView
            user={user}
            onNavigate={(view) => setCurrentView(view)}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
            }}
            onUpdateUserGoal={(role, company) => {
              setUser((prev) => ({ ...prev, targetRole: role, targetCompany: company }));
            }}
            onOpenAiMentorWithPrompt={(prompt) => {
              setAiPromptForMentor(prompt);
              setCurrentView('ai-mentor');
            }}
            courses={coursesData}
            codingProblems={codingProblemsData}
            mockTests={mockTestsData}
          />
        )}

        {currentView === 'courses' && (
          <CoursesView
            selectedCourse={selectedCourse}
            onSelectCourse={setSelectedCourse}
            enrolledCourseIds={user.enrolledCourseIds}
            onEnroll={handleEnrollCourse}
          />
        )}

        {currentView === 'placement' && (
          <PlacementPrepView
            onNavigate={(view) => setCurrentView(view)}
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
          />
        )}

        {currentView === 'coding' && (
          <CodingPracticeView
            onOpenAiWithPrompt={handleOpenAiWithPrompt}
          />
        )}

        {currentView === 'ai-mentor' && (
          <AIMentorView
            user={user}
            initialPrompt={aiPromptForMentor}
          />
        )}

        {currentView === 'tests' && (
          <MockTestsView
            completedResults={completedResults}
            onSaveResult={handleSaveResult}
          />
        )}

        {currentView === 'resume' && (
          <ResumeView
            user={user}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            user={user}
            onUpdateUser={handleUpdateUser}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {currentView === 'store' && (
          <StoreView
            user={user}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            onBuyNow={handleBuyNow}
          />
        )}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={(view) => setCurrentView(view)} />

      {/* Campus Gear Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        user={user}
      />

      {/* Campus Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        user={user}
        discounts={checkoutDiscounts}
        onOrderComplete={handleOrderComplete}
      />

      {/* Authentication Modal */}
      {authModalMode && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onSwitchMode={(mode) => setAuthModalMode(mode)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Persistent Pomodoro Focus Timer Sidebar */}
      <PomodoroTimer
        onAwardXp={handleAwardXp}
        currentView={currentView}
      />

    </div>
  );
}

export default App;
