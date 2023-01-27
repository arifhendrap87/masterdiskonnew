

export function PostDataNew(BaseUrl, type, param) {
	//let BaseUrl='https://masterdiskon.co.id/front/api_new/api/';
	console.log('urlTujuan', BaseUrl + type);
	return new Promise((resolve, reject) => {
		fetch(BaseUrl + type, param)
			.then((response) => response.json())
			.then((responseJson) => {
				resolve(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});
	});
}

