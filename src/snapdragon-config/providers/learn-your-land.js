const mushroomDefaults = {
    moduleSize: 1,
    lessonPlanLandscape: 3,
    lessonPlanPortrait: 103,
    glossary: ['fungi'],
    iconicTaxa: [ {
        id: 'fungi',
        common: 'Fungi & Lichens'
      } ],
    items: [],
    glossary: ['fungi', 'common'],
};

const learnYourLand1 = {
    id: 1003,
    behaviour: 'static',
    name: 'Learn Your Land - Autumn foraging',
    ...mushroomDefaults,
    species: [ 
        {
          name: 'Grifola frondosa',
          time: [252],
          questionIds: ['8', '9'],
          description: `Key features: a large, grey brown polypore, with overlapping caps, that are fan-shaped and fleshy (unlike many polypores which are woody). The underside is white to grey with numerous tiny pores (and no gills).
          
          Frondosa means leafy or abundant or full of leaves.
          
          The spore print is white.          
          
          This mushroom can be found in late summer to fall in the Northeast US especially on large, old oaks (and generally on living or dead oaks), beeches, maples and other hardwoods. It grows at the base, or close to the base, or on the trunks of trees.          
          
          D‐Fraction, an extract of Maitake my have properties beneficial in the treatment of cancer.`
        },
        {
          name: 'Laetiporus sulphureus',
          time: [360],
          questionIds: ['10', '11'],
          description: `Chicken of the woods has a chicken like texture. It can be found late spring to mid-autumn.

          This mushroom has overlapping clusters or rosette and is commonly found on deciduous trees. 
          
          The cap may be up 12". The top is smooth and faintly wrinkled.
          When fresh it is bright orange to yellow-orange, and sometimes has a bright yellow margin.
          
          Best when young, it is indigestible for some.`
        },
        {
          name: 'Laetiporus cincinnatus',
          time: [446],
          description: `Looks similar to chicken of the woods but there are some key differences. 
          
          Often grows at the base of hardwood trees or a few feet away.

          The caps are duller and paler than L.sulphureus, almost pale orange to pinkish orange in colour.
          
          On the underside the pores are a peachish white in colour.          
  
          Culinary: best eaten when young; indigestible for some. Start small, and cook well.`
        },
        {
          name: 'Craterellus tubaeformis',
          time: [510],
          questionIds: [15],
          description: `The winter chanterelle, yellow foot chanterelle, or trumpet chanterelle belongs to the genus Craterellus, the same genus as the black trumpet; both belong to the same family, Cantharellaceae.
          
          Fairly easy to identify: it's on the smaller side, typically up to 3" across and 3.5" tall.

          The cap is yellowish brown to grayish brown, and with age it becomes funnel shaped with a central depression.
          
          Key feature: on the underside of the cap you will see a fertile surface with vein-like ridges that run down the stalk. These ridges are thickened and blunt, not sharply defined as you would see on most gilled fungi.

          The stalk is hollow, often with a groove running its length, and yellowish-orange.

          The spore print is white.
          
          Typically grows in wet conifer forests from moss, even if the moss is growing up the base of a tree.

          I find it in areas with a lot of eastern hemlock trees.`
        },
        {
          name: 'Hydnum repandum',
          time: [592],
          questionIds: [14],
          description: `Hydnum mushrooms related to the chanterelles and back trumpets; they all belong to the Cantharellales order.

          Toothed mycorrhizal fungi growing summer through fall, and they are a terrestrial mushroom so they do not grow on wood but from the ground under hardwood trees and conifer trees.
        
          This species may not be the species found in Europe.

          Commonly known as the sweet tooth, wood hedgehog or hedgehog mushroom.
          `
        },
        {
          name: 'Hydnum umbilicatum',
          time: [688],
          description: `The species name umbilicatum means navel.
          
          Ressembles Hydnum repandum in many ways, though generally smaller, with a darker cap and a conspicuous central depression on the cap.
          
          Cap is 1-2 inches wide. Texture is smooth and dry and colour is reddish orange to brownish-orange.

          The fertile surface is comprised of spines or teeth to 1/4 inch long, creamy white to pale orange.

          The stalk is 1/2 to 2 1/2 inches long, creamy white or coloured like the cap.

          Bruises a darker colour when handled. The spore colour is white.

          Ecology: wet conifer wood especially eastern hemlock trees.
          `
        },
        {
          name: 'Hericium erinaceus',
          time: [758],
          description: `Hericium: white-spored mushrooms, genus include lion's mane and its allies.

          Hericium mushrooms grow directly on wood, either living or dead trees, and typically on hardwoods.

          All members of the genus considerd edible and unlikely to be confused with members of any other genus.

          Choice edible mushroom that ressembles seafood when cooked properly.

          Treats cognitive impairment and depression due to concentration of biosynthesisers hericenones and erinacines that promote nerve growth factor synthesis in vitro.

          Cushiony, watery mass 3-10 inches wide and tall.

          The only Hericium in eastern north america whose fruiting body is unbranched.

          Fruiting body consists of numerous icicle-like spines or teeth that point downward and tape to a point.

          Each spine is soft and typically 1/2 inch to 2 inches in length.
          `
        },
        {
          name: 'Hericium americanum',
          time: [848],
          description: `Comprised of numerous down-pointing spines that are soft and white.

          Key feature: each spine or tooth is similar in size to those found in Lion's mane.

          Key feature: multiple branches or clusters, each one bearing spines or teeth. 
          `
        },
        {
          name: 'Hericium coralloides',
          time: [889],
          description: ``
        },
        {
          name: 'Calvatia gigantea',
          time: [934],
          quality:[16],
          description: `Puffballs are gasteroid mushrooms (stomach fungi) which produce spores internally.

          The gleba should be pure white inside; with age it will turn olive-yellow, brown, to purple due to the spores.
          
          Before eating check that there are no mushrooms inside, as these may be poisonous (for example a member of the amanita genus).
          
          The giant puffball is bald, smooth and round, soft and white when young, becoming yellow with age. It is 7-12" across, 6-10" high but can grow much larger. Cut open to reveal the outer skin and the gleba. 
          
          It may be found in open woods lawns and pastures, through summer-fall.`
        },
        {
          name: 'Lycoperdon perlatum',
          time: [1064],
          description: `Another puffball you are likely to encounter during the summer and autumn months is the gem-studded puffball, or devil's snuffbox.

          It's fruiting bodies are much smaller; they are typically white to cream coloured, 1-2.5" wide up to 3" tall.

          It is rounded, like other puffballs, but unlike the giant puffball, it has an elongated, stem-like base. 

          It is usually covered with whitish spines and granules, which rub off somewhat easily and will not always be present.

          The inside of the gem-studded puffball is white when young, becoming olive-brown and powdery when mature. Harvest and eat when pure white inside.

          Found on woodland paths and soil or leaf litter, not usually directly on wood but rather on the ground.
          `
        },
        {
          name: 'Lycoperdon pyriforme',
          time: [1123],
          description: `One more puffball encountered in summer and autumn, the pear-shaped, or stump, puffball, another member of the Lycoperdon genus.

          It shares many features in common with the gem-studded puffball, but there are differences.

          Key features: typically smaller than the gem-studded puffball. It is also darker, usually tannish brown rather than pure white. 

          They are occasionally covered in tiny scales or spines, but usually less apparent and less dense.

          The inside of the gem-studded puffball is white when young, becoming olive-brown and powdery when mature. Ensure there is no developing mushroom within the fruiting body before eating.

          pear-shaped puffball grows in dense clusters on logs and stumps.
          `
        },
        {
          name: 'Lepista nuda',
          time: [1195],
          description: `This is not an easy mushroom to identify; I don't consider it to be a beginner's mushroom.
          
          Key identifying features: the blewit is a terrestrial saprophyte, meaning it grows from the ground and decomposes plant material.

          It is a cooler weather species, typically found in the autumn months, occasionally in winter.

          It is lilac to lavender though with age it can become tannish to light brown, making identification trickier.

          It is a medium-sized mushroom with a cap between 2-5" across and a stalk to 3" tall.

          Often has a bulbous base at the bottom of the stalk but you will not see a ring, a partial veil or a rusty brown cortina (weby veil typically found in Cortinarius mushrooms).

          The underside contains closely-spaced gills that are directly attached to the stalk. These gills are violet in colour, turning brown with age.

          Take a spore print; it should be pinkish buff.

          Ecology: tend to grow in the leaf litter in mixed woods often running parallel to a log, and you will often see a dense white mat of mycelium around the nushrooms.
          `
        },
        {
          name: 'Armillaria mellea',
          time: [1298],
          description: `Honey mushrooms are prolific during the autumns, and they can be destructuve.
          
          Many cause Armillaria root rot ( a fungal root rot caused by several different members of the genus Armillaria ed.)

          Considered good and edible by most, but not all, so start small and cook well.

          Honey mushroom (honey fungus):

          Medium to large-size mushroom grows in dense clusters typically at the bases of both hardwood and conifer trees.

          The caps are up to 4" across, yellow to yellow-brown and typically contain tiny black scales near the centre.

          Underneath the cap, you will see a fertile surface that is comprised of whitish gills that are attached to the stalk. These gills are closely spaced and sometimes decurrent.

          The stalk is up to 6" tall, thick, fibrous and stringy, and usally tapers near the base.

          Key feature: partial veil, or ring around the stalk. 
          
          (The partial veil covers the maturing gills when the mushroom is immature. As the mushroom grows, the partial veil breaks and leaves a ring near the top of the stalk).

          Take a sport print to confirm identification; it should show white.

          Considered good and edible by most, but not all, so start small and cook well.
          `
        },
        {
          name: 'Armillaria tabescens',
          time: [1387],
          description: `Common through summer and autumn.

          Similar to the honey mushoom though, as the name suggests, it is ringless.

          Grows in dense clusters and common in yards, lawns, parks and other open spaces.

          Typically darker than the honey mushroom, usually tan or brown in colourand each cap is dry and covered with dark scales, at least when young.

          The spore print is white.

          Make sure the mushrooms are not orange because these could be the toxic  jack-o'-lantern lookalike.
          `
        },        
        {
          name: 'Entoloma abortivum',
          time: [1448],
          description: `This mushroom, pictured on the left, parasatises other mushrooms and turns them into roundish structures, on the right.

          These white, spongey mushrooms contain irregular depressions and are typically 4" wide by 2" tall.

          Ecology: near rotting wood in hardwoods forests, late summer through fall.

          The mushrooms on the left are edible but not recommended because they ressemble other gilled mushrooms in the Entoloma genus some of which can be toxic.

          Therefore concentrate on those pictured on the right, also known as shrimp of the woods which are parasitised versions of honey mushrooms.
          `
        },
    ],
    notes: [
      {
        tag: 'Introduction',
        time: [56],
        description: `This is an introduction. It does not serve as a replacement to a field guide, a mushroom club or going out with knowledgeable mushroom hunters.`
      },
      {
        tag: 'Guidelines: 1. Edible when cooked',
        time: [92],
        description: `Edibility means edible when cooked.
        
        Cook wild mushrooms well, do not eat raw as you could get sick.
        `
      },
      {
        tag: 'Guidelines: 2. Start small',
        time: [108],
        description: `If it's your first time identifying and eating any of these mushrooms, start small.
        
        Some people cannot tolerate some of these wild mushroom species.
        `
      },
      {
        tag: 'Guidelines: 3. Don\'t combine',
        time: [124],
        description: `Don't combine wild mushrooms species if it is your first time eating them.
        
        Try one species, see how your body reacts, wait 24 hours before moving on to the next.
        `
      },
      {
        tag: 'Hericium',
        time: [758],
        description: ``
      },
    ],
    producer: 'Adam Haritan, Learn Your Land',
    video: {
      id: '6PNq6paMBXU',
      startAt: 0,
      title: '16 Wild Edible Mushrooms You Can Forage This Autumn',
      intro: 'I hope you enjoy this brief introduction to foraging edible mushrooms in Eastern North America. When you\'ve finished watching, review what we covered to see how much you remember, and to reinforce what you learnt.',
      owner: 'Learn Your Land',
      ownerUrl: 'www.youtube.com/channel/UCcbf8wnyVJl631LAmAbo7nw',
      presenter: 'Adam Haritan',
      src: 'https://yt3.ggpht.com/a/AGF-l79-2yZvLlzlusiC9-3HZ8vrXsB-qsEHNf6PcA=s48-c-k-c0xffffffff-no-rj-mo',
      links: [
        {
          label: 'Subscribe to the Learn Your Land email newsletter here',
          url: ''
        },
        {
          label: 'Website',
          url: 'https://www.learnyourland.com'
        }
      ],
      location: 'Eastern North America'
    }
};

const learnYourLand2 = {
    id: 1004,
    name: 'Learn Your Land - Spring foraging',
    behaviour: 'static',
    ...mushroomDefaults,
    species: [ 
      {
        name: 'Morchella angusticeps',
        time: [290],
        description: `One of the first species to appear and easy to identify:

        Medium sized mushroom with a conical, honeycomb-pitted cap, and vertically oriented pits and ridges.
        
        Key feature: ridges are dark especially at maturity and the pits are lighter in colour.
        
        It is hollow in cross-section from top to bottom including the stem.
        
        Key feature: the cap is fully attached to stem but with a small groove or sinus where the base of the cap meets the stem.
        
        Ecology: under ash, black cherry, tulip poplar.
        
        Season: March-April.`
      },
      {
        name: 'Morchella punctipes',
        time: [370],
        description: `Not valued as highly as other morels but it is edible and shares many features with other morels, especially other black morels.

        A medium sized species to 6" or taller.
        
        Like other members of the black morel clade it has a conical cap with vertically oriented pits and ridges that darken at maturity.
                
        It is entirely hollow from top to bottom.
        
        Key feature:  the bottom of the cap hangs free from the stem, like a skirt i.e. not fully attached (hence its name).
        
        Ecology: ash, tulip poplar, American elm, and black cherry.
        
        Season: after the easter black morel, and before the yellow morel (March-May).`
      },
      {
        name: 'Morchella americana',
        time: [453],
        description: `Esculenta clade.

        Medium sized mushroom but up to 10' or greater.
        
        The cap is less conical than is the case with the black morels, but like all true morels it is of a honeycomb appearance with pits and ridges.
        
        Key feature: the pits and ridges do not darken with age.
        
        It is hollow from top to bottom, and the cap is entirely connected.
        
        Ecology: grows in association with many trees; dying and dead elms, apple trees, tulip poplars, ash trees, sycamores, and pines.
        
        Season: later, after the black morels, although there may be some overlap.`
      },
      {
        name: 'Polyporus squamosus',
        time: [600],
        description: `A large mushroom to 12" or more, with distinctive large, dark brown scales (hence the name). 

        The fertile underside is a honeycomb of small pores which release white spores.
        
        Ecology: similar to morels; grows directly on wood, esp. dead and decomposing elms; often seen as a consolation when morels are absent.
        
        Smell: cucumber or watermelon rind.
        
        Season: most prolific in spring, (but may be found in summer and fall).
        
        Culinary: not considered choice but it is edible. Best eaten when young (and small) before it becomes leathery; can be dehydrated for stews etc.`
      },
      {
        name: 'Stropharia rugosoannulata',
        time: [731],
        description: `It has a medium to large cap up to 12" across.

        The cap is wine or burgundy coloured, and fades to straw or tan with age.
        
        The fertile surface has white gills fading to grey, purple or black, which release dark purple, brown or black spores.
        
        A partial veil may be visible on immature mushrooms, leaving a rugged ring when older.
        
        Ecology: often found in suburban or urban landscapes, and is widely cultivated.
        
        Culinary: check for insects and the quality of its habitat (avoid pesticides, etc.) before eating.
        
        Season: a spring favourite.`
      },
      {
        name: 'Pleurotus ostreatus',
        time: [841],
        description: `A widely cultivated species; there are 40-200 species in the genus pleurotus.

        It is a medium-large species.
        
        The cap is white to tan to light brown usually in shelf-like clusters. The gills are white and decurrent (run down stem).
        
        The spores are pale lilac or white.
        
        Ecology: oyster mushrooms are decomposers of wood, and only appear on wood (though this may be hidden).
        
        Season: prefers cooler weather, appearing mostly spring or later if the season is mild. (If not, your are probably looking at a different species).
        
        Culinary: delicious and abundant.`
      },
      {
        name: 'Laetiporus sulphureus',
        time: [958],
        description: `Easy to identify, and to find.
        
        Medium to larege polypore. Takes the form of overlapping clusters or a rosette on deciduous trees.

        The cap diameter is up to 12". Its top is smooth and faintly wrinkled.
        
        When fresh it is bright orange to yellow-orange, sometimes with a bright yellow margin. With age it becomes grey and crumbly. The underside is bright yellow with tiny pores.
        
        Ecology: at the base or a few feet from deciduous trees, in overlapping cluster up and down the tree.

        Season: appears spring to mid-autumn.
        
        Culinary: chicken like texture; indigestible to some (start with a small amount).`
      },
      {
        name: 'Laetiporus cincinnatus',
        time: [987],
        description: `Similar to chicken of the woods but growing at the base or a few feet from hardwoods, in a rosette pattern, and not typically overlapping up and down the tree.

        The caps are duller and paler than L.sulphureus, pale orange to pink orange (rather than vibrant yellow or orange). The pores are a pale peach white.
        
        Ecology: rarely in overlapping clusters but in rosette or a cluster on or near the tree.

        Season: spring and summer into autumn.

        Culinary: best eaten when young; indigestible for some.`
      },
      {
        name: 'Coprinellus micaceus',
        time: [1115],
        description: `One of the ink cap mushrooms which autodigest, or deliquesce. Also described as coprinoid (as not all exhibit deliquescence).

        There are 4 similar species, all are edible (though a microscope may be needed to distinguish between them).
                
        The gills partially deliquesce with age leaving an inky goo.

        Key feature: the cap contains fine granules when young and fresh, but with age and weathering they may be lost.
                
        The spore print is black.

        Ecology: they form in large clusters on or around stumps and logs, and the buried wood of commonly broadleaf trees: cherry, ash, oak.
        
        Season: all year, but especially in spring.
        
        Culinary: this species does not contain coprine (which reacts with alcohol), but other ink caps do.`
      },
    ],
    producer: 'Adam Haritan, Learn Your Land',
    video: {
      id: 'OE54NpooUls',
      startAt: 0,
      title: '9 Wild Edible Mushrooms',
      intro: 'I hope you enjoy this brief introduction to foraging edible mushrooms in Eastern North America. When you\'ve finished watching, review what we covered to see how much you remember, and to reinforce what you learnt.',
      owner: 'Learn Your Land',
      ownerUrl: 'www.youtube.com/channel/UCcbf8wnyVJl631LAmAbo7nw',
      presenter: 'Adam Haritan',
      src: 'https://yt3.ggpht.com/a/AGF-l79-2yZvLlzlusiC9-3HZ8vrXsB-qsEHNf6PcA=s48-c-k-c0xffffffff-no-rj-mo',
      links: [
        {
          label: 'Subscribe to the Learn Your Land email newsletter here',
          url: ''
        },
        {
          label: 'Website',
          url: 'https://www.learnyourland.com'
        }
      ],
      location: 'Eastern North America'
    }
};

export const learnYourLand = [
    learnYourLand1,
    // learnYourLand2
]