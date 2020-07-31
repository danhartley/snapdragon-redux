import { Card } from 'flashcards/flashcard-card';

const card1 = new Card(
  "How is risk calculated?",
  "The product of the likelihood and consequence of an outcome"
);
const card2 = new Card(
  "When was the IPCC founded?",
  "1988"
);
const card3 = new Card(
  "What new range was described by the WCRP in July 2020 for climate sensitivity?",
  "2.6°C to 3.9°C likely i.e. 66%"
);

const jsonCards = [
  {
    term: 'What 3 lines of evidence were chosen by the WCRP for their 2020 report?',
    definition: `Trends indicated by contemporary warming
    Lessons from comparable ancient climates
    Understanding of the feedback effects`
  },
  {
    term: 'Which line of evidence was not used in its own right in the 2020 WCRP report?',
    definition: 'Climate models'
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
    definition: '(Newly activiated) microbes in the soil break down organic matter.'
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
    term: 'How long does it take methane in the atmosphere to oixidise to CO₂?',
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
    term: 'What does WCRP stand for?',
    definition: 'World Climate Research Programme'
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
    term: 'What percentage of global manmade greenhouse gas emissions does the energy account for?',
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
    term: 'What does EES stand for? ',
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
    term: 'How many tons of carbon does the world\'s permafrost contain?',
    definition: '1.5 trillion tons'
  },
  {
    term: 'How many tons of carbon does the atmosphere contain?',
    definition: '.75 trillion tons'
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
    term: '',
    definition: ''
  },
  {
    term: '',
    definition: ''
  },
];

export const set = {
  title: 'Climate change',
  cards: [
    card1,
    card2,
    card3,
    ...jsonCards.filter(card => card.term !== '')
  ]
};