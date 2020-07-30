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
    Lessons from ancient climates
    Understanding of the feedback effects`
  },
  {
    term: 'Which line of evidence was not used in its own right in the 2020 WCRP report?',
    definition: 'Climate models'
  },
  {
    term: 'What does WCRP stand for?',
    definition: 'World Climate Research Programme'
  },
  {
    term: 'How does the IPCC define climate sensitivity?',
    definition: 'How far the planet will warm given a doubling of CO2 in relation to preindustrial levels'
  },
  {
    term: 'Given current CO2 emissions when would we reach 560 ppm?',
    definition: '2060'
  },
  {
    term: 'What does WCPP stand for?',
    definition: 'World Climate Research Programme'
  },
  {
    term: 'What does IPCC stand for?',
    definition: 'Intergovernmental Panel on Climate Change'
  },
  {
    term: 'What range for climate sensitivity did the 1979 the Charney report predict?',
    definition: '1.5°C to 4.5°C'
  },
  {
    term: 'How far have average surface temperatures risen since records began in 1800?',
    definition: '1.1°C'
  },
  {
    term: 'What value does likely equate to as a probability?',
    definition: '66%'
  },
  {
    term: 'Describe moral hazard in relation to cliate change.',
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
    term: 'What is the risk of a collapse of the Atlantic meridional overturning circulation (AMOC) this century?',
    definition: '~5%'
  },
  {
    term: 'How great has been the slowdown in the AMOC since 1950?',
    definition: '15%'
  },
  {
    term: 'In 2016, what headed the World Economic Forum survey of most impactful risks?',
    definition: 'Failure of climate change mitigation and adaptation'
  },
  {
    term: 'Massive non-linear events in the global environment give rise to what?',
    definition: 'Massive nonlinear societal events.'
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
    definition: `"Emissions from the warming permafrost.
    A decrease in the ocean’s carbon-sink efficiency.
    Melting of polar ice sheets."`
  },
  {
    term: 'Does the IPCC favours fully-coupled global climate models or general circulation models (GCMs) over semi-empirical models?',
    definition: 'Yes'
  },
  {
    term: 'What does EES stand for? ',
    definition: 'Earth System Sensitivity (sensitivity + feedbacks)'
  },
  {
    term: 'What does ECS stand for?',
    definition: 'Equilibrium Climate Sensitivity (sensitivity - feedbacks)'
  },
  {
    term: 'What is the carbon budget?',
    definition: 'An estimate of the total future human-caused greenhouse gas emissions in tons of CO2 consistent with limiting warming to a specified figure.'
  },
  {
    term: 'Does the ICC consider warming from a pre-industrial or a late-nineteenth century baseline?',
    definition: 'Late-nineteenth century baseline.'
  },
  {
    term: 'What % of human-caused CO2 emissions are absorbed by trees and other plants?',
    definition: '~1/3'
  },
  {
    term: '2°C of warming could cut the carbon sink of tropical rainforests by what percentage?',
    definition: '50%'
  },
  {
    term: 'At what percentage might the Amazon change from a carbon sink to carbon source?',
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
    term: 'What is the Thermohaline Circulation (the Atlantic conveyor)?',
    definition: 'A system of currents that brings warm, salty water in the upper layers of the ocean up from the Gulf of Mexico into the North Atlantic.'
  },
  {
    term: 'What is the upper limit of global warming that would save the Great Barrier Reef?',
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
    term: 'Estimate how much CO2 afforestation and reforestation can sequester per hectare per year',
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