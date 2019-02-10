export default {
    home_position: {
        position: {
            lat: 48.857511,
            lng: 2.373364,
        },
        icon: './dlbi.png',
    },
    restaurants: [
        {
            id: Math.floor(Math.random() * 10000),
            position: {
                lat: 45.498576,
                lng: -73.653687,
            },
            title: 'Pushap',
            address: '5195 Pare St, Montreal, QC H4P 2B1',
            website: '',
            phone_number: '(514) 737-4527',
            has_mg_discount: false,
        },
        {
            id: Math.floor(Math.random() * 10000),
            position: {
                lat: 45.494984,
                lng: -73.651778,
            },
            title: 'Kanda Sushi Bar',
            address: '7373 Boulevard Décarie, Montréal, QC H4P 2G8',
            website: '',
            phone_number: '(514) 735-7888',
            has_mg_discount: true,
        },
    ],
};
