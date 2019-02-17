import { useTranslation } from 'react-i18next';

const SurveyChoice = styled.button`
    background: white;
    display: block;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;

    h3 {
        display: inline-block;
        padding: 5px 20px 5px 5px;
        font-size: 1.2rem;
        text-align: left;
    }

    footer {
        p {
            border: 2px solid red;
            padding: 7px;
        }
    }
`;

const CloseButton = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    margin-top: 15px;
`;

export default props => {
    const { t } = useTranslation();
    const { title, id, onClick } = props;

    return (
        <SurveyChoice onClick={() => onClick(id)} type="button">
            <h3>{title}</h3>

            <CloseButton>
                <span className="icon-close" />
                <span>{t('delete')}</span>
            </CloseButton>
        </SurveyChoice>
    );
};
