import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cx } from 'emotion';

/* eslint-disable */
const Item = styled.li`
    position: relative;
    & > a {
        padding: 15px 18px;
        text-decoration: none;
        color: inherit;
        display: block;

        &:hover {
            background-color: #fff48e;
        }

        background-color: ${props =>
            props.isActive ? '#fff48e' : 'transparent'};
    }

    h3 {
        font-size: 1.3rem;
        font-weight: normal;
        margin-bottom: 4px;
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        left: 18px;
        height: 2px;
        right: 0;
        background-color: #b26809;
        z-index: 400;
        opacity: 0.35;
    }
`;

const Details = styled.ul`
    background-color: #fff48e;
    /* #fff48e; */
    padding: 0 18px 15px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Feature = styled.li`
    display: flex;
    justify-content: center;
`;

// prettier-ignore
const FeatureAction = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8125rem;

    .icon {
        font-size: 2.5rem;
    }

    &:hover {
        .icon-fav, .icon-fav-no {
            color: red;
        }
        .icon-fav:before {
            content: '\\e901' ;
        }
        .icon-fav-no:before {
            content: '\\e900' ;
        }
    }
`;

const FeatureActionLink = FeatureAction.withComponent(Link);

const DiscountMessage = styled.p`
    font-weight: bolder;
    font-size: 0.8rem;
    margin-top: 7px;
`;

const Address = styled.p`
    font-size: 0.9rem;
    font-weight: lighter;
`;
/* eslint-enable */

export default props => {
    const { t } = useTranslation();

    const { id, title, address, isActive, isFavorite, website } = props;

    return (
        <Item id={id} isActive={isActive}>
            <NavLink to={`/locations/${id}`}>
                <h3>{title}</h3>
                <Address>{address}</Address>
                <DiscountMessage>{t('has_mg_discount')}</DiscountMessage>
            </NavLink>
            {isActive && (
                <Details>
                    <Feature>
                        <FeatureAction
                            category="fav"
                            type="button"
                            title={t(
                                isFavorite ? 'add_to_favs' : 'remove_from_favs'
                            )}
                            onClick={() => console.log('add_to_fav')}
                            isFavorite={isFavorite}
                        >
                            <span
                                className={cx(
                                    { 'icon-fav': !isFavorite },
                                    { 'icon-fav-no': isFavorite },
                                    { icon: true }
                                )}
                            />
                            <span>
                                {t(
                                    isFavorite
                                        ? 'add_to_favs'
                                        : 'remove_from_favs'
                                )}
                            </span>
                        </FeatureAction>
                    </Feature>
                    <Feature>
                        <FeatureActionLink
                            category="directions"
                            to={`/locations/${id}/directions`}
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
                        </FeatureActionLink>
                    </Feature>
                    <Feature>
                        <FeatureAction
                            category="survey"
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
                    </Feature>
                    {website && (
                        <Feature>
                            <FeatureAction
                                category="survey"
                                type="button"
                                as="a"
                                href={website}
                                title={t('go_to_website')}
                                onClick={() => console.log('add_to_fav')}
                            >
                                <span
                                    className={cx(
                                        { 'icon-survey-add': true },
                                        { icon: true }
                                    )}
                                />
                                <span> {t('go_to_website')}</span>
                            </FeatureAction>
                        </Feature>
                    )}
                </Details>
            )}
        </Item>
    );
};
