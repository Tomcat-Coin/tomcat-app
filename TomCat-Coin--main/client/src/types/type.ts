export interface TUser {
    Name: string,
    Username: string,
    TgId: number,
    role: string,
    ReferCode: string,
    referBy?: string,
    createdAt: string,
    updatedAt: string
}

export interface TPoint {
    userId: string,
    point: number,
    createdAt: string,
    updatedAt: string
}