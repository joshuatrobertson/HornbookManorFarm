import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import VoucherPage from "./pages/vouchers/VoucherPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AboutPage from "./pages/about/AboutPage.jsx";
import Course from "./pages/courses/Course.jsx";
import CoursesPage from "./pages/courses/CoursesPage.jsx";
import Cart from "./pages/cart/Cart.jsx";

const Layout = () => {
    return (
        <div className="App flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: Layout(),
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/courses/:id",
                element: <Course/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            },
            {
                path: "/courses",
                element: <CoursesPage/>
            },
            {
                path: "/contact",
                element: <ContactPage/>
            },
            {
                path: "/vouchers",
                element: <VoucherPage/>
            },
            {
                path: "/cart",
                element: <Cart/>
            },

        ]
    },

])
export default function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}