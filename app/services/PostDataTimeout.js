

export function PostDataTimeout(url, options, timeout = 7000) {
    //let BaseUrl='https://masterdiskon.co.id/front/api_new/api/';
    console.log('urlTujuan', url);
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

