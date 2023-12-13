import "swiper/swiper-bundle.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "./root layouts/RootLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { verifyPhoneLoader } from "./constants/loaders/verifyPhoneLoader";
import HeroLayout from "./root layouts/HeroLayout";
import DigitalVideoServices from "./pages/categories/DigitalVideoServices";
import GraphicDesignAndVisualArts from "./pages/categories/GraphicDesignAndVisualArts";
import BecomeAHostOverview from "./pages/become a host/BecomeAHostOverview";
import BecomeAHostLayout from "./root layouts/BecomeAHostLayout";
import AboutYourService from "./pages/become a host/steps/AboutYourService";
import Service from "./pages/become a host/Service";
import ServiceDescription from "./pages/become a host/ServiceDescription";
import MakeItStandOut from "./pages/become a host/steps/MakeItStandOut";
import Photos from "./pages/become a host/steps/Photos";
import Price from "./pages/become a host/Price";
import Success from "./pages/become a host/steps/Success";
import VisitProfile from "./pages/VisitProfile";
import ProfileLayout from "./root layouts/ProfileLayout";
import SubscriptionLayout from "./root layouts/SubscriptionLayout";
import SubscriptionWelcome from "./pages/subscription/SubscriptionWelcome";
import SubscriptionPayment from "./pages/subscription/SubscriptionPayment";
import ConfirmPayment from "./pages/subscription/ConfirmPayment";
import PaymentSuccessful from "./pages/subscription/PaymentSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import { UserStateContextProvider } from "./context/UserStateContext";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase config/config";
import ListingDate from "./pages/become a host/ListingDate";
import ListingsLoader from "./partials/loaders/ListingsLoader";
import Hosting from "./pages/Hosting";
import HostingLayout from "./root layouts/HostingLayout";
import VisitListing from "./pages/VisitListing";
import ServiceLocation from "./pages/become a host/ServiceLocation";

const About = lazy(() => import("./pages/About"));
const Hero = lazy(() => import("./pages/Hero"));
const VerifyPhone = lazy(() => import("./pages/PhoneVerify"));
const Home = lazy(() => import("./pages/Home"));
const Wishlists = lazy(() => import("./pages/Wishlists"));
const Inbox = lazy(() => import("./pages/Inbox"));
const Messages = lazy(() => import("./pages/Messages"));

import { SocketContextProvider } from "./context/SocketContext";
import BookingLayout from "./root layouts/BookingLayout";
import MakeABooking from "./pages/MakeABooking";
import BookingsLayout from "./root layouts/BookingsLayout";
import Bookings from "./pages/Bookings";
import DigitalAudioServices from "./pages/categories/DigitalAudioServices";
import PhotographyServices from "./pages/categories/PhotographyServices";
import AnimationAnd3DModeling from "./pages/categories/AnimationAnd3DModeling";
import LiveEventsAndConcerts from "./pages/categories/LiveEventsAndConcerts";
import DigitalAdvertisingAndMarketing from "./pages/categories/DigitalAdvertisingAndMarketing";
import Listing from "./pages/Listing";
import MessagesLayout from "./root layouts/MessagesLayout";

function App() {
  const [User, setUser] = useState<User | null>();
  const { socket } = useContext(SocketContextProvider);
  const identifier = localStorage.getItem("token");
  const {
    state: { token },
  } = useContext(UserStateContextProvider);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return setUser(null);
      } else {
        setUser(user);
        socket &&
          socket.emit("user-connect", {
            name: user.displayName,
            uid: user.uid,
          });
      }
    });
  }, [User, socket]);

  useEffect(() => {
    if (auth == null) {
      console.log("YES");
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* HERO Routes */}
        <Route element={<HeroLayout />}>
          <Route path="get-started" element={<Hero />} />
          <Route path="about-us" element={<About />} />
        </Route>

        {/* USER PROFILE & PHONE VERIFICATION Routes */}
        <Route path="/users" element={<ProfileLayout />}>
          <Route path="wishlists" element={<Wishlists />} />
          <Route
            path="show/:id"
            element={
              User ?? token ?? identifier ? (
                <Profile />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />

          <Route
            path="visit/show/:id"
            element={
              User ?? token ?? identifier ? (
                <VisitProfile />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        <Route
          path="account/verify-phone/:id"
          loader={verifyPhoneLoader}
          element={
            User ?? token ?? identifier ? (
              <VerifyPhone />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />

        {/* HOME & CATEGORIES Routes */}
        <Route element={<RootLayout />}>
          <Route
            index
            element={
              User ?? token ?? identifier ? (
                <Suspense fallback={<ListingsLoader />}>
                  <Home />
                </Suspense>
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/digital-video-services"
            element={
              User ?? token ?? identifier ? (
                <DigitalVideoServices />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/digital-audio-services"
            element={<DigitalAudioServices />}
          />
          <Route
            path="/graphic-design&visual-arts"
            element={<GraphicDesignAndVisualArts />}
          />
          <Route
            path="/photography-services"
            element={<PhotographyServices />}
          />
          <Route
            path="/animation&3d-modeling"
            element={<AnimationAnd3DModeling />}
          />
          <Route
            path="/live-events&concerts"
            element={<LiveEventsAndConcerts />}
          />
          <Route
            path="/digital-advertising&marketing"
            element={<DigitalAdvertisingAndMarketing />}
          />
        </Route>

        {/* BECOME A HOST Routes */}
        <Route
          path="/become-a-host/:id"
          element={
            User ?? token ?? identifier ? (
              <BecomeAHostLayout />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        >
          <Route
            path="overview"
            element={
              User ?? token ?? identifier ? (
                <BecomeAHostOverview />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="about-your-service"
            element={
              User ?? token ?? identifier ? (
                <AboutYourService />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service"
            element={
              User ?? token ?? identifier ? (
                <Service />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service-description"
            element={
              User ?? token ?? identifier ? (
                <ServiceDescription />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service-location"
            element={
              User ?? token ?? identifier ? (
                <ServiceLocation />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="make-it-standout"
            element={
              User ?? token ?? identifier ? (
                <MakeItStandOut />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="photos"
            element={
              User ?? token ?? identifier ? (
                <Photos />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="price"
            element={
              User ?? token ?? identifier ? (
                <Price />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="listing-date"
            element={
              User ?? token ?? identifier ? (
                <ListingDate />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="success"
            element={
              User ?? token ?? identifier ? (
                <Success />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
        </Route>

        {/* BOOKING Route */}
        <Route path="/booking" element={<BookingLayout />}>
          <Route path="show/:id" element={<VisitListing />} />
          <Route path="create/:id" element={<MakeABooking />} />
        </Route>

        {/* MESSAGES Route */}
        <Route path="/messages" element={<MessagesLayout />}>
          <Route
            path="conversation/:conversationId"
            element={
              User ?? token ?? identifier ? (
                <Messages />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        {/* BOOKINGS Route */}
        <Route path="/bookings" element={<BookingsLayout />}>
          <Route index element={<Bookings />} />
        </Route>

        {/* HOSTING Route */}
        <Route path="/" element={<HostingLayout />}>
          <Route path="hosting" element={<Hosting />} />
          <Route path="hosting-inbox" element={<Inbox />} />
          <Route path="hosting-listing" element={<Listing />} />
          <Route path="hosting" element={<Hosting />} />
        </Route>

        {/* MAKE SUBSCRIPTION PAYMENT Routes */}
        <Route path="/subscription/:id" element={<SubscriptionLayout />}>
          <Route path="welcome" element={<SubscriptionWelcome />} />
          <Route path="send-payment" element={<SubscriptionPayment />} />
          <Route path="confirm-payment" element={<ConfirmPayment />} />
          <Route path="payment-success" element={<PaymentSuccessful />} />
        </Route>

        {/* LOGIN & PASSWORD RESET & 404 Routes */}
        <Route>
          <Route
            path="login"
            element={
              User ?? token ?? identifier ? (
                <Navigate replace to={"/"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="forgot-password"
            element={
              User ?? token ?? identifier ? (
                <Navigate replace to={"/"} />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
