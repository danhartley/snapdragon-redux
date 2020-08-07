const scienceCards = [
  {
    term: 'What is the perihelion?',
    definition: 'The point in the orbit of a planet, asteroid or comet when it is nearest to the sun.'
  },
  {
    term: 'What is the current tilt of the earth\'s axis?',
    definition: '23.4°'
  },
  {
    term: 'What is the range of tilt of the earth\'s axis?',
    definition: '22.1°-24.5°'
  },
  {
    term: 'Earth\'s obliquity oscillates between which two measurements every 41,000 years?',
    definition: '22.1°-24.5°'
  },
  {
    term: 'What is the angular radius of earth\'s axial precession?',
    definition: '23.5°'
  },
  {
    term: 'What is obliquity?',
    definition: 'The angle between an object\'s rotational axis and its orbital axis (also axial tilt).'
  },
  {
    term: 'Define orbital forcing',
    definition: 'The effect on climate of slow changes in the tilt of the earth\'s axis and shape of the earth\'s orbit around the sun.'
  },
  {
    term: 'What is orbital eccentricity?',
    definition: 'A dimensionless parameter that determines the amount by which its orbit around another body deviates from a perfect circle.'
  },
  {
    term: 'What is the aphelion?',
    definition: 'The point in the orbit of a planet, asteroid or comet that is furthest from the sun.'
  },
  {
    term: 'Which gas is found at concentrations between 0 and 3% of a volume of air and has the largest effect on surface temperature?',
    definition: 'Water vapour'
  },
  {
    term: 'What are the two processes by which water is exchanged between the atmosphere and the earth’s surface?',
    definition: 'Evaporation and precipitation'
  },
  {
    term: 'How long, on average, does a molecule of water reside in the atmosphere?',
    definition: 'About two weeks'
  },
  {
    term: 'Warmer air supports more or less water vapour?',
    definition: 'More'
  },
  {
    term: 'What do we call the ratio between the amount of moisture in the air and its upper limit?',
    definition: 'Relative humidity'
  },
  {
    term: 'Why is there is often less water vapour in the air than there could be?',
    definition: 'Rain and snow remove water from the air.'
  },
  {
    term: 'Explain positive feedback in relation to water vapour?',
    definition: 'Rising water vapour leads to more back-radiation to the surface, which causes higher temperatures.'
  },
  {
    term: 'What is a convergent boundary?',
    definition: 'A place in the earth\'s mantle where one tectonic plate slides beneath another.'
  },
  {
    term: 'Earth\'s orbit around the sun varies cyclically from more to less circular every how many years?',
    definition: '100,000'
  },
  {
    term: 'Earth\'s axial tilt, or obliquity, oscillates between 22.1°-24.5 how frequently?',
    definition: 'Every 41,000 years'
  },
  {
    term: 'Earth\'s rotation axis precesses with periods of how many years?',
    definition: '26,000 years, or 1° every 72 years (26,000 years / 360°)'
  },
  {
    term: 'Which three factors affect the way sunlight is distributed around the world?',
    definition: 'The planet’s tilt (obliquity), wobble (axial precession), and orbit (of the sun)'
  },
  {
    term: 'Which factor did Milanković calculate (partly) controls the timing of ice ages?',
    definition: 'The amount of sunlight received by the Arctic region during summer (as a result of orbit and rotation).'
  },
  {
    term: 'Why are we certain the increase in CO₂ concentrations in the atmosphere was caused by human activities?',
    definition: 'The isotopes of carbon in ice show that it comes from fossil fuel burning and the clearing of forests.'
  },
  {
    term: 'Which natural feature is considered the main source of uncertainty in climate projections?',
    definition: 'Clouds (reflecting sunlight, thereby cooling the planet; reradiating infrared radiation, thereby warming it).'
  },
  {
    term: 'Explain what RCP 6.0 equates to.',
    definition: 'A radiative forcing of 6 watts per square meter by the year 2100.'
  },
  {
    term: 'What is atomic weight of carbon and carbon dioxide?',
    definition: 'The atomic weight of carbon is 12 atomic mass units, while the weight of carbon dioxide is 44 (16*2 + 12).'
  },
  {
    term: 'One ton of carbon equals how many tons of carbon dioxide?',
    definition: 'One ton of carbon equals 44/12 = 3.67 tons of carbon dioxide.'
  },
  {
    term: 'The carbon cycle removes roughly how much of human caused CO₂ emissions from the atmosphere each year?',
    definition: 'Half.'
  },
  {
    term: 'The carbon cycle adds and removes roughly how much carbon (C) from the earth each year?',
    definition: '120 GtC.'
  },
  {
    term: 'What are the annual total emissions from volcanoes (in C)?',
    definition: 'Between 0.04 and 0.07 gigatonnes of carbon per year.'
  },
  {
    term: 'What are the annual total emissions from human causes (in C)?',
    definition: 'About 12 gigatonnes of carbon per year.'
  },
  {
    term: 'How many gigatonnes of carbon do both the sea and land (forests) absorb annually?',
    definition: 'About 2 gigatonnes of carbon per year.'
  },
  {
    term: 'Are the oceans and forests carbon sinks or sources?',
    definition: 'Sinks.'
  },
  {
    term: 'Who wrote, \'The atmosphere admits of the entrance of the solar heat, but checks its exit; and the result is a tendency to accumulate heat at the surface of the planet.\'?',
    definition: 'John Tyndall (1859)'
  },
  {
    term: 'When was the most recent glacial period?',
    definition: 'Between about 120,000 and 11,500 years ago.'
  },
];

const natureCards = [
  {
    term: 'What percentage of a tree\'s biomass is carbon?',
    definition: '40-50%'
  },
  {
    term: 'To what does the Younger Dryas (around 12,900 to 11,700 years) owe its name?',
    definition: 'The indicator genus, Dryas, of the alpine-tundra wildflower Dryas octopetala.'
  },
  {
    term: 'What is speciation?',
    definition: 'The evolutionary process by which populations evolve to become distinct species.'
  },
  {
    term: 'What is cladogenesis?',
    definition: 'An evolutionary splitting of a parent species into two distinct species, forming a clade.'
  },
  {
    term: 'What is a clade?',
    definition: 'A group of organisms that are monophyletic — composed of a common ancestor and all its lineal descendants.'
  },
  {
    term: 'Define extinction',
    definition: 'The termination of a kind of organism or of a group of kinds (taxon), usually a species.'
  },
  {
    term: 'Define biome',
    definition: 'A community of plants and animals that have common characteristics for the environment they exist in.'
  },
  {
    term: 'What is phenotypic plasticity?',
    definition: 'Some of the changes in an organism\'s behavior, morphology and physiology in response to a unique environment.'
  },
  {
    term: 'What is phenology?',
    definition: 'The study of periodic plant and animal life cycle events and how these are influenced by seasonal and interannual variations in climate, as well as habitat factors (such as elevation).'
  },
  {
    term: 'Name three contributions made by soil organic matter to the soil.',
    definition: 'Water-retention, structure, and fertility.'
  },
  {
    term: 'What is the main component of soil organic matter?',
    definition: 'Carbon'
  },
  {
    term: 'What is glomalin?',
    definition: 'A glycoprotein produced abundantly on hyphae and spores of arbuscular mycorrhizal fungi in soil and in roots.'
  },
  {
    term: 'Grasslands hold what percentage of the earth\'s carbon?',
    definition: '~20%'
  },
];

const waterCards = [
  {
    term: 'The global ocean contains what percentage of the Earth’s water?',
    definition: '97%'
  },
  {
    term: 'The global ocean covers what percentage of the Earth’s surface?',
    definition: '71%'
  },
  {
    term: 'What percentage of Earth’s land area is covered by glaciers or ice sheets?',
    definition: '10%'
  },
  {
    term: 'Where was the sea level in relation to today 22,000 years ago?',
    definition: '130 metres lower.'
  },
  {
    term: 'Name two causes of sea level rises.',
    definition: 'Thermal expansion and runoff from melting ice in Greenland and West Antarctica.'
  },
  {
    term: 'What does GMSL stand for?',
    definition: 'Global Mean Sea Level'
  },
  {
    term: 'What does SLRC stand for?',
    definition: 'Sea Level Rise Commitment'
  },
  {
    term: 'What is SLRC?',
    definition: 'A given surface warming commits to centuries of sea level rise from thermal expansion of the ocean.'
  },
  {
    term: 'The human body cannot transmit heat to the surrounding air fast enough to compensate for its internal production of heat above what temperature?',
    definition: '35°C e.g. 46°C + 50% humidity'
  },
  {
    term: 'Explain the effect of rising ocean acidity.',
    definition: 'Organisms that build shells (mollusks, corals, plankton), begin to suffer declining ability to build and maintain their shells.'
  },
  {
    term: 'What is El Niño?',
    definition: 'A flow of unusually warm surface waters along the Western coast of South America that disrupts normal weather patterns and contributes to extreme weather events like intense storms and droughts. It occurs irregularly every 2-7 years.'
  },
  {
    term: 'What percentage of the Earth’s total warming can be attributed to urbanisation?',
    definition: '2-4%'
  },
  {
    term: 'In polar ice cores less heavy oxygen in the frozen water means what?',
    definition: 'That temperatures were cooler at that time.'
  },
  {
    term: 'What is a paleothermometer?',
    definition: 'A proxy thermometer e.g. mreasuremnts of isotope ratios.'
  },
  {
    term: 'Temperature is cyclic on a 100,000 year scale. Are we in the great ice age phase or the interglacial period of the current cycle?',
    definition: 'The interglacial period'
  },
  {
    term: 'How long do interglacial periods typically last?',
    definition: '10,000 years'
  },
  {
    term: 'What is the name of the current interglacial (geological epoch)?',
    definition: 'The Holocene'
  },  
  {
    term: 'The Holocene and Pleistocene epochs together form which period?',
    definition: 'The Quaternary'
  },  
  {
    term: 'What was the Medieval Warm Period (MWP)?',
    definition: 'A time of warm climate in the North Atlantic region lasting from c. 950 to c. 1250.'
  },  
  {
    term: 'What was the Little Ice Age (LIA)?',
    definition: 'A period extending from the 16th to the 19th centuries, consisting of  largely independent regional climate changes rather than a globally synchronous increased glaciation (IPCC).'
  },  
  {
    term: 'How long does heat take to penetrate the region between 20 and 150 metres?',
    definition: '~2 years'
  },
  {
    term: 'How long does heat take to penetrate the deepest ocean?',
    definition: '~1000 years'
  },
];

const climateChangeCards = [
  {
    term: 'What 3 lines of evidence were chosen by the WCRP for their 2020 report?',
    definition: `Trends indicated by contemporary warming
    Lessons from comparable ancient climates
    Understanding of the feedback effects`
  },
  {
    term: 'How is risk calculated?',
    definition: "The product of the likelihood and consequence of an outcome"
  },
  {
    term: 'Which line of evidence was not used in its own right in the 2020 WCRP report?',
    definition: 'Climate models'
  },
  {
    term: 'When was the IPCC founded?',
    definition: '1988'
  },
  {
    term: 'What new range was described by the WCRP in July 2020 for climate sensitivity?',
    definition: '2.6°C to 3.9°C likely i.e. 66%'
  },
  {
    term: 'What is permafrost?',
    definition: 'Any ground, on land or under the ocean, that remains frozen for at least two consecutive years. Permanently frozen ground.'
  },
  {
    term: 'Arctic temperatures are expected to increase at roughly what rate compared to the global rate?',
    definition: 'Double.'
  },
  {
    term: 'What is the total annual anthropogenic emission of all greenhouse gases?',
    definition: '~35 billion tons of CO₂, ~45 billion tons CO₂ inc. equivalents e.g. methane.'
  },
  {
    term: 'Who coined the term permafrost?',
    definition: 'Siemon William Muller in 1943.'
  },
  {
    term: 'How much land in the Northern Hemisphere is underlain by permafrost?',
    definition: '~25%'
  },
  {
    term: 'How does thawing permafrost release CO₂ or methane?',
    definition: '(The newly activated) microbes in the soil break down organic matter.'
  },
  {
    term: 'How much land in Canada, Siberia, Greenland and Alaska is underlain by permafrost?',
    definition: '~85%'
  },
  {
    term: 'What does WCRP stand for?',
    definition: 'World Climate Research Programme'
  },
  {
    term: 'Is methane a more potent greenhouse gas than CO₂?',
    definition: 'Yes, 28-36 times more potent.'
  },
  {
    term: 'What are clathrates?',
    definition: 'Methane hydrates, methane \'ice\' that forms at low temperatures and high pressures in continental margin marine sediments or within and beneath permafrost.'
  },
  {
    term: 'How long does it take methane in the atmosphere to oxidise to CO₂?',
    definition: 'About a decade.'
  },
  {
    term: 'How does the IPCC define climate sensitivity?',
    definition: 'How far the planet will warm given a doubling of CO₂ in relation to pre-industrial levels'
  },
  {
    term: 'Given current CO₂ emissions when would we reach 560 ppm?',
    definition: '2060'
  },
  {
    term: 'What does IPCC stand for?',
    definition: 'Intergovernmental Panel on Climate Change'
  },
  {
    term: 'What range for climate sensitivity did the 1979 Charney report predict?',
    definition: '1.5°C to 4.5°C'
  },
  {
    term: 'How far have average surface temperatures risen since records began in 1800?',
    definition: '1.1°C'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does the energy sector account for?',
    definition: '72%'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does transport account for?',
    definition: '15%'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does flying account for?',
    definition: '2-2.5%'
  },
  {
    term: 'The full impact of flying including contrails and other pollutants e.g. NOx is what percentage of global emissions?',
    definition: '5%'
  },
  {
    term: 'In environments containing permafrost, the top layer of soil thaws during the summer and freezes again during the autumn. What is this layer called?',
    definition: 'The active layer.'
  },
  {
    term: 'What percentage of the world\'s population flies in any one year?',
    definition: '3%'
  },
  {
    term: '70% of UK flights were taken by what percentage of the population?',
    definition: '15%'
  },
  {
    term: 'London-New York uses 986kg of CO₂ per passenger. That equates to more than the average CO₂ emission in how many countries?',
    definition: '56'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does agriculture account for?',
    definition: '11%'
  },
  {
    term: 'What value does \'likely\' equate to as a statistical probability?',
    definition: '66%'
  },
  {
    term: 'Describe moral hazard in relation to climate change.',
    definition: 'There is an incentive to ignore the risks in the interests of political expediency. '
  },
  {
    term: 'What is the current biophysical capacity requirement of humanity in Earth units?',
    definition: '1.7'
  },
  {
    term: 'What is the ‘fat-tailed’ distribution?',
    definition: 'The area under the far right extreme of the curve which indicates a greater likelihood of warming well in excess of the predicted average.'
  },
  {
    term: 'Is uncertainty our friend when it comes to the prospects for dangerous climate change?',
    definition: 'No'
  },
  {
    term: 'What is the risk of a collapse of the Atlantic Meridional Overturning Circulation (AMOC) this century?',
    definition: '~5%'
  },
  {
    term: 'How great has been the slowdown in the AMOC since 1950?',
    definition: '15%'
  },
  {
    term: 'What does AMOC stand for?',
    definition: 'Atlantic Meridional Overturning Circulation'
  },
  {
    term: 'What is the Atlantic Meridional Overturning Circulation (AMOC)?',
    definition: 'A system of surface and deep currents encompassing all ocean basins. It transports large amounts of water, heat, salt, carbon, nutrients and other substances around the globe, and connects the surface ocean and atmosphere with the huge reservoir of the deep sea.'
  },
  {
    term: 'In 2016, what headed the World Economic Forum survey of most impactful risks?',
    definition: 'Failure of climate change mitigation and adaptation'
  },
  {
    term: 'Massive non-linear events in the global environment give rise to what?',
    definition: 'Massive non-linear societal events.'
  },
  {
    term: 'If the rate of change of warming is 0.3°C per decade (3°C per century), what % of ecosystems will not be able to adapt?',
    definition: '15%'
  },
  {
    term: 'If the rate of change of warming is 0.4°C per decade (4°C per century), what % of ecosystems will not be able to adapt?',
    definition: '~100%'
  },
  {
    term: 'What is the first duty of a government?',
    definition: 'Protect the people.'
  },
  {
    term: 'Name 3 potential feedback loops that are not included in the most recent IPCC report.',
    definition: `Emissions from the warming permafrost.
    A decrease in the ocean’s carbon-sink efficiency.
    Melting of the polar ice sheets.`
  },
  {
    term: 'Does the IPCC favour fully-coupled global climate models (General Circulation Models GCMs) over semi-empirical models?',
    definition: 'Yes'
  },
  {
    term: 'What does ESS stand for? ',
    definition: 'Earth System Sensitivity (sensitivity incl. feedbacks)'
  },
  {
    term: 'What does ECS stand for?',
    definition: 'Equilibrium Climate Sensitivity (sensitivity excl. feedbacks)'
  },
  {
    term: 'What is the carbon budget?',
    definition: 'An estimate of the total future human-caused greenhouse gas emissions in tons of CO₂ consistent with limiting warming to a specified figure.'
  },
  {
    term: 'The highest emitting sector in the UK is road transport, which accounts for what percentage?',
    definition: '24%'
  },
  {
    term: 'What is the UK annual energy requirement?',
    definition: '2.25 TWh, or 2250 Gigawatts'
  },
  {
    term: 'What does GMST stand for?',
    definition: 'Global Mean Surface Temperature'
  },
  {
    term: 'What is standard deviation?',
    definition: 'A measure of the amount of variation of a set of values (the extent to which a distribution is stretched or squeezed).'
  },
  {
    term: 'What does a low standard deviation indicate?',
    definition: 'That the values tend to be close to the mean (or expected value) of the set.'
  },
  {
    term: 'What does a high standard deviation indicate?',
    definition: 'That the values of the set are spread out over a wide range.'
  },
  {
    term: 'How are IPCC confidence levels derived?',
    definition: 'They are the product of evidence (robust, medium and limited), and the degree of scientific agreement (high, medium and low).'
  },
  {
    term: 'Name some forcing factors.',
    definition: 'Solar input, albedo, greenhouse gases, grading of earth\'s axis, particles (aerosols), Milankovich cycles.'
  },
  {
    term: 'How does the IPCC defined \'pre-industrial\'?',
    definition: 'The multi-century period prior to the onset of large-scale industrial activity ~1750. The reference period 1850–1900 is used to approximate pre-industrial GMST.'
  },
  {
    term: 'How does the IPCC defined \'global warming\'?',
    definition: 'The estimated increase in GMST averaged over a 30-year period, or the 30-year period centred on a particular year or decade, expressed relative to pre-industrial levels.'
  },
  {
    term: 'How does the IPCC defined \'Net zero CO₂ emissions\'?',
    definition: 'Net zero CO₂ emissions are achieved when anthropogenic CO₂ emissions are balanced globally by anthropogenic CO₂ removals over a specified period.'
  },
  {
    term: 'What is radiative forcing?',
    definition: 'The difference between insolation (sunlight) absorbed by the earth and energy radiated back to space.'
  },
  {
    term: 'When does positive radiative forcing occur?',
    definition: 'When the earth receives more incoming energy from sunlight than it radiates to space.'
  },
  {
    term: 'What % of human-caused CO₂ emissions are absorbed by trees and other plants?',
    definition: '~1/3'
  },
  {
    term: '2°C of warming could cut the carbon sink of tropical rainforests by what percentage?',
    definition: '50%'
  },
  {
    term: 'With what percentage of deforestation might the Amazon change from a carbon sink to carbon source?',
    definition: '20-25% deforestation'
  },
  {
    term: 'What does SROCC stand for?',
    definition: 'Special Report on the Ocean and Cryosphere in a Changing Climate'
  },
  {
    term: 'NOAA stand for?',
    definition: 'National Oceanic and Atmospheric Administration'
  },
  {
    term: 'What range of global mean sea levels does the SROCC predict (think likely) by the end of this century?',
    definition: '0.95 feet (0.29m) to 3.61 feet (1.1m)'
  },
  {
    term: 'What range of global mean sea levels does the NOAA predict (think likely) by the end of this century?',
    definition: '1 foot (0.3m) to 4.27 feet (1.3m)'
  },
  {
    term: 'According to NASA\'s MODIS data record by how much did the earth green (increase in leaf area) between 2000 and 2020?',
    definition: '5%'
  },
  {
    term: 'What does NASA\'s MODIS stand for?',
    definition: 'Moderate Resolution Imaging Spectroradiometer'
  },
  {
    term: 'What does NASA stand for?',
    definition: 'National Aeronautics and Space Administration'
  },
  {
    term: 'What does GEDI stand for?',
    definition: 'Global Ecosystem Dynamics Investigation'
  },
  {
    term: 'What does \'lidar\' stand for?',
    definition: 'light detection and ranging'
  },
  {
    term: 'What coverage does MODI data provide?',
    definition: '1-4 shots of every place on Earth, every day, between 2000 and 2020.'
  },
  {
    term: 'What were the two main drivers of greening in India and China between 2000 and 2020?',
    definition: 'Conservation and forest expansion, and intensive cultivation of food crops.'
  },
  {
    term: 'The earth greened by 5% from 2000 to 2020. What percentage is this is attributed to India and China?',
    definition: '1/3'
  },
  {
    term: 'For every centimeter rise in global sea level how many people are displaced?',
    definition: '~6 million'
  },
  {
    term: 'SROCC predicts that more intense and frequent extreme sea level events will be how many orders of magnitude higher in 2100 than today?',
    definition: '2-3'
  },
  {
    term: 'How many tons of carbon does the world\'s permafrost contain?',
    definition: '1.5 trillion tons'
  },
  {
    term: 'How many tons of carbon does the world\'s soils contain?',
    definition: '2.5 trillion tons'
  },
  {
    term: 'How many tons of carbon does the atmosphere contain?',
    definition: '.75 trillion tons'
  },
  {
    term: 'How many tons of carbon do plants and animals contain?',
    definition: '.56 trillion tons'
  },
  {
    term: 'What does SPM stand for?',
    definition: 'Summary for Policy Makers'
  },
  {
    term: 'What are negative-emissions?',
    definition: 'Greenhouse gases which have been removed from the atmosphere (by technology).'
  },
  {
    term: 'What is Thermohaline Circulation (THC)?',
    definition: 'A system of currents that brings warm, salty water in the upper layers of the ocean up from the Gulf of Mexico into the North Atlantic.'
  },
  {
    term: 'What are other terms for the Thermohaline Circulation (THC)?',
    definition: 'The Global Ocean Conveyor or Great Ocean Conveyor Belt.'
  },
  {
    term: 'What is the upper limit of global warming beyond which the survival of the Great Barrier Reef would be threatened?',
    definition: '1.2°C'
  },
  {
    term: 'What does UNFCCC stand for?',
    definition: 'United Nations Framework Convention on Climate Change'
  },
  {
    term: 'What does BECCS stand for?',
    definition: 'Bio-energy with Carbon Capture and Storage '
  },
  {
    term: 'When will we see an ice-free summer Arctic?',
    definition: 'It may happen in the next decade.'
  },
  {
    term: 'Estimate how much CO₂ afforestation and reforestation can sequester per hectare per year',
    definition: '3.7 tonnes'
  },
  {
    term: 'What percentage of the population committed to non-violet protest can effect change according to Erica Chenoweth?',
    definition: '3.5'
  },
  {
    term: 'According to Chenoweth and Maria Stephan how often are non-violent campaigns successful?',
    definition: '53%'
  },
  {
    term: 'According to Chenoweth and Maria Stephan how often are violent campaigns successful?',
    definition: '26%'
  },
  {
    term: 'Who said, \'We know through painful experience that freedom is never given by the oppressor; it must be demanded by the oppressed.\'',
    definition: 'Martin Luther King Jr'
  },
  {
    term: 'What is 3.5% of the UK population?',
    definition: '2.3 million people'
  },
  {
    term: 'The chance of high impact hot summers in Europe has increased in recent years from 1 in 50, to 1 in how many years?',
    definition: '5'
  },
  {
    term: 'How does Jared Diamond approach risk in everyday acts?',
    definition: 'With \'constructive paranoia\''
  },
  {
    term: 'The inherent intermittency of solar and wind power is likely to limit their share of the energy market to how much?',
    definition: '30-40%'
  },
  {
    term: 'What are the safest forms of energy?',
    definition: 'Nuclear, wind and solar.'
  },
  {
    term: 'How might consilience work in practice?',
    definition: 'Convergence of evidence, or multiple lines of evidence.'
  },
  {
    term: 'What is consilience?',
    definition: 'The principle that evidence from independent, unrelated sources can "converge" on strong conclusions.'
  },
  {
    term: 'What is the Suess effect?',
    definition: 'A change in the ratio of the atmospheric concentrations of heavy isotopes of carbon (13C and 14C) by the admixture of large amounts of fossil-fuel derived CO₂, which is depleted in 13C and contains no 14C.'
  },
  {
    term: 'What is the estimated annual release of CO₂ from volcanoes?',
    definition: '0.15 to 0.26 gigatons per year.'
  },
  {
    term: 'What percentage of the air is made up of greenhouse gases?',
    definition: '1%'
  },
  {
    term: 'Without greenhouse gases, what would our planet be like?',
    definition: 'Completely frozen, and uninhabitable for humans.'
  },
  {
    term: 'How long does CO₂ persist in the atmosphere?',
    definition: '50% for 100 years, the rest over thousands of years.'
  },
  {
    term: 'For how long has the climate been stable?',
    definition: '7-8,000 years.'
  },
  {
    term: 'Temperature on Earth is cyclical (moving in and out of ice ages) over what period?',
    definition: '100,000 years.'
  },
  {
    term: '3 million years ago, CO₂ concentrations were the same as today. How much higher was the sea level then?',
    definition: '80 feet'
  },
  {
    term: 'How many different organisations are working on climate models?',
    definition: '~40'
  },
  {
    term: 'What does RCP stand for?',
    definition: 'Representative Concentration Pathway'
  },
  {
    term: 'What is an RCP?',
    definition: 'A greenhouse gas concentration trajectory adopted by the IPCC.'
  },
];

export const sets = [
  {
    title: 'Climate change',
    cards: climateChangeCards
  },
  {
    title: 'Nature',
    cards: natureCards
  },
  {
    title: 'Water',
    cards: waterCards
  },
  {
    title: 'Science',
    cards: scienceCards
  },
];