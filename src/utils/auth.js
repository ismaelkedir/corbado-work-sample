import Corbado from '@corbado/webcomponent';

const CORBADO_PROJECT_ID = process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID;

export const isAuthenticated = async () => {
    const corbado = new Corbado.Session(CORBADO_PROJECT_ID);
    const user = await corbado.session.getCurrentUser();
    return user.isAuthenticated;
}
