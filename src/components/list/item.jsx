import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cx } from 'emotion';

/* eslint-disable */
const Item = styled.li`
    position: relative;
    overflow: hidden;
    & > a {
        padding: 15px 18px;
        text-decoration: none;
        color: inherit;
        display: block;

        @media (hover: hover) {
            &:hover {
                background-color: #fff48e;
            }
        }

        background-color: ${props =>
            props.isActive ? '#fff48e' : 'transparent'};
    }

    &.is-favorite {
        &:before {
            content: '\\e900';
            font-family: 'gb-icons' !important;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 8.25rem;
            right: -31px;
            text-align: right;
            top: 0;
            color: red;
            opacity: 0.07;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            pointer-events: none;
        }
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

    color: ${props =>
            props.isFavorite ? 'red' : 'inherit'};

    span {
        font-size: 0.8125rem;
    }

    .icon {
        font-size: 2.5rem;
        color: ${props =>
            props.isFavorite ? 'red' : '#333'};
    }

    &[disabled] {
        opacity: 0.5;
    }

    @media (hover: hover) {
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
    }
`;

const FeatureActionLink = FeatureAction.withComponent(NavLink);

const DiscountMessage = styled.p`
    font-weight: bolder;
    font-size: 0.8rem;
    margin-top: 7px;
    display: inline-block;
    background-color: #fff48e;
    padding: 5px 20px 5px 5px;
`;

const Address = styled.p`
    font-size: 0.9rem;
    font-weight: lighter;
`;
/* eslint-enable */

export default props => {
    const { t } = useTranslation();

    const {
        id,
        title,
        address,
        isActive,
        isFavorite,
        website,
        toggleFav,
        toggleSurvey,
        isInSurvey,
        isLimitSurveyReached,
        has_mg_discount: hasMGDiscount,
    } = props;
    console.log('isLimitSurveyReached', isLimitSurveyReached);
    return (
        <Item
            id={id}
            isActive={isActive}
            isFavorite={isFavorite}
            className={cx({ 'is-favorite': isFavorite })}
        >
            <NavLink to={`/locations/${id}`}>
                <h3>{title}</h3>
                <Address>{address}</Address>
                {hasMGDiscount && (
                    <DiscountMessage>{t('has_mg_discount')}</DiscountMessage>
                )}
            </NavLink>
            {isActive && (
                <Details>
                    <Feature>
                        <FeatureAction
                            category="fav"
                            type="button"
                            title={t(
                                isFavorite ? 'remove_from_favs' : 'add_to_favs'
                            )}
                            onClick={() => toggleFav(id)}
                            isFavorite={isFavorite}
                        >
                            <span
                                className={cx(
                                    { 'icon-fav': isFavorite },
                                    { 'icon-fav-no': !isFavorite },
                                    { icon: true }
                                )}
                            />
                            <span>
                                {t(
                                    isFavorite
                                        ? 'is_favorited'
                                        : 'is_not_favorited'
                                )}
                            </span>
                        </FeatureAction>
                    </Feature>
                    <Feature>
                        <FeatureActionLink
                            category="directions"
                            replace
                            to={`/locations/${id}/directions`}
                            title={t('display_directions')}
                        >
                            <span
                                className={cx(
                                    { 'icon-itinerary': true },
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
                            disabled={isLimitSurveyReached && !isInSurvey}
                            title={t(
                                isInSurvey
                                    ? 'remove_from_survey'
                                    : 'add_to_survey'
                            )}
                            onClick={() => toggleSurvey(id)}
                        >
                            <span
                                className={cx(
                                    {
                                        'icon-survey-add': !isInSurvey,
                                    },
                                    {
                                        'icon-survey-del': isInSurvey,
                                    },
                                    { icon: true }
                                )}
                            />
                            <span>
                                {t(
                                    isInSurvey
                                        ? 'remove_from_survey'
                                        : 'add_to_survey'
                                )}{' '}
                                <br />
                                {isLimitSurveyReached &&
                                    !isInSurvey &&
                                    '(Limit reached)'}
                            </span>
                        </FeatureAction>
                    </Feature>
                    {website && (
                        <Feature>
                            <FeatureAction
                                category="survey"
                                as="a"
                                href={website}
                                target="_blank"
                                title={t('go_to_website')}
                            >
                                <span
                                    className={cx(
                                        { 'icon-website': true },
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
