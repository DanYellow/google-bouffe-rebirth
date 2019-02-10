import { useTranslation } from 'react-i18next';

const Empty = styled.div`
    background-color: white;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 15px;
    flex-direction: column;

    q {
        font-size: 1.2rem;
        text-align: center;
    }

    span {
        font-size: 0.725rem;
    }
`;

export default () => {
    const { t } = useTranslation();

    return (
        <Empty>
            <q>“{t('empty_quote')}”</q>
            <span>{t('empty_quote_author')}</span>
        </Empty>
    );
};
