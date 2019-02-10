import { useTranslation } from 'react-i18next';

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
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 600px) {
        left: 50%;
        transform: translate(-50%, 0%);
        width: 97%;
        max-height: 65%;
    }
`;

const Navigation = styled.nav`
    ul {
        display: flex;
        flex-direction: row;
        border-radius: 10% 10% 0% 0% / 10% 10% 10% 10%;
        background-color: white;
        height: 42px;
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

/* eslint-enable */

export default props => {
    const { t } = useTranslation();

    const [restaurants, setRestaurants] = React.useState(
        props.locations.restaurants // eslint-disable-line
    );
    const [activeTab, setActiveTab] = React.useState(1);

    return (
        <ListContainer>
            <Navigation>
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
                <ListRestaurants>
                    {restaurants?.map(item => (
                        <ListItem key={item.id} {...item} />
                    ))}
                </ListRestaurants>
            )}

            {restaurants.length === 0 && <ListEmpty />}
        </ListContainer>
    );
};
