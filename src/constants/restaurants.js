const restaurants = [
  {
    position: {
      lat: 48.850861,
      lng: 2.377926
    },
    title: 'East mamma',
    description: 'Restaurant Italien. Produits de qualité pour des plats de qualité.',
    address: '33 Rue du Faubourg Saint-Antoine • 75011 Paris',
    budget_scale: 4
  }, {
    position: {
      lat: 48.857127,
      lng: 2.378408
    },
    title: 'Chez Aline',
    description: 'Traiteur / Sandwicherie. Tortilla de patatas, ex.ce.llen.te.',
    address: '85 Rue de la Roquette • 75011 Paris',
    budget_scale: 8
  }, {
    'position': {
      'lat': 48.853131,
      'lng': 2.376798
    },
    'title': 'Starvin Joe',
    description: 'Mar1 y est déjà allé genre trois fois. On peut dire que c\'est un bon burger.',
    address: '42 Rue de Charonne • 75011 Paris',
    budget_scale: 5
  }, {
    'position': {
      'lat': 48.853272,
      'lng': 2.379049
    },
    title: 'Chez Gladines',
    description: 'Restauration du typique du Sud de la France. Plats copieux pour des prix raisonnables.',
    address: '64 Rue de Charonne • 75011 Paris',
    budget_scale: 3
  }, {
    'position': {
      'lat': 48.8568045,
      'lng': 2.3779875
    },
    'title': 'La fée verte',

      'description': '',
      'address': '108 rue de la Roquette • 75011 Paris',
      'budget_scale': 5
  }, {
    'position': {
      'lat': 48.8544782,
      'lng': 2.3711407
    },
    'title': 'Momji',

      'description': '',
      'address': '20 Rue Daval • 75011 Paris',
      'budget_scale': 5
    
  }, {
    'position': {
      'lat': 48.8544782,
      'lng': 2.3711407
    },
    title: 'Café des anges',
    description: '',
    address: '66 Rue de la Roquette • 75011 Paris',
    budget_scale: 5
    
  }, {
    'position': {
      'lat': 48.8572733,
      'lng': 2.3732052
    },
    title: 'La Marelle',
    description: 'Bar-bistrot simple avec terrasse doté de chaises d\'écoliers pour une cuisine fine et un retour en enfance.',
    address: '20 Rue Breguet • 75011 Paris',
    budget_scale: 5,
  }, {
    'position': {
      'lat': 48.854488,
      'lng': 2.37082
    },
    'title': 'Jun\'Sushi',
    'description': 'Buffet à volonté sur place.',
    'address': '18 Rue Daval • 75011 Paris',
    'budget_scale': 5
  },
  {
    'position': {
      'lat': 48.853097,
      'lng': 2.378275
    },
    'title': 'Le Chalet Savoyard',

    'description': 'Raclette Suisse.',
    'address': '58 Rue de Charonne • 75011 Paris',
    'budget_scale': 5
    
  },
  {
    'position': {
      'lat': 48.853663,
      'lng': 2.372831
    },
    'title': 'L\'île aux Bokits',
    'description': 'Sandwiches à la mode Guadeloupéenne : les bokits.',
    'address': '12 Rue de Lappe • 75011 Paris',
    'budget_scale': 5
  },
  {
    'position': {
      'lat': 48.8565472,
      'lng': 2.3732662
    },
    'title': 'Fresh Bagel & Juice',
    'description': '',
    'address': '1 Rue Froment • 75011 Paris',
    'budget_scale': 5
  },
  {
    'position': {
      'lat': 48.85608,
      'lng': 2.370976
    },
    'title': 'New Hanoï',
    'description': 'Très bon, petite salle, l\'attente y est nulle entre 12h et 12h30.',
    'address': '25 Rue Saint-Sabin • 75011 Paris',
    'budget_scale': 5
  },
  {
    'position': {
      'lat': 48.8566843,
      'lng': 2.373068
    },
    'title': 'La Robe de la girafe',
    'description': '',
    'address': '5 Rue Froment • 75011 Paris',
    'budget_scale': 5
  },
  {
    position: {
      lat: 48.8551897,
      lng: 2.374018999
    },
    title: 'Café Divan',
    description: '',
    address: '60 rue de la Roquette • 75011 Paris',
    budget_scale: 5
  }, {
    'position': {
      'lat': 48.855505,
      'lng': 2.374143
    },
    'title': 'Blue Elephant',
    'description': '',
    'address': '45 Rue de la Roquette • 75011 Paris',
    'budget_scale': 10
  }, {
    'position': {
      'lat': 48.855004,
      'lng': 2.374733
    },
    'title': 'Wok Cooking',
    'description': 'Ingrédients, épices et sauces à choisir soi-même pour des plats asiatiques cuits au wok dans un lieu sobre.',
    'address': '25 Rue des Taillandiers • 75011 Paris',
    'budget_scale': 4
  }, {
    'position': {
      'lat': 48.861793,
      'lng': 2.373047
    },
    'title': 'East Side Burgers',
    'description': 'Ce petit restaurant coloré aux briques apparentes propose des burgers et hot dogs végétariens et des desserts.',
    'address': '60 Boulevard Voltaire • 75011 Paris',
    'budget_scale': 5
  }, {
    'position': {
      'lat': 48.855188, 
      'lng': 2.372102
    },
    'title': 'Augustine',
    'description': '',
    'address': '10 Rue Saint-Sabin • 75011 Paris',
    'budget_scale': 5
  }, {
    'position': {
      'lat': 48.857788,
      'lng': 2.367210
    },
    'title': 'Les Caves Saint Gilles',
    'description': 'Tapas et plats accompagnés de vins espagnols dans un bistrot de type bodega madrilène tapissé d\'azuleros.',
    'address': '4 Rue Saint-Gilles • 75003 Paris',
    'budget_scale': 5
  }, {
    'position': {
      'lat': 48.855564,
      'lng': 2.372300
    },
    'title': 'Café de l\'Industrie',
    'description': 'Restaurant français proposant une carte de plats classiques, dans une atmosphère patinée chaleureuse.',
    'address': '16 Rue Saint-Sabin • 75011 Paris',
    'budget_scale': 5
  }, {
    'position': {
      'lat': 48.853364,
      'lng': 2.375627
    },
    'title': 'Chez Celeste',
    'description': 'Musique et cuisine brésiliennes ou cap-verdiennes et rhums arrangés dans un restaurant et café-concert animé.',
    'address': '29 rue de Charonne • 75011 Paris',
    'budget_scale': 5
  }, {
    'position': {
      'lat': 48.853364,
      'lng': 2.375627
    },
    'title': 'Mio Posto',
    'description': 'Pas aussi bon qu\'East Mamma. Mais très bon restaurant Italien.',
    'address': '24 rue Keller • 75011 Paris',
    'budget_scale': 5
  }
];

export default restaurants;