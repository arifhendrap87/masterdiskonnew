// export function PostData(type,userData){
// 	let BaseUrl='https://masterdiskon.com/front/api_new/api/';
// 	return new Promise((resolve,reject)=>{ 

// 		const myHeaders = new Headers();
// 	    myHeaders.append('Content-Type', 'application/json');

// 	    const options = {
// 	      method: 'POST',
// 	      body: JSON.stringify(userData),
// 	      myHeaders
// 	    };


// 		 fetch(BaseUrl+type, options)
// 	      .then(response => response.json())
// 	      .then((responseJson)=>{
// 				resolve(responseJson);
// 			})



// 	});


// }


export function PostData(type, userData) {
	let BaseUrl = 'https://masterdiskon.com/front/api_new/';
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

