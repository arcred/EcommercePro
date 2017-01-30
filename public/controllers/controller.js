var myApp=angular.module('myApp', ['ngStorage','ngRoute','angular.filter']);


var loginStatus="false"; var email=""; var userName="";
localStorage.flag=="false";
if(typeof(wishlistProd)=="undefined"){
    console.log("inside undefined wishprod");
    var wishlistProd=[];
}

//-----------------new--------------
myApp.filter('offset', function() {

	return function(input,start) {
		if (!input || !input.length) { return; }
		start = parseInt(start, 10);
		return input.slice(start);
	};
});

//-----------------new--------------


myApp.controller('itemsController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){
	
    
    
    
    if(f.search=="undefined"){
        f.search=[];    
    }
    
    
	a.pageCount = function() {

		return Math.ceil(f.search.length/a.itemsPerPage)-1;

	};
	a.maxRating = 5;
	a.value="All";
	console.log("Hello from controller");
	var index = 0;
	var list1=[];
	var list2=[];
	var list3=[];


	//-----------------pagination new----------    

	//pagination

	a.itemsPerPage = 4;
	a.currentPage = 0;

	a.range = function() {
		var rangeSize = a.pageCount()+1;
		var ret = [];
		var start;

		start = a.currentPage;
		if ( start > a.pageCount()-rangeSize ) {
			start = a.pageCount()-rangeSize+1;
		}

		for (var i=start; i<start+rangeSize; i++) {
			ret.push(i);
		}
		return ret;
	};
	a.prevPage = function() {
		if (a.currentPage > 0) {
			a.currentPage--;
		}
	};

	a.prevPageDisabled = function() {
		return a.currentPage === 0 ? "disabled" : "";
	};



	a.nextPage = function() {
		if (a.currentPage < a.pageCount()) {
			a.currentPage++;
		}
	};

	a.nextPageDisabled = function() {
		return a.currentPage === a.pageCount() ? "disabled" : "";
	};
	a.setPage = function(n) {
		a.currentPage = n;
	};


	//------------------------oagination new--------------------  


	  


	a.showDrop=function(actualItem){


		a.actualItem="men";
		a.droplist=[];
		var templist=[];
		var templist1=[];
		a.actualItem=actualItem;
		b.post('/ecommerce',({dept: actualItem})).then(function(response) {
			console.log("i got the data i requested");
			templist.push(response.data);
			var j=0;
			for(var i=0;i<response.data.length;i++){
				templist1.push(templist[0][i].category);

			}
			a.droplist=templist1;
		});
	};

	a.view=function(prodname){
		var productname=[];
		productname.push(prodname);
		console.log(productname[0].name);
		a.name=productname[0].name;
		a.price=productname[0].price;
		a.category=productname[0].category;
		a.description=productname[0].description;
		a.img=productname[0].img;
		a.product = productname[0];
		if(c.flag!="true"){
			document.getElementById("wishlist").style.display="none";    
		}
		else{
			document.getElementById("wishlist").style.display="block";
		}

	};

	a.viewAll=function(){

		var responsedata=[];var allproducts=[];

		b.post('/ecommerce').then(function(response){

			responsedata.push(response.data);
			//console.log(responsedata[0]);
			for(var i=0;i<responsedata[0].length;i++){
				allproducts.push(responsedata[0][i]);
			}
			console.log(allproducts);
			f.search=allproducts;

        
		});
        document.getElementById("carouselAction").style.display="none";
	};

	var isNotPresent=function(id){

		console.log(id);

		for(var i = 0;i<f.cartItems.length;i++){

			if(f.cartItems[i]._id == id){
				console.log("product is present");
				return false;
			}
		}
		console.log("product is not present");
		return true;
	}
    
    var isNotPresentInWishList=function(id){

		console.log(id);
        
        
        for(var i = 0;i<c.wishlist.length;i++){
                console.log(c.wishlist[i]);
            if(c.wishlist[i]._id == id){
                console.log("product is present");
                return false;
               
                
            }
            
        }
        
        return true;
       
        
	}
    



	a.addWish = function(product){

        console.log(isNotPresentInWishList(product["_id"]));
        
        
		if(isNotPresentInWishList(product["_id"]))
		{
			var userWishlist=[];
            
            a.new=c.userDetails; 
			console.log(a.new[2]);
			a.em=a.new[2][0].emailid;

			console.log(a.em);
			var user_email=a.em;
           
            console.log("before push");
            console.log(c.wishlist);
            c.wishlist.push(product);
            console.log("after push");
            console.log(c.wishlist);
						
			
			console.log("inside orderwish");
			console.log(user_email);
			

			userWishlist.push(user_email);
			userWishlist.push(c.wishlist);
			b.post('/insertWishlist',(userWishlist)).then(function(response){
				console.log(response.data);
			});
            console.log(c.wishlist);
         bootbox.alert({
            message: "Product added to WishList!",
            size: 'small',
            backdrop: true
                });
		}
        else{
         bootbox.alert({
            message: "Product already present in Wishlist!",
            size: 'small',
            backdrop: true
                });

		
        }
	};

	f.addItem = function(product){
 
		if(typeof(c.count)!='undefined'){
			c.count=c.count+1;

		}
		else{
			c.count=0;
			c.count=c.count+1;
		}

		f.cartcount=c.count;
		if(isNotPresent(product["_id"]))
		{
			product["count"]=0;
			product["count"] = product["count"]+1;
			console.log(product["count"]);

			f.cartItems.push(product);
            
            

		}
		else 
		{
			console.log(product["count"]);
			for(var i = 0;i<f.cartItems.length;i++){

				if(f.cartItems[i]._id == product["_id"])
				{

					f.cartItems[i].count=f.cartItems[i].count+1;
					console.log(f.cartItems[i].count);

					break;
				}
			}

		} 


		c.addItems = f.cartItems;
		console.log(f.cartItems);
      
        bootbox.alert({
            message: "Product added to cart",
            size: 'small',
            backdrop: true
                });
        
	};



	a.removeItem = function(product)
	{
		var index=c.addItems.indexOf(product);
		var count = f.cartItems[index].count;
		f.cartItems.splice(index, 1);
		c.addItems = f.cartItems;
		console.log("cartcount"  + f.cartcount);
		f.cartcount =f.cartcount - count ;
		console.log("cartcount"  + f.cartcount);
		console.log(f.cartItems);
		c.count=f.cartcount; 
	};



	f.init = function()
	{  
		e.path('/');
        	a.alertmsg="";
		f.cartcount=c.count;
		console.log(c.flag);
		if(typeof(c.flag)=="undefined")
		{
			console.log("c.flag initialized");
			c.flag="false";    
		}
		if(c.flag=="true"){
			
			document.getElementById("logindd").style.display="none";
			document.getElementById("userdd").style.display="block";
			document.getElementById("wishlist").style.display="block";

			a.new=c.userDetails; 

			var first=a.new[2][0].firstname;
			console.log(first);
			var second=a.new[2][0].secondname;
			console.log(second);
			var em=a.new[2][0].emailid;
			console.log(em);
			var addr=a.new[2][0].address;
			var phn=a.new[2][0].phone;

			//a.userName=first+" "+second;
			f.userName=first;
			a.first=first;
			a.second=second;
			a.userAddress=addr;
			a.userEmail=em;
			a.userContact=phn;

		}
		else{


			document.getElementById("logindd").style.display="block";
			document.getElementById("userdd").style.display="none";
		}

		var responseData=[];
		var responseDataWithCount = [];
		console.log("iam in init fucntion");
		if(typeof(c.addItems)!='undefined')
		{
			f.cartItems = c.addItems;    
		}
		else
		{
			console.log("local storage is not initialized");
			c.addItems=[];
		}


		if(typeof(f.search)=='undefined'){
			b.post('/featureProd')
				.then(function(response){

				responseData.push(response.data);
				responseData[0].forEach(function(dataCount) {
					dataCount["count"] = 0;
					responseDataWithCount.push(dataCount);

				});
				f.search=responseDataWithCount;     

			});
		}
		
		
        
	};
	a.init = function()
	{  
		if(typeof(c.flag)=="undefined")
		{
			c.flag="false";    
		}
		f.cartcount=c.count;
		console.log(c.flag);
		if(c.flag=="true"){
			console.log(c.flag);
			document.getElementById("logindd").style.display="none";
			document.getElementById("userdd").style.display="block";
            

			a.new=c.userDetails; 
			console.log("iam logged in : my user details are");
			console.log(a.new[2][0]);
			var first=a.new[2][0].firstname;
			console.log(first);
			var second=a.new[2][0].secondname;
			console.log(second);
			var em=a.new[2][0].emailid;
			console.log(em);
			var addr=a.new[2][0].address;
			var phn=a.new[2][0].phone;
            if(typeof(c.wishlist)==undefined){
                c.wishlist=[];
            }
            b.post('/wishlistProducts',({'emailid':em})).then(function(response){
                console.log("inside resposne wishlist products");
                console.log(response.data);
                if( response.data.length!=0){
                    c.wishlist=response.data[0].products;    
                }
                else{
                    c.wishlist=[];
                }
                

                console.log(c.wishlist);
               
            });    
			f.userName=first
			a.first=first;
			a.second=second;
			a.userAddress=addr;
			a.userEmail=em;
			a.userContact=phn;

		}
		else{


			document.getElementById("logindd").style.display="block";
			document.getElementById("userdd").style.display="none";
		}

		var responseData=[];
		var responseDataWithCount = [];
		console.log("iam in init fucntion");
		if(typeof(c.addItems)!='undefined')
		{
			f.cartItems = c.addItems;    
		}
		else
		{
			console.log("local storage is not initialized");
			c.addItems=[];
		}


		if(typeof(f.search)=='undefined'){
			b.post('/featureProd')
				.then(function(response){

				responseData.push(response.data);
				responseData[0].forEach(function(dataCount) {
					dataCount["count"] = 0;
					responseDataWithCount.push(dataCount);

				});
				f.search=responseDataWithCount;     

			});
		}
		
	};

	a.viewProducts=function(cat,dep)
	{

		var responseData=[]; var responseDataWithCount=[];
		var appareldata=[];
		a.value=cat;
		b.post('/ecommerce',({'dept':dep})).then(function(response){
			responseData.push(response.data);
			for(var i=0;i<responseData[0].length;i++)
			{
				if(responseData[0][i].category == cat){
					appareldata.push(responseData[0][i]);
				}
			}
			responseData[0].forEach(function(dataCount) {
				dataCount["count"] = 0;
				responseDataWithCount.push(dataCount);
			});
			f.search=appareldata;
		});
        e.path('/');
        document.getElementById("carouselAction").className="fade Out";
        document.getElementById("carouselAction").style.display = "none";
        f.init();
       
		
	};


	a.deptProducts=function(dep){
		var responseData=[]; var responseDataWithCount=[];
		a.value=dep;
		b.post('/ecommerce',({'dept':dep})).then(function(response){
			responseData.push(response.data);
			responseData[0].forEach(function(dataCount) {
				dataCount["count"] = 0;
				responseDataWithCount.push(dataCount);
			});
            
            
			f.search=responseData[0]; 
		});
	};

	f.searchProducts=function(){

		var temp=[];    
		var tempName=a.nameItem;

		temp=tempName.split(" ");
		for(var i=0;i<temp.length;i++){
			nameProduct=temp[i];
			searchItem(nameProduct.toLowerCase());
		}
        /*document.getElementById("carouselAction").className="fade Out";
        document.getElementById("carouselAction").style.display="none";*/
        document.getElementById("carouselAction").className="fade Out";
        document.getElementById("carouselAction").style.display = "none";
		e.path('/');
	}; 

	f.searchProduct=function(){    
		var temp=[];
		var tempName ="";    
		var tempName=a.nameProducts;
		console.log(tempName);
		temp=tempName.split(" ");
		for(var i=0;i<temp.length;i++){
			nameProduct=temp[i];
			searchItem(nameProduct.toLowerCase());
		}
        /*document.getElementById("carouselAction").className="fade Out";
        document.getElementById("carouselAction").style.display="none";*/
		e.path('/');   
	};   


	var searchItem=function(nameProduct)
	{
		var responseData=[]; var responseDataWithCount=[];
		b.post('/ecommerce',({'name':{'$regex': nameProduct}})).then(function(response){
			console.log("Inside post name from database from controller");
			console.log(response);
			console.log("AFter post in controller");
			console.log(response.data.length);
			if(response.data.length==0)
			{
				console.log("No match found in product name");
				categoryFunction();
			}
			else
			{
				responseData.push(response.data);
				console.log(responseData);
				responseData[0].forEach(function(dataCount) {
					dataCount["count"] = 0;
					responseDataWithCount.push(dataCount);
				}); 
				for(var i=0;i<responseData[0].length;i++){
					list1.push(responseData[0][i]);
				}
				categoryFunction();
			}

		});
	};


	var categoryFunction=function(){
		var responseData=[]; var responseDataWithCount=[];
		console.log(a.nameItem);
		b.post('/ecommerce',({'category':{'$regex': nameProduct}})).then(function(response){
			console.log("from category search");
			if(response.data.length==0)
			{
				console.log("no match found in product category");
				deptFunction();
			}
			else{
				responseData.push(response.data);
				console.log(responseData);
				responseData[0].forEach(function(dataCount) {
					dataCount["count"] = 0;
					responseDataWithCount.push(dataCount);
				});
				for(var i=0;i<responseData[0].length;i++){
					list2.push(responseData[0][i]);
				}
				deptFunction();  
			}
		});
	};

	var deptFunction=function(){
		var responseData=[]; var responseDataWithCount=[];
		console.log(a.nameItem);
		b.post('/ecommerce',({'dept':{'$regex': nameProduct}})).then(function(response){
			console.log("from dept search");
			if(response.data.length==0)
			{
				console.log("No products found");
				listDetails();
			}
			else{
				responseData.push(response.data);
				console.log(responseData);
				responseData[0].forEach(function(dataCount) {
					dataCount["count"] = 0;
					responseDataWithCount.push(dataCount);
				});
				for(var i=0;i<responseData[0].length;i++){
					list3.push(responseData[0][i]);
				}
				listDetails();   
			}
		});
	};

	var listDetails=function(){
		var list=[];
		list=list1.concat(list2.concat(list3));
		console.log(list.length);
		var newArray = removeDuplicate(list, 'name');
		console.log(newArray);
        console.log(newArray.length);
		if(newArray.length==0)
		{
           // alert("No products found");
            
             a.status="No Products Found";
                    a.result="Sorry!";
                    document.getElementById("logoutErrDiv").className="alert alert-danger";
                    document.getElementById("logoutErrDiv").style.display="block";
            
       a.nameItem="";
           // a.alertmsg="Sorry! No Products Found!"
     // $window.refresh();
       // e.path('/');
          //  f.init();
            a.init();
		}
        else{
           // a.alertmsg="";
            a.status="No Products Found";
                    a.result="Sorry!";
                    //document.getElementById("logoutErrDiv").className="alert alert-warning";
                    document.getElementById("logoutErrDiv").style.display="none";
            
        f.search=newArray;
		newArray=[];
		refresh();
        }
		

	};

	function removeDuplicate(arr, prop) {
		var new_arr = [];
		var lookup = {};
		for (var i in arr) {
			lookup[arr[i][prop]] = arr[i];
		}
		for (i in lookup) {
			new_arr.push(lookup[i]);
		}
		return new_arr;
	};

	var refresh=function(){
		list1=[];
		list2=[];
		list3=[];
		list=[];
	}; 


	a.logout=function(){
		c.userDetails=[];
		console.log("logout");
		c.flag="false";
		loginStatus="false";
		c.addItems=[];
        

		f.cartcount=c.count;
		c.count=0;
		document.getElementById("logindd").style.display="block";
		document.getElementById("userdd").style.display="none";
        
        
                 
        
        

		f.init();
		e.path('/');
        
        bootbox.alert({
            message: "Logged out Successfully!",
            size: 'small',
            backdrop: true
                });

         /*a.status="User logged out";
                    a.result="";
                    //document.getElementById("logoutErrDiv").className="alert alert-warning";
                    document.getElementById("logoutErrDiv").style.display="block";*/
       
          /*a.info="User Logged Out";
                    a.result="hey";
                    document.getElementById("errorDiv").className="alert alert-info";
                    document.getElementById("errorDiv").style.display="block";*/
	}



	


}]);


myApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
		templateUrl: 'homepage.html',
		controller: 'itemsController'
	})
		.when('/cart', {
		templateUrl: 'cart.html',
		controller: 'cartController'
	})
		.when('/login', {
		templateUrl: 'login.html',
		controller: 'loginController'
	})
		.when('/register', {
		templateUrl: 'register.html',
		controller: 'registerController'
	})
		.when('/checkout', {
		templateUrl: 'checkout.html',
		controller: 'checkoutController'
	})
		.when('/wishlist', {
		templateUrl: 'wishlist.html',
		controller: 'wishlistController'
	})

		.when('/PreviousOrders',{

		templateUrl: 'PreviousOrders.html',
		controller: 'previousController'

	})
		.otherwise({
		redirectTo: '/'
	});
});

myApp.controller('cartController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){

	a.msg = "success";
	var tempCart=a.cartProducts;
	a.cartProducts = f.cartItems;
	var sum=0;
	for(var i=0;i<f.cartItems.length;i++)
	{
		sum+=f.cartItems[i].price*f.cartItems[i].count;
	}
	f.totalprice=sum;


	a.increaseCount = function(product){

		var index = tempCart.indexOf(product);
		tempCart[index].count++;
		f.cartcount++;
		console.log(tempCart[index].count);
		console.log(f.cartItems[index]);
		c.count=f.cartcount;

	}

	a.decreaseCount = function(product){

		var index = tempCart.indexOf(product);
		if(tempCart[index].count==1){
			tempCart[index].count=1;
		}
		else{
			tempCart[index].count--;
			f.cartcount--;

			console.log(tempCart[index].count);
			c.count=f.cartcount;
		}
		console.log(f.cartItems[index]);

	}


	a.proceed=function(){

		if(f.cartItems.length==0){
		//	alert("no items");
            a.status="No items in cart";
                    a.result="Sorry!";
                    document.getElementById("errorDiv").className="alert alert-danger";
                    document.getElementById("errorDiv").style.display="block";
            
            
		}else{

			e.path('/checkout');   
		}


	}
    
    a.continueShop=function(){

		e.path('/');
	}

}]);




myApp.controller('loginController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){
	console.log("inside loginController");

	if(c.flag == "true"){
		e.path('/');
	}
		    a.userLogin=function(){

                var userName=a.userMail;
                var userPassword=a.userPassword;
                console.log(userName);
                console.log(userPassword);
                if(userName==undefined && userPassword==undefined){
                    console.log("inside undefined");
                    a.status="Enter valid credentials";
                    a.result="Error!";
                    document.getElementById("errorDiv").className="alert alert-danger";
                    document.getElementById("errorDiv").style.display="block";

                } 
                else{

				b.post('/userDetails',({'emailid':userName,'password':userPassword})).then(function(response){
					console.log("inside post UserDetails");

					if(response.data==null)
					{

						a.status="User Not Found Please SIGNUP";
						a.result="sorry!";
						document.getElementById("errorDiv").className="alert alert-danger";
						document.getElementById("errorDiv").style.display='block';

					}
					else
					{
						console.log("in else");
						// сonsole.log(response.data);
						var sessionId=response.data[0];

						a.user=response.data[2][0].firstname;
						a.password=response.data[2][0].password;
						a.id=sessionId;
						a.inputPassword=userPassword;
						console.log(userPassword);
						console.log(response.data[2][0].password);
						if(userPassword==response.data[2][0].password)
						{

							a.status="Correct Password";



							a.new=c.userDetails; 
							a.new=response.data;
							c.userDetails=a.new;

							console.log(a.new[2]);
							var em=a.new[2][0].emailid;

							console.log(em);
							c.flag="true";
							console.log(c.flag);

							loginStatus="true";
							email=response.data[2][0].emailid;
                            				a.userName=response.data[2][0].firstname;
							location.reload();
							f.init();
							e.path('/');
							
							
                            
                            
                            
                            
						}
						else{

							a.status="Incorrect Password! Try Again";
							a.result="sorry!";
							document.getElementById("errorDiv").className="alert alert-warning";
							document.getElementById("errorDiv").style.display="block";
						}    

					}
				});

			}

		      };

}]);

myApp.controller('registerController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){
	console.log("inside regController");


	a.submit=function(){

		var firstName=a.first_Name;
		var secondName=a.last_Name;
		var emailId=a.email_Id;
		var Password=a.pass_word;
		var phoneNumber=a.contact;
		var addr=a.address;


		console.log("the details are"+firstName+" "+secondName+" "+emailId+" "+Password+" "+phoneNumber+""+addr);
        
        if((!(firstName==undefined))&&(!(secondName==undefined))&&(!(emailId==undefined))&&(!(Password==undefined)) &&(!(phoneNumber==undefined))&&(!(addr==undefined))){
            
            b.post('/userDetails',({'firstname':firstName,'secondname':secondName,'emailid':emailId,'password':Password,'phone':phoneNumber,'address':addr})).then(function(response){

                console.log("inside post UserDetails");
                console.log(response);

                if(response.data[3] == "OldUser"){

                    a.result="warning!";
                    a.status="The user already exists please login";
                    document.getElementById("errorDiv").style.display="block";

                }
                else if(response.data[3] == "NewUser"){

                    a.result="success!"
                    a.status="Registration successful please login";
                    document.getElementById("errorDiv").className="alert alert-success ";
                    document.getElementById("errorDiv").style.display="block";

                }


		  });
            
            
        }
        else{
            
            a.result="Error!"
            a.status="Enter correct Credentials";
            document.getElementById("errorDiv").className="alert alert-warning ";
            document.getElementById("errorDiv").style.display="block";
            
        }
		


	};

}]);

myApp.controller('checkoutController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){


	console.log("inside checkout controller");


	a.init=function(){

		if(c.flag=="true"){
			console.log(loginStatus+"ussr logged in already");
			a.val="logged in";


			document.getElementById("checkOut").style.display="none";
			document.getElementById("place_orderbtn").style.display="block";

		}
		else{

			console.log(loginStatus+"user not logged in yet"); 
			a.val="not loggged in" ;

			document.getElementById("checkOut").style.display="block";
			document.getElementById("place_orderbtn").style.display="none"; 

		}

	}

	a.cartProducts = f.cartItems;
	var sum=0;
	for(var i=0;i<f.cartItems.length;i++)
	{
		sum+=f.cartItems[i].price*f.cartItems[i].count;
	}
	f.totalprice=sum;


	var userProducts=[];
	a.orderConfirm=function(){

		if(c.flag=="false"){

			var emailid=a.guestMail;
			console.log(emailid);
			b.post('/getAddress',({'emailid':emailid})).then(function(response){
				console.log(response.data.length);
				if(response.data.length==0){
					var tempaddItems=c.addItems;
					console.log(tempaddItems);


					b.post('/userProducts',(tempaddItems)).then(function(response){
						console.log(response.data);
						if(response.data=="updated in db")
						{
							console.log("no user exists in user Details");
							document.getElementById("order_info").style.display="block";
							document.getElementById("products_info").style.display="none";
							document.getElementById("checkOut").style.display="none";

							c.addItems = [];
							tempaddItems=[];
							c.count = 0;
							f.cartItems=[];
							a.cartProducts=f.cartItems;
							a.totalprice=0;
							f.cartcount=0;

							//a.confirmMsg="Thank you Your order has been placed!";
                            
                           /* a.result="Thank you ..!"
				a.status="Your order has been placed!";
				document.getElementById("errorDiv").className="alert alert-success ";
				document.getElementById("errorDiv").style.display="block";*/
                            

							a.Txid= Math.floor((Math.random() * 10000000000) + 1) ;
							a.toAddr=a.guestAddress;
							a.userName=a.guestName;
						}
						if(response.data=="not found in db")
						{
							console.log("product not found in db");
						}
					});

				}
				else
				{
					console.log("after getng address from server");
					console.log(response.data);
                    
                    a.result="Error!"
				a.status="User already exists! Please Login";
				document.getElementById("errorDiv").className="alert alert-danger ";
				document.getElementById("errorDiv").style.display="block";
					alert("user already exists please login");


				}
			});


		}
		else{
			a.new=c.userDetails; 


			console.log(a.new[2]);

			a.em=a.new[2][0].emailid;
			a.userName=a.new[2][0].firstname;

			console.log(a.em);
			var user_email=a.em;

			console.log("inside orderConfirm");
			console.log(user_email);
			console.log(c.addItems);
			var tempaddItems=c.addItems;
			userProducts.push(user_email);
			userProducts.push(c.addItems);
			b.post('/insert',(userProducts)).then(function(response){
				console.log(response.data);
				if(response.data=="inserted into previous orders"){
					console.log("after pushing in to usersdb");
					console.log(tempaddItems);
					b.post('/userProducts',(tempaddItems)).then(function(response){
						console.log("inside post UserProducts");
						console.log(response.data);
						if(response.data=="updated in db")
						{
							console.log("inside if statement");
							c.addItems = [];
							tempaddItems=[];
							c.count = 0;
							f.cartItems=[];
							a.cartProducts=f.cartItems;
							a.totalprice=0;
							f.cartcount=0;

						//	a.confirmMsg="Thank you Your order has been placed!";
                            
                            /*a.result="Thank you ..!"
				a.status="Your order has been placed!";
				document.getElementById("errorDiv").className="alert alert-success ";
				document.getElementById("errorDiv").style.display="block";
                            */

							a.Txid= Math.floor((Math.random() * 10000000000) + 1) ;



						}
						if(response.data=="not found in db")
						{
							console.log("product not found in db");
						}
					});
				}
				f.cartcount=0;
			});

			document.getElementById("order_info").style.display="block";
			document.getElementById("products_info").style.display="none";
			document.getElementById("place_orderbtn").style.display="none";


			var email_id=a.em;
			console.log(email_id);
			b.post('/getAddress',({'emailid':email_id})).then(function(response){

				console.log("after getng address from server");
				console.log(response.data);
				console.log(response.data[0].address);

				a.toAddr=response.data[0].address;

			});
		}
	};

	a.loginCheckout=function(){
        
		var userName=a.userMail;
		var userPassword=a.userPassword;
		console.log("userName"+userName);
		console.log("Password"+userPassword);

		b.post('/userDetails',({'emailid':userName,'password':userPassword})).then(function(response){
			console.log("inside post UserDetails");
			//console.log(response.data);

			if(response.data==null)
			{
				//a.msg="User Not Found Please SIGNUP";
				console.log("navigate to login page page for registeration");
                a.result="Error!"
				a.status="User Not Registered";
				document.getElementById("errorDiv").className="alert alert-warning";
				document.getElementById("errorDiv").style.display="block";
                    
                
			}
			else
			{ 
				console.log("in else");
				// сonsole.log(response.data);
				var sessionId=response.data[0];

				a.user=response.data[2][0].firstname;
				a.password=response.data[2][0].password;
				a.id=sessionId;
				a.inputPassword=userPassword;
				console.log(userPassword);
				console.log(response.data[2][0].password);
				if(userPassword==response.data[2][0].password)
				{

					a.msg="Correct Password";

					a.new=c.userDetails; 
					a.new=response.data;
					c.userDetails=a.new;

					console.log(a.new[2]);

					a.em=a.new[2][0].emailid;

					console.log(a.em);

					c.flag="true";
					console.log(c.flag);

					loginStatus="true";
					email=response.data[2][0].emailid;
                    
                    a.result=""
				a.status="User Logged in!";
				document.getElementById("errorDiv").className="alert alert-success ";
				document.getElementById("errorDiv").style.display="block";
                    
					e.path('/checkout');
					document.getElementById("logindd").style.display="none";
					document.getElementById("userdd").style.display="block";
					document.getElementById("checkOut").style.display="none";
					document.getElementById("place_orderbtn").style.display="block"; 
					a.userName=response.data[2][0].firstname;
				}
				else{
					//a.msg="Incorrect Password";
                    a.result="Error!"
				a.status="Incorrect Password";
				document.getElementById("errorDiv").className="alert alert-warning ";
				document.getElementById("errorDiv").style.display="block";
                    
                    
				}    

			}
		});

	} 


	a.continueShop=function(){

		e.path('/');
	}

}]);


myApp.controller('wishlistController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){
	console.log("inside wishlistController");
	if(c.flag != "true"){
		e.path('/login');
	}
	
	
	a.proceed=function(){

		if(f.cartItems.length==0){
            
			bootbox.alert({ 
  size: "small",
  title: "  Sorry ",
  message: "no items in cart!", 
 
});
		}else{

			e.path('/cart');   
		}


	}

	a.initing=function(){

		console.log("in wishlist controller");
		 
		a.new=c.userDetails;
		var em=a.new[2][0].emailid;

		
		b.post('/wishlistProducts',({'emailid':em})).then(function(response){
            console.log("inside resposne wishlist products");
            console.log(response.data);
            c.wishlist=response.data[0].products;
            a.wishlistProducts=c.wishlist;
		});
		

	};






	a.addtocart = function(product){

		f.addItem(product);
        
    }

	a.removeFromWishList = function(product){
        var userWishlist=[];
        console.log(product);
		var index = c.wishlist.indexOf(product);
        console.log(index);
		c.wishlist.splice(index,1);
        a.new=c.userDetails; 
			console.log(a.new[2]);
			a.em=a.new[2][0].emailid;

			console.log(a.em);
			var user_email=a.em;
			console.log("inside orderConfirm");
			console.log(user_email);
			console.log(c.wishlist);

			userWishlist.push(user_email);
			userWishlist.push(c.wishlist);
        
        
			b.post('/insertWishlist',(userWishlist)).then(function(response){
				console.log(response.data);
			});
        a.initing();

	}

}]);


myApp.controller('previousController',['$scope','$http', '$localStorage', '$sessionStorage','$location','$rootScope',function(a,b,c,d,e,f){

    if(c.flag == "true"){
        console.log("in previous orders controller");
        var responsedata={};
        a.new=c.userDetails;
        var em=a.new[2][0].emailid;

        a.Previous=[];
        b.post('/previousOrders',({'emailid':em})).then(function(response){
            var p = [];
            for(var i=0; i<response.data.length; i++){
                for(var j=0; j<response.data[i].products.length; j++){
                    p.push(response.data[i].products[j]);

                }
            }
            console.log(p);
            a.Previous = p;
        });    
    }
    else{
        e.path('/');
    }
	
}]);
