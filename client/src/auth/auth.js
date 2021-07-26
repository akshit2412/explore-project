
export function auth(action) {
    localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

}

