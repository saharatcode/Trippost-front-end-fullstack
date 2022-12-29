import HomePage from '../components/pages/Home'
import LoginPage from '../components/pages/Login'
import WriteNowPage from '../components/pages/writeNow'
import RegisterPage from '../components/pages/Register'
import ReadContentPage from '../components/pages/ReadContent'
import EdithContentPage from '../components/pages/EdithContent'
import ProfileWriter from '../components/pages/ProfileWriter'
const components = {
    home: {
        url: "/home", 
        component: HomePage
    },
    login: {
        url: "/login",
        component: LoginPage
    },
    writeNow: {
        url: "/write",
        component: WriteNowPage
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
    },
    profileWriter: {
        url: "/profile-writer/:id",
        component: ProfileWriter
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
            components.writeNow,
            components.readContent,
            components.edithContent,
            components.profileWriter,
        ],
        redirectRoutes: "/home"
    },
}