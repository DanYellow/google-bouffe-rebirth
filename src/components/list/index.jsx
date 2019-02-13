import { useTranslation } from 'react-i18next';
import Draggable from 'react-draggable';

import { ListItem, ListEmpty } from 'components';

/* eslint-disable */
const ListContainer = styled.div`
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
        left: 0%;
        /* margin-left: 50%; */
        /* left: 50%;
        */
        /* transform: translate(-50%, 0%);  */
        width: 97%;
        opacity: 1;
        max-height: 55%;
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

const COEFFICIENT_DRAGGING = 0.697373;

export default props => {
    const { t } = useTranslation();
    const { selectedLocationId } = props;

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
                    window.screen.height -
                    window.screen.height * COEFFICIENT_DRAGGING,
            }}
            scale={1}
        >
            <ListContainer hasSelectedLocation={selectedLocationId}>
                <Navigation className="navigation">
                    <ul>
                        <NavigationItem active={activeTab === 0}>
                            <button
                                type="button"
                                onClick={() => {
                                    setRestaurants(
                                        restaurants.filter(
                                            item => item.name === 'hto'
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
                                        isActive={
                                            selectedLocationId === item.id
                                        }
                                        isFavorite={Math.random() > 0.5}
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
