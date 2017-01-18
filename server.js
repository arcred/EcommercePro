var express=require('express');
var app=express();

var db = require('mongojs').connect('mongodb://userM4I:M6IXpRnUqFVowXca@ecommerce', ['ecommerce']);

/*var orders=mongojs('mongodb://userM4I:M6IXpRnUqFVowXca@ecommerce',['userOrders']);
var featured=mongojs('mongodb://userM4I:M6IXpRnUqFVowXca@ecommerce',['featureProd']);
var userprod=mongojs('mongodb://userM4I:M6IXpRnUqFVowXca@ecommerce',['userProducts']);
var users=mongojs('mongodb://userM4I:M6IXpRnUqFVowXca@ecommerce',['userDetails']);
var wishlist=mongojs('mongodb://userM4I:M6IXpRnUqFVowXca@ecommerce',['wishlistProducts']);*/
var bodyParser=require('body-parser'); 

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.listen(8080);

console.log("server running on port 8080");

var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))




var data = [

{name:"Polo shirt",category:"apparels",dept:"men",price:1000.00,description:"Strut on the streets in comfort wearing this T-shirt by U.S. Polo Assn. This unique creation is made using cotton that will highlight your torso. Live the moment wearing this slim-fit T-shirt with casual trousers and flip-flops as you hit the street with best buds.",quantity:20,img:"img/1.jpg",rating:4},
{name:"Levis jeans",category:"apparels",dept:"men",price:2000.00,description:"Especially designed to match the taste of urban men, these blue coloured denims from Levi?s are irresistible. Made from denim fabric, these jeans will keep you at ease all day long. Featuring immaculate appeal, these jeans are a must-have in your wardrobe.",quantity:20,img:"img/2.jpg",rating:4},
{name:"Mufti jacket",category:"apparels",dept:"men",price:3000.00,description:"Add a touch of definition to an otherwise solid look with this black coloured casual jacket from the house of Mufti. A wear-anywhere piece, created using blend of 96% cotton and 4% elastane, just to add a dash of attraction to your overall look. Meant to last a lifetime, this piece will make you look smart no matter what you wear it with.",quantity:20,img:"img/3.jpg",rating:4},

{name:"Svanik men's cotton kurta",category:"apparels",dept:"men",price:399.00,description:"100% Cotton ,Sleeve type and neck, Long sleeve and banded collar Style and Pathan suit with solid pattern",quantity:20,img:"img/37.jpg",rating:3},
{name:"Freehand men's cotton kurta",category:"apparels",dept:"men",price:749.00,description:"100% Cotton,Long sleeve with banded collar and Knee length,suitable as casual wear, only Warm machine wash",quantity:20,img:"img/38.jpg",rating:3},
{name:"United Colors of Benetton men's cotton sweater",category:"apparels",dept:"men",price:2219.00,description:"Stay warm, stay stylish this winter wearing this trendy sweater from United Colors of Benetton. Showcasing a modish design, this sweater is best worn with slim-fit chinos and moccasins",quantity:20,img:"img/39.jpg",rating:3},
{name:"Louis Philippe men's grey casual jacket",category:"apparels",dept:"men",price:5499.00,description:"dding a touch of uniqueness to this grey coloured jacket from the house of Louis Philippe is the colour block scheme. The polyester fabric makes this jacket quite soft and super comfortable to wear. Tag this jacket with blue denims and white casual shoes.",quantity:20,img:"img/40.jpg",rating:3},
{name:"SUITLTD men's black slim blazer",category:"apparels",dept:"men",price:2857.00,description:"Black blazer, has a mandarin collar, single-breasted with a full button placket, long sleeves, a welt pocket, two flap pockets, an attached lining with two welt pockets Comes with a pocket square",quantity:20,img:"img/41jpg",rating:5},
{name:"John Players men's teal blue formal trousers",category:"apparels",dept:"men",price:899.00,description:"A pair of teal blue mid-rise formal trousers, has four pockets, a zip fly with a hook-and-bar and button closures, and a waistband with belt loopsOur stylist has paired these trousers with a belt",quantity:20,img:"img/42.jpg",rating:5},
{name:"woodland shoes",category:"footwear",dept:"men",price:1000,description:"A pair of brown casual shoes with central lace-ups Suede upper Cushioned footbed Textured outsole with circular nubs",quantity:20,img:"img/4.jpg",rating:4},
{name:"adidas sneakers",category:"footwear",dept:"men",price:2000,description:"These top-notch Adidas sports shoes will keep you looking stylish during any workout. Match this navy blue pair with track pants and a sleeveless sports T-shirt when heading out for a casual day with friends.",quantity:20,img:"img/5.jpg",rating:4},
{name:"puma sport shoe",category:"footwear",dept:"men",price:3000,description:"Indulge your feet in some creature comfort, as you work out, with these shoes. Wear them to the gym with your vest and shorts for a complete sports-chic ensemble.",quantity:20,img:"img/6.jpg",rating:4},

{name:"PUMA men's navy casual shoes",category:"footwear",dept:"men",price:1999.00,description:" pair of navy casual shoes, has central lace-ups and mid-top styling Synthetic upper, has perforations, padding along the mouth and a reinforced heel collar Cushioned footbed Contrast midsole, has foxing on the forefoot",quantity:20,img:"img/43.jpg",rating:3},
{name:"Roadster men olive green casual shoes",category:"footwear",dept:"men",price:1399.00,description:"A pair of olive green casual shoes with central lace-ups and mid-top styling PU upper with perforations, has padding along the mouth and a reinforced heel collar Cushioned footbed Textured outsole with patterned grooves",quantity:20,img:"img/44.jpg",rating:3},
{name:"San Frissco men formal shoes",category:"footwear",dept:"men",price:1247.00,description:"A pair of tan brown brogue formal shoes with central lace-ups Leather upper Cushioned footbed Textured and patterned outsole with a stacked heel",quantity:20,img:"img/45.jpg",rating:4},
{name:"Prolific men black formal shoes",category:"footwear",dept:"men",price:999.00,description:"A pair of square-toed black formal shoes  Synthetic leather upper, has padding along the mouth, an elasticated gusset on either side of the mouth Textured outsole with patterned grooves, has a slightly upraised heel",quantity:20,img:"img/46.jpg",rating:5},
{name:"Roadster men navy & black sports sandals",category:"footwear",dept:"men",price:649.00,description:"A pair of navy blue and black sports sandals, has a Velcro closure Synthetic upper Cushioned and textured footbed Textured outsole with patterned grooves",quantity:20,img:"img/47.jpg",rating:5},
{name:"Rolex watch",category:"accessories",dept:"men",price:12000,description:"The Rolex Yacht-Master is revered for its casual yet purposeful allure. The large hour markers and broad hands are reserved for Professional models and remain extremely readable in all situations.",quantity:20,img:"img/7.jpg",rating:4},
{name:"Idee shades",category:"accessories",dept:"men",price:2000,description:"These top-notch Adidas sports shoes will keep you looking stylish during any workout. Match this navy blue pair with track pants and a sleeveless sports T-shirt when heading out for a casual day with friends.",quantity:20,img:"img/8.jpg",rating:4},
{name:"puma wallet",category:"accessories",dept:"men",price:3000,description:"Stay organised with this wallet from PUMA. Sleek and stylish, this piece will easily slip into your pocket.",quantity:20,img:"img/9.jpg",rating:4},

{name:"Mast & Harbour men white dial watch",category:"accessories",dept:"men",price:1139.00,description:"Case style: Analogue watch, has a circular case and a stainless steel back Dial style: White dial, has a mock subdial and two mock push-buttons Features: A screw to reset the time Strap style: Tan brown genuine leather strap, secured with a tang clasp Water-resistant Comes in a signature Mast & Harbour case",quantity:20,img:"img/48.jpg",rating:3},

{name:"Fitmate Navy Fitness Band",category:"accessories",dept:"men",price:2249.00,description:"Monitor your heart rate during workouts with this smart band. The monitor comes with Bluetooth smart technology. It collects your data including steps, distance walked, calories burnt and even sleep patterns to assess your lifestyle and help you make healthier choices.",quantity:20,img:"img/49.jpg",rating:3},

{name:"Misfit copper-toned smart band",category:"accessories",dept:"men",price:5246.00,description:"Monitor your heart rate during workouts with this smart band.. The monitor comes with Bluetooth smart technology. It collects your data including steps, distance walked, calories burnt and even sleep patterns to assess your lifestyle and help you make healthier choices.",quantity:20,img:"img/50.jpg",rating:4},

{name:"Floyd Aviator sunglasses",category:"accessories",dept:"men",price:519.00,description:"The new range of sunglasses from Floyd make protecting your eyes stylish and fun. You can team these with any casual outfit before heading outdoors.",quantity:20,img:"img/51.jpg",rating:5},

{name:"Ray-Ban clubmaster sunglasses",category:"accessories",dept:"men",price:8490.00,description:"hen style meets fashion, a masterpiece is created. This pair of sunglasses by Ray-Ban is manufactured with an unmatched quality to cater to the needs of todays ambitious youth. Accessorise your casual ensemble with it and match your shoes to steal the show.",quantity:20,img:"img/52.jpg",rating:3},
{name:"Nikon camera",category:"cameras",dept:"electronics",price:22000,description:"Nikon D3300 (Body with AF-P DX NIKKOR 18 - 55 mm F3.5 - 5.6 VR Kit Lens) DSLR Camera  (Black)",quantity:20,img:"img/19.jpg",rating:4},
{name:"Sony camera",category:"cameras",dept:"electronics",price:32000,description:"Sony DSC-RX100 IV Point & Shoot Camera  (Black)",quantity:20,img:"img/20.jpg",rating:4},
{name:"Canon camera",category:"cameras",dept:"electronics",price:53000,description:"Canon EOS 1200D (Kit with 8 GB Card & Bag EF S18-55 IS II+55-250mm IS II) DSLR Camera  (Black)",quantity:20,img:"img/21.jpg",rating:4},
{name:"Fujifilm instant camera",category:"cameras",dept:"electronics",price:5080.00,description:"Effective Pixels: 0.6 MP,1 Year Warranty and Focusing Range: 0.6m-infinity",quantity:20,img:"img/53.jpg",rating:5},

{name:"Panasonic Full HD camcorder camera ",category:"cameras",dept:"electronics",price:25500.00,description:"Combining intuitive controls and innovative features, the Panasonic HC-V380K Full HD Camcorder aims to bring a sense of fun and creativity to the traditional handheld camcorder, while still yielding high-quality results. Chief among these features is a Wireless Multi-Camera function that lets you record up to two additional camera angles as picture-in-picture windows from Wi-Fi connected mobile devices",quantity:20,img:"img/54.jpg",rating:3},
{name:"Nikon point & shoot camera",category:"cameras",dept:"electronics",price:6450.00,description:"Going on a vacation? Travel light. Leave your bulky and heavy DSLR camera behind and still shoot stunning photos with the Nikon 20.1 MP Coolpix A100 point and shoot camera.",quantity:20,img:"img/55.jpg",rating:5},

{name:"HP laptop",category:"laptop",dept:"electronics",price:26490,description:"HP Core i3 5th Gen - (4 GB/1 TB HDD/DOS) W6T33PA 15-ay019TU Notebook  (15.6 inch, Turbo Silver, 2.19 kg)",quantity:20,img:"img/22.jpg",rating:4},
{name:"Dell Laptop",category:"laptop",dept:"electronics",price:32900,description:"Dell Inspiron APU Quad Core A10 6th Gen - (8 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) Z566120HIN9 5555 Notebook  (15.6 inch, Black, 2.3 kg)",quantity:20,img:"img/23.jpg",rating:4},
{name:"Mac",category:"laptop",dept:"electronics",price:53900,description:"Apple Macbook Pro Core i5 - (4 GB/500 GB HDD/OS X Mavericks) MD101HN/A A1278 Notebook  (13.3 inch, Silver, 2.06 kg)",quantity:20,img:"img/24.jpg",rating:4},
{name:"Lenovo Yoga 500 Core i3 5th Gen laptop",category:"laptop",dept:"electronics",price:39990.00,description:"Use it as a laptop when you need it or use it as a tablet when you are on the move, either way, the Lenovo Yoga 500 makes computing stylish and effortless. Featuring a 360-degree flip-and-fold design, an ultra-thin body and a powerful processor, this laptop is as hardworking as you.",quantity:20,img:"img/56.jpg",rating:5},
{name:"Acer ES 11 Celeron Dual Core 4th Gen laptop",category:"laptop",dept:"electronics",price:16490.00,description:"Touchpad with Multi Gesture Supporting Two-finger Scroll and Pinch, Swipes Access Charms, Application Commands (Microsoft Precision Touchpad Certification),FineTip Keyboard with International Language Support",quantity:20,img:"img/57.jpg",rating:4},
{name:"HP Pavilion Core i5 6th Gen",category:"laptop",dept:"electronics",price:56490.00,description:"Island-style Backlit Keyboard with Numeric Keypad Pointer Device,HP Imagepad with Multi-touch Gesture Support,Included Software HP CoolSense Technology, Cyberlink Power Media Player, Cyberlink PowerDirector, HP Games (Shareware) Additional Features:Prismatic Battery, Supports Fast Charge, Security and Maintenance: 3D Drive Guard HDD Protection, HP Support Assistant 8.0, Recovery Kit: Recovery Manager Installer for Windows 10, Miracast Certified, Intel WiDi",quantity:20,img:"img/58.jpg",rating:5},
{name:"Apple MacBook Pro Core i5",category:"laptop",dept:"electronics",price:93990.00,description:"Showcase powerful computing and good looks by investing in this Apple MacBook Pro.  Featuring Retina Display and a powerful processor, this laptop delivers an immersive viewing experience along with seamless multitasking with minimal lag,(13.3 inch, SIlver, 1.58 kg)",quantity:20,img:"img/59.jpg",rating:4},

{name:"mi",category:"mobile",dept:"electronics",price:6490,description:"Redmi 3S (Gold, 16 GB)",quantity:20,img:"img/25.jpg",rating:4},
{name:"lenovo",category:"mobile",dept:"electronics",price:12900,description:"Lenovo Vibe K5 Note (Gold, 32 GB)  (With 4 GB RAM)",quantity:20,img:"img/26.jpg",rating:4},
{name:"iphone7",category:"mobile",dept:"electronics",price:65000,description:"Apple iPhone 7 (Jet Black, 128 GB)",quantity:20,img:"img/27.jpg",rating:4},

{name:"ipod",category:"iPods & mp3 Players",dept:"electronics",price:12000,description:"Apple product",quantity:20,img:"img/65.jpg",rating:5},

{name:"w black printed kurta",category:"apparels",dept:"women",price:899,description:"Black printed kurta, has a mandarin collar with a short concealed button placket, three-quarter sleeves with roll-up tab features, side slits, and a high-low hem",quantity:20,img:"img/10.jpg",rating:4},
{name:"anouk blue denim top",category:"apparels",dept:"women",price:1279,description:"Blue denim top, has a round neck, an stylised button closure, long sleeves with roll-up tab features, a patch pocket, dipped hem",quantity:20,img:"img/11.jpg",rating:4},
{name:"roadster navy jeans",category:"apparels",dept:"women",price:2295,description:"A pair of blue 5-pocket mid-rise jeans, lightly faded,a waistband with belt loops",quantity:20,img:"img/12.jpg",rating:4},

{name:"catwalk gold flats",category:"footwear",dept:"women",price:519,description:"A pair of gold-toned flats Synthetic upper, has a forefoot strap with a toe holder,a midfoot strap and a backfoot strap secured with an adjustable buckle closure",quantity:20,img:"img/13.jpg",rating:4},
{name:"nike white sport shoes",category:"footwear",dept:"women",price:3995,description:"A pair of round-toed white sneakers, has regular styling, lace-up detail",quantity:20,img:"img/14.jpg",rating:4},{name:"bata brown wedges",category:"footwear",dept:"women",price:988,description:"A pair of open-toed brown printed and woven sandals, has regular styling, open back detail Synthetic upper Cushioned footbed Textured and patterned outsole",quantity:20,img:"img/15.jpg",rating:4},

{name:"fastrack women pink dial watch",category:"accessories",dept:"women",price:1599,description:"Steel-toned bracelet-style metal strap Water-resistant up to 30 m Comes in a signature Fastrack case",quantity:20,img:"img/16.jpg",rating:4},{name:"ray ban women sunglasses",category:"accessories",dept:"women",price:2345,description:"Metal, full frame High bridge with flexible nose pads The glasses come in a signature Ray-Ban case",quantity:20,img:"img/17.jpg",rating:4},{name:"puma navy snow scarf",category:"accessories",dept:"women",price:587,description:"Navy blue knitted scarf",quantity:20,img:"img/18.jpg",rating:4},

{name:"american tourister red bag",category:"trolley bags",dept:"bags&luggages",price:2055,description:"Has trolley with retractable handle, corner mounted inline skate wheels and One main zip compartment",quantity:20,img:"img/28.jpg",rating:4},{name:"safari brown bag",category:"trolley bags",dept:"bags&luggages",price:3149,description:"Brown textured trolley suitcase with stitched detailing, has contrast branding on the front and Two external zip pockets on the front",quantity:20,img:"img/29.jpg",rating:4},{name:"skybags blue small trolley bag",category:"trolley bags",dept:"bags&luggages",price:3850,description:"One main zip compartment with a combination number lock, has an inner zip lining, a zip pocket, dual elasticated tabs secured with click clasps",quantity:20,img:"img/30.jpg",rating:4},

{name:"lavie peach women handbag",category:"handbags",dept:"bags&luggages",price:1504,description:"Two short handles One main zip compartment with two zip pockets and two slip pockets,A zip pocket on the back",quantity:20,img:"img/31.jpg",rating:4},{name:"butterflies orange women handbag",category:"handbags",dept:"bags&luggages",price:2314,description:"Two short handles with a metallic butterfly-shaped dangler on one side Two main zip compartments, has two inner slip pockets and zip pocket",quantity:20,img:"img/32.jpg",rating:4},{name:"baggit blue wallet",category:"handbags",dept:"bags&luggages",price:1200,description:"Has one main compartment secured with a zip closure and an inner zip separator sleeve One external pocket with a flap closure",quantity:20,img:"img/33.jpg",rating:4},

{name:"puma black and red  backpack",category:"backpacks",dept:"bags&luggages",price:699,description:"Black and red backpack with printed and stitched details, has a reflective loop detailing, PUMA Cat logo and branding on the front",quantity:20,img:"img/34.jpg",rating:4},
{name:"skybag navy dunk laptop backpack",category:"backpacks",dept:"bags&luggages",price:1245,description:"Navy and grey laptop backpack One padded handle on the top, two padded and adjustable shoulder straps",quantity:20,img:"img/35.jpg",rating:4},
{name:"wildcraft blue messenger bag",category:"backpacks",dept:"bags&luggages",price:1199,description:"Blue messenger bag, has a printed flap across the mouth with a zip pocket secured with a click clasp One long adjustable shoulder strap",quantity:20,img:"img/36.jpg",rating:4}

];











app.get('/insertcloud',function(req,res){
    console.log("iam in insert cloud");

    for(var i = 0; i< data.length; i++){
        db.ecommerce.insert(data[i],function(err,docs){
            console.log("Inserted data at ",i); 
        });
    } 
    
       
});


app.post('/featureProd',function(req,res){
	console.log("iam in nginit server");
	var collection = featured.collection('featureProd');
	collection.find(function(err,doc)
					{
		if(err){
			return;
		}
		else{
			res.json(doc);
			console.log("from init server");         
		}
	});

});




app.post('/ecommerce',function(req,res){

	console.log("iam in server control");
	var collection=db.collection('ecommerce');

	console.log(req.body);
	collection.find(req.body,function(err,doc)
					{

		if(err)
		{
			return;
		}
		else
		{
			res.json(doc);
			console.log("From server.js post");
			console.log(req.body);
		}
	});
});



app.post('/userDetails', function (req, res) {
	console.log("from server userDetails");

	var sessionDetails=[];
	var sid = req.sessionID;
	var sess = req.session;
	sessionDetails.push(sid);
	sessionDetails.push(sess);

	console.log(req.body);
	var collection=users.collection('userDetails');
	var document = {"firstname":req.body.firstname, "secondname":req.body.secondname,"password":req.body.password,"emailid":req.body.emailid,"phone":req.body.phone,"address":req.body.address};

	collection.findOne({'emailid':req.body.emailid},function(error,exist){
		if(exist && !error){
			console.log("User already exists");
			console.log(req.body.emailid);
			collection.find({'emailid':req.body.emailid},function(err,doc){
				console.log(doc);
				sessionDetails.push(doc);
				sessionDetails.push("OldUser");
				res.json(sessionDetails);
			});
		}
		else{
			console.log("user not found");
			console.log(document);
			if(document.firstname==undefined){
				console.log("firstname not found");
				res.json(null);
			}
			else{

				collection.insert(document,function(err,doc){
					if(err)
						console.log(err);
					else
					{
						console.log("item inserted");
						sessionDetails.push(doc);
						sessionDetails.push("NewUser")
						res.json(sessionDetails);

					}

				});
			}



			console.log("from server.js userDetails");
		}

	})


});






app.post('/getAddress',function(req,res){

	console.log(req.body);

	var collection=users.collection('userDetails');

	collection.find({'emailid':req.body.emailid},{'address':1},function(err,doc){


		if(err)
		{
			return;
		}
		else
		{
			res.json(doc);
			console.log(doc);
			console.log("address sent");

		}



	});



});


app.post('/userProducts',function(req,res){
	console.log("inside userProducts");
	console.log(req.body);
	console.log(req.body.length);
	var collection=orders.collection('userOrders');
	var collection1=db.collection('ecommerce');
	// var document = {"emailid":req.body[0],"products":req.body[1]};

	collection.find({'emailid':req.body[0]},function(error,exist){
		if(exist && !error){
			console.log("user found");

			for(var i=0;i<req.body.length;i++){
				console.log("inside for loop userProducts");
				console.log(req.body[i]);
				var tempName=req.body[i].name;
				console.log(tempName);
				var tempCount=req.body[i].count;
				console.log(tempCount);
				collection1.find({'name':req.body[i].name},{'quantity':1,'name':1},function(err,doc){
					if(!err){
						console.log(doc[0].quantity);
						console.log("for loop qunatoty update");
						console.log(doc[0].name);
						console.log(doc[0].quantity-tempCount);
						collection1.update({'name':doc[0].name},{$set:{'quantity':doc[0].quantity-tempCount}},function(err,doc){
							console.log("modified");
							console.log(doc);


						});

					}
					else{
						console.log("not found");
						res.send("not found in db");
					}
				});
			}
			res.send("updated in db");

		}

	});


});





app.post('/insert',function(req,res){
	console.log(req.body);
	console.log(req.body[1].length);
	var collection=orders.collection('userOrders');
	var document = {"emailid":req.body[0],"products":req.body[1]};

	collection.insert(document,function(err,docs){



		if(err){
			console.log(err);
		}
		else{

			res.send("inserted into previous orders");

		}

	})   
});

app.post('/insertWishlist',function(req,res){
	console.log(req.body);
	console.log(req.body[1].length);
	var collection=wishlist.collection('wishlistProducts');
	var document = {"emailid":req.body[0],"products":req.body[1]};

    collection.remove({'emailid':req.body[0]},function(err,doc){
        
        console.log("removed from db");
           });
        
     collection.insert(document,function(err,docs){

      console.log("in insert");

		if(err){
			console.log(err);
		}
		else{

			res.send("inserted into wishlist");

		}

	});
            
        
  
});
app.post('/removeWishlist',function(req,res){
	console.log(req.body);
	console.log(req.body[1].length);
	var collection=wishlist.collection('wishlistProducts');
	var document = {"emailid":req.body[0],"products":req.body[1]};

	collection.remove(document,function(err,docs){



		if(err){
			console.log(err);
		}
		else{

			res.send("inserted into wishlist");

		}

	})   
});




app.post('/previousOrders',function(req,res){

	console.log(req.body);

	var collection=orders.collection('userOrders');
	collection.find({'emailid':req.body.emailid},{'products':1},function(err,doc){

		if(err)
		{
			return;
		}
		else
		{
			console.log(doc);
			res.json(doc);
			console.log("sent previous products from server");

		}
	});
});

app.post('/wishlistProducts',function(req,res){

	console.log(req.body);

	var collection=wishlist.collection('wishlistProducts');
	collection.find({'emailid':req.body.emailid},{'products':1},function(err,doc){

		if(err)
		{
			return;
		}
		else
		{
			console.log(doc.length);
			//res.json(doc[doc.length-1]);
            res.json(doc);
			console.log("sent wishlist products from server");

		}
	});
});

