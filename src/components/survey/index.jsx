import { useTranslation } from 'react-i18next';

import { SurveyItem } from 'components';

/* eslint-disable */
const Survey = styled.section`
    position: absolute;
    z-index: 80;
    padding: 0 15px;
    right: 60px;
    top: 30%;
    min-width: 250px;

    h4 {
        font-size: 1.7rem;
        background-color: #fff48e;
        padding: 5px 20px 5px 5px;
        display: inline-block;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 900px) {
        display: ${props => (props.isVisible ? 'block' : 'none')};
        width: 100%;
        left: 0;
        bottom: 10%;
        top: auto;
    }
`;

const SurveyChoices = styled.ul``;

const SurveyChoice = styled.li`
    margin-bottom: 9px;
    padding: 5px;
    border: black 2px solid;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        height: 2px;
        left: -7px;
        right: -7px;
        top: 50%;
        z-index: 6;
        background-color: black;
        transform: translate(0, -50%) scaleX(0);
        transition: transform 0.25s;
        will-change: transition;
        transform-origin: center left;
    }

    @media (hover: hover) {
        &:hover:before {
            content: '';
            transform: translate(0, -50%) scaleX(1);
        }
    }
`;

const SurveyButtons = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 17px;
    grid-column-gap: 5px;
    grid-row-gap: 5px;

    &:nth-child(1) {
        grid-column: 1 / 2;
    }

    &:nth-child(2) {
        grid-column: 2 / 3;
        justify-self: center;
    }
    &:nth-child(3) {
        grid-column: 1 / 3;
    }

    button {
        color: whitesmoke;
        padding: 10px;
        font-size: 1rem;
        width: 100%;

        &.valid {
            background-color: #4c8b55;
        }

        &.error {
            background-color: #bd1644;
        }
    }
`;
/* eslint-enable */

export default props => {
    const { t } = useTranslation();

    const {
        choices,
        toggleSurvey,
        cancelSurvey,
        createSurvey,
        isVisible,
    } = props;

    return (
        <Survey isVisible={isVisible}>
            <h4>{t('survey')}</h4>
            <SurveyChoices>
                {choices.map(item => (
                    <SurveyChoice key={item.id}>
                        <SurveyItem
                            onTransitionEnd={() => console.log('fefe')}
                            onClick={toggleSurvey}
                            {...item}
                        />
                    </SurveyChoice>
                ))}
            </SurveyChoices>
            <SurveyButtons>
                {choices.length > 1 && (
                    <li>
                        <button
                            className="valid"
                            type="button"
                            onClick={createSurvey}
                        >
                            Create
                        </button>
                    </li>
                )}
                <li>
                    <button
                        className="error"
                        type="button"
                        onClick={cancelSurvey}
                    >
                        Cancel
                    </button>
                </li>
            </SurveyButtons>
        </Survey>
    );
};
