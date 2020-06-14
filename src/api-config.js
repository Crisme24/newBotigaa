let BASE_URL;

if(window.location.href.includes('localhost')){
    BASE_URL = 'http://localhost:8000'
}else{
    BASE_URL = 'https://botigaa.herokuapp.com'
}

export const API_URL = BASE_URL + '/api/v1';
export const IMG_URL = BASE_URL + '/images';
export const API_URL2 = 'http://localhost:5000';