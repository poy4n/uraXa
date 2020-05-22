const Tag = require('../models/tag');
const session = require('../services/sessionService');
const Post = require('../models/post');
const cloudinary = require('cloudinary');

// tags
const tags = ["Local Knowledge", "History", "Beautiful", "Animals", "Just A Thought", "Scenery/Nature", "People Watching", "Architecture", "Humour", "Poetic", "Food"];

tags.forEach(tag => {
    Tag.createTag(tag);
});

// users
const usersName = ['Trish', 'Terri', 'Rosha', 'Arne'];

const users = [
    {
        email: 'Trish@email.com',
        password: 'pass',
        username: 'Trish_username', 
        position: '(-16.92304, 145.76625)'             
    },
    {
        email: 'Terri@email.com',
        password: 'pass',
        username: 'Terri_username', 
        position: '(-16.92504, 145.76000)'             
    },
    {
        email: 'Rosha@email.com',
        password: 'pass',
        username: 'Rosha_username', 
        position: '(-16.92104, 145.76540)'             
    },
    {
        email: 'Arne@email.com',
        password: 'pass',
        username: 'Arne_username', 
        position: '(-16.92004, 145.76140)'             
    }
]

users.forEach(user => {
    session.signup(user);    
})


// posts
const images = [
    'Trish-_Yorkies_Dolphins.jpg',
    'Trish-_Wild_Pineapples.jpg',
    'Trish-_We_still_have_Hope.jpg',
    'Trish-_Stormy_Sunrise.jpg',
    'Trish-_Rocky_picnic.jpg',
    'Trish-_Hidden_Gem.jpg',
    'Trish-_Gamburra_dog_spot.jpg',
    'Trish-_Dinner_on_the_beach.jpg',
    'Trish-_Afternoon_walk.jpg',
    'Terri-_We_miss_you_Pelican_Man.jpg',
    'Terri-_The_Old_Zoo.jpg',
    'Terri-_Strange_new_ducks.jpg',
    'Terri-_Pilot_Strike.jpg',
    'Terri-_Here_be_stingers.jpg',
    'Terri-_Frog_Hospital.jpg',
    'Terri-_Barron_Gorge_waterstation.jpg',
    'Terri-_A_slinky_friend.jpg',
    'Rosha-_What_tree_is_this_.jpg',
    'Rosha-_Shark_Alley.jpg',
    'Rosha-_Reef_and_Rainforest.jpg',
    'Rosha-_On_the_Beach_literally.jpg',
    'Rosha-_Learning_new_languages.jpg',
    'Rosha-_Land_before_time.jpg',
    'Rosha-_Forest_bathing.jpg',
    'Rosha-_Brioche_and_a_Book.jpg',
    'Rosha-_Blue_Worms.jpg',
    'Arne-_Tropical_fruit_paradise.jpg',
    'Arne-_Talk_to_your_plants.jpg',
    'Arne-_Snake_Catcher.jpg',
    'Arne-_Hospital_get_away.jpg',
    'Arne-_Giant_Jungle_Prawn.jpg',
    'Arne-_Garden_Thief.jpg',
    'Arne-_Fish_all_day.jpg',
]

const posts = [
    {
        name: 'Trish',
        user_id: 1,
        title: 'Yorkies Dolphins', 
        text: 'Heading out to the reef this morning a sleek figure came to play. I\'ve never seen these beauties so close to shore before. It made me think of the sailor stories of dolphins following the ships. These guys defintitely enjoyed playing in the ships slip stream',
        tag_id: 4,
        location: '(-16.802292, 145.718545)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'Wild Pineapples', 
        text: 'I found these on my walk today and thought I had found wild pineapples. Then i remembered it was me who had planted them two years ago! I went home and looked up which fruits take the longest to grow. Do you know?',
        tag_id: 6,
        location: '(-16.927496, 145.685765)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'We still have Hope', 
        text: 'I had a little cry today when I drove past this message mowed into the grass by a local farmer. We are so lucky to have such a lovely community up here in the North. I know we will all stick by eachother through the tough times.',
        tag_id: 9,
        location: '(-16.950406, 145.686144)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'Stormy Sunrise', 
        text: 'A stormy sunrise on the Cairns esplanade really lets you feel alive and ready to start the day. It paints so many different pictures at different times of the day',
        tag_id: 5,
        location: '(-16.912037, 145.770013)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'Rocky Picnic', 
        text: 'The rocks picnic area soothes your soul and resets your balance. The walking trails all through the redlynch valley are terrific',
        tag_id:	1,
        location: '(-16.929607, 145.698190)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'Hidden Gem', 
        text: 'Situated at Smithfield the Cattana wetlands are a hidden gem. Birds,peace, harmony with nature and 5 mins from the major highway. Easy to get to and well worth the effort',
        tag_id: 1,
        location: '(-16.829159, 145.705254)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'Gamburra Dog Spot', 
        text: 'Gamburra has been very deserted recently. I miss seeing everyone out with their dogs but we ran 10km this morning and it made me smile.',
        tag_id: 1,
        location: '(-16.943902, 145.694183)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'Dinner on the beach', 
        text: 'Kewarra beach gives u an amazing view of double island on a tranquil evening. The resort has dinner on the beach from time to time and it’s such a special event.',
        tag_id: 11,
        location: '(-16.775267, 145.682244)'
    },
    {
        name: 'Trish',
        user_id: 1,
        title: 'Afternoon Walk', 
        text: 'Follow any path through cane fields or storm drains and you will find the most incredible green walking trails. Cairns is a wonderland of twisted local paths to get lost on. Maybe not too lost because there are a lot of creatures that share that green with you.',
        tag_id:  6,
        location: '(-16.928782, 145.697370)'
    },
    {
        name: 'Terri',
        user_id: 2,	
        title: 'We Miss you', 
        text: 'Pelican Man	Oh the mudflats of Cairns! Did you now that the Pier shopping centre is built on the foundations of the first two that sunk. The mudflats can\'t be tamed. I used to run through the black mud with my sister much to our mothers disgust. But the legend of the \'Nade\' as we call it is the Pelican man. He would feed the Pelicans in this spot every day rain or shine.',
        tag_id: 2,
        location: '(-16.918694, 145.776687)'
    },
    {
        name: 'Terri',
        user_id: 2,
        title: 'The Old Zoo', 
        text: 'The Old Zoo would make an incredible movie set for anyone looking for a creepy overgrown animal sanctuary. It used to be called Wild World before it became Cairns Tropical Zoo. It was home to Big Charlie a huge crocodile who i think lives in the casino now.',
        tag_id:  2,
        location: '(-16.758099, 145.662264)'
    },
    {
        name: 'Terri',
        user_id: 2,
        title: 'Strange new ducks', 
        text: 'Who are these strange new ducks in centenary lakes? They are far too white and clean to be part of the Cairns mob. Has anyone ever seen tehm before?',
        tag_id: 4,
        location: '(-16.902816, 145.750172)'
    },
    {
        name: 'Terri',
        user_id: 2,
        title: 'Pilot Strike', 
        text: 'It may not feel like it now but Cairns has seen rougher times than these. Back in 1989 the Pilot Strike hit Cairns hard with a massive slump in tourism. But we bounced back by supporting local and standing together.',
        tag_id:  2,
        location: '(-16.903849, 145.763191)'
    },
    {
        name: 'Terri',
        user_id: 2,
        title: 'Here be stingers', 
        text: 'Tourists are often tempted by the inviting blue water in Cairns during summer. It\'s a cruel joke that when the weather is it\'s hottest the water is it\'s deadliest. All swimming must take place in the nets. The water is like soup anyway so find a nice waterfall instead.',
        tag_id: 1,
        location: '(-16.839403, 145.741079)'
    },
    {
        name: 'Terri',
        user_id: 2,
        title: 'Frog Hospital', 
        text: 'Did you know for years Cairns had a dedicated Frog Hospital. It moved to Mission beach last year but they still do fantastic work looking after our big green giants like Fred here.',
        tag_id: 2,
        location: '(-16.906296, 145.760647)'
    },
    {
        name: 'Terri',
        user_id: 2,
        title: 'Barron Gorge Water Station', 
        text: 'This little Hydro station did some impressive work powering Cairns in the 1930\'s. There was no road to the hyrdo plant and the train station was on the other side of the gorge so workers got to work by a FLYING FOX. When you see the waterfall you\'ll understand how impressive that is. The Barron Gorge Hydro visitors centre is no longer open to the public but take my word for it the walk is worth it.',
        tag_id:  2,
        location: '(-16.852350, 145.649403)'
    },
    {
        name: 'Terri',
        user_id: 2,
        title: 'A Slinky Friend', 
        text: 'These carpet pythons have the most stunning patterns and they do a great job of pest control. Unfortunately one died in our walls once and the stench nearly drove us mad. We called him stinky slinky.',
        tag_id: 2,
        location: '(-16.832090, 145.685148)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'What tree is this?', 
        text: 'I see these trees all the time and they weird me out so much. They are tall big rainforest trees but the fruit grows on the trunk of the tree not the branches.',
        tag_id: 5,
        location: '(-16.833946, 145.685522)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'Shark Alley', 
        text: 'I get up early on the weekends to kayak from palm cove to Double Island. Nearby is Scout hat island (You can see why it gets it\'s name). You never kayak between them because this stretch of water is known to locals as Shark Alley. Big tiger sharks are regularly seen stalking around the islands.',
        tag_id:  1,
        location: '(-16.739952, 145.671618)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'Reef and Rainforest', 
        text: '	I love the book Where the Rainforest Meets the Se by Jeannie Baker. It is amazing to see the green slide into the yellow of the beach and then the deep blue sea.',
        tag_id:  5,
        location: '(-16.738978, 145.671768)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'On the Beach Literally', 
        text: 'The restaurant Strait on the Beach feels like a tropical getaway. It is legitamately right on Holloways beach. Park right out the front of the cafe and then sit in gorgeous rustic carved seats looking over the water with an eggs bennie and a cuppa.',
        tag_id: 11,
        location: '(-16.838599, 145.740074)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'Learning new languages', 
        text: 'I actually saw this crocodile on my walk on the Clifton beach boardwalk in Deadmans Gully of all places! I had a giggle at this sign because I\'d never realised how many languages they say watch out in. It\'ll be the only thing I know how to say in German when I finally visit Berlin.',
        tag_id:  1,
        location: '(-16.763779, 145.674597)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'Land before Time', 
        text: 'Sometimes I really feel like we live in Gondwannaland. We need to protect our beautiful World Heritage Listed Rainforest.',
        tag_id: 5,
        location: '(-16.769317, 145.649958)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'Forest Bathing', 
        text: 'How many different types of green are there in the rainforest? There is a beautiful poetry book from local writer Margaret Macisaac "What Green Do I Mean?". I often think this.',
        tag_id: 5,
        location: '(-16.892261, 145.747951)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'Brioche and a Book', 
        text: 'I\'ve had to cancel my trip to Europe but I can still dream. This morning I got a Brioche from La Crouton in Stratford and then sat on the beach reading my lonely planet guide. Best of both worlds for now.',
        tag_id: 6,
        location: '(-16.837154, 145.739769)'
    },
    {
        name: 'Rosha',
        user_id: 3,
        title: 'Blue Worms', 
        text: 'The things you learn when you are a tourist in your own town! I\'m not sure i\'d like to meet one of these creatures but it was fascinating to read about them. The skyrail is a wonderful gateway to the treetops and very educational.',
        tag_id: 1,
        location: '(-16.844669, 145.685411)'
    },
    {
        name: 'Arne',
        user_id: 4,
        title: 'Tropical Fruit', 
        text: 'Paradise	You can\'t beat Rusty\'s Markets for the best fresh fruit and veggies. Nothing like a fresh coconut milk and some lychees. Not a bad massage either.',
        tag_id: 1,
        location: '(-16.924232, 145.775541)'
    },
    {
        name: 'Arne',
        user_id: 4,
        title: 'Talk to your plant\'s', 
        text: 'The secret to healthy orchids is a pair of stockings, some charlie carp plant food and some healthy conversation. I talked to these little beauties every day and look at them now.',
        tag_id: 5,
        location: '(-16.928088, 145.731006)'
    },
    {
        name: 'Arne',
        user_id: 4,
        title: 'Snake Catcher', 
        text: 'Nothing more Australian than a Kookaburra',
        tag_id: 4,
        location: '(-16.930509, 145.735097)'
    },
    {
        name: 'Arne',
        user_id: 4,
        title: 'Hospital Getaway', 
        text: 'If you find yourself at the hospital in these uncertain times ask them where the rainforest walk is!',
        tag_id: 1,
        location: '(-16.912275, 145.768928)'
    },
    {
        name: 'Arne',
        user_id: 4,
        title: 'Giant Jungle Prawn', 
        text: 'Wouldn\'t mid catching some of these! The Cairns Aquarium is actually a top notch tourist destination. They have both fresh and salt water exhibits and a very relaxing reef shelf where they play classical music and you can sit and watch three stories of fish.',
        tag_id: 1,
        location: '(-16.918314, 145.773489)'
    },
    {
        name: 'Arne',
        user_id: 4,
        title: 'Garden Thief', 
        text: 'This wallaby might be what\'s been eating all my \'tomato\' plants!',
        tag_id:	4,
        location: '(-16.930456, 145.736096)'
    },
    {
        name: 'Arne',
        user_id: 4,
        title: 'Fish all Day', 
        text: 'Best fishing spot by far is Clifton Beach. Much quieter than other beaches and you can set up for the whole day. There\'s the fishing museum as you turn into the beach and they have everything you need to get set up for a great day fishing.',
        tag_id: 1,
        location: '(-16.767213, 145.677516)'
    },
    
]

const createPosts = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    
    
    posts.forEach((post, i) => {
       
       
        const imgFileName = images[i];
        console.log(imgFileName);

        
        const fullpath = __dirname + "/images/" + imgFileName;
        
           
        const image = cloudinary.v2.uploader.upload(`${fullpath}`, {folder: "photos"}, (err, res) => {
            console.log(res.url);
            
            Post.createPost(post.title, post.text, post.location, post.user_id, res.url, post.tag_id );
        });
                        
    })
}

createPosts();