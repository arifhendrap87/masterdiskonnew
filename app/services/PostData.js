

export function PostData(type, userData) {
	let BaseUrl = 'https://jsx.masterdiskon.com/front/api_new/';
	return new Promise((resolve, reject) => {



		fetch(BaseUrl + type,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			}
		)
			.then((response) => response.json())
			.then((responseJson) => {
				resolve(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});




	});


}

