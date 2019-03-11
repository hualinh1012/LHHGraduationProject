export default function isLogin() {
    try {
        const token = localStorage.getItem('token');
        if (token !== null) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}