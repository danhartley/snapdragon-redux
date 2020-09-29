import { waterCards } from 'flashcards/flashcards-api-water';
import { ecologyCards } from 'flashcards/flashcards-api-nature';
import { scienceCards } from 'flashcards/flashcards-api-science';
import { basicsCards } from 'flashcards/flashcards-api-basics';
// import { termsCards } from 'flashcards/flashcards-api-terms';
// import { acronymsCards } from 'flashcards/flashcards-api-acronyms';

const numbersCards = [
  {
    term: 'The highest emitting sector in the UK is road transport, which accounts for what percentage in 2018?',
    definition: '24%. All transport accounted for 33%',
    source: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/790626/2018-provisional-emissions-statistics-report.pdf'
  },
  {
    term: 'What is the UK annual energy requirement?',
    definition: '2.25 TWh, or 2250 Gigawatts'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does the energy sector account for?',
    definition: '72%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does transport account for?',
    definition: '15%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does concrete account for?',
    definition: '7%',
    source: 'https://www.iea.org/news/cement-technology-roadmap-plots-path-to-cutting-co2-emissions-24-by-2050'
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
    term: 'How much land in the Northern Hemisphere is underlain by permafrost?',
    definition: '~25%'
  },
  {
    term: 'How much land in Canada, Siberia, Greenland and Alaska is underlain by permafrost?',
    definition: '~85%',
    source: 'https://en.wikipedia.org/wiki/Permafrost'
  },
  {
    term: 'What percentage of the world\'s population flies in any one year?',
    definition: '3%'
  },
  {
    term: '70% of UK flights were taken by what percentage of the population?',
    definition: '15%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does agriculture account for?',
    definition: '11%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
];

const policyCards = [
  {
    term: 'What 3 lines of evidence were chosen by the WCRP for their 2020 report?',
    definition: `Trends indicated by contemporary warming
    Lessons from comparable ancient climates
    Understanding of the feedback effects`,
    source: 'https://www.sciencemag.org/news/2020/07/after-40-years-researchers-finally-see-earths-climate-destiny-more-clearly'
  },
  {
    term: 'How is risk calculated?',
    definition: "The product of the likelihood and consequence of an outcome.",
    source: 'https://www.oecd.org/env/cc/19519189.pdf'
  },
  {
    term: 'Which line of evidence was not used in its own right in the 2020 WCRP report?',
    definition: 'Climate models',
    source: 'https://www.wcrp-climate.org/'
  },
  {
    term: 'When was the IPCC founded?',
    definition: '1988',
    source: 'https://www.ipcc.ch/about/history/'
  },
  {
    term: 'What new range was described by the WCRP (World Climate Research Programme) in July 2020 for climate sensitivity?',
    definition: '2.6°C to 3.9°C likely i.e. 66%',
    source: 'https://www.wcrp-climate.org/news/science-highlights/1604-climate-sensitivity-2020'
  },
  {
    term: 'What range for climate sensitivity did the 1979 Charney report predict?',
    definition: '1.5°C to 4.5°C',
    source: 'https://www.carbonbrief.org/explainer-how-scientists-estimate-climate-sensitivity'
  },
  {
    term: 'In environments containing permafrost, the top layer of soil thaws during the summer and freezes again during the autumn. What is this layer called?',
    definition: 'The active layer.',
    source: 'https://en.wikipedia.org/wiki/Active_layer'
  },  
  {
    term: 'London-New York uses 986kg of CO₂ per passenger. That equates to more than the average CO₂ emission in how many countries?',
    definition: '56',
    source: 'https://mossy.earth/methodologies/carbon-footprint-calculator'
  },
  {
    term: 'What value does \'likely\' equate to as a statistical probability?',
    definition: '>66%',
    source: 'https://desevun.org/ipcc-likelihood-terms/'
  },
  {
    term: 'What is the current biophysical capacity requirement of humanity in Earth units?',
    definition: '1.7',
    source: 'https://www.overshootday.org/',
    source: 'https://en.wikipedia.org/wiki/Ecological_footprint'
  },
  {
    term: 'What is the ‘fat-tailed’ distribution?',
    definition: 'The area under the far right extreme of the curve which indicates a greater likelihood of warming well in excess of the predicted average.',
    source: 'https://www.huffpost.com/entry/the-fat-tail-of-climate-change-risk_b_8116264'
  },
  {
    term: 'What is the risk of a collapse of the Atlantic Meridional Overturning Circulation (AMOC) this century?',
    definition: 'Less than 10%.',
    source: 'https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2019JC015083#'
  },
  {
    term: 'How great has been the slowdown in the AMOC since 1950?',
    definition: '15%',
    source: 'https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2019JC015083#'
  },
  {
    term: 'In 2016, what headed the World Economic Forum survey of most impactful risks?',
    definition: 'Failure of climate change mitigation and adaptation',
    source: 'http://www3.weforum.org/docs/GRR/WEF_GRR16.pdf'
  },
  {
    term: 'Massive non-linear events in the global environment give rise to what?',
    definition: 'Massive non-linear societal events.',
    author: 'Kevin Anderson',
    source: 'https://riskandwellbeing.com/tag/kevin-anderson/'
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
    definition: 'Yes',
    source: 'https://ipcc-data.org/guidelines/pages/gcm_guide.html',
    tchnical: true
  },
  {
    term: 'What is the carbon budget?',
    definition: 'An estimate of the total future human-caused greenhouse gas emissions in tons of CO₂ consistent with limiting warming to a specified figure.'
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
    definition: 'Net zero CO₂ emissions are achieved when anthropogenic CO₂ emissions are balanced globally by anthropogenic CO₂ removals over a specified period.',
    source: 'https://www.carbonbrief.org/guest-post-the-problem-with-net-zero-emissions-targets'
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
    term: 'SROCC (Special Report on the Ocean and Cryosphere in a Changing Climate) predicts that more intense and frequent extreme sea level events will be how many orders of magnitude higher in 2100 than today?',
    definition: '2-3',
    source: 'https://www.ipcc.ch/srocc/'
  },
  {
    term: 'How many tons of carbon does the world\'s permafrost contain?',
    definition: '1.5 trillion tons'
  },
  {
    term: 'How many tons of carbon does the world\'s soils contain?',
    definition: '2.5 trillion tons',
    source: 'https://ec.europa.eu/clima/sites/clima/files/docs/soil_and_climate_en.pdf'
  },
  {
    term: 'How many tons of carbon does the atmosphere contain?',
    definition: '~730 billion tons',
    source: 'https://www.ipcc.ch/report/ar3/wg1/the-carbon-cycle-and-atmospheric-carbon-dioxide/'
  },
  {
    term: 'How many tons of carbon does the ocean contain?',
    definition: '~38,000 billion tons',
    source: 'https://www.ipcc.ch/report/ar3/wg1/the-carbon-cycle-and-atmospheric-carbon-dioxide/'
  },
  {
    term: 'How many tons of carbon does the land contain?',
    definition: '~2,000 billion tons (500 plants, 1,500 soil).',
    source: 'https://www.ipcc.ch/report/ar3/wg1/the-carbon-cycle-and-atmospheric-carbon-dioxide/'
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
    definition: 'Greenhouse gases which have been removed from the atmosphere (by technology).',
    source: 'https://www.carbonbrief.org/explainer-10-ways-negative-emissions-could-slow-climate-change'
  },
  {
    term: 'What is Thermohaline Circulation (THC)?',
    definition: 'One part of the ocean circulation which is driven by density differences (dependent on salinity and temperature, hence the name).'
  },
  {
    term: 'What are other terms for the Thermohaline Circulation (THC)?',
    definition: 'The Global Ocean Conveyor or Great Ocean Conveyor Belt.',
    technical: true
  },
  {
    term: 'What is the upper limit of global warming beyond which the survival of the Great Barrier Reef would be threatened?',
    definition: '1.2°C'
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
    definition: '53%',
    source: 'https://news.harvard.edu/gazette/story/2019/02/why-nonviolent-resistance-beats-violent-force-in-effecting-social-political-change/'
  },
  {
    term: 'According to Chenoweth and Maria Stephan how often are violent campaigns successful?',
    definition: '26%',
    source: 'https://news.harvard.edu/gazette/story/2019/02/why-nonviolent-resistance-beats-violent-force-in-effecting-social-political-change/'
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
    term: 'What is the Suess effect?',
    definition: 'A change in the ratio of the atmospheric concentrations of heavy isotopes of carbon (13C and 14C) by the admixture of large amounts of fossil-fuel derived CO₂, which is depleted in 13C and contains no 14C.'
  },
  {
    term: '3 million years ago, CO₂ concentrations were the same as today. How much higher were sea levels?',
    definition: 'Sea levels were 15-20 metres (50-65 feet) higher than today.',
    source: 'https://phys.org/news/2019-04-dire-future-etched-co2-million.html'
  },
  {
    term: 'How many different organisations are working on climate models?',
    definition: '~40'
  },
  {
    term: 'What is an RCP (Representative Concentration Pathway)?',
    definition: 'A greenhouse gas concentration trajectory adopted by the IPCC.',
    source: 'https://www.ipcc-data.org/guidelines/pages/glossary/glossary_r.html'
  },
  {
    term: 'From 1850-1900 to 2006-2015 mean land surface air temperature has increased by how much?',
    definition: '1.53°C (range from 1.38°C to 1.68°C)',
    source: 'https://www.ipcc.ch/srccl/chapter/summary-for-policymakers/',
    confidence: 'very likely'
  },
  {
    term: 'From 1850-1900 to 2006-2015 global mean surface (land and ocean) temperature - GMST - has increased by how much?',
    definition: '0.87°C (range from 0.75°C to 0.99°C)',
    source: 'https://www.ipcc.ch/srccl/chapter/summary-for-policymakers/',
    confidence: 'very likely'
  },
  {
    term: 'Name 4 causes of vegetation greening over the last 3 decades in parts of Asia, Europe, S America, central N America, and SE Australia.',
    definition: 'Extended growing season, nitrogen deposition, Carbon Dioxide (CO₂) fertilisation, and land management.',
    source: 'https://www.ipcc.ch/srccl/chapter/summary-for-policymakers/',
    confidence: 'high confidence'
  },
  {
    term: 'How many people are overweight or obese?',
    definition: '2 billion',
    source: 'https://www.ipcc.ch/srccl/',
    confidence: 'high confidence'
  },
  {
    term: 'How many people are undernourished?',
    definition: '821 million',
    source: 'https://www.ipcc.ch/srccl/',
    confidence: 'high confidence'
  },
];

export const sets = [
  {
    title: 'Policy',
    cards: policyCards,
    count: policyCards.length
  },
  {
    title: 'Land',
    cards: ecologyCards,
    count: ecologyCards.length
  },
  {
    title: 'Water',
    cards: waterCards,
    count: waterCards.length
  },
  {
    title: 'Science',
    cards: scienceCards,
    count: scienceCards.length
  },
  {
    title: 'Basics',
    cards: basicsCards,
    count: basicsCards.length
  },
  // {
  //   title: 'Acronyms',
  //   cards: acronymsCards,
  //   count: acronymsCards.length
  // },
];