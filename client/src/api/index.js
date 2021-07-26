const API_URL = 'https://explorein.herokuapp.com';


//1
export async function createPost(body) {

    try {
        const appJWTToken = JSON.parse(localStorage.getItem('profile')).token;
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${appJWTToken}`
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {
        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

//2
export async function imgpost(body) {

    try {
        const appJWTToken = JSON.parse(localStorage.getItem('profile')).token;
        const response = await fetch(`${API_URL}/posts/imgpost`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${appJWTToken}`
            },
            body: JSON.stringify(body)
        })
        return response.json();

    } catch (error) {
        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}



export async function getmyposts(id, start) {

    try {
        const response = await fetch(`${API_URL}/posts/content/${id}/${start}`);
        return response.json();

    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }



}



export async function postbyID(body) {

    try {
        const response = await fetch(`${API_URL}/posts/${body}`);

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

export async function getPosts(body) {

    try {

        const response = await fetch(`${API_URL}/posts/allposts/${body}`);
        return response.json();

    } catch (error) {
        const response = {
            error: error,
            code: 400,
        }
        return response;

    }
}

//3
export async function deletePost(body) {

    try {
        var appJWTToken = JSON.parse(localStorage.getItem('profile')).token;
        const response = await fetch(`${API_URL}/posts/delete`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${appJWTToken}`
            },
            body: JSON.stringify(body)
        });

        return response.json();

    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;
    }
}

//4
export async function editPost(body) {

    try {
        var appJWTToken = JSON.parse(localStorage.getItem('profile')).token;
        const response = await fetch(`${API_URL}/posts/edit`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${appJWTToken}`
            },
            body: JSON.stringify(body)
        })
        return response.json();

    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}


//5
export async function imgEdit(body) {

    try {
        var appJWTToken = JSON.parse(localStorage.getItem('profile')).token;
        const response = await fetch(`${API_URL}/posts/imgedit`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${appJWTToken}`
            },
            body: JSON.stringify(body)
        })
        return response.json();
    } catch (error) {
        const response = {
            error: error,
            code: 400,
        }
        return response;
    }

}



//6
export async function lovePost(body) {

    try {
        var appJWTToken = JSON.parse(localStorage.getItem('profile')).token;
        const response = await fetch(`${API_URL}/posts/love`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${appJWTToken}`
            },
            body: JSON.stringify(body)
        })
        return response.json();

    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

export async function signIn(body) {
    try {

        const response = await fetch(`${API_URL}/users/signin`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }
}


export async function signUp(body) {

    try {
        const response = await fetch(`${API_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

export async function verifyEmail(body) {

    try {
        const response = await fetch(`${API_URL}/users/sendEmail`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

export async function forgotEmail(body) {

    try {
        const response = await fetch(`${API_URL}/users/forgotEmail`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

export async function verifyOtp(body) {
    try {

        const response = await fetch(`${API_URL}/users/verifyOtp`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

export async function googleSignin(body) {

    try {
        const response = await fetch(`${API_URL}/users/googlelogin`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}


export async function passwordChange(body) {
    try {

        const response = await fetch(`${API_URL}/users/passwordChange`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}

export async function forgotPassword(body) {

    try {
        const response = await fetch(`${API_URL}/users/forgotPassword`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return response.json();
    } catch (error) {

        const response = {
            error: error,
            code: 400,
        }
        return response;

    }

}






