/* eslint-disable */
import { useTranslation } from 'react-i18next';
import Draggable from 'react-draggable';

import { ListItem, ListEmpty } from 'components';

/* eslint-disable */
const ListContainer = styled.div`
    width: 350px;
    position: absolute;
    bottom: 0;
    left: 50px;
    z-index: 999;
    min-height: 15%;
    max-height: 75%;
    opacity: 0.65;
    background: white;

    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    @media (hover: hover) {
        &:hover {
            opacity: 1;
        }
    }

    @media screen and (max-width: 900px) {
        display: ${props => (props.isVisible ? 'flex' : 'none')};
        left: 0;
        /* margin-left: 50%; */
        /* left: 50%;
        */
        /* transform: translate(-50%, 0%);  */
        width: 97%;
        opacity: 1;
        max-height: 55%;
        bottom: 75px;
        /* max-height: ${props =>
            props.hasSelectedLocation ? '35%' : '55%'}; */
    }
`;

const Navigation = styled.nav`
    ul {
        display: flex;
        flex-direction: row;
        height: 52px;
    }
`;

const NavigationItem = styled.li`
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    font-size: 1.15rem;
    border-bottom: 3px solid transparent;
    border-bottom-color: ${props => (props.active ? '#d8c307' : 'transparent')};

    button {
        font-size: inherit;
        padding: 0 15px;
        width: 100%;
        height: 100%;
    }
`;

const ListRestaurants = styled.ul`
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const ListRestaurantsWrapper = styled.div`
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
/* eslint-enable */

/* eslint-disable */

const DRAGGING_COEFFICIENT = 0.587373;
const LIMIT_SURVEY_CHOICES = 4;

export default props => {
    const { t } = useTranslation();
    const {
        selectedLocationId,
        toggleFav,
        favs,
        toggleSurvey,
        surveyChoices,
        isVisible,
    } = props;

    const [restaurants, setRestaurants] = React.useState(
        props.locations.restaurants // eslint-disable-line
    );
    const [activeTab, setActiveTab] = React.useState(1);

    return (
        <Draggable
            axis="y"
            handle=".navigation"
            bounds={{
                top: 0,
                bottom:
                    window.innerHeight -
                    window.innerHeight * DRAGGING_COEFFICIENT,
            }}
            scale={1}
        >
            <ListContainer
                hasSelectedLocation={selectedLocationId}
                isVisible={isVisible}
            >
                <Navigation className="navigation">
                    <ul>
                        <NavigationItem active={activeTab === 0}>
                            <button
                                type="button"
                                onClick={() => {
                                    setRestaurants(
                                        restaurants.filter(item =>
                                            favs.includes(item.id)
                                        )
                                    );
                                    setActiveTab(0);
                                }}
                            >
                                {t('favorites')}
                            </button>
                        </NavigationItem>
                        <NavigationItem active={activeTab === 1}>
                            <button
                                type="button"
                                onClick={() => {
                                    setRestaurants(props.locations.restaurants);
                                    setActiveTab(1);
                                }}
                            >
                                {t('all')}
                            </button>
                        </NavigationItem>
                    </ul>
                </Navigation>

                {restaurants.length > 0 && (
                    <ListRestaurantsWrapper>
                        <ListRestaurants>
                            {restaurants
                                ?.sort((a, b) => a.title > b.title)
                                .map(item => (
                                    <ListItem
                                        key={item.id}
                                        {...item}
                                        toggleFav={toggleFav}
                                        toggleSurvey={toggleSurvey}
                                        isActive={
                                            selectedLocationId === item.id
                                        }
                                        isInSurvey={surveyChoices.includes(
                                            item.id
                                        )}
                                        isLimitSurveyReached={
                                            surveyChoices.length >=
                                            LIMIT_SURVEY_CHOICES
                                        }
                                        isFavorite={favs.includes(item.id)}
                                    />
                                ))}
                        </ListRestaurants>
                    </ListRestaurantsWrapper>
                )}

                {restaurants.length === 0 && <ListEmpty />}
            </ListContainer>
        </Draggable>
    );
};
