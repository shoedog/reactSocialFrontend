const cities = [
    {
        "name": "Worldwide",
        "placeType": {
            "code": 19,
            "name": "Supername"
        },
        "url": "http://where.yahooapis.com/v1/place/1",
        "parentid": 0,
        "country": "",
        "woeid": 1,
        "countryCode": null
    },
    {
        "name": "Winnipeg",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2972",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 2972,
        "countryCode": "CA"
    },
    {
        "name": "Ottawa",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/3369",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 3369,
        "countryCode": "CA"
    },
    {
        "name": "Quebec",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/3444",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 3444,
        "countryCode": "CA"
    },
    {
        "name": "Montreal",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/3534",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 3534,
        "countryCode": "CA"
    },
    {
        "name": "Toronto",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/4118",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 4118,
        "countryCode": "CA"
    },
    {
        "name": "Edmonton",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/8676",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 8676,
        "countryCode": "CA"
    },
    {
        "name": "Calgary",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/8775",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 8775,
        "countryCode": "CA"
    },
    {
        "name": "Vancouver",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/9807",
        "parentid": 23424775,
        "country": "Canada",
        "woeid": 9807,
        "countryCode": "CA"
    },
    {
        "name": "Birmingham",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/12723",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 12723,
        "countryCode": "GB"
    },
    {
        "name": "Blackpool",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/12903",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 12903,
        "countryCode": "GB"
    },
    {
        "name": "Bournemouth",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/13383",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 13383,
        "countryCode": "GB"
    },
    {
        "name": "Brighton",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/13911",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 13911,
        "countryCode": "GB"
    },
    {
        "name": "Bristol",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/13963",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 13963,
        "countryCode": "GB"
    },
    {
        "name": "Cardiff",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/15127",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 15127,
        "countryCode": "GB"
    },
    {
        "name": "Coventry",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/17044",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 17044,
        "countryCode": "GB"
    },
    {
        "name": "Derby",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/18114",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 18114,
        "countryCode": "GB"
    },
    {
        "name": "Edinburgh",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/19344",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 19344,
        "countryCode": "GB"
    },
    {
        "name": "Glasgow",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/21125",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 21125,
        "countryCode": "GB"
    },
    {
        "name": "Hull",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/25211",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 25211,
        "countryCode": "GB"
    },
    {
        "name": "Leeds",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/26042",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 26042,
        "countryCode": "GB"
    },
    {
        "name": "Leicester",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/26062",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 26062,
        "countryCode": "GB"
    },
    {
        "name": "Liverpool",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/26734",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 26734,
        "countryCode": "GB"
    },
    {
        "name": "Manchester",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/28218",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 28218,
        "countryCode": "GB"
    },
    {
        "name": "Middlesbrough",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/28869",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 28869,
        "countryCode": "GB"
    },
    {
        "name": "Newcastle",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/30079",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 30079,
        "countryCode": "GB"
    },
    {
        "name": "Nottingham",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/30720",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 30720,
        "countryCode": "GB"
    },
    {
        "name": "Plymouth",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/32185",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 32185,
        "countryCode": "GB"
    },
    {
        "name": "Portsmouth",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/32452",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 32452,
        "countryCode": "GB"
    },
    {
        "name": "Preston",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/32566",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 32566,
        "countryCode": "GB"
    },
    {
        "name": "Sheffield",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/34503",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 34503,
        "countryCode": "GB"
    },
    {
        "name": "Stoke-on-Trent",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/36240",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 36240,
        "countryCode": "GB"
    },
    {
        "name": "Swansea",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/36758",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 36758,
        "countryCode": "GB"
    },
    {
        "name": "London",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/44418",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 44418,
        "countryCode": "GB"
    },
    {
        "name": "Belfast",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/44544",
        "parentid": 23424975,
        "country": "United Kingdom",
        "woeid": 44544,
        "countryCode": "GB"
    },
    {
        "name": "Perth",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/1098081",
        "parentid": 23424748,
        "country": "Australia",
        "woeid": 1098081,
        "countryCode": "AU"
    },
    {
        "name": "Adelaide",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/1099805",
        "parentid": 23424748,
        "country": "Australia",
        "woeid": 1099805,
        "countryCode": "AU"
    },
    {
        "name": "Brisbane",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/1100661",
        "parentid": 23424748,
        "country": "Australia",
        "woeid": 1100661,
        "countryCode": "AU"
    },
    {
        "name": "Canberra",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/1100968",
        "parentid": 23424748,
        "country": "Australia",
        "woeid": 1100968,
        "countryCode": "AU"
    },
    {
        "name": "Darwin",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/1101597",
        "parentid": 23424748,
        "country": "Australia",
        "woeid": 1101597,
        "countryCode": "AU"
    },
    {
        "name": "Melbourne",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/1103816",
        "parentid": 23424748,
        "country": "Australia",
        "woeid": 1103816,
        "countryCode": "AU"
    },
    {
        "name": "Sydney",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/1105779",
        "parentid": 23424748,
        "country": "Australia",
        "woeid": 1105779,
        "countryCode": "AU"
    },
    {
        "name": "Auckland",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2348079",
        "parentid": 23424916,
        "country": "New Zealand",
        "woeid": 2348079,
        "countryCode": "NZ"
    },
    {
        "name": "Albuquerque",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2352824",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2352824,
        "countryCode": "US"
    },
    {
        "name": "Atlanta",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2357024",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2357024,
        "countryCode": "US"
    },
    {
        "name": "Austin",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2357536",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2357536,
        "countryCode": "US"
    },
    {
        "name": "Baltimore",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2358820",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2358820,
        "countryCode": "US"
    },
    {
        "name": "Baton Rouge",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2359991",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2359991,
        "countryCode": "US"
    },
    {
        "name": "Birmingham",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2364559",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2364559,
        "countryCode": "US"
    },
    {
        "name": "Boston",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2367105",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2367105,
        "countryCode": "US"
    },
    {
        "name": "Charlotte",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2378426",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2378426,
        "countryCode": "US"
    },
    {
        "name": "Chicago",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2379574",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2379574,
        "countryCode": "US"
    },
    {
        "name": "Cincinnati",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2380358",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2380358,
        "countryCode": "US"
    },
    {
        "name": "Cleveland",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2381475",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2381475,
        "countryCode": "US"
    },
    {
        "name": "Colorado Springs",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2383489",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2383489,
        "countryCode": "US"
    },
    {
        "name": "Columbus",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2383660",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2383660,
        "countryCode": "US"
    },
    {
        "name": "Dallas-Ft. Worth",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2388929",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2388929,
        "countryCode": "US"
    },
    {
        "name": "Denver",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2391279",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2391279,
        "countryCode": "US"
    },
    {
        "name": "Detroit",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2391585",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2391585,
        "countryCode": "US"
    },
    {
        "name": "El Paso",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2397816",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2397816,
        "countryCode": "US"
    },
    {
        "name": "Fresno",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2407517",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2407517,
        "countryCode": "US"
    },
    {
        "name": "Greensboro",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2414469",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2414469,
        "countryCode": "US"
    },
    {
        "name": "Harrisburg",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2418046",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2418046,
        "countryCode": "US"
    },
    {
        "name": "Honolulu",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2423945",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2423945,
        "countryCode": "US"
    },
    {
        "name": "Houston",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2424766",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2424766,
        "countryCode": "US"
    },
    {
        "name": "Indianapolis",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2427032",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2427032,
        "countryCode": "US"
    },
    {
        "name": "Jackson",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2428184",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2428184,
        "countryCode": "US"
    },
    {
        "name": "Jacksonville",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2428344",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2428344,
        "countryCode": "US"
    },
    {
        "name": "Kansas City",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2430683",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2430683,
        "countryCode": "US"
    },
    {
        "name": "Las Vegas",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2436704",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2436704,
        "countryCode": "US"
    },
    {
        "name": "Long Beach",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2441472",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2441472,
        "countryCode": "US"
    },
    {
        "name": "Los Angeles",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2442047",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2442047,
        "countryCode": "US"
    },
    {
        "name": "Louisville",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2442327",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2442327,
        "countryCode": "US"
    },
    {
        "name": "Memphis",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2449323",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2449323,
        "countryCode": "US"
    },
    {
        "name": "Mesa",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2449808",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2449808,
        "countryCode": "US"
    },
    {
        "name": "Miami",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2450022",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2450022,
        "countryCode": "US"
    },
    {
        "name": "Milwaukee",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2451822",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2451822,
        "countryCode": "US"
    },
    {
        "name": "Minneapolis",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2452078",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2452078,
        "countryCode": "US"
    },
    {
        "name": "Nashville",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2457170",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2457170,
        "countryCode": "US"
    },
    {
        "name": "New Haven",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2458410",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2458410,
        "countryCode": "US"
    },
    {
        "name": "New Orleans",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2458833",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2458833,
        "countryCode": "US"
    },
    {
        "name": "New York",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2459115",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2459115,
        "countryCode": "US"
    },
    {
        "name": "Norfolk",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2460389",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2460389,
        "countryCode": "US"
    },
    {
        "name": "Oklahoma City",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2464592",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2464592,
        "countryCode": "US"
    },
    {
        "name": "Omaha",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2465512",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2465512,
        "countryCode": "US"
    },
    {
        "name": "Orlando",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2466256",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2466256,
        "countryCode": "US"
    },
    {
        "name": "Philadelphia",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2471217",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2471217,
        "countryCode": "US"
    },
    {
        "name": "Phoenix",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2471390",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2471390,
        "countryCode": "US"
    },
    {
        "name": "Pittsburgh",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2473224",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2473224,
        "countryCode": "US"
    },
    {
        "name": "Portland",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2475687",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2475687,
        "countryCode": "US"
    },
    {
        "name": "Providence",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2477058",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2477058,
        "countryCode": "US"
    },
    {
        "name": "Raleigh",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2478307",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2478307,
        "countryCode": "US"
    },
    {
        "name": "Richmond",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2480894",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2480894,
        "countryCode": "US"
    },
    {
        "name": "Sacramento",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2486340",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2486340,
        "countryCode": "US"
    },
    {
        "name": "St. Louis",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2486982",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2486982,
        "countryCode": "US"
    },
    {
        "name": "Salt Lake City",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2487610",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2487610,
        "countryCode": "US"
    },
    {
        "name": "San Antonio",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2487796",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2487796,
        "countryCode": "US"
    },
    {
        "name": "San Diego",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2487889",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2487889,
        "countryCode": "US"
    },
    {
        "name": "San Francisco",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2487956",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2487956,
        "countryCode": "US"
    },
    {
        "name": "San Jose",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2488042",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2488042,
        "countryCode": "US"
    },
    {
        "name": "Seattle",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2490383",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2490383,
        "countryCode": "US"
    },
    {
        "name": "Tallahassee",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2503713",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2503713,
        "countryCode": "US"
    },
    {
        "name": "Tampa",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2503863",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2503863,
        "countryCode": "US"
    },
    {
        "name": "Tucson",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2508428",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2508428,
        "countryCode": "US"
    },
    {
        "name": "Virginia Beach",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2512636",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2512636,
        "countryCode": "US"
    },
    {
        "name": "Washington",
        "placeType": {
            "code": 7,
            "name": "Town"
        },
        "url": "http://where.yahooapis.com/v1/place/2514815",
        "parentid": 23424977,
        "country": "United States",
        "woeid": 2514815,
        "countryCode": "US"
    },
    {
        "name": "Australia",
        "placeType": {
            "code": 12,
            "name": "Country"
        },
        "url": "http://where.yahooapis.com/v1/place/23424748",
        "parentid": 1,
        "country": "Australia",
        "woeid": 23424748,
        "countryCode": "AU"
    },
    {
        "name": "Canada",
        "placeType": {
            "code": 12,
            "name": "Country"
        },
        "url": "http://where.yahooapis.com/v1/place/23424775",
        "parentid": 1,
        "country": "Canada",
        "woeid": 23424775,
        "countryCode": "CA"
    },
    {
        "name": "New Zealand",
        "placeType": {
            "code": 12,
            "name": "Country"
        },
        "url": "http://where.yahooapis.com/v1/place/23424916",
        "parentid": 1,
        "country": "New Zealand",
        "woeid": 23424916,
        "countryCode": "NZ"
    },
    {
        "name": "United Kingdom",
        "placeType": {
            "code": 12,
            "name": "Country"
        },
        "url": "http://where.yahooapis.com/v1/place/23424975",
        "parentid": 1,
        "country": "United Kingdom",
        "woeid": 23424975,
        "countryCode": "GB"
    },
    {
        "name": "United States",
        "placeType": {
            "code": 12,
            "name": "Country"
        },
        "url": "http://where.yahooapis.com/v1/place/23424977",
        "parentid": 1,
        "country": "United States",
        "woeid": 23424977,
        "countryCode": "US"
    },
]

export default cities;