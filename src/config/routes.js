import HomePage from '../components/pages/Home'
import LoginPage from '../components/pages/Login'
import ProfilePage from '../components/pages/Profile'
import RegisterPage from '../components/pages/Register'
import ReadContentPage from '../components/pages/ReadContent'
import EdithContentPage from '../components/pages/EdithContent'

const components = {
    home: {
        url: "/home",
        component: HomePage
    },
    login: {
        url: "/login",
        component: LoginPage
    },
    profile: {
        url: "/profile",
        component: ProfilePage
    },
    register: {
        url: "/register",
        component: RegisterPage
    },
    readContent: {
        url: "/read-content/:id",
        component: ReadContentPage
    },
    edithContent: {
        url: "/edith-content/:id",
        component: EdithContentPage
    }
};

export default {
    guest: {
        allowedRoutes: [
            components.login,
            components.register,
        ],
        redirectRoutes: "/login"
    },
    user: {
        allowedRoutes: [
            components.home,
            components.profile,
            components.readContent,
            components.edithContent,
        ],
        redirectRoutes: "/home"
    },
}