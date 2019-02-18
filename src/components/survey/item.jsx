import { useTranslation } from 'react-i18next';

const SurveyChoice = styled.button`
    background: white;
    display: block;
    height: inherit;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 7px;
    align-items: center;

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
    font-size: 1.7rem;
`;

export default props => {
    const { t } = useTranslation();
    const { title, id, onClick } = props;

    return (
        <SurveyChoice onClick={() => onClick(id)} type="button">
            <h3>{title}</h3>

            <CloseButton>
                <span title={t('delete')} className="icon-close" />
            </CloseButton>
        </SurveyChoice>
    );
};
