import { useTranslation } from 'react-i18next';

/* eslint-disable */
const Navigation = styled.nav`
    position: absolute;
    bottom: 0;
    height: 75px;
    z-index: 9999;
    left: 0;
    right: 0;
    background: white;
    display: none;
    border-top: 3px solid #b26809;

    ul {
        display: flex;
        justify-content: space-between;
        height: 100%;
        align-items: center;
    }

    @media screen and (max-width: 900px) {
        display: block;
    }
`;

const NavigationItemUi = styled.li`
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 5px;

    button {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        color: ${props => (props.isActive ? '#b26809' : 'black')};

        .badge {
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #b26809;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .icon {
        font-size: 2rem;
    }
`;
/* eslint-enable */

const NavigationItem = props => {
    const { isActive, idx, text, iconKey, setTab, nbChoices } = props;

    return (
        <NavigationItemUi isActive={isActive} nbChoices={nbChoices}>
            <button type="button" onClick={() => setTab(idx)}>
                {nbChoices && <div className="badge">{nbChoices}</div>}
                <span className={`icon-${iconKey} icon`} />
                <span>{text}</span>
            </button>
        </NavigationItemUi>
    );
};

export default props => {
    const { t } = useTranslation();

    const { setTab, tabToShow, nbChoices } = props;

    return (
        <Navigation>
            <ul>
                <NavigationItem
                    iconKey="restaurant"
                    text={t('restaurants')}
                    idx={0}
                    isActive={tabToShow === 0}
                    setTab={setTab}
                />

                {nbChoices > 0 && (
                    <NavigationItem
                        nbChoices={nbChoices}
                        iconKey="survey"
                        text={t('survey')}
                        idx={1}
                        isActive={tabToShow === 1}
                        setTab={setTab}
                    />
                )}
            </ul>
        </Navigation>
    );
};
