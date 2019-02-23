import { utils } from 'utils/utils';
import { getLocation, getPlace } from 'geo/geo';
import { getHistogram, getInatPlaceId } from 'api/inat/inat';
import { renderTemplate } from 'ui/helpers/templating';
import calendarTemplate from 'ui/screens/common/calendar-template.html';

export async function renderCalendar(parent, item, config) {

    const template = document.createElement('template');

    template.innerHTML = calendarTemplate;

    parent.innerHTML = '';

    const place = await getPlace(config);

    const country = place.country.place_name_en || place.country;

    const places = await getInatPlaceId(country);

    const placeId = places.results.find(place => place.display_name === country).id;

    let months = [];

    const getENShortMonth = (ordinal) => {
        let month;
        switch(ordinal) {
            case 1:
                month = 'J';
                break;
            case 2:
                month = 'F';
                break;
            case 3:
                month = 'M';
                break;
            case 4:
                month = 'A';
                break;
            case 5:
                month = 'M';
                break;
            case 6:
                month = 'J';
                break;
            case 7:
                month = 'J';
                break;
            case 8:
                month = 'A';
                break;
            case 9:
                month = 'S';
                break;
            case 10:
                month = 'O';
                break;
            case 11:
                month = 'N';
                break;
            case 12:
                month = 'D';
                break;
        }
        return month;
    }

    const getMonth = (ordinal, config) => {
        let month;
        switch(config.language) {
            case 'en':
                month = getENShortMonth(ordinal);
                break;
            default:
                month = getENShortMonth(ordinal);
        }
        return month;
    }

    getHistogram(item, placeId).then(histogram => {
        const monthlyStats = histogram.results.month_of_year;
        for (var month in monthlyStats) {
            months.push({
                month: getMonth(parseInt(month), config),
                index: parseInt(month),
                count: monthlyStats[month]
            });
        }

        utils.sortBy(months, 'count', 'desc').forEach( (month, index) => {
            if(index < 4 && month.count !== 0) {
                month.class = 'most-observations';
            } else {
                month.class = '';
            }
        });

        utils.sortBy(months, 'index', 'asc');

        const data = [];
        let season = [];

        months.map((month,index) => {
            if(index < 4) {
                season.push(month);                
            }
            if(index === 3) {
                data.push(season);
                season = [];
            }
            if(3 < index && index < 8) {
                season.push(month);                
            }
            if(index === 7) {
                data.push(season);
                season = [];
            }
            if(7 < index && index < 12) {
                season.push(month);                
            }
            if(index === 11) {
                data.push(season);
                season = [];
            }
        });

        renderTemplate({ data }, template.content, parent);

        const currentMonthIndex = new Date().getMonth();

        const monthNodes = document.querySelectorAll('.calendar-box .col > div');
    
        monthNodes.forEach((node, index) => {
            if(index === currentMonthIndex) {
                node.classList.add('current-month');
            }
        });
    });
    
};