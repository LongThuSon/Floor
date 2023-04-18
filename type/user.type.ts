type TUser = {
    _id: string;
    name: string;
    phone: string;
    password: string;
    keyRestaurant: string;
};

type TUserCreate = {
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

type TUserData = {
    isLoading: boolean;
};

export type { TUser, TAuth, TInfo, THomeProps, TUserData, TUserCreate };
