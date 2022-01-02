export const BASE_URL = "https://613dd94494dbd600172aba1a.mockapi.io/";
const API_URL = {
    music: {
        getList: (param?: string) => {
            return `${BASE_URL}/lists`
        },
        getMusic: (param?: string) => {
            return `${BASE_URL}/musics`
        },
    },
}
export default API_URL;