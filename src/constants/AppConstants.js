const prod = {
    url: {
        API_URL : 'https//'
    }
};

const dev = {
    url:{
        API_URL: 'http://localhost:5000/api/altiora/v1/'
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;