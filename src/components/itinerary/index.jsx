import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { map, sum } from 'lodash';

import { ItineraryStep } from 'components';

/* eslint-disable */
const Itinerary = styled.div`
    width: 350px;
    position: absolute;
    bottom: 0;
    left: 450px;
    z-index: 9999;
    min-height: 15%;
    max-height: 85%;
    opacity: 0.65;

    display: flex;
    flex-direction: column;
    border-radius: 10% 10% 0% 0% / 10% 10% 10% 10%;
    background-color: white;

    padding: 0 15px;

    &:hover {
        opacity: 1;
    }

    @media screen and (max-width: 900px) {
        left: 50%;
        transform: translate(-50%, 0%);
        width: 97%;

        max-height: ${props => (props.hasSelectedLocation ? '35%' : '55%')};
    }
`;

const ItineraryHeader = styled.header`
    padding: 15px 0;
    margin-bottom: 10px;
    position: relative;

    h1 {
        font-size: 1.5rem;
        width: 80%;
        margin-bottom: 7px;
    }

    p {
        width: 80%;
    }
`;

const Steps = styled.ol`
    li {
        position: relative;
        padding: 15px 0;
        margin: 0 18px;
        border-bottom: 1px solid #141414;
        overflow: hidden;

        &:before {
            content: attr(data-order);
            font-size: 100px;
            opacity: 0.19;
            top: -5px;
            position: absolute;
            color: #da032c;
        }
    }
`;

const CloseButton = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    height: 40px;
    width: 40px;
    background-color: #333;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;
/* eslint-enable */

export default props => {
    const { t } = useTranslation();
    const {
        steps,
        selectedLocation: { title, address, id },
    } = props;

    const deepSteps = steps.routes[0].legs[0].steps;

    const totalDistance = (
        sum(map(deepSteps, 'distance.value')) / 1000
    ).toFixed(2);
    const totalDuration = (sum(map(deepSteps, 'distance.value')) / 60).toFixed(
        0
    );
    const totalCaloriesBurnt = (6 * totalDuration) / 4;

    return (
        <Itinerary>
            <ItineraryHeader>
                <h1>{title}</h1>
                <p>{address}</p>

                <CloseButton>
                    <Link to={`/locations/${id}`}>
                        <span className="icon-close" />
                    </Link>
                </CloseButton>

                <p>
                    {t('total_distance')}: {totalDistance} km
                </p>
                <p>
                    {totalDuration} {t('walk')}{' '}
                </p>
                <abbr title={t('calories_burned_note')}>
                    {t('calories_burned')}: {totalCaloriesBurnt} kCal
                </abbr>
            </ItineraryHeader>
            <Steps>
                {deepSteps.map((item, idx) => (
                    <li
                        data-order={idx + 1}
                        key={`${item.travel_mode + String(idx)}`}
                    >
                        <ItineraryStep {...item} />
                    </li>
                ))}
            </Steps>
        </Itinerary>
    );
};
