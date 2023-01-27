


export function PostDataTiketToken(type='',userData=''){
	const ApiKey='7695b0d0c36ab90fb31cb58ce998a072';
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	const BaseUrl=proxyurl+'https://api-sandbox.tiket.com/apiv1/payexpress?method=getToken&secretkey='+ApiKey+'&output=json';


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



