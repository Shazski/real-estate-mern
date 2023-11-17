export interface SignUpFormTypes {
    username?:string,
    email:string,
    password:string,
    imgUrl?:string | null
}

export interface userSliceState {
    currentUser:{
        email:string,
        imageUrl:string,
        createdAt:Date | null
        updatedAt:Date | null
    } | null,
    loading:boolean,
    err:string

}