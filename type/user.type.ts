type TUser = {
    _id: string;
    name: string;
    phone: string;
    password: string;
    keyRestaurant: string;
};

type TAuth = {
    phone: string;
    password: string;
    keyRestaurant: string;
};

type TInfo = {
    name: string;
    phone: string;
    password: string;
    verifyPassword: string;
    keyRestaurant: string;
};

type THomeProps = {
    info: TInfo;
    setInfo: () => {};
};

export type { TUser, TAuth, TInfo, THomeProps };
