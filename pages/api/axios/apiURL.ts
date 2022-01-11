export const BASE_URL = "https://61d2e828b4c10c001712b67f.mockapi.io/api/";
const API_URL = {
    users: {
        getProfile: () => {
            return `${BASE_URL}/users`
        },
    },
}
export default API_URL;