import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { map, sum } from 'lodash';
import Draggable from 'react-draggable';

import { ItineraryStep } from 'components';

/* eslint-disable */
const Itinerary = styled.div`
    width: 350px;
    position: absolute;
    bottom: 0;
    left: 50px;
    z-index: 9999;
    min-height: 15%;
    max-height: 85%;
    opacity: 0.65;

    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;

    @media (hover: hover) {
        &:hover {
            opacity: 1;
        }
    }

    @media screen and (max-width: 900px) {
        left: 0;
        /* left: 50%; */
        /* transform: translate(-50%, 0%); */
        width: 97%;
        opacity: 1;
        max-height: 55%;
    }
`;

const ItineraryHeader = styled.header`
    padding: 15px 15px;
    position: relative;
    border-bottom: 3px solid #d8c307;

    h1 {
        font-size: 1.5rem;
        width: 80%;
        margin-bottom: 7px;
    }

    p {
        width: 80%;
        font-size: 0.8rem;
    }

    abbr {
        display: block;
        margin-top: 7px;
        font-size: 0.8rem;
    }
`;

const StepsWrapper = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    @media screen and (min-width: 1200px) {
        overflow-y: hidden;
        @media (hover: hover) {
            &:hover {
                overflow-y: scroll;
            }
        }
    }
`;

const Steps = styled.ol`
    li {
        position: relative;
        padding: 18px 15px;
        border-bottom: 1px solid #141414;
        overflow: hidden;

        &:before {
            content: attr(data-order);
            font-size: 100px;
            opacity: 0.19;
            top: -5px;
            position: absolute;
            color: #d8c307;
            text-shadow: 4px 3px 0 #7a7a7a;
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
        <Draggable
            axis="y"
            handle=".itinerary-header"
            // defaultPosition={{ x: -250, y: 0 }}
            bounds={{ top: 0, bottom: 150 }}
            scale={1}
        >
            <Itinerary>
                <ItineraryHeader className="itinerary-header">
                    <h1>{title}</h1>
                    <p>{address}</p>

                    <Link to={`/locations/${id}`}>
                        <CloseButton>
                            <span className="icon-close" />
                        </CloseButton>
                    </Link>

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
                <StepsWrapper>
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
                </StepsWrapper>
            </Itinerary>
        </Draggable>
    );
};
