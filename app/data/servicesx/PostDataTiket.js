


export function PostDataTiket(url=''){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const BaseUrl=proxyurl+url;
return new Promise((resolve,reject)=>{ 
    
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
    //   body: JSON.stringify(userData),
      myHeaders
    };
    
    fetch(BaseUrl, options)
    .then(response => response.json())
    .then((responseJson)=>{
          resolve(responseJson);
      })
      

});


}



