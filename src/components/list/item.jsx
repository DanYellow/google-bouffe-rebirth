import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cx } from 'emotion';

/* eslint-disable */
const Item = styled.li`
    a {
        padding: 15px 18px;
        text-decoration: none;
        color: inherit;
        display: block;

        &:hover {
            background-color: #d8c307;
        }

        background-color: ${props =>
            props.isActive ? '#d8c307' : 'transparent'};
    }

    h3 {
        font-size: 1.3rem;
        font-weight: normal;
        margin-bottom: 4px;
    }
    p {
        font-size: 0.85rem;
        font-weight: lighter;
    }
`;

const Details = styled.section`
    background-color: #d8c307;
    padding: 0 18px 15px;
`;

const Features = styled.ul`
    display: flex;
    align-items: flex-start;
`;

const FeatureAction = styled.button`
    display: flex;
    flex-direction: column;

    .icon {
        font-size: 2.5rem;
    }
`;
/* eslint-enable */

export default props => {
    const { t } = useTranslation();

    const { id, title, address, isActive } = props;

    return (
        <Item id={id} isActive={isActive}>
            <NavLink to={`/locations/${id}`} activeClassName="selected">
                <h3>{title}</h3>
                <p>{address}</p>
            </NavLink>
            {isActive && (
                <Details>
                    <Features>
                        <li>
                            <FeatureAction
                                type="button"
                                title={t('add_to_fav')}
                                onClick={() => console.log('add_to_fav')}
                            >
                                <span
                                    className={cx(
                                        { 'icon-fav': true },
                                        { icon: true }
                                    )}
                                />
                                <span>{t('add_to_fav')}</span>
                            </FeatureAction>
                        </li>
                        <li>
                            <FeatureAction
                                type="button"
                                title={t('display_directions')}
                                onClick={() => console.log('add_to_fav')}
                            >
                                <span
                                    className={cx(
                                        { 'icon-fav': true },
                                        { icon: true }
                                    )}
                                />
                                <span>{t('display_directions')}</span>
                            </FeatureAction>
                        </li>
                        <li>
                            <FeatureAction
                                type="button"
                                title={t('add_to_survey')}
                                onClick={() => console.log('add_to_fav')}
                            >
                                <span
                                    className={cx(
                                        { 'icon-survey-add': true },
                                        { icon: true }
                                    )}
                                />
                                <span> {t('add_to_survey')}</span>
                            </FeatureAction>
                        </li>
                    </Features>
                </Details>
            )}
        </Item>
    );
};
