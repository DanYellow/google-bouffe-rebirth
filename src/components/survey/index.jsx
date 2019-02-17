import { useTranslation } from 'react-i18next';

import { SurveyItem } from 'components';

/* eslint-disable */
const Survey = styled.section`
    position: absolute;
    z-index: 80;
    padding: 0 15px;
    right: 60px;
    top: 30%;

    h4 {
        font-size: 1.7rem;
        background-color: #fff48e;
        padding: 5px 20px 5px 5px;
        display: inline-block;
        margin-bottom: 15px;
    }
`;

const SurveyChoices = styled.ul`
    display: grid;
    grid-template-columns: 180px 180px;
    grid-column-gap: 7px;
    grid-row-gap: 7px;
`;

const SurveyChoice = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px;
    border: black 2px solid;

    &:nth-child(1) {
        grid-column: 1 / 2;
    }
    &:nth-child(2) {
        grid-column: 2 / 3;
    }
    &:nth-child(3) {
        grid-column: 1 / 2;
    }
    &:nth-child(4) {
        grid-column: 2 / 3;
    }

    &:before {
        content: '';
        height: 0;
        display: inline-block;
        padding-top: 100%;
        width: 1px;
        position: relative;
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

    const { choices, toggleSurvey, cancelSurvey } = props;
    return (
        <Survey>
            <h4>{t('survey')}</h4>
            <SurveyChoices>
                {choices.map(item => (
                    <SurveyChoice key={item.id}>
                        <SurveyItem onClick={toggleSurvey} {...item} />
                    </SurveyChoice>
                ))}
            </SurveyChoices>
            <SurveyButtons>
                {choices.length > 1 && (
                    <li>
                        <button className="valid" type="button">
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
