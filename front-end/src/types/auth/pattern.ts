import { ReactNode } from "react";

type Pattern = Record<'create' | 'signIn', {
    title: string;
    component: ReactNode
    form: ReactNode;
    btn: ReactNode;
}>

export default Pattern