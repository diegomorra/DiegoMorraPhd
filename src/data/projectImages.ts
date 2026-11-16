// Project images with alt text written for screen-reader users.
// Alt text was written by looking at each image (Nov 2026). Most images are
// hosted externally (old website, i.ibb.co, La Biennale); photos supplied
// directly by Diego are in public/projects/.

export interface ProjectImage {
  src: string;
  alt: string;
}

export const projectImages: Record<string, ProjectImage[]> = {
  "prototyping-toolkits": [
    {
      src: "/projects/makenodes.jpg",
      alt: "Hands handling MakeNodes modules: 3D-printed blue and grey blocks with illustrated labels, one reading “Mi illumino con una luce fissa” (I light up with a steady light).",
    },
    {
      src: "https://i.ibb.co/hXvTfL8/08.png",
      alt: "Exploded drawing of the COBO board: a 10-inch tablet slots into the front, plug-in pieces such as a bench sit on round bases on top, and a side panel holds sensors.",
    },
    {
      src: "https://i.ibb.co/HCxm7tc/rendering-Vista-corrente-con-schermo.jpg",
      alt: "Render of the COBO board: a white box with a tablet showing the COBO start screen, topped by miniature park pieces such as a slide, bench, tree, fountain and bin.",
    },
    {
      src: "https://i.ibb.co/ngh6cHL/interactive-objects-render-5-0.jpg",
      alt: "Render of a COBO plug-in piece: a miniature three-headed street lamp on a green disc base, ending in a gold jack plug that connects it to the board.",
    },
    {
      src: "https://i.ibb.co/H2HGbxF/reading-low.jpg",
      alt: "COBO tablet app: button, tree and coloured-light cards form a complete combination, while the illustrated voice assistant Virginia offers to activate it.",
    },
    {
      src: "https://i.ibb.co/mh06nD7/prototipo-alphaok-10-min.jpg",
      alt: "Printed COBO cards on a table: blue input cards (Light, Distance), green object cards (Map), a yellow Vibration card, and card backs with scannable codes.",
    },
    {
      src: "https://i.ibb.co/HPQK9Zj/prototipo-alphaok-11-min.jpg",
      alt: "COBO prototype in use: a hand shows a yellow card to the tablet camera, while handmade miniatures of a bridge, signpost, map and tree stand on the board.",
    },
    {
      src: "https://i.ibb.co/T296Ytm/prototipo-alphaok-6-min.jpg",
      alt: "COBO prototype in use: a hand presses a button on the side panel, the signpost's base glows green, and the tablet confirms the card combination is active.",
    },
  ],
  iotgo: [
    {
      src: "/projects/iotgo.jpg",
      alt: "The IoTgo game board with blue 3D-printed miniature furniture (a chair, a table and a box), while a student's hand reaches for a flat blue piece on the board.",
    },
  ],
  vibs: [
    {
      src: "/projects/vibs.webp",
      alt: "Test of the VIBS prototype outdoors: a man with his eyes closed wears the swimming cap, with a small module on top wired to a black vest, while a hand in the foreground holds a remote control.",
    },
  ],
  "thesis-book": [
    {
      src: "https://i.ibb.co/tZC0sQY/DSC-7815-min.jpg",
      alt: "The COBO thesis book propped against a peeling wall: a pale grey cover wrapped in a fluorescent orange band printed with a line drawing of the board.",
    },
    {
      src: "https://i.ibb.co/6r3s4Y9/DSC-7818-min.jpg",
      alt: "Open thesis book showing its two-page table of contents in coral type, from Introduction and State of the Art to Development, User Studies and References.",
    },
    {
      src: "https://i.ibb.co/stDkpcc/DSC-7823-min.jpg",
      alt: "Close-up of the book's list of figures in coral type on grey paper, with entries such as COBO's logo, typography system and printed game board.",
    },
    {
      src: "https://i.ibb.co/xHNM94c/DSC-7838-min.jpg",
      alt: "Open thesis book seen through dark bars: a text page faces the app's UI kit, with coral icons and buttons and green and red feedback states.",
    },
    {
      src: "https://i.ibb.co/FnyjQKf/DSC-7846-min.jpg",
      alt: "Open book at the User Interface section: a large coral pull quote on early WIMP interfaces, body text and a small figure showing how the document icon evolved.",
    },
    {
      src: "https://i.ibb.co/tmHhwxb/DSC-7908-min.jpg",
      alt: "The COBO thesis book on a terrazzo floor, resting on an unfolded pink poster charting the app's user flow, from switch-on and tutorials to card combinations.",
    },
    {
      src: "https://i.ibb.co/K5VnVBg/DSC-7896-min.jpg",
      alt: "The COBO thesis book standing half-open on a worn stone stair, its fluorescent orange band bright against the dark grey stairwell.",
    },
  ],
  stradanove: [
    {
      src: "https://i.ibb.co/FWBMyd8/stradanove01.png",
      alt: "Stradanove logo, an outlined S9 monogram above the wordmark, in four versions: yellow and black on white, white on black, white on yellow, and all black.",
    },
    {
      src: "https://i.ibb.co/vj20VGg/stradanove02.jpg",
      alt: "Business card mockup: stacks of yellow cards patterned with the outlined monogram, alongside white sides with placeholder contact details and the logo.",
    },
    {
      src: "https://i.ibb.co/pWkgfg0/stradanove03.jpg",
      alt: "Stationery mockup: letterhead, white and yellow business cards, a yellow envelope with the Stradanove logo and a yellow pencil on a light grey surface.",
    },
    {
      src: "https://i.ibb.co/Jv6Vb64/stradanove07.jpg",
      alt: "Mockup of a yellow pin badge bearing the white S9 monogram over a tone-on-tone pattern made of the same letterforms.",
    },
    {
      src: "https://i.ibb.co/Wyrx8WB/stradanove04.jpg",
      alt: "Mockup of a yellow fabric face mask covered in the tone-on-tone monogram pattern, with a small white S9 monogram near the ear strap.",
    },
    {
      src: "https://i.ibb.co/bvqNbSB/stradanove08.jpg",
      alt: "Poster mockup: a yellow poster with the monogram pattern, the Stradanove logo at the top, a white placeholder headline and the stradanove.it web address.",
    },
    {
      src: "https://i.ibb.co/wL0Fk0F/stradanove09.png",
      alt: "Laptop and smartphone mockups of a yellow Stradanove web page with the monogram pattern, a large white logo and an Italian headline meaning “A new identity”.",
    },
  ],
  "state-of-decay": [
    {
      src: "https://i.ibb.co/fqytCV2/statedecay03.jpg",
      alt: "Legend card beside the concrete region pieces: height shows each region's share of Italy's disused buildings, cracks the share of its own buildings in disuse.",
    },
    {
      src: "https://i.ibb.co/nDLq6Sp/statedecay04.jpg",
      alt: "Close-up of the Valle d'Aosta piece: a low concrete cylinder shattered into chunks, with green moss sprouting from the cracks and fragments fallen beside it.",
    },
    {
      src: "https://i.ibb.co/NWTPVDK/statedecay06.jpg",
      alt: "Rows of concrete cylinders labelled Umbria, Abruzzo, Puglia, Marche, Molise and Basilicata, differing in height and in how cracked and moss-covered they are.",
    },
    {
      src: "https://i.ibb.co/LdS87Vt/statedecay02.jpg",
      alt: "Angled view of the installation: concrete cylinders on a white table, from intact to split apart and mossy, each beside a region label such as Molise or Puglia.",
    },
    {
      src: "https://i.ibb.co/71zHtW5/statedecay05.jpg",
      alt: "Close-up of the tall Abruzzo cylinder, its surface split by deep cracks with moss growing inside, among other broken pieces in soft focus.",
    },
    {
      src: "https://i.ibb.co/NntGycQ/statedecay01.jpg",
      alt: "Two region pieces side by side: Marche, a cylinder with a single crack, and Molise, split into fragments with moss growing between them.",
    },
  ],
  "children-wellbeing": [
    {
      src: "https://i.ibb.co/N1zRvV8/Schermata-2021-05-02-alle-22-27-25.png",
      alt: "Guru logo: the word guru in rounded teal lowercase letters, above an Italian tagline meaning “the guide to everyday rituals”.",
    },
    {
      src: "https://i.ibb.co/526h6Sf/Guru-Product.png",
      alt: "Render of the Guru speaker-lamp: a glowing white rounded body on a teal fabric base with touch controls, shown on teal plinths beside the guru wordmark.",
    },
    {
      src: "https://i.ibb.co/RcN5L4C/Schermata-2021-05-02-alle-22-27-59.png",
      alt: "Guru app design: the app icon and its construction grid, the icon on an iPhone home screen, and a Rituals screen listing homework, wake-up and bedtime routines.",
    },
  ],
  "solo-la-luce": [
    {
      src: "https://i.ibb.co/jMyzFnw/Firmamento.jpg",
      alt: "Vast abandoned salon with peeling walls and a stripped wooden floor; daylight pours through an open arched window where a figure in a white gown stands.",
    },
    {
      src: "https://i.ibb.co/6yqzdNX/IMG-3054.jpg",
      alt: "Frescoed hall with red painted walls, a coffered ceiling and a monumental stone fireplace, where a figure in white sits in soft light from a side window.",
    },
    {
      src: "https://i.ibb.co/NNCghhq/dsc-0902-1.jpg",
      alt: "Derelict ballroom with an ornate green ceiling flaking away, graffiti on the walls and light falling through arched windows onto a figure in white.",
    },
    {
      src: "https://i.ibb.co/34wspbv/dsc-0648-profincorp-1.jpg",
      alt: "Ruined washroom where a young tree grows from the rubble-strewn floor beside a row of sinks, as a figure in white faces the light-filled windows.",
    },
  ],
  lemonsoda: [
    {
      src: "https://i.ibb.co/jJPqy5C/schermatasitolemon-min.jpg",
      alt: "Redesigned Lemonsoda homepage: a dewy black can on a dark, droplet-covered background beside a bold Italian headline, with the brand's other sodas in a row below.",
    },
    {
      src: "https://i.ibb.co/4s6rS00/telefonolemon-min.jpg",
      alt: "Smartphone mockup of the Lemonsoda mobile site: a black page with a row of product-line logos above a group of green Lemonsoda bottles and cans.",
    },
  ],
  "new-gold-rush": [
    {
      src: "https://i.ibb.co/c16N1Dz/Dataviz01.png",
      alt: "Data visualization: diamonds track crypto market caps month by month in 2017–2018, led by Bitcoin, under a scale comparing Bitcoin's CO2 emissions to those of cities.",
    },
  ],
  "memetic-warfare": [
    {
      src: "https://i.ibb.co/sRdfB0X/MWA-01.png",
      alt: "Collage of web articles and search results about memes, including classic meme thumbnails, on blue, overlaid with large white text reading “Memes are funny”.",
    },
  ],
  "design-strategies": [
    {
      src: "https://diegomorra.github.io/assets/Designstrategies/Ds1.png",
      alt: "Design+Strategies logo, a D+S monogram in a soft blob beside the wordmark, shown in orange-to-blue gradient on grey and in white on the same gradient.",
    },
    {
      src: "https://diegomorra.github.io/assets/Designstrategies/Ds3.png",
      alt: "Co-branded lockup on an orange-to-blue gradient: the Politecnico di Milano Department of Design logo and the Design+Strategies logo, split by a thin line.",
    },
    {
      src: "https://diegomorra.github.io/assets/Designstrategies/Ds4.png",
      alt: "Presentation slide titled “Design+Strategies in projects”: a duotone workshop photo with one person pointing at sticky notes, and a CREA Summer Academy side band.",
    },
    {
      src: "https://diegomorra.github.io/assets/Designstrategies/Ds5.jpg",
      alt: "Full-length mobile mockup of the Design+Strategies site: a dark intro screen, three research topics with glossy orange and blue 3D shapes, and a contact footer.",
    },
  ],
  "mapping-invisible": [
    {
      src: "https://diegomorra.github.io/assets/Sclmuseum/SCL_mockup.jpg",
      alt: "Exhibition mockup: a dark gallery wrapped in projected cyan and pink point-cloud visuals, including a three-sided street scan, with tablets on a central table.",
    },
    {
      src: "https://diegomorra.github.io/assets/Sclmuseum/SCL1.jpg",
      alt: "Mapping the [in]visible exhibition: by the large wall title, a seated visitor watches a magenta projection on Rocinha, an informal settlement of 100,000 residents.",
    },
    {
      src: "https://diegomorra.github.io/assets/Sclmuseum/SCL3.jpeg",
      alt: "Wall cases displaying a disassembled Flatburn sensor (orange casing, circuit boards, magnets, solar panel) beside two orange 3D-printed Roboat models.",
    },
    {
      src: "https://diegomorra.github.io/assets/Sclmuseum/SCL7.jpeg",
      alt: "Immersive three-walled projection room: a colourful point-cloud street scan with greenery dissolves into floating pixels, seen from behind a round seat.",
    },
  ],
  flatburn: [
    {
      src: "https://diegomorra.github.io/assets/Sclmuseum/flatburn0.jpg",
      alt: "Title card reading “Flatburn: the open source city scanner” in bold black type with an orange asterisk, and the Senseable City Lab logo in the corner.",
    },
    {
      src: "https://diegomorra.github.io/assets/Sclmuseum/flatburn1.jpg",
      alt: "Render of the Flatburn device: a flat grey housing with a black solar panel on top and magnetic pads underneath for mounting on vehicles.",
    },
  ],
  "biennale-venice-2025": [
    {
      src: "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/re-leaf1.jpg",
      alt: "Render of RE-LEAF: a dense field of brown wooden battens of varying heights rising like a skyline, with a white human scale figure standing beside it.",
    },
    {
      src: "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/releaf01.jpg",
      alt: "RE-LEAF installed in a brick-columned hall: clusters of upright wooden battens of varying heights, washed in green light, rise like a forest among display panels.",
    },
    {
      src: "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/releaf02.jpg",
      alt: "Closer view of RE-LEAF: dense, undulating clusters of green-lit wooden battens of different heights, with brick walls and photo panels behind.",
    },
    {
      src: "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/dataclouds.jpg",
      alt: "DATA CLOUDS scan of a Rio de Janeiro favela street rendered as blue points: house fronts, barred windows and roof edges beneath a dense web of overhead wires.",
    },
    {
      src: "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/dataclouds01.jpg",
      alt: "Still from DATA CLOUDS: a blue point-cloud alley in Vidigal, Rio de Janeiro, with colourful tile-mosaic walls and the bilingual subtitle “There was no commerce”.",
    },
  ],
};
