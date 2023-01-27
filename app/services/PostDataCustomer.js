export function PostDataCustomer(type,userData){
	let BaseUrl='http://eurekalogistics.co.id/mp/api/customer/';
	return new Promise((resolve,reject)=>{
 

		const myHeaders = new Headers();
	    myHeaders.append('Content-Type', 'application/json');

	    const options = {
	      method: 'POST',
	      body: JSON.stringify(userData),
	      myHeaders
	    };


		 fetch(BaseUrl+type, options)
	      .then(response => response.json())
	      .then((responseJson)=>{
				resolve(responseJson);
			})
			


	});


}