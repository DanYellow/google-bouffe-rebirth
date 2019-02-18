import { useTranslation } from 'react-i18next';

const SurveyGenerated = styled.div`
    position: absolute;
    z-index: 80;
    padding: 0 15px;
    right: 60px;
    top: 30%;
    width: 375px;

    @media screen and (max-width: 900px) {
        display: ${props => (props.isVisible ? 'block' : 'none')};
        width: 100%;
        left: 0;
        bottom: 10%;
        top: auto;
    }

    h4 {
        font-size: 1.7rem;
        background-color: #fff48e;
        padding: 5px 20px 5px 5px;
        display: inline-block;
        margin-bottom: 15px;
    }

    input {
        height: 40px;
        padding: 7px;
        margin-top: 10px;
        width: 100%;
    }

    section {
        padding: 7px;
        background: white;
    }
`;

export default props => {
    const { t } = useTranslation();

    const { hash, isVisible } = props;
    const surveyURL = `${document.location.origin}/#/surveys/${hash}`;

    return (
        <SurveyGenerated isVisible={isVisible}>
            <h4>{t('survey_link')}</h4>

            <section>
                <p>{t('survey_link_desc')}</p>

                <form>
                    <label htmlFor="results">
                        <input
                            id="results"
                            type="text"
                            value={surveyURL}
                            readOnly
                        />
                    </label>
                </form>
            </section>
        </SurveyGenerated>
    );
};
