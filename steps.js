let timerId;
const finderFun = async function finder() {

    try {
        console.log("calling finderfun......");
        audio = new Audio('https://freesound.org/data/previews/403/403019_5121236-lq.mp3');
        const proUrl = "";


        const iphone14pro = [
            // IPHONE 14 PRO........
            // "MPVH3LL/A",
            //purple
            "MQ0E3LL/A", "MQ1D3LL/A", "MQ273LL/A", "MQ303LL/A",
            //gold
            "MQ063LL/A", "MQ163LL/A", "MQ213LL/A", "MQ2T3LL/A",
            // silver
            "MQ003LL/A", "MQ0X3LL/A", "MQ1U3LL/A", "MQ2L3LL/A",
            // black
            "MPXT3LL/A", "MQ0N3LL/A", "MQ1K3LL/A", "MQ2E3LL/A",
        ];

        const iphone14proMax = [
            // IPHONE 14 PROMAX........
            //purple
            "MQ8R3LL/A", "MQ8W3LL/A", "MQ913LL/A", "MQ953LL/A",
            //gold
            "MQ8Q3LL/A", "MQ8V3LL/A", "MQ903LL/A", "MQ943LL/A",
            // silver
            "MQ8P3LL/A", "MQ8U3LL/A", "MQ8Y3LL/A", "MQ933LL/A",
            // black
            "MQ8N3LL/A", "MQ8N3LL/A", "MQ8N3LL/A", "MQ923LL/A"
        ]

        const iPhoneModelsCode = [
            ...iphone14pro,
            ...iphone14proMax
        ];


        const requestPromises = [];

        var responses = await Promise.all(
            iPhoneModelsCode.map(
                code =>
                    fetch(`https://www.apple.com/shop/fulfillment-messages?pl=true&mts.0=regular&mts.1=compact&cppart=UNLOCKED/US&parts.0=${code}&searchNearby=true&store=R039`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(
                        (response) =>{
                            if(response.ok){
                                return response && response.json()
                            } else {
                                return {}
                            }
                        }
                    )));

    console.log("responses.........", responses);
    const goodStores = [];
    let productName;

    for (let j = 0; j < responses.length; j++) {
        const productCode = iPhoneModelsCode[j];
        if(responses[j] && responses[j].body){
            const stores = responses[j].body.content.pickupMessage.stores;
            for (let k = 0; k < stores.length; k++) {
                let isAvailable = stores[k].partsAvailability[productCode].pickupDisplay === "available";
                if (isAvailable) {
                    productName = stores[k].partsAvailability[productCode].messageTypes.compact.storePickupProductTitle;
                    goodStores.push({ store: stores[k].makeReservationUrl, productName });
                }
            }
        }
    }

    if (goodStores.length) {
        console.log("available in these stores..............");
        audio.play();
        console.table(goodStores);
        clearInterval(timerId);
    } else {
        console.log("no store found..............");
    }
} catch (e) {
    console.log("error",e);
    debugger;
}
    
}

finderFun();
timerId = setInterval(finderFun,20000);
