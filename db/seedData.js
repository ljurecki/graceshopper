
const {
  createUser,
  createProduct,
} = require('./');

const client = require('./client');

async function dropTables() {
  try {
    console.log('Dropping All Tables... baby!!!');
    await client.query(`
      DROP TABLE IF EXISTS cart_products;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    console.log('Finished Dropping Tables')
  }
  catch (ex) {
    console.log(ex)
  }
};

async function createTables() {
  try {
    console.log('Starting to build tables...');
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    );`);

    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      imageurl TEXT NOT NULL,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL
    );`);

    await client.query(`
      CREATE TABLE cart_products(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        qty INTEGER,
        total INTEGER
      );`);
  
    console.log('Finished Creating Tables')
  }
  catch (ex) {
    console.log(ex)
  }
};

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      { username: 'david', password: 'david1234', isAdmin: true },
      { username: 'mandy', password: 'mandy1234', isAdmin: true },
      { username: 'tyler', password: 'tyler1234', isAdmin: true },
      { username: 'libette', password: 'libette1234', isAdmin: true },
      { username: 'adam', password: 'adam1234', isAdmin: true },
      { username: 'shaun', password: 'shaun1234', isAdmin: false },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create products...');

    const productsToCreate = [
      {
        title:
          "Silent Patient",
        imageurl:
          "https://covers.powells.com/9781250301703.jpg",
        description:
          "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.<br>Alicia's refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London.<br>Theo Faber is a criminal psychotherapist who has waited a long time for the opportunity to work with Alicia. His determination to get her to talk and unravel the mystery of why she shot her husband takes him down a twisting path into his own motivations—a search for the truth that threatens to consume him....",
        price:
          '12.50',
        author:
          'Alex Michaelides',
        genre:
          'Mystery',
      },
      {
        title:
          "The Guest List: A Novel",
        imageurl:
          "https://covers.powells.com/9780062868947.jpg",
        description:
          "On an island off the coast of Ireland, guests gather to celebrate two people joining their lives together as one. The groom: handsome and charming, a rising television star. The bride: smart and ambitious, a magazine publisher. It's a wedding for a magazine, or for a celebrity: the designer dress, the remote location, the luxe party favors, the boutique whiskey. The cell phone service may be spotty and the waves may be rough, but every detail has been expertly planned and will be expertly executed.<br>But perfection is for plans, and people are all too human. As the champagne is popped and the festivities begin, resentments and petty jealousies begin to mingle with the reminiscences and well wishes. The groomsmen begin the drinking game from their school days. The bridesmaid not-so-accidentally ruins her dress. The bride's oldest (male) friend gives an uncomfortably caring toast.<br>And then someone turns up dead. Who didn't wish the happy couple well? And perhaps more important, why?",
        price:
          "11.95",
        author:
          "Lucy Foley",
        genre:
          "Mystery",
      },
      {
        title:
          "The Girl on the Train",
        imageurl:
          "https://covers.powells.com/9781594634024.jpg",
        description:
          "EVERY DAY THE SAME.<br>Rachel takes the same commuter train every morning and night. Every day she rattles down the track, flashes past a stretch of cozy suburban homes, and stops at the signal that allows her to daily watch the same couple breakfasting on their deck. She's even started to feel like she knows them. Jess and Jason, she calls them. Their life—as she sees it—is perfect. Not unlike the life she recently lost.<br>UNTIL TODAY.<br>And then she sees something shocking. It's only a minute until the train moves on, but it's enough. Now everything's changed. Unable to keep it to herself, Rachel goes to the police. But is she really as unreliable as they say? Soon she is deeply entangled not only in the investigation but in the lives of everyone involved. Has she done more harm than good?",
        price:
          "10.50",
        author:
          "Alex Michaelides",
        genre:
          "Mystery",
      },
      {
        title:
          "The Maid",
        imageurl:
          "https://covers.powells.com/9780593356159.jpg",
        description:
          "Molly Gray is not like everyone else. She struggles with social skills and misreads the intentions of others. Her gran used to interpret the world for her, codifying it into simple rules that Molly could live by.<br>Since Gran died a few months ago, twenty-five-year-old Molly has been navigating life's complexities all by herself. No matter — she throws herself with gusto into her work as a hotel maid. Her unique character, along with her obsessive love of cleaning and proper etiquette, make her an ideal fit for the job. She delights in donning her crisp uniform each morning, stocking her cart with miniature soaps and bottles, and returning guest rooms at the Regency Grand Hotel to a state of perfection.<br>But Molly's orderly life is upended the day she enters the suite of the infamous and wealthy Charles Black, only to find it in a state of disarray and Mr. Black himself dead in his bed. Before she knows what's happening, Molly's unusual demeanor has the police targeting her as their lead suspect. She quickly finds herself caught in a web of deception, one she has no idea how to untangle. Fortunately for Molly, friends she never knew she had unite with her in a search for clues to what really happened to Mr. Black — but will they be able to find the real killer before it's too late?<br>A Clue-like, locked-room mystery and a heartwarming journey of the spirit, The Maid explores what it means to be the same as everyone else and yet entirely different — and reveals that all mysteries can be solved through connection to the human heart.",
        price:
          "18.50",
        author:
          "Nita Prose",
        genre:
          "Mystery",
      },
      {
        title:
          "Book Lovers",
        imageurl:
          "https://covers.powells.com/9780593334836.jpg",
        description:
          "Nora Stephens' life is books — she's read them all — and she is not that type of heroine. Not the plucky one, not the laidback dream girl, and especially not the sweetheart. In fact, the only people Nora is a heroine for are her clients, for whom she lands enormous deals as a cutthroat literary agent, and her beloved little sister Libby.<br>Which is why she agrees to go to Sunshine Falls, North Carolina for the month of August when Libby begs her for a sisters' trip away — with visions of a small town transformation for Nora, who she's convinced needs to become the heroine in her own story. But instead of picnics in meadows, or run-ins with a handsome country doctor or bulging-forearmed bartender, Nora keeps bumping into Charlie Lastra, a bookish brooding editor from back in the city. It would be a meet-cute if not for the fact that they've met many times and it's never been cute.<br>If Nora knows she's not an ideal heroine, Charlie knows he's nobody's hero, but as they are thrown together again and again — in a series of coincidences no editor worth their salt would allow — what they discover might just unravel the carefully crafted stories they've written about themselves.",
        price:
          "14.50",
        author:
          "Emily Henry",
        genre:
          "Romance",
      },
      {
        title:
          "Love on the Brain",
        imageurl:
          "https://covers.powells.com/9780593336847.jpg",
        description:
          "Nora Stephens' life is books — she's read them all — and she is not that type of heroine. Not the plucky one, not the laidback dream girl, and especially not the sweetheart. In fact, the only people Nora is a heroine for are her clients, for whom she lands enormous deals as a cutthroat literary agent, and her beloved little sister Libby.<br>Which is why she agrees to go to Sunshine Falls, North Carolina for the month of August when Libby begs her for a sisters' trip away — with visions of a small town transformation for Nora, who she's convinced needs to become the heroine in her own story. But instead of picnics in meadows, or run-ins with a handsome country doctor or bulging-forearmed bartender, Nora keeps bumping into Charlie Lastra, a bookish brooding editor from back in the city. It would be a meet-cute if not for the fact that they've met many times and it's never been cute.<br>If Nora knows she's not an ideal heroine, Charlie knows he's nobody's hero, but as they are thrown together again and again — in a series of coincidences no editor worth their salt would allow — what they discover might just unravel the carefully crafted stories they've written about themselves.",
        price:
          "12.00",
        author:
          "Ali Hazelwood",
        genre:
          "Romance",
      },
      {
        title:
          "It Starts With Us",
        imageurl:
          "https://covers.powells.com/9781668001226.jpg",
        description:
          "Lily and her ex-husband, Ryle, have just settled into a civil coparenting rhythm when she suddenly bumps into her first love, Atlas, again. After nearly two years separated, she is elated that for once, time is on their side, and she immediately says yes when Atlas asks her on a date.<br>But her excitement is quickly hampered by the knowledge that, though they are no longer married, Ryle is still very much a part of her life — and Atlas Corrigan is the one man he will hate being in his ex-wife and daughter's life. Switching between the perspectives of Lily and Atlas, It Starts with Us picks up right where the epilogue for the 'gripping, pulse-pounding' (Sarah Pekkanen, author of Perfect Neighbors) bestselling phenomenon It Ends with Us left off. Revealing more about Atlas's past and following Lily as she embraces a second chance at true love while navigating a jealous ex-husband, it proves that 'no one delivers an emotional read like Colleen Hoover' (Anna Todd, New York Times bestselling author).",
        price:
          "15.00",
        author:
          "Colleen Hoover",
        genre:
          "Romance",
      },
      {
        title:
          "One Last Stop",
        imageurl:
          "https://covers.powells.com/9781250244499.jpg",
        description:
          "For cynical 23-year-old August, moving to New York City is supposed to prove her right: that things like magic and cinematic love stories don't exist, and the only smart way to go through life is alone. She can't imagine how waiting tables at a 24-hour pancake diner and moving in with too many weird roommates could possibly change that. And there's certainly no chance of her subway commute being anything more than a daily trudge through boredom and electrical failures.<br>But then, there's this gorgeous girl on the train.<br>Jane. Dazzling, charming, mysterious, impossible Jane. Jane with her rough edges and swoopy hair and soft smile, showing up in a leather jacket to save August's day when she needed it most. August's subway crush becomes the best part of her day, but pretty soon, she discovers there's one big problem: Jane doesn't just look like an old school punk rocker. She's literally displaced in time from the 1970s, and August is going to have to use everything she tried to leave in her own past to help her. Maybe it's time to start believing in some things, after all.",
        price:
          "11.50",
        author:
          "Casey McQuiston",
        genre:
          "Romance",
      },
    ];
    const products = await Promise.all(

      productsToCreate.map(product => createProduct(product))
    );

    console.log('products created:', products);
    console.log('Finished creating products');
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function rebuildDB() {
  try {
    await client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};