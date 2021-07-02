import { history } from './history';

export const navigation = {
    navigateTo
};

function navigateTo(path) {
    history.push(path);
}